import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13/external-evidence');
const plan = JSON.parse(readFileSync(path.join(outputDir, 'plan.json'), 'utf8')).companies;
const companyDir = path.join(outputDir, 'companies');
const rawDir = path.join(outputDir, 'raw-http');
const progressPath = path.join(outputDir, 'progress-http.jsonl');
const summaryPath = path.join(outputDir, 'summary.json');
mkdirSync(companyDir, { recursive: true });
mkdirSync(rawDir, { recursive: true });

let maxQueries = Number.POSITIVE_INFINITY;
for (let index = 2; index < process.argv.length; index += 1) {
  if (process.argv[index] === '--max-queries') maxQueries = Number(process.argv[++index]);
}
if (!(maxQueries > 0)) throw new Error('--max-queries 必须是正数');

const compact = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const normalize = (value) => compact(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
const genericTokens = new Set(['the', 'and', 'company', 'limited', 'ltd', 'inc', 'group', 'corp', 'corporation', 'marketing', 'services', 'solutions', 'promotional', 'promotions', 'products', 'merchandise', 'branding', 'brands', 'brand', 'gifts', 'gift', 'uk', 'canada']);
const atomicJson = (file, value) => {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temp, file);
};
const readJson = (file) => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; } };
const event = (value) => appendFileSync(progressPath, `${JSON.stringify({ at: new Date().toISOString(), ...value })}\n`);

