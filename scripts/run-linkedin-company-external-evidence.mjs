import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const defaults = {
  input: path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13/gate1-results-audited.json'),
  outputDir: path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13/external-evidence'),
  concurrency: 2,
  limit: 3,
  attempts: 3,
  startIntervalMs: 7000,
  families: ['linkedin', 'association', 'b2b', 'customs'],
  execute: false,
  passOnly: false,
  fromLocalTargets: false,
  maxCompanies: Number.POSITIVE_INFINITY,
  only: [],
};

function usage() {
  return `
为 Gate 1 幸存者定向搜索外部证据。默认只生成计划，不联网；必须传 --run 才调用 Firecrawl。

Usage:
  node scripts/run-linkedin-company-external-evidence.mjs [options]

Options:
  --run                       正式执行 Firecrawl search（默认仅计划）
  --input <path>              Gate 1 JSON 输入
  --output-dir <path>         输出目录（必须位于 .firecrawl/ 下）
  --concurrency <1-8>         并行公司数，默认 2
  --limit <1-10>              每个查询的搜索结果上限，默认 3
  --attempts <1-5>            单查询最大尝试次数，默认 3
  --start-interval-ms <n>     全局搜索启动间隔，默认 7000ms
  --families <csv>            linkedin,association,b2b,customs
  --pass-only                 只查 Pass；默认查 Pass + Review
  --from-local-targets        只查 local-analysis 中最终为 A/B 的目标客户
  --only <csv>                仅查指定 id、slug 或完整公司名
  --max-companies <n>         最多处理多少家公司（便于小批试跑）
  --help                      显示帮助

Examples:
  node scripts/run-linkedin-company-external-evidence.mjs
  node scripts/run-linkedin-company-external-evidence.mjs --run --max-companies 3
  node scripts/run-linkedin-company-external-evidence.mjs --run --families linkedin,association
`;
}

function parseArgs(argv) {
  const options = { ...defaults, families: [...defaults.families], only: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) throw new Error(`${arg} 缺少参数`);
      return argv[i];
    };
    if (arg === '--run') options.execute = true;
    else if (arg === '--pass-only') options.passOnly = true;
    else if (arg === '--from-local-targets') options.fromLocalTargets = true;
    else if (arg === '--input') options.input = path.resolve(root, next());
    else if (arg === '--output-dir') options.outputDir = path.resolve(root, next());
    else if (arg === '--concurrency') options.concurrency = Number(next());
    else if (arg === '--limit') options.limit = Number(next());
    else if (arg === '--attempts') options.attempts = Number(next());
    else if (arg === '--start-interval-ms') options.startIntervalMs = Number(next());
    else if (arg === '--max-companies') options.maxCompanies = Number(next());
    else if (arg === '--families') options.families = next().split(',').map((value) => value.trim()).filter(Boolean);
    else if (arg === '--only') options.only = next().split(',').map((value) => value.trim().toLowerCase()).filter(Boolean);
    else if (arg === '--help' || arg === '-h') {
      process.stdout.write(usage());
      process.exit(0);
    } else throw new Error(`未知参数：${arg}`);
  }

  const ranges = [
    ['concurrency', 1, 8],
    ['limit', 1, 10],
    ['attempts', 1, 5],
  ];
  for (const [key, min, max] of ranges) {
    if (!Number.isInteger(options[key]) || options[key] < min || options[key] > max) {
      throw new Error(`--${key} 必须是 ${min}-${max} 的整数`);
    }
  }
  if (!(Number.isInteger(options.maxCompanies) && options.maxCompanies > 0) && options.maxCompanies !== Number.POSITIVE_INFINITY) {
    throw new Error('--max-companies 必须是正整数');
  }
  if (!Number.isInteger(options.startIntervalMs) || options.startIntervalMs < 0 || options.startIntervalMs > 60_000) {
    throw new Error('--start-interval-ms 必须是 0-60000 的整数');
  }
  const allowedFamilies = new Set(defaults.families);
  const invalidFamilies = options.families.filter((family) => !allowedFamilies.has(family));
  if (invalidFamilies.length) throw new Error(`未知 family：${invalidFamilies.join(', ')}`);
  if (!options.families.length) throw new Error('--families 不能为空');

  const firecrawlRoot = path.join(root, '.firecrawl') + path.sep;
  if (!(options.outputDir + path.sep).startsWith(firecrawlRoot)) {
    throw new Error('--output-dir 必须位于项目 .firecrawl/ 下，以隔离不可信网页内容');
  }
  return options;
}

function compactSpace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function quoteQuery(value) {
  return `"${compactSpace(value).replaceAll('"', '')}"`;
}

function normalize(value) {
  return compactSpace(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const genericCompanyTokens = new Set([
  'the', 'and', 'company', 'limited', 'ltd', 'inc', 'incorporated', 'corp', 'corporation',
  'group', 'international', 'global', 'marketing', 'services', 'service', 'solutions', 'agency',
  'promotional', 'promotions', 'products', 'product', 'merchandise', 'branding', 'brands', 'brand',
  'gifts', 'gift', 'pty', 'llc', 'gmbh', 'co', 'uk', 'canada',
]);

function companyTokens(company) {
  const all = normalize(company).split(' ').filter(Boolean);
  const distinctive = all.filter((token) => token.length > 2 && !genericCompanyTokens.has(token));
  return distinctive.length ? distinctive : all.filter((token) => token.length > 1);
}

function inferCountry(item) {
  const explicit = compactSpace(item.country || item.market || '');
  const location = normalize(item.location || item.city_region || item.city || '');
  let host = '';
  try { host = new URL(item.official_url).hostname.toLowerCase(); } catch {}
  const explicitNorm = normalize(explicit);
  const tests = [
    ['Canada', /\bcanada\b/, /\.ca$/,
      /\b(ontario|quebec|alberta|manitoba|saskatchewan|nova scotia|new brunswick|newfoundland|british columbia|prince edward island|yukon|nunavut|northwest territories|toronto|vancouver|montreal|calgary|ottawa|winnipeg|mississauga|edmonton|halifax)\b/],
    ['United Kingdom', /\b(united kingdom|uk|england|scotland|wales|northern ireland)\b/, /\.(co\.)?uk$/,
      /\b(london|manchester|birmingham|glasgow|swansea|leeds|liverpool|bristol|sheffield|edinburgh|berkshire|surrey|essex|kent|hampshire|cheshire|yorkshire)\b/],
    ['Australia', /\baustralia\b/, /\.com\.au$|\.au$/,
      /\b(sydney|melbourne|brisbane|perth|adelaide|canberra|nsw|victoria|queensland|tasmania)\b/],
    ['New Zealand', /\bnew zealand\b/, /\.co\.nz$|\.nz$/,
      /\b(auckland|wellington|christchurch|hamilton|tauranga|dunedin)\b/],
    ['United Arab Emirates', /\b(united arab emirates|uae)\b/, /\.ae$/,
      /\b(dubai|abu dhabi|sharjah|ajman)\b/],
  ];
  for (const [country, explicitPattern, hostPattern, locationPattern] of tests) {
    if (explicitPattern.test(explicitNorm)) return { value: country, confidence: 'high', evidence: [`explicit:${explicit}`] };
  }
  for (const [country, , hostPattern] of tests) {
    if (hostPattern.test(host)) return { value: country, confidence: 'medium', evidence: [`host:${host}`] };
  }
  for (const [country, , , locationPattern] of tests) {
    if (locationPattern.test(location)) return { value: country, confidence: 'medium', evidence: [`location:${item.location}`] };
  }
  return { value: explicit || 'Unknown', confidence: explicit ? 'medium' : 'low', evidence: explicit ? [`explicit:${explicit}`] : [] };
}

const customsPlatforms = [
  ['importyeti', 'importyeti.com'],
  ['customs_report', 'customs.report'],
  ['52wmb', '52wmb.com'],
  ['volza', 'volza.com'],
  ['importgenius', 'importgenius.com'],
  ['panjiva', 'panjiva.com'],
  ['datamyne', 'datamyne.com'],
  ['tradesns', 'tradesns.com'],
];

function buildQueries(item) {
  const company = quoteQuery(item.company);
  const location = compactSpace(item.location) ? ` ${quoteQuery(item.location)}` : '';
  const queries = [
    {
      key: 'linkedin_company', family: 'linkedin', targetDomain: 'linkedin.com',
      query: `site:linkedin.com/company ${company}${location}`,
      purpose: 'LinkedIn 公司页、规模、总部、成立年份与官方介绍',
    },
    {
      key: 'linkedin_leadership', family: 'linkedin', targetDomain: 'linkedin.com',
      query: `site:linkedin.com/in ${company} (owner OR founder OR CEO OR "managing director" OR director)`,
      purpose: 'Owner/Founder/CEO/Managing Director 等最终决策人候选',
    },
    {
      key: 'linkedin_buying_roles', family: 'linkedin', targetDomain: 'linkedin.com',
      query: `site:linkedin.com/in ${company} (procurement OR sourcing OR buyer OR "operations director" OR "head of merchandise" OR "product director")`,
      purpose: 'Procurement/Sourcing/Buyer/Ops/Merchandise 等采购影响人候选',
    },
    {
      key: 'associations', family: 'association', targetDomain: '',
      query: `${company} (PPPC OR PPAI OR ASI OR SAGE OR BPMA OR APPA OR PSI) (member OR distributor OR supplier OR award)`,
      purpose: '促销品协会会员、认证、奖项或提名',
    },
    {
      key: 'events_and_trade_media', family: 'association', targetDomain: '',
      query: `${company} (exhibitor OR sponsor OR speaker OR "trade show" OR expo OR conference) (promotional OR merchandise OR gifting OR awards)`,
      purpose: '展会参与、赞助、演讲与行业媒体记录',
    },
    {
      key: 'company_intelligence', family: 'association', targetDomain: '',
      query: `${company} (site:owler.com OR site:crunchbase.com) (employees OR revenue OR founded OR competitors)`,
      purpose: 'Owler / Crunchbase 的员工、成立年份、营收估计与竞争对手候选线索',
    },
    {
      key: 'b2b_alibaba', family: 'b2b', targetDomain: 'alibaba.com',
      query: `site:alibaba.com ${company} (buyer OR sourcing OR RFQ OR supplier)`,
      purpose: 'Alibaba 采购询价或合作足迹',
    },
    {
      key: 'b2b_made_in_china', family: 'b2b', targetDomain: 'made-in-china.com',
      query: `site:made-in-china.com ${company} (buyer OR sourcing OR RFQ OR supplier)`,
      purpose: 'Made-in-China 采购询价或合作足迹',
    },
    {
      key: 'b2b_public_rfq', family: 'b2b', targetDomain: '',
      query: `${company} ("send me pricelist" OR "looking for supplier" OR "request for quote" OR RFQ)`,
      purpose: '公开论坛、目录或行业网站中的采购需求',
    },
    ...customsPlatforms.map(([key, domain]) => ({
      key: `customs_${key}`,
      family: 'customs',
      targetDomain: domain,
      platform: key,
      query: `site:${domain} ${company}`,
      purpose: `在 ${domain} 查找进口商、供应商、货描、产地、频次与体量候选证据`,
    })),
  ];
  return queries;
}

function parseWebResults(parsed) {
  if (!parsed || typeof parsed !== 'object') throw new Error('Firecrawl 输出不是有效 JSON 对象');
  if (parsed?.success === false) throw new Error(compactSpace(parsed.error || parsed.message || 'Firecrawl 返回 success=false'));
  const candidates = [parsed?.data?.web, parsed?.web, parsed?.data];
  const web = candidates.find((value) => Array.isArray(value)) || [];
  return web
    .filter((item) => item && typeof item === 'object' && item.url)
    .map((item) => ({
      title: compactSpace(item.title).slice(0, 500),
      url: compactSpace(item.url),
      description: compactSpace(item.description || item.markdown || item.snippet).slice(0, 1600),
      position: Number.isFinite(Number(item.position)) ? Number(item.position) : null,
    }));
}

function hostMatches(url, targetDomain) {
  if (!targetDomain) return true;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === targetDomain || host.endsWith(`.${targetDomain}`);
  } catch {
    return false;
  }
}

function identityMatches(item, source) {
  const haystack = normalize(`${source.title} ${source.description} ${source.url}`);
  const phrase = normalize(item.company);
  if (phrase.length >= 4 && haystack.includes(phrase)) return true;
  const tokens = companyTokens(item.company);
  if (!tokens.length) return false;
  const matched = tokens.filter((token) => haystack.includes(token)).length;
  return matched >= Math.max(1, Math.ceil(tokens.length * 0.6));
}

function assess(item, task, sources, country) {
  const matchedSources = sources.filter((source) => hostMatches(source.url, task.targetDomain) && identityMatches(item, source));
  const hasCandidate = matchedSources.length > 0;
  const isCustoms = task.family === 'customs';
  const isCanadaImportYeti = country.value === 'Canada' && task.platform === 'importyeti';
  let statusZh;
  if (hasCandidate) statusZh = isCustoms ? '有记录（搜索摘要候选，待核验）' : '有候选证据（待核验）';
  else statusZh = isCustoms ? '无公开记录（本次定向搜索未命中）' : '未发现公开候选证据';
  return {
    assessment: hasCandidate ? 'candidate_hit_needs_verification' : 'no_public_search_match',
    status_zh: statusZh,
    matched_source_count: matchedSources.length,
    matched_sources: matchedSources,
    negative_inference_allowed: false,
    grading_effect: hasCandidate ? 'positive_candidate_only_pending_verification' : 'neutral',
    canada_importyeti_rule_applied: isCanadaImportYeti,
    interpretation: isCanadaImportYeti
      ? (hasCandidate
        ? '仅可作为该加拿大公司存在美国相关货运足迹的正向候选证据；核验后方可引用。'
        : 'ImportYeti 仅覆盖美国海关数据；未命中不得推断该加拿大公司进口少、未进口或采购能力弱。')
      : (hasCandidate
        ? '搜索摘要只构成候选线索，需打开原始来源核验公司身份和事实后方可引用。'
        : '公开搜索未命中不等于现实中不存在该记录，不作为单独降级依据。'),
  };
}

function safeReadJson(file) {
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; }
}

function atomicJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temp, file);
}

function appendEvent(file, event) {
  appendFileSync(file, `${JSON.stringify({ at: new Date().toISOString(), ...event })}\n`);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let nextSearchStartAt = Date.now();
let rateQueue = Promise.resolve();
function waitForSearchSlot(intervalMs) {
  const slot = rateQueue.then(async () => {
    const delay = Math.max(0, nextSearchStartAt - Date.now());
    if (delay) await wait(delay);
    nextSearchStartAt = Date.now() + intervalMs;
  });
  rateQueue = slot.catch(() => {});
  return slot;
}

function runSearch(task, outputFile, options) {
  return new Promise((resolve) => {
    const partial = `${outputFile}.partial`;
    if (existsSync(partial)) unlinkSync(partial);
    const args = ['search', task.query, '--limit', String(options.limit), '--json', '-o', partial];
    const child = spawn('firecrawl', args, { cwd: root, stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => resolve({ code: null, error: error.message, partial }));
    child.on('close', (code) => resolve({ code, error: compactSpace(stderr).slice(0, 2500), partial }));
  });
}

function initialCompanyEvidence(item, country, tasks) {
  return {
    schema_version: '1.0',
    updated_at: new Date().toISOString(),
    company: {
      id: item.id,
      slug: item.slug,
      name: item.company,
      location: item.location || '',
      country_detection: country,
      official_url: item.official_url,
      gate1: item.gate1,
    },
    policy: {
      raw_web_content_is_untrusted: true,
      search_snippets_require_source_verification: true,
      no_public_search_match_is_not_proof_of_absence: true,
      customs_platforms_are_never_skipped_by_country: true,
      canada_importyeti: 'ImportYeti 仅覆盖美国海关数据。加拿大客户未命中不得作为未进口、进口少、采购弱或降级证据；仅核验后的命中可作正向证据。',
    },
    planned_queries: tasks.length,
    completed_queries: 0,
    failed_queries: 0,
    queries: {},
  };
}

function sourceSummary(sources) {
  return sources.slice(0, 10).map((source) => ({
    title: source.title,
    url: source.url,
    description: source.description,
    position: source.position,
  }));
}

function refreshCompanyCounts(evidence, tasks) {
  const activeKeys = new Set(tasks.map((task) => task.key));
  const activeQueries = Object.entries(evidence.queries)
    .filter(([key]) => activeKeys.has(key))
    .map(([, query]) => query);
  evidence.planned_queries = tasks.length;
  evidence.completed_queries = activeQueries.filter((query) => query.run_status === 'completed').length;
  evidence.failed_queries = activeQueries.filter((query) => query.run_status === 'failed').length;
}

const options = parseArgs(process.argv.slice(2));
if (!existsSync(options.input)) throw new Error(`输入文件不存在：${options.input}`);

const all = JSON.parse(readFileSync(options.input, 'utf8'));
if (!Array.isArray(all)) throw new Error('Gate 1 输入必须是 JSON 数组');
let candidates = all.filter((item) => {
  const acceptedGate = options.passOnly ? item.gate1 === 'Pass' : ['Pass', 'Review'].includes(item.gate1);
  return acceptedGate && item.official_url && item.company && item.slug;
});
if (options.fromLocalTargets) {
  const localPath = path.join(path.dirname(options.input), 'local-analysis', 'companies.json');
  const local = safeReadJson(localPath);
  if (!Array.isArray(local?.companies)) throw new Error(`无法读取本地目标客户清单：${localPath}`);
  const targetIds = new Set(local.companies.filter((item) => item.target_customer && ['A', 'B'].includes(item.gate2_grade)).map((item) => Number(item.id)));
  candidates = candidates.filter((item) => targetIds.has(Number(item.id)));
}
if (options.only.length) {
  candidates = candidates.filter((item) => {
    const values = [String(item.id), String(item.slug).toLowerCase(), String(item.company).toLowerCase()];
    return options.only.some((wanted) => values.includes(wanted));
  });
}
candidates = candidates.slice(0, options.maxCompanies);

const selectedFamilies = new Set(options.families);
const plan = candidates.map((item) => {
  const country = inferCountry(item);
  const tasks = buildQueries(item).filter((task) => selectedFamilies.has(task.family));
  return {
    id: item.id,
    slug: item.slug,
    company: item.company,
    location: item.location || '',
    country_detection: country,
    gate1: item.gate1,
    tasks,
  };
});

mkdirSync(options.outputDir, { recursive: true });
const rawDir = path.join(options.outputDir, 'raw');
const companyDir = path.join(options.outputDir, 'companies');
const errorDir = path.join(options.outputDir, 'errors');
const progressPath = path.join(options.outputDir, 'progress.jsonl');
const summaryPath = path.join(options.outputDir, 'summary.json');
mkdirSync(rawDir, { recursive: true });
mkdirSync(companyDir, { recursive: true });
mkdirSync(errorDir, { recursive: true });
atomicJson(path.join(options.outputDir, 'plan.json'), {
  generated_at: new Date().toISOString(),
  mode: options.execute ? 'execute' : 'plan_only',
  input: path.relative(root, options.input),
  company_count: plan.length,
  query_count: plan.reduce((sum, item) => sum + item.tasks.length, 0),
  families: options.families,
  start_interval_ms: options.startIntervalMs,
  companies: plan,
});

if (!options.execute) {
  process.stdout.write(`计划已生成：${plan.length} 家，${plan.reduce((sum, item) => sum + item.tasks.length, 0)} 个查询。未联网。\n`);
  process.stdout.write(`${path.relative(root, path.join(options.outputDir, 'plan.json'))}\n`);
  process.exit(0);
}

const companyStates = new Map();
for (const planned of plan) {
  const file = path.join(companyDir, `${planned.slug}.json`);
  const existing = safeReadJson(file);
  const evidence = existing || initialCompanyEvidence(
    all.find((item) => item.slug === planned.slug), planned.country_detection, planned.tasks,
  );
  refreshCompanyCounts(evidence, planned.tasks);
  companyStates.set(planned.slug, evidence);
}

function writeSummary() {
  const states = [...companyStates.values()];
  atomicJson(summaryPath, {
    updated_at: new Date().toISOString(),
    companies_total: states.length,
    companies_complete: states.filter((state) => state.completed_queries + state.failed_queries >= state.planned_queries).length,
    queries_planned: states.reduce((sum, state) => sum + state.planned_queries, 0),
    queries_complete: states.reduce((sum, state) => sum + state.completed_queries, 0),
    queries_failed: states.reduce((sum, state) => sum + state.failed_queries, 0),
    canada_companies: states.filter((state) => state.company.country_detection.value === 'Canada').length,
  });
}

async function processCompany(planned) {
  const item = all.find((candidate) => candidate.slug === planned.slug);
  const evidenceFile = path.join(companyDir, `${planned.slug}.json`);
  const evidence = companyStates.get(planned.slug);
  refreshCompanyCounts(evidence, planned.tasks);

  for (let taskIndex = 0; taskIndex < planned.tasks.length; taskIndex += 1) {
    const task = planned.tasks[taskIndex];
    const rawCompanyDir = path.join(rawDir, planned.slug);
    mkdirSync(rawCompanyDir, { recursive: true });
    const rawFile = path.join(rawCompanyDir, `${String(taskIndex + 1).padStart(2, '0')}-${task.key}.json`);

    let parsed = safeReadJson(rawFile);
    let sources;
    if (parsed) {
      try { sources = parseWebResults(parsed); } catch { parsed = null; }
    }

    if (!parsed) {
      let lastError = '';
      for (let attempt = 1; attempt <= options.attempts; attempt += 1) {
        await waitForSearchSlot(options.startIntervalMs);
        appendEvent(progressPath, { event: 'query_start', slug: planned.slug, key: task.key, attempt });
        const result = await runSearch(task, rawFile, options);
        if (result.code === 0 && existsSync(result.partial)) {
          const partialJson = safeReadJson(result.partial);
          try {
            sources = parseWebResults(partialJson);
            renameSync(result.partial, rawFile);
            parsed = partialJson;
            appendEvent(progressPath, { event: 'query_ok', slug: planned.slug, key: task.key, attempt, result_count: sources.length });
            break;
          } catch (error) {
            lastError = `无效 Firecrawl JSON：${error.message}`;
          }
        } else if (result.code === 0 && !/429|rate limit|request failed|error:/i.test(result.error || '')) {
          // Firecrawl CLI exits 0 without creating -o output when the search has
          // no web results. Record an explicit, resumable empty result instead
          // of misclassifying this as an unavailable platform.
          parsed = { success: true, data: { web: [] }, empty_result_from_cli: true };
          sources = [];
          atomicJson(rawFile, parsed);
          appendEvent(progressPath, { event: 'query_ok', slug: planned.slug, key: task.key, attempt, result_count: 0 });
          break;
        } else {
          lastError = result.error || `firecrawl exit=${result.code}`;
        }
        if (existsSync(result.partial)) unlinkSync(result.partial);
        atomicJson(path.join(errorDir, planned.slug, `${task.key}.attempt-${attempt}.json`), {
          at: new Date().toISOString(), company: planned.company, task, attempt, error: lastError,
        });
        appendEvent(progressPath, { event: 'query_retry', slug: planned.slug, key: task.key, attempt, error: lastError });
        if (attempt < options.attempts) await wait(Math.min(30_000, 5_000 * (2 ** (attempt - 1))));
      }

      if (!parsed) {
        evidence.queries[task.key] = {
          ...task,
          searched_at: new Date().toISOString(),
          run_status: 'failed',
          assessment: 'unavailable',
          status_zh: '无法访问',
          negative_inference_allowed: false,
          grading_effect: 'neutral',
          canada_importyeti_rule_applied: planned.country_detection.value === 'Canada' && task.platform === 'importyeti',
          interpretation: task.platform === 'importyeti' && planned.country_detection.value === 'Canada'
            ? '查询失败不得推断该加拿大公司未进口、进口少或采购能力弱。'
            : '查询失败不是无记录；后续应重试。',
          error: lastError,
          sources: [],
        };
        evidence.updated_at = new Date().toISOString();
        refreshCompanyCounts(evidence, planned.tasks);
        atomicJson(evidenceFile, evidence);
        companyStates.set(planned.slug, evidence);
        writeSummary();
        continue;
      }
    }

    const assessment = assess(item, task, sources, planned.country_detection);
    evidence.queries[task.key] = {
      ...task,
      searched_at: new Date().toISOString(),
      run_status: 'completed',
      raw_file: path.relative(root, rawFile),
      result_count: sources.length,
      ...assessment,
      sources: sourceSummary(sources),
    };
    evidence.updated_at = new Date().toISOString();
    refreshCompanyCounts(evidence, planned.tasks);
    atomicJson(evidenceFile, evidence);
    companyStates.set(planned.slug, evidence);
    writeSummary();
  }

  appendEvent(progressPath, {
    event: 'company_done', slug: planned.slug, company: planned.company,
    completed_queries: evidence.completed_queries, failed_queries: evidence.failed_queries,
  });
}

appendEvent(progressPath, {
  event: 'run_start', companies: plan.length,
  queries: plan.reduce((sum, item) => sum + item.tasks.length, 0),
  concurrency: options.concurrency,
  start_interval_ms: options.startIntervalMs,
});
writeSummary();

let cursor = 0;
async function worker() {
  while (cursor < plan.length) {
    const planned = plan[cursor];
    cursor += 1;
    await processCompany(planned);
    const summary = safeReadJson(summaryPath);
    process.stdout.write(`external-evidence ${summary.companies_complete}/${summary.companies_total} companies; queries ok=${summary.queries_complete} failed=${summary.queries_failed}\n`);
  }
}

await Promise.all(Array.from({ length: Math.min(options.concurrency, plan.length || 1) }, () => worker()));
appendEvent(progressPath, { event: 'run_done', summary: safeReadJson(summaryPath) });
const finalSummary = safeReadJson(summaryPath);
if (finalSummary.queries_failed) process.exitCode = 2;