function decodeHtml(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…' };
  return String(value || '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseSearchHtml(html) {
  if (/anomaly-modal|bots use DuckDuckGo|verify you are human|captcha challenge/i.test(html)) throw new Error('DuckDuckGo captcha/block page');
  const results = [];
  const blocks = html.split(/<div[^>]+class="[^"]*result(?:\s|__)[^"]*"[^>]*>/i).slice(1);
  for (const block of blocks.slice(0, 5)) {
    const anchor = block.match(/<a[^>]+class="[^"]*result__a[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i)
      || block.match(/<a[^>]+href="([^"]+)"[^>]+class="[^"]*result__a[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    if (!anchor) continue;
    let url = decodeHtml(anchor[1]);
    if (url.startsWith('//')) url = `https:${url}`;
    if (/duckduckgo\.com\/l\//i.test(url)) {
      try {
        url = new URL(url).searchParams.get('uddg') || url;
      } catch {}
    }
    if (!/^https?:\/\//i.test(url) || /duckduckgo\.com\/l\//i.test(url)) continue;
    const description = block.match(/<a[^>]+class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/i)?.[1]
      || block.match(/<div[^>]+class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1]
      || '';
    results.push({ title: decodeHtml(anchor[2]), url, description: decodeHtml(description), position: results.length + 1 });
  }
  if (!results.length && !/No results\.|result--no-result|links_main/i.test(html)) throw new Error('DuckDuckGo result structure unavailable');
  return results;
}

function fetchSearch(query) {
  return new Promise((resolve) => {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const child = spawn('curl', ['-L', '--silent', '--show-error', '--compressed', '--connect-timeout', '7', '--max-time', '20', '--user-agent', 'Mozilla/5.0 (compatible; WischosResearch/1.0)', url], {
      cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
    });
    const chunks = [];
    let stderr = '';
    child.stdout.on('data', (chunk) => chunks.push(chunk));
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => resolve({ code, html: Buffer.concat(chunks).toString('utf8'), error: compact(stderr) }));
  });
}

function hostMatches(url, domain) {
  if (!domain) return true;
  try { const host = new URL(url).hostname.toLowerCase(); return host === domain || host.endsWith(`.${domain}`); } catch { return false; }
}
function identityMatches(company, source) {
  const haystack = normalize(`${source.title} ${source.description} ${source.url}`);
  const companyName = company.name || company.company;
  const phrase = normalize(companyName);
  if (phrase.length >= 4 && haystack.includes(phrase)) return true;
  const all = normalize(companyName).split(' ').filter(Boolean);
  const tokens = all.filter((token) => token.length > 2 && !genericTokens.has(token));
  const useful = tokens.length ? tokens : all.filter((token) => token.length > 1);
  const matched = useful.filter((token) => haystack.includes(token)).length;
  return useful.length > 0 && matched >= Math.max(1, Math.ceil(useful.length * 0.6));
}

function assess(company, task, sources) {
  const matched = sources.filter((source) => hostMatches(source.url, task.targetDomain) && identityMatches(company, source));
  const isCustoms = task.family === 'customs';
  const isCanadaImportYeti = company.country_detection?.value === 'Canada' && task.platform === 'importyeti';
  return {
    assessment: matched.length ? 'candidate_hit_needs_verification' : 'no_public_search_match',
    status_zh: matched.length ? (isCustoms ? '有记录（搜索摘要候选，待核验）' : '有候选证据（待核验）') : (isCustoms ? '无公开记录（本次定向搜索未命中）' : '未发现公开候选证据'),
    matched_source_count: matched.length,
    matched_sources: matched,
    negative_inference_allowed: false,
    grading_effect: matched.length ? 'positive_candidate_only_pending_verification' : 'neutral',
    canada_importyeti_rule_applied: isCanadaImportYeti,
    interpretation: isCanadaImportYeti
      ? (matched.length ? '仅可作为该加拿大公司存在美国相关货运足迹的正向候选证据；核验后方可引用。' : 'ImportYeti 仅覆盖美国海关数据；未命中不得推断该加拿大公司进口少、未进口或采购能力弱。')
      : (matched.length ? '搜索摘要只构成候选线索，需核验公司身份和事实后方可引用。' : '公开搜索未命中不等于现实中不存在，不作为单独降级依据。'),
  };
}

function refresh(evidence, tasks) {
  evidence.planned_queries = tasks.length;
  const active = tasks.map((task) => evidence.queries?.[task.key]).filter(Boolean);
  evidence.completed_queries = active.filter((query) => query.run_status === 'completed').length;
  evidence.failed_queries = active.filter((query) => query.run_status === 'failed').length;
}

const states = new Map();
const jobs = [];
for (const planned of plan) {
  const file = path.join(companyDir, `${planned.slug}.json`);
  const evidence = readJson(file) || {
    schema_version: '1.0', updated_at: new Date().toISOString(),
    company: { id: planned.id, slug: planned.slug, name: planned.company, location: planned.location, country_detection: planned.country_detection, gate1: planned.gate1 },
    policy: { raw_web_content_is_untrusted: true, search_snippets_require_source_verification: true, no_public_search_match_is_not_proof_of_absence: true },
    queries: {},
  };
  refresh(evidence, planned.tasks);
  states.set(planned.slug, { planned, evidence, file });
  for (let index = 0; index < planned.tasks.length; index += 1) {
    const task = planned.tasks[index];
    const existing = evidence.queries?.[task.key];
    const redoHttp = existing?.run_status === 'completed' && String(existing.raw_file || '').includes('/raw-http/');
    if (existing?.run_status === 'completed' && !redoHttp) continue;
    jobs.push({ planned, task, index, evidence, file });
  }
}
const selectedJobs = jobs.slice(0, maxQueries);

function writeSummary() {
  const evidence = [...states.values()].map((state) => state.evidence);
  atomicJson(summaryPath, {
    updated_at: new Date().toISOString(), companies_total: evidence.length,
    companies_complete: evidence.filter((item) => item.completed_queries + item.failed_queries >= item.planned_queries).length,
    queries_planned: evidence.reduce((sum, item) => sum + item.planned_queries, 0),
    queries_complete: evidence.reduce((sum, item) => sum + item.completed_queries, 0),
    queries_failed: evidence.reduce((sum, item) => sum + item.failed_queries, 0),
    canada_companies: evidence.filter((item) => item.company.country_detection?.value === 'Canada').length,
  });
}

let cursor = 0;
let completed = 0;
let failures = 0;
async function worker() {
  while (cursor < selectedJobs.length) {
    const job = selectedJobs[cursor++];
    const result = await fetchSearch(job.task.query);
    try {
      if (result.code !== 0) throw new Error(result.error || `curl exit=${result.code}`);
      const sources = parseSearchHtml(result.html);
      const assessment = assess(job.planned, job.task, sources);
      const rawFile = path.join(rawDir, job.planned.slug, `${String(job.index + 1).padStart(2, '0')}-${job.task.key}.json`);
      atomicJson(rawFile, { source: 'duckduckgo-html-fallback', query: job.task.query, sources });
      job.evidence.queries[job.task.key] = {
        ...job.task, searched_at: new Date().toISOString(), run_status: 'completed',
        raw_file: path.relative(root, rawFile), result_count: sources.length, ...assessment, sources,
      };
      event({ event: 'query_ok', slug: job.planned.slug, key: job.task.key, result_count: sources.length });
    } catch (error) {
      failures += 1;
      job.evidence.queries[job.task.key] = {
        ...job.task, searched_at: new Date().toISOString(), run_status: 'failed', assessment: 'unavailable', status_zh: '无法访问',
        negative_inference_allowed: false, grading_effect: 'neutral', error: error.message, sources: [],
      };
      event({ event: 'query_failed', slug: job.planned.slug, key: job.task.key, error: error.message });
    }
    job.evidence.updated_at = new Date().toISOString();
    refresh(job.evidence, job.planned.tasks);
    atomicJson(job.file, job.evidence);
    completed += 1;
    if (completed % 25 === 0 || completed === selectedJobs.length) {
      writeSummary();
      process.stdout.write(`external-http ${completed}/${selectedJobs.length} failures=${failures}\n`);
    }
  }
}

event({ event: 'run_start', selected_queries: selectedJobs.length, remaining_before_run: jobs.length });
await Promise.all(Array.from({ length: 3 }, () => worker()));
for (const state of states.values()) refresh(state.evidence, state.planned.tasks);
writeSummary();
event({ event: 'run_done', selected_queries: selectedJobs.length, failures });
if (failures) process.exitCode = 2;
