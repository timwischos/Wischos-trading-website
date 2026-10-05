#!/usr/bin/env node

/**
 * Offline, evidence-only customer analysis for the LinkedIn company batch.
 *
 * Inputs (no network access):
 *   - gate1-results.json
 *   - search/, search-v1/, search-alt/
 *   - selected-pages-manifest.json (URL provenance only)
 *   - key-pages/<company id>/*.md
 *
 * Outputs:
 *   - local-analysis/companies/<slug>.json
 *   - local-analysis/companies.json
 *   - local-analysis/decision-summary.json
 *   - local-analysis/run-summary.json
 *
 * The classifier is deliberately conservative. It extracts explicit evidence,
 * labels hypotheses as inference, and records missing research as unknown rather
 * than converting an absent local file into a negative fact.
 */

import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const DEFAULT_BATCH = '.firecrawl/linkedin-company-batch-2026-08-13';
const VERSION = '1.0.0';
const MAX_PAGE_BYTES = 500_000;

const ROLE_VALUES = new Set([
  'End buyer', 'Dealer/Decorator', 'Distributor/Reseller', 'Importer/Trader',
  'Brand owner', 'Platform/Company store', 'Manufacturer/OEM', 'Service agency', 'Unknown',
]);
const GRADE_VALUES = new Set(['A', 'B', 'C', 'D', 'Reject']);

function parseArgs(argv) {
  const options = { batchDir: DEFAULT_BATCH, outputDir: '', ids: null, limit: null };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    const next = argv[index + 1];
    if (value === '--batch-dir' && next) options.batchDir = next, index += 1;
    else if (value === '--output-dir' && next) options.outputDir = next, index += 1;
    else if (value === '--ids' && next) {
      options.ids = new Set(next.split(',').map((item) => Number(item.trim())).filter(Number.isFinite));
      index += 1;
    } else if (value === '--limit' && next) options.limit = Math.max(0, Number(next)), index += 1;
    else if (value === '--help') {
      process.stdout.write(
        'Usage: node scripts/analyze-linkedin-company-local-evidence.mjs ' +
        '[--batch-dir PATH] [--output-dir PATH] [--ids 1,2,3] [--limit N]\n',
      );
      process.exit(0);
    } else throw new Error(`Unknown or incomplete argument: ${value}`);
  }
  return options;
}

function resolveFromRoot(root, value) {
  return path.isAbsolute(value) ? value : path.join(root, value);
}

function readJson(file, fallback = null) {
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return fallback; }
}

function atomicJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp-${process.pid}`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporary, file);
}

function readTextCapped(file, cap = MAX_PAGE_BYTES) {
  const size = statSync(file).size;
  if (size <= cap) return readFileSync(file, 'utf8');
  const headSize = Math.floor(cap * 0.86);
  const tailSize = cap - headSize;
  const descriptor = openSync(file, 'r');
  try {
    const head = Buffer.alloc(headSize);
    const tail = Buffer.alloc(tailSize);
    readSync(descriptor, head, 0, headSize, 0);
    readSync(descriptor, tail, 0, tailSize, Math.max(0, size - tailSize));
    return `${head.toString('utf8')}\n\n[...本地证据文件过长，中段未载入...]\n\n${tail.toString('utf8')}`;
  } finally { closeSync(descriptor); }
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function plain(value) {
  return normalize(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function safeUrl(value) {
  try { return new URL(value).href; } catch { return ''; }
}

function hostname(value) {
  try { return new URL(value).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
}

function sameSite(left, right) {
  const a = hostname(left);
  const b = hostname(right);
  return Boolean(a && b && (a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`)));
}

function slugify(value) {
  return normalize(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'company';
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== '' && value !== null && value !== undefined))];
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, Math.round(Number(value) || 0)));
}

function sumBreakdown(breakdown) {
  return clamp(Object.values(breakdown).reduce((sum, value) => sum + value, 0), 0, 100);
}

function firstHeading(text, fallback) {
  const match = text.match(/^#\s+(.+)$/m);
  return plain(match?.[1] || fallback).slice(0, 240);
}

function excerpt(text, regex, width = 420) {
  const cleaned = plain(text);
  const match = cleaned.match(regex);
  if (!match || match.index === undefined) return cleaned.slice(0, width);
  const start = Math.max(0, match.index - Math.floor(width * 0.3));
  return cleaned.slice(start, start + width).trim();
}

function sourcePriority(source) {
  if (source.type === 'key-page' && source.official) return 50;
  if (source.type === 'gate1-homepage' && source.official) return 45;
  if (source.type === 'search' && source.official) return 40;
  if (/linkedin\.com/.test(source.url)) return 20;
  return 10;
}

const PATTERNS = {
  promo: /\b(promotional products?|promotional merchandise|branded merchandise|branded products?|corporate merchandise|customi[sz]ed merchandise|merchandise partner|corporate products?|swag|giveaways?)\b/i,
  corporateGift: /\b(corporate gifts?|business gifts?|executive gifts?|employee gifts?|client gifts?|gifting solutions?)\b/i,
  giftSet: /\b(gift sets?|gift boxes?|welcome packs?|onboarding kits?|executive sets?|presentation sets?|curated kits?|merch(?:andise)? packs?)\b/i,
  awards: /\b(awards?|recognition|troph(?:y|ies)|medals?|medallions?|lapel pins?|badges?)\b/i,
  metal: /\b(metal|metallic|stainless steel|aluminium|aluminum|brass|zinc alloy|titanium|copper|pewter)\b/i,
  pen: /\b(pens?|writing instruments?|rollerballs?|ballpoints?)\b/i,
  drinkware: /\b(drinkware|tumblers?|bottles?|travel mugs?|vacuum flasks?|cups?|barware)\b/i,
  desk: /\b(desk accessories|desktop|office accessories|card holders?|business card cases?|notebooks?|journals?)\b/i,
  edc: /\b(edc|everyday carry|keyrings?|keychains?|multi[ -]?tools?|pocket tools?|torches?|flashlights?|knives)\b/i,
  technology: /\b(technology|tech accessories|power banks?|chargers?|usb|wireless charging|speakers?|headphones?)\b/i,
  apparel: /\b(apparel|clothing|uniforms?|workwear|t-shirts?|hoodies?|caps?|hats?|polos?|sportswear)\b/i,
  bags: /\b(bags?|backpacks?|totes?|luggage|briefcases?)\b/i,
  print: /\b(printing|print services?|screen print(?:ing)?|signage|graphics?|business cards?|brochures?|stationery)\b/i,
  decoration: /\b(embroidery|engraving|laser engraving|heat transfer|screen print(?:ing)?|pad print(?:ing)?|decoration services?)\b/i,
  food: /\b(food hampers?|gift baskets?|confectionery|chocolates?|biscuits?|bakery|wine hampers?)\b/i,
  sustainable: /\b(sustainable|sustainability|eco[ -]?friendly|recycled|reusable|b corp|carbon neutral)\b/i,
  custom: /\b(custom(?:ised|ized)?|bespoke|made to order|private label|oem|custom design|custom shape|custom mould|custom mold)\b/i,
  catalogue: /\b(catalogue|catalog|online shop|product range|thousands of products|company stores?)\b/i,
  premium: /\b(premium|luxury|high[ -]?end|quality[ -]?first|curated|executive|craftsmanship)\b/i,
  budget: /\b(cheapest|lowest price|low[ -]?cost|budget|best price|price match|cheap)\b/i,
  rush: /\b(same[ -]?day|next[ -]?day|rush orders?|quick turnaround|fast turnaround|24[ -]?hour|local fulfil(?:l)?ment)\b/i,
  importer: /\b(importers?|direct import|import(?:ed|ing) from|overseas sourcing|global sourcing|source globally|source from (?:asia|china|overseas))\b/i,
  sourcing: /\b(sourcing|supplier network|vendor network|supply chain|procurement|buying team)\b/i,
  inHouseSourcing: /\b(in[ -]?house sourcing|own sourcing office|china office|asia office|global sourcing team)\b/i,
  distributor: /\b(distributors?|resellers?|wholesale|trade only|promotional consultant|merchandise agency)\b/i,
  platform: /\b(company store|online portal|rewards platform|loyalty platform|recognition platform|points catalogue|merchandise platform)\b/i,
  manufacturer: /\b(we manufacture|manufacturer of|our factory|manufacturing facility|made in our factory|factory direct)\b/i,
  agency: /\b(marketing agency|branding agency|creative agency|event management|advertising agency|brand activation)\b/i,
  localOnly: /\b(?:only|exclusively|100%)[^.]{0,35}\b(?:locally made|local made|made in (?:canada|britain|the uk|australia)|handmade|artisan)\b|\b(?:locally made|local made|made in (?:canada|britain|the uk|australia)|handmade|artisan)[^.]{0,35}\b(?:only|exclusively|100%)\b/i,
  localMade: /\b(locally made|local made|made in (?:canada|britain|the uk|australia)|handmade|artisan)\b/i,
  corporateClients: /\b(corporate clients?|enterprise clients?|business clients?|global brands?|leading brands?|employee engagement|staff recognition)\b/i,
  clientsCases: /\b(case studies?|our clients?|client stories|our work|portfolio|projects?)\b/i,
  association: /\b(PPAI|PPPC|BPMA|ASI|SAGE|APPA)\b/i,
};

const PRODUCT_DEFINITIONS = [
  { category: '金属礼品/金属定制件', re: PATTERNS.metal, metal: 'Yes', material: '证据明确提及金属；具体牌号待确认' },
  { category: '奖项、奖牌、徽章与认可用品', re: PATTERNS.awards, metal: 'Partial', material: '可能含金属、水晶、亚克力等；以具体产品页为准' },
  { category: '礼品套装与入职礼包', re: PATTERNS.giftSet, metal: 'Unknown', material: '待确认' },
  { category: '书写工具', re: PATTERNS.pen, metal: 'Unknown', material: '待确认；“pen”本身不等于金属笔' },
  { category: '饮具', re: PATTERNS.drinkware, metal: 'Unknown', material: '待确认；若同一证据明确提及不锈钢/金属则为部分或有' },
  { category: '桌面与办公用品', re: PATTERNS.desk, metal: 'Unknown', material: '待确认' },
  { category: 'EDC、钥匙扣与工具', re: PATTERNS.edc, metal: 'Partial', material: '常见为金属/混合材质，具体材质待确认' },
  { category: '科技配件', re: PATTERNS.technology, metal: 'Unknown', material: '待确认' },
  { category: '服装与纺织品', re: PATTERNS.apparel, metal: 'No', material: '纺织品为主' },
  { category: '箱包', re: PATTERNS.bags, metal: 'No', material: '纺织/皮革/合成材料为主，配件材质待确认' },
  { category: '印刷、标识与装饰服务', re: PATTERNS.print, metal: 'No', material: '纸张/油墨/装饰服务为主' },
  { category: '食品礼篮', re: PATTERNS.food, metal: 'No', material: '食品及包装' },
];

function loadSelectedPages(batchDir) {
  const map = new Map();
  const manifest = readJson(path.join(batchDir, 'selected-pages-manifest.json'), []);
  for (const item of Array.isArray(manifest) ? manifest : []) map.set(Number(item.id), item.pages || []);
  const directory = path.join(batchDir, 'selected-pages');
  if (existsSync(directory)) {
    for (const filename of readdirSync(directory).filter((name) => name.endsWith('.json'))) {
      const item = readJson(path.join(directory, filename));
      if (item?.id && !map.has(Number(item.id))) map.set(Number(item.id), item.pages || []);
    }
  }
  return map;
}

function loadSearchSources(batchDir, company) {
  const byUrl = new Map();
  const directories = ['search', 'search-v1', 'search-alt'];
  for (const directory of directories) {
    const file = path.join(batchDir, directory, `${company.slug}.json`);
    const parsed = existsSync(file) ? readJson(file) : null;
    const web = parsed?.data?.web;
    if (!Array.isArray(web)) continue;
    for (const item of web) {
      const url = safeUrl(item.url);
      if (!url) continue;
      const current = byUrl.get(url);
      const candidate = { url, title: plain(item.title), text: String(item.description || ''), file };
      if (!current || candidate.text.length > current.text.length) byUrl.set(url, candidate);
    }
  }
  for (const item of company.search_sources || []) {
    const url = safeUrl(item.url);
    if (!url) continue;
    const current = byUrl.get(url);
    const candidate = { url, title: plain(item.title), text: String(item.description || ''), file: path.join(batchDir, 'gate1-results.json') };
    if (!current || candidate.text.length > current.text.length) byUrl.set(url, candidate);
  }
  const externalFile = path.join(batchDir, 'external-evidence', 'companies', `${company.slug}.json`);
  const external = existsSync(externalFile) ? readJson(externalFile) : null;
  for (const query of Object.values(external?.queries || {})) {
    for (const item of query?.matched_sources || []) {
      const url = safeUrl(item.url);
      if (!url) continue;
      const current = byUrl.get(url);
      const candidate = {
        url,
        title: plain(item.title),
        text: String(item.description || ''),
        file: externalFile,
      };
      if (!current || candidate.text.length > current.text.length) byUrl.set(url, candidate);
    }
  }
  return [...byUrl.values()];
}

function locateKeyPageDirectory(batchDir, id) {
  const names = [String(id).padStart(3, '0'), String(id)];
  for (const rootName of ['key-pages', 'key-page', 'site']) {
    for (const name of names) {
      const directory = path.join(batchDir, rootName, name);
      if (existsSync(directory) && statSync(directory).isDirectory()) return directory;
    }
  }
  return '';
}

function buildSources(batchDir, company, selectedPageMap) {
  const sources = [];
  const officialUrl = safeUrl(company.official_url);
  let sequence = 0;
  const add = ({ type, url, title, text, file, pageType = '' }) => {
    const cleaned = String(text || '').trim();
    if (!cleaned) return;
    sequence += 1;
    sources.push({
      id: `S${String(sequence).padStart(2, '0')}`,
      type,
      url: safeUrl(url),
      title: plain(title) || pageType || '未命名来源',
      text: cleaned,
      local_file: path.relative(batchDir, file),
      page_type: pageType,
      official: Boolean(officialUrl && sameSite(url, officialUrl)),
    });
  };

  if (company.homepage_evidence) add({
    type: 'gate1-homepage', url: officialUrl, title: company.official_title || company.company,
    text: company.homepage_evidence, file: path.join(batchDir, 'gate1-results.json'), pageType: 'home',
  });

  add({
    type: 'gate1-metadata', url: '', title: `${company.company} — 输入线索元数据`,
    text: [
      `Company: ${company.company || 'Unknown'}`,
      `Location: ${company.location || 'Unknown'}`,
      `LinkedIn industry: ${company.industry || 'Unknown'}`,
      `LinkedIn positioning: ${company.linkedin_positioning || 'Unknown'}`,
      `LinkedIn followers: ${company.followers || 'Unknown'}`,
      `LinkedIn notes: ${company.linkedin_notes || 'Unknown'}`,
    ].join('\n'),
    file: path.join(batchDir, 'gate1-results.json'), pageType: 'input-metadata',
  });

  for (const item of loadSearchSources(batchDir, company)) add({ type: 'search', ...item });

  const keyDirectory = locateKeyPageDirectory(batchDir, company.id);
  const selected = selectedPageMap.get(Number(company.id)) || [];
  if (keyDirectory) {
    const files = readdirSync(keyDirectory).filter((name) => /\.(?:md|txt)$/i.test(name)).sort();
    for (const filename of files) {
      const fullPath = path.join(keyDirectory, filename);
      const indexMatch = filename.match(/^(\d+)/);
      const pageIndex = indexMatch ? Number(indexMatch[1]) - 1 : -1;
      const selectedPage = selected[pageIndex] || {};
      const pageType = selectedPage.type || filename.replace(/^\d+-/, '').replace(/\.[^.]+$/, '');
      const text = readTextCapped(fullPath);
      add({
        type: 'key-page', url: selectedPage.url || (pageType === 'home' ? officialUrl : ''),
        title: firstHeading(text, `${company.company} ${pageType}`), text, file: fullPath, pageType,
      });
    }
  }

  return sources.sort((left, right) => sourcePriority(right) - sourcePriority(left));
}

function makeEvidenceTools(sources) {
  const used = new Map();
  const find = (regex, { official = false, thirdParty = true } = {}) => sources.find((source) => {
    if (official && !source.official) return false;
    if (!thirdParty && !source.official) return false;
    regex.lastIndex = 0;
    return regex.test(source.text) || regex.test(source.title);
  });
  const all = (regex, options = {}) => sources.filter((source) => {
    if (options.official && !source.official) return false;
    regex.lastIndex = 0;
    return regex.test(source.text) || regex.test(source.title);
  });
  const cite = (source, supports, regex = /./) => {
    if (!source) return '';
    const current = used.get(source.id) || { source, supports: new Set(), regex };
    current.supports.add(supports);
    if (String(regex) !== String(/./)) current.regex = regex;
    used.set(source.id, current);
    return source.id;
  };
  const has = (regex, options = {}) => Boolean(find(regex, options));
  return { find, all, cite, has, used };
}

const GENERIC_COMPANY_TOKENS = new Set([
  'limited', 'ltd', 'inc', 'incorporated', 'company', 'group', 'corp', 'corporation', 'co',
  'the', 'and', 'of', 'marketing', 'promotions', 'promotional', 'products', 'merchandise',
  'branding', 'brand', 'solutions', 'services', 'international', 'global', 'agency', 'creative',
]);

function companyTokens(company) {
  return normalize(company).toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ')
    .filter((token) => token.length > 2 && !GENERIC_COMPANY_TOKENS.has(token));
}

function verifyWebsite(company, sources, tools) {
  const url = safeUrl(company.official_url);
  if (!url) return { verified: false, reason: '未提供可解析的独立官网 URL', refs: [] };
  const official = sources.filter((source) => source.official);
  if (!official.length) return { verified: false, reason: '本地证据集中没有与候选官网同域的页面内容', refs: [] };
  const tokens = companyTokens(company.company);
  const domain = hostname(url).replace(/[^a-z0-9]/g, '');
  const matching = official.find((source) => {
    const haystack = `${plain(source.title)} ${plain(source.text).slice(0, 5000)}`.toLowerCase();
    return tokens.some((token) => haystack.includes(token) || domain.includes(token));
  });
  const relevant = matching || official.find((source) => PATTERNS.promo.test(source.text) || PATTERNS.corporateGift.test(source.text));
  if (!relevant) return { verified: false, reason: '同域页面已存在，但公司名称/业务一致性证据不足', refs: [] };
  return {
    verified: true,
    reason: `同域页面的公司名称或业务描述与线索一致（${hostname(url)}）`,
    refs: [tools.cite(relevant, '官网身份匹配', /./)],
  };
}

function inferCountry(company) {
  const text = `${company.country || ''} ${company.location || ''} ${hostname(company.official_url)}`.toLowerCase();
  const pairs = [
    [/\bcanada\b|ontario|quebec|alberta|manitoba|saskatchewan|nova scotia|british columbia|toronto|vancouver|montreal|calgary|ottawa|winnipeg|mississauga|edmonton|halifax|\.ca$/, 'Canada'],
    [/united kingdom|\buk\b|england|scotland|wales|northern ireland|london|manchester|glasgow|swansea|leeds|liverpool|bristol|sheffield|edinburgh|berkshire|surrey|essex|kent|hampshire|cheshire|yorkshire|midlands|\.co\.uk$/, 'United Kingdom'],
    [/australia|\b(?:nsw|vic|qld|wa|sa|tas|act)\b|\.com\.au$/, 'Australia'],
    [/new zealand|\bnz\b|\.co\.nz$/, 'New Zealand'],
    [/united arab emirates|\buae\b|dubai|abu dhabi|\.ae$/, 'UAE'],
    [/ireland|\.ie$/, 'Ireland'],
    [/germany|deutschland|\.de$/, 'Germany'],
    [/france|\.fr$/, 'France'],
    [/netherlands|\.nl$/, 'Netherlands'],
  ];
  return pairs.find(([regex]) => regex.test(text))?.[1] || 'Unknown';
}

function extractYear(sources, tools) {
  const regex = /\b(?:founded|established|since|operating since)\D{0,24}((?:18|19|20)\d{2})\b/i;
  const source = tools.find(regex, { official: true }) || tools.find(regex);
  const match = source?.text.match(regex);
  if (!match) return { value: null, refs: [] };
  const year = Number(match[1]);
  if (year < 1800 || year > new Date().getFullYear()) return { value: null, refs: [] };
  return { value: year, refs: [tools.cite(source, '成立年份', regex)] };
}

function extractEmployeeRange(sources, tools) {
  const regex = /\b(\d{1,5}\s*[-–]\s*\d{1,5}|\d{1,5}\+?)\s+employees?\b/i;
  const source = tools.find(regex);
  const match = source?.text.match(regex) || source?.title.match(regex);
  if (!match) return { value: 'Unknown', refs: [] };
  return { value: normalize(match[1]), refs: [tools.cite(source, '员工规模', regex)] };
}

function employeeLowerBound(value) {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : null;
}

function extractProductLines(tools) {
  const products = [];
  for (const definition of PRODUCT_DEFINITIONS) {
    const source = tools.find(definition.re, { official: true });
    if (!source) continue;
    let metalPresence = definition.metal;
    let materials = definition.material;
    if (['书写工具', '饮具', '桌面与办公用品', '礼品套装与入职礼包'].includes(definition.category)) {
      const segment = excerpt(source.text, definition.re, 520);
      if (PATTERNS.metal.test(segment)) {
        metalPresence = 'Partial';
        materials = '同一证据片段提及金属/不锈钢等；各 SKU 材质待确认';
      }
    }
    products.push({
      category: definition.category,
      materials,
      metal_presence: metalPresence,
      procurement_model: tools.has(PATTERNS.custom, { official: true }) ? '按需定制/目录采购（具体上游模式待确认）' : 'Unknown',
      evidence: excerpt(source.text, definition.re, 300),
      evidence_refs: [tools.cite(source, `产品线：${definition.category}`, definition.re)],
    });
  }
  return products.slice(0, 8);
}

function inferRole(tools) {
  const rules = [
    ['Manufacturer/OEM', PATTERNS.manufacturer, '官网明确使用制造商/工厂表述'],
    ['Importer/Trader', PATTERNS.importer, '官网明确使用进口或海外采购表述'],
    ['Platform/Company store', PATTERNS.platform, '官网明确为公司商店、奖励或商品平台'],
    ['Distributor/Reseller', /promotional products?|promotional merchandise|branded merchandise|corporate gifts?|business gifts?|merchandise agency|distributors?|resellers?|wholesale/i, '向企业客户提供促销品、品牌商品或企业礼品'],
    ['Dealer/Decorator', /embroidery|screen print(?:ing)?|engraving|decoration services?/i, '以本地装饰、印刷或刻印服务为主要明确信号'],
    ['Service agency', PATTERNS.agency, '主要证据指向营销、创意或活动服务'],
  ];
  for (const [role, regex, explanation] of rules) {
    const source = tools.find(regex, { official: true });
    if (source) return { role, explanation, refs: [tools.cite(source, '供应链角色', regex)] };
  }
  return { role: 'Unknown', explanation: '现有本地证据不足以确认其采购和转售位置', refs: [] };
}

function inferCoreBusiness(tools) {
  const candidates = [
    [PATTERNS.promo, '促销品与品牌商品的选品、定制及企业客户服务'],
    [PATTERNS.corporateGift, '企业礼赠与商务礼品方案'],
    [PATTERNS.awards, '奖项、认可与纪念用品'],
    [PATTERNS.apparel, '服装、制服或纺织类商品/装饰服务'],
    [PATTERNS.print, '印刷、标识或图文服务'],
    [PATTERNS.food, '食品礼篮或食品礼赠'],
    [PATTERNS.agency, '营销、品牌或活动代理服务'],
  ];
  const matches = [];
  const refs = [];
  for (const [regex, label] of candidates) {
    const source = tools.find(regex, { official: true });
    if (!source) continue;
    matches.push(label);
    refs.push(tools.cite(source, `核心业务：${label}`, regex));
    if (matches.length === 2) break;
  }
  return { text: matches.length ? `${matches.join('；')}。` : 'Unknown（现有官网证据不足）', refs: unique(refs) };
}

function extractContacts(company, sources, tools) {
  const contacts = [];
  const seen = new Set();
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  const phoneRegex = /(?:\+?\d[\d().\s-]{7,}\d)/g;

  for (const source of sources.filter((item) => item.official)) {
    const emails = source.text.match(emailRegex) || [];
    const phones = (source.text.match(phoneRegex) || [])
      .map((phone) => normalize(phone))
      .filter((phone) => {
        const digits = phone.replace(/\D/g, '');
        return phone.length <= 30 && digits.length >= 9 && digits.length <= 15 && !/^\d{4}\s*[-/]\s*\d{2}\s*[-/]\s*\d{2}$/.test(phone);
      });
    for (const email of unique(emails.map((value) => value.toLowerCase())).slice(0, 3)) {
      if (seen.has(`email:${email}`)) continue;
      seen.add(`email:${email}`);
      contacts.push({
        name: '公司通用联系渠道', title: 'Generic company contact', decision_power: 'Unknown',
        email, phone: phones[0] || '', linkedin_url: '', evidence_strength: 'Strong', source_url: source.url,
        contact_channel: '通用邮箱', verification: '官网公开；仅验证来源，未做 SMTP 有效性验证',
        evidence_refs: [tools.cite(source, '官网联系渠道', emailRegex)],
      });
    }
    if (!emails.length && phones[0] && !seen.has(`phone:${phones[0]}`)) {
      seen.add(`phone:${phones[0]}`);
      contacts.push({
        name: '公司通用联系渠道', title: 'Generic company contact', decision_power: 'Unknown', email: '',
        phone: phones[0], linkedin_url: '', evidence_strength: 'Strong', source_url: source.url,
        contact_channel: '电话', verification: '官网公开；未做电话有效性验证',
        evidence_refs: [tools.cite(source, '官网联系渠道', phoneRegex)],
      });
    }
  }

  for (const source of sources.filter((item) => /linkedin\.com\/in\//i.test(item.url))) {
    const title = plain(source.title);
    const parts = title.split(/\s[-–|]\s/).map((item) => item.trim()).filter(Boolean);
    const name = parts[0];
    if (!name || name.split(/\s+/).length < 2 || name.length > 80 || seen.has(`name:${name.toLowerCase()}`)) continue;
    const jobTitle = parts.slice(1).join(' — ') || '职位待确认';
    const decision = /owner|founder|president|managing director|chief|ceo|director/i.test(jobTitle)
      ? 'High' : /procurement|sourcing|buyer|purchasing|operations|sales manager|account manager/i.test(jobTitle) ? 'Medium' : 'Unknown';
    seen.add(`name:${name.toLowerCase()}`);
    contacts.push({
      name, title: jobTitle, decision_power: decision, email: '', phone: '', linkedin_url: source.url,
      evidence_strength: 'Weak', source_url: source.url, contact_channel: 'LinkedIn',
      verification: '仅来自未登录搜索摘要，unverified',
      evidence_refs: [tools.cite(source, '潜在联系人（未验证 LinkedIn 摘要）', /./)],
    });
  }

  return contacts.sort((left, right) => {
    const decision = { High: 3, Medium: 2, Unknown: 1 };
    const strength = { Strong: 3, Medium: 2, Weak: 1 };
    return (decision[right.decision_power] - decision[left.decision_power]) || (strength[right.evidence_strength] - strength[left.evidence_strength]);
  }).slice(0, 8);
}

function evidenceCoverage(sources) {
  const keyPages = sources.filter((source) => source.type === 'key-page');
  const types = unique(keyPages.map((source) => source.page_type).filter(Boolean));
  const count = keyPages.length;
  const level = count >= 5 ? 'full' : count >= 3 ? 'adequate' : count >= 1 ? 'limited' : 'search-only';
  return {
    level,
    key_page_count: count,
    key_page_types: types,
    search_source_count: sources.filter((source) => source.type === 'search').length,
    has_homepage_content: sources.some((source) => source.official && source.page_type === 'home'),
    caveat: count ? '结论基于本地已抓取关键页；未出现的信息仍可能存在于未抓页面。' : '尚无关键页正文；本次结论仅为搜索/Gate 1 证据下的保守初判。',
  };
}

function classifyGate1(company, website, tools) {
  if (!website.verified) return { result: 'Reject', reason: website.reason, refs: website.refs };
  const promo = tools.has(PATTERNS.promo, { official: true }) || tools.has(PATTERNS.corporateGift, { official: true });
  const localOnlySource = tools.find(PATTERNS.localOnly, { official: true });
  if (localOnlySource) return {
    result: 'Reject', reason: '官网明确显示仅限本地制造/手工艺供应，构成中国产品供货硬冲突',
    refs: [tools.cite(localOnlySource, 'Gate 1：本地制造硬限制', PATTERNS.localOnly)],
  };
  const food = tools.find(PATTERNS.food, { official: true });
  if (food && !promo) return {
    result: 'Reject', reason: '官网主营食品礼篮，未见明确促销品或企业金属礼品业务',
    refs: [tools.cite(food, 'Gate 1：食品礼篮主业', PATTERNS.food)],
  };
  const apparel = tools.find(PATTERNS.apparel, { official: true });
  const print = tools.find(PATTERNS.print, { official: true });
  if (!promo && (apparel || print)) {
    const source = apparel || print;
    return {
      result: 'Reject', reason: '官网证据仅支持服装/印刷/本地装饰，未见明确 promotional products 业务',
      refs: [tools.cite(source, 'Gate 1：服装/印刷且无促销品证据', apparel ? PATTERNS.apparel : PATTERNS.print)],
    };
  }
  const positive = tools.find(/promotional products?|promotional merchandise|branded merchandise|corporate gifts?|business gifts?|awards?|recognition/i, { official: true });
  if (!positive) return {
    result: 'Pass', reason: '官网身份可验证，但业务匹配证据不足；保留进入 Gate 2 的 D 级证据不足判断，不作无证据淘汰', refs: website.refs,
  };
  return {
    result: 'Pass', reason: '官网可验证，且有促销品、品牌商品、企业礼赠或认可用品的明确证据',
    refs: [tools.cite(positive, 'Gate 1：匹配业务', /promotional products?|promotional merchandise|branded merchandise|corporate gifts?|business gifts?|awards?|recognition/i)],
  };
}

function productMetalSummary(productLines, tools) {
  const explicit = [];
  const candidates = [
    [PATTERNS.pen, '笔/书写工具'], [PATTERNS.drinkware, '饮具'], [PATTERNS.desk, '桌面/办公用品'],
    [PATTERNS.edc, 'EDC/钥匙扣/工具'], [PATTERNS.awards, '奖牌/徽章/认可用品'],
  ];
  for (const [regex, label] of candidates) {
    const source = tools.find(regex, { official: true });
    if (!source) continue;
    const segment = excerpt(source.text, regex, 520);
    if (PATTERNS.metal.test(segment)) explicit.push(label);
  }
  if (productLines.some((line) => line.category === '金属礼品/金属定制件')) explicit.push('官网明确提及的金属类商品');
  return unique(explicit);
}

function buildPotentialNeeds({ grade, role, tools, productLines, metalProducts }) {
  if (!['A', 'B'].includes(grade)) return [];
  const needs = [];
  const isPromo = tools.has(PATTERNS.promo, { official: true }) || tools.has(PATTERNS.corporateGift, { official: true });
  const hasSets = tools.has(PATTERNS.giftSet, { official: true });
  if (isPromo && !metalProducts.length) needs.push({
    need: '补充或测试定制金属企业礼品品类', probability: 'Medium',
    evidence: '其官网明确经营促销品/企业礼品，但当前已抓证据未明确展示金属品类；这是品类扩充假设，不是已确认询盘。',
    evidence_refs: unique(productLines.flatMap((line) => line.evidence_refs)).slice(0, 2),
  });
  if (isPromo && !hasSets) needs.push({
    need: '把现有企业礼品单品组合成计划型 executive/onboarding 套装', probability: 'Medium',
    evidence: '其业务与企业礼赠相关，但当前关键页证据未确认成套方案；需求为低风险的销售组合假设。',
    evidence_refs: [],
  });
  if (hasSets) {
    const source = tools.find(PATTERNS.giftSet, { official: true });
    needs.push({
      need: '为现有礼品套装补充金属组件或定制项目第二来源', probability: tools.has(PATTERNS.custom, { official: true }) ? 'High' : 'Medium',
      evidence: excerpt(source.text, PATTERNS.giftSet, 320),
      evidence_refs: [tools.cite(source, '潜在采购：礼品套装', PATTERNS.giftSet)],
    });
  }
  if (tools.has(PATTERNS.awards, { official: true })) {
    const source = tools.find(PATTERNS.awards, { official: true });
    needs.push({
      need: '定制金属奖牌、徽章、纪念件或认可礼品', probability: 'Medium',
      evidence: excerpt(source.text, PATTERNS.awards, 320),
      evidence_refs: [tools.cite(source, '潜在采购：认可用品', PATTERNS.awards)],
    });
  }
  if (!needs.length && role === 'Distributor/Reseller') needs.push({
    need: '计划型定制金属项目的备用供应来源', probability: 'Unknown',
    evidence: '分销商角色已识别，但本地证据没有显示具体采购计划、数量或采购频率。', evidence_refs: [],
  });
  return needs.slice(0, 4);
}

function buildPainPoints({ grade, tools, metalProducts }) {
  if (!['A', 'B'].includes(grade)) return [];
  const pains = [];
  if (tools.has(PATTERNS.catalogue, { official: true })) {
    const source = tools.find(PATTERNS.catalogue, { official: true });
    pains.push({
      pain: '目录同质化风险',
      evidence_or_inference: '官网呈现目录/在线商品模式；标准目录可能难以形成独家差异化。这是供应链推断，未发现客户公开抱怨。',
      confidence: 'Low', evidence_refs: [tools.cite(source, '痛点推断：目录模式', PATTERNS.catalogue)],
    });
  }
  if (!metalProducts.length) pains.push({
    pain: '金属高端品类可见度不足',
    evidence_or_inference: '当前已抓官网证据未明确展示金属产品；仅能视为待验证的目录空白，不能断言其实际供应链没有金属品。',
    confidence: 'Low', evidence_refs: [],
  });
  if (!tools.has(PATTERNS.giftSet, { official: true }) && (tools.has(PATTERNS.promo, { official: true }) || tools.has(PATTERNS.corporateGift, { official: true }))) {
    pains.push({
      pain: '成套 executive gift 能力待验证',
      evidence_or_inference: '已确认促销品/企业礼品业务，但本地关键页中未确认套件；可能存在从单品到套装的组合机会。',
      confidence: 'Low', evidence_refs: [],
    });
  }
  if (tools.has(PATTERNS.decoration, { official: true }) && tools.has(PATTERNS.custom, { official: true })) {
    const source = tools.find(PATTERNS.decoration, { official: true });
    pains.push({
      pain: '定制可能集中在现成品表面装饰',
      evidence_or_inference: '官网强调印刷/刺绣/刻印；是否具备改形、开模和结构定制尚待确认。',
      confidence: 'Low', evidence_refs: [tools.cite(source, '痛点推断：表面装饰', PATTERNS.decoration)],
    });
  }
  // Every sales target needs an explicit discovery hypothesis, even when the
  // public evidence does not support one of the more specific supply-chain
  // inferences above. Keep the fallback framed as an Unknown to validate in a
  // buyer conversation, never as a claimed customer problem.
  if (!pains.length) {
    const source = tools.find(PATTERNS.corporateGift, { official: true })
      || tools.find(PATTERNS.promo, { official: true })
      || tools.find(PATTERNS.awards, { official: true });
    pains.push({
      pain: '项目型供应链约束待验证',
      evidence_or_inference: '官网证据支持其企业礼赠/促销品业务，但未公开 MOQ、交期、定制工程、质检或合规安排；这是首次沟通需验证的 Unknown，不代表已发现客户抱怨。',
      confidence: 'Low',
      evidence_refs: source ? [tools.cite(source, '痛点待验证：项目型供应链约束', PATTERNS.corporateGift)] : [],
    });
  }
  return pains.slice(0, 4);
}

function buildEntryAngles({ grade, tools, metalProducts }) {
  if (!['A', 'B'].includes(grade)) return [];
  const angles = [];
  const hasSets = tools.has(PATTERNS.giftSet, { official: true });
  if (!metalProducts.length) angles.push({
    rank: angles.length + 1,
    angle: '品类扩充：计划型定制金属礼品',
    why: '已确认其企业礼赠/促销品业务，但本地已抓页面未明确展示金属品；以“补充”而非“替换现有供应商”切入。',
    product_scene: '金属笔、桌面配件、EDC、饮具、奖牌/徽章及 custom-shaped metal pieces；具体以 brief 核实。',
    risk: '未抓到不等于不存在；首次沟通必须先确认当前目录与既有供应商。',
  });
  if (!hasSets) angles.push({
    rank: angles.length + 1,
    angle: '套件化：从目录单品升级为 executive/onboarding gift set',
    why: '现有证据支持促销品或企业礼品业务，但未确认成套能力，可用组合、包装和统一定制形成项目差异。',
    product_scene: 'WGS 系列方向或金属笔+饮具/桌面件组合；MOQ 100 套、25–35 天适合提前规划项目。',
    risk: '不适合 rush/same-day 订单；无现货样品，需用规格、渲染和受控打样管理预期。',
  });
  if (tools.has(PATTERNS.custom, { official: true }) || tools.has(PATTERNS.awards, { official: true })) angles.push({
    rank: angles.length + 1,
    angle: '定制项目伙伴：超越标准目录的金属件',
    why: '官网存在 custom/bespoke 或 awards/recognition 证据，项目型需求比日常本地目录补货更符合中国定制交期。',
    product_scene: '定制形状金属件、奖牌、徽章、刻字金属笔及项目礼盒。',
    risk: '结构、材质、合规和模具成本均需询盘后确认，不承诺未知规格。',
  });
  while (angles.length < 3) angles.push({
    rank: angles.length + 1,
    angle: angles.length === 0 ? '计划型金属礼赠第二来源' : '小规模验证后再扩品',
    why: '不替代其日常本地目录供应链，先验证一个有明确时间表的定制项目。',
    product_scene: 'MOQ 100 套范围内的金属礼品套装或单一金属品类。',
    risk: '采购量、价格带和进口能力均待确认；FOB US$18–50/套未必适合低价赠品项目。',
  });
  return angles.slice(0, 3).map((item, index) => ({ ...item, rank: index + 1 }));
}

function scoreCompany({ gate1, role, tools, coverage, contacts, productLines, metalProducts, country, risks }) {
  const promo = tools.has(PATTERNS.promo, { official: true });
  const corporateGift = tools.has(PATTERNS.corporateGift, { official: true });
  const awards = tools.has(PATTERNS.awards, { official: true });
  const giftSet = tools.has(PATTERNS.giftSet, { official: true });
  const importer = tools.has(PATTERNS.importer, { official: true });
  const custom = tools.has(PATTERNS.custom, { official: true });
  const premium = tools.has(PATTERNS.premium, { official: true });
  const budget = tools.has(PATTERNS.budget, { official: true });
  const rush = tools.has(PATTERNS.rush, { official: true });
  const targetMarket = ['Canada', 'United Kingdom', 'Australia', 'UAE', 'Ireland', 'Germany', 'France', 'Netherlands'].includes(country);
  const productBreadth = productLines.length;
  const highContact = contacts.some((contact) => contact.decision_power === 'High');
  const contactable = contacts.some((contact) => contact.email || contact.phone || contact.linkedin_url);

  let riskFit = 0;
  if (rush) riskFit -= 6;
  if (budget) riskFit -= 4;
  if (tools.has(PATTERNS.localOnly, { official: true })) riskFit -= 15;
  if (tools.has(PATTERNS.inHouseSourcing, { official: true })) riskFit -= 8;
  if (gate1.result === 'Reject') riskFit = Math.min(riskFit, -10);

  const fitBreakdown = {
    product_fit: gate1.result === 'Reject' ? (metalProducts.length ? 6 : 2) : metalProducts.length ? 18 : giftSet ? 16 : (promo || corporateGift || awards) ? 12 : productBreadth ? 6 : 2,
    buyer_role_fit: gate1.result === 'Reject' ? 2 : role === 'Distributor/Reseller' ? 14 : role === 'Importer/Trader' ? 15 : role === 'Platform/Company store' ? 10 : role === 'Brand owner' ? 11 : role === 'Dealer/Decorator' ? 8 : role === 'Service agency' ? 6 : 3,
    evidence_strength: coverage.level === 'full' ? 15 : coverage.level === 'adequate' ? 12 : coverage.level === 'limited' ? 8 : coverage.has_homepage_content ? 6 : 3,
    procurement_potential: gate1.result === 'Reject' ? 2 : importer ? 15 : (custom && (promo || corporateGift)) ? 12 : (promo || corporateGift || awards) ? 9 : 3,
    reachability: highContact ? 9 : contactable ? 6 : 2,
    market_value: targetMarket ? 9 : country === 'Unknown' ? 4 : 5,
    supplier_fit: gate1.result === 'Reject' ? 2 : rush ? 3 : (custom || corporateGift || awards) ? 9 : promo ? 7 : 3,
    risk_adjustment: clamp(riskFit, -15, 0),
  };

  let riskValue = 0;
  if (rush) riskValue -= 6;
  if (budget) riskValue -= 5;
  if (tools.has(PATTERNS.inHouseSourcing, { official: true })) riskValue -= 10;
  if (tools.has(PATTERNS.localOnly, { official: true })) riskValue -= 15;
  if (gate1.result === 'Reject') riskValue = Math.min(riskValue, -10);
  const valueBreakdown = {
    annual_procurement: gate1.result === 'Reject' ? 2 : importer ? 18 : productBreadth >= 6 ? 14 : productBreadth >= 3 ? 10 : 5,
    margin_quality: gate1.result === 'Reject' ? 2 : premium ? 13 : budget ? 4 : corporateGift ? 10 : 7,
    strategic_value: gate1.result === 'Reject' ? 2 : targetMarket && role === 'Distributor/Reseller' ? 14 : targetMarket ? 10 : 6,
    cooperation_depth: gate1.result === 'Reject' ? 2 : (custom && giftSet) ? 14 : custom ? 11 : (promo || awards) ? 8 : 4,
    conversion_access: highContact ? 9 : contactable ? 6 : 2,
    capability_fit: gate1.result === 'Reject' ? 2 : rush ? 3 : (corporateGift || awards || metalProducts.length) ? 9 : promo ? 7 : 3,
    relationship_efficiency: gate1.result === 'Reject' ? 2 : role === 'Distributor/Reseller' || role === 'Importer/Trader' ? 8 : role === 'Dealer/Decorator' ? 6 : 4,
    risk_adjustment: clamp(riskValue, -15, 0),
  };
  return {
    fit_breakdown: fitBreakdown,
    fit_score: sumBreakdown(fitBreakdown),
    value_breakdown: valueBreakdown,
    value_score: sumBreakdown(valueBreakdown),
    scoring_notes: [
      '分数由本地证据的确定性规则计算，不是已确认采购额。',
      '未查询到的信息不计正向分，也不自动作为负向事实；风险扣分仅在出现明确信号时应用。',
      risks.length ? `已识别风险：${risks.join('；')}` : '未从当前证据中识别明确硬风险；这不代表不存在风险。',
    ],
  };
}

function initialGrade({ gate1, tools, coverage, role, productLines, metalProducts, employeeRange }) {
  if (gate1.result === 'Reject') return 'Reject';
  const inHouse = tools.has(PATTERNS.inHouseSourcing, { official: true });
  const employeeMin = employeeLowerBound(employeeRange);
  if (inHouse && employeeMin !== null && employeeMin >= 100) return 'Reject';
  const promo = tools.has(PATTERNS.promo, { official: true });
  const corporateGift = tools.has(PATTERNS.corporateGift, { official: true });
  const awards = tools.has(PATTERNS.awards, { official: true });
  const platform = role === 'Platform/Company store';
  const apparelOrPrint = tools.has(PATTERNS.apparel, { official: true }) || tools.has(PATTERNS.print, { official: true });
  const matched = promo || corporateGift || awards;
  if (platform && !promo && !corporateGift && !awards) return 'D';
  if (!matched) return productLines.length ? 'D' : 'D';
  const qualitySignals = [corporateGift, awards, metalProducts.length > 0, productLines.length >= 4, tools.has(PATTERNS.custom, { official: true })].filter(Boolean).length;
  if (coverage.key_page_count >= 3 && qualitySignals >= 3 && !tools.has(PATTERNS.rush, { official: true })) return 'A';
  const nonPrintProduct = productLines.some((line) => !['服装与纺织品', '印刷、标识与装饰服务', '箱包'].includes(line.category));
  if (apparelOrPrint && !corporateGift && !awards && !nonPrintProduct && !tools.has(PATTERNS.giftSet, { official: true })) return 'C';
  return 'B';
}

function tierFor(valueScore) {
  if (valueScore >= 80) return 'Tier 1 战略账户';
  if (valueScore >= 65) return 'Tier 2 成长账户';
  if (valueScore >= 45) return 'Tier 3 交易账户';
  if (valueScore >= 30) return 'Tier 4 培育账户';
  return 'Reject/归档';
}

function accountTypeFor(grade, role, tools) {
  if (grade === 'Reject') return '低价值干扰';
  if (grade === 'D') return '培育线索';
  if (role === 'Distributor/Reseller') return grade === 'A' ? '战略分销商' : '专项经销商';
  if (role === 'Importer/Trader') return '体量进口商';
  if (role === 'Brand owner') return '品牌·OEM 机会';
  if (grade === 'C') return '交易型买家';
  return '培育线索';
}

function buildDecision({ grade, gate1, role, coverage, productLines, metalProducts, tools }) {
  if (grade === 'Reject') return `不开发：${gate1.reason}`;
  if (grade === 'A') return `目标客户：官网明确支持促销品/企业礼赠/认可用品业务，已抓 ${coverage.key_page_count} 个关键页，产品线覆盖 ${productLines.length} 类${metalProducts.length ? '且有明确金属信号' : ''}。`;
  if (grade === 'B') return `目标客户但需验证：业务方向匹配，当前证据支持 ${role}；采购规模、进口模式、采购频率或决策人仍不完整。`;
  if (grade === 'C') return '暂不主动深开发：存在促销品交叉，但当前证据更偏服装、印刷或本地装饰服务。';
  return `不建议当前开发：官网虽可验证，但金属企业礼赠匹配证据不足${coverage.level === 'search-only' ? '，且尚无关键页正文' : ''}。`;
}

function customsChecks(sources, batchDir, company) {
  const domains = {
    importyeti: 'importyeti.com', customs_report: 'customs.report', '52wmb': '52wmb.com', volza: 'volza.com',
    importgenius: 'importgenius.com', panjiva: 'panjiva.com', datamyne: 'datamyne.com', tradesns: 'tradesns.com',
  };
  const externalFile = path.join(batchDir, 'external-evidence', 'companies', `${company.slug}.json`);
  const external = existsSync(externalFile) ? readJson(externalFile) : null;
  return Object.fromEntries(Object.entries(domains).map(([key, domain]) => {
    const query = external?.queries?.[`customs_${key}`];
    if (query) {
      return [key, `${query.status_zh || query.assessment || 'Unknown'}；${query.interpretation || '结果需人工复核。'}`];
    }
    const hits = sources.filter((source) => hostname(source.url).includes(domain));
    return [key, hits.length
      ? `当前本地证据命中 ${hits.length} 条该平台来源；须人工复核内容，不能仅凭命中断言存在进口。`
      : 'Unknown — 当前离线证据集未包含该平台查询结果；未执行查询，不得解释为“无记录”。'];
  }));
}

function associations(tools) {
  const results = [];
  for (const name of ['PPAI', 'PPPC', 'BPMA', 'ASI', 'SAGE', 'APPA']) {
    const regex = new RegExp(`\\b${name}\\b`, 'i');
    const source = tools.find(regex);
    if (!source) continue;
    results.push(`${name}：当前证据中有提及，会员身份/有效期仍需核实 [${tools.cite(source, `协会/行业信号：${name}`, regex)}]`);
  }
  return results;
}

function sourcingSignals(tools) {
  const signals = [];
  const definitions = [
    [PATTERNS.importer, '明确进口/海外采购措辞'],
    [PATTERNS.sourcing, '采购、sourcing 或供应商网络措辞'],
    [PATTERNS.inHouseSourcing, '自有/in-house/海外采购团队信号'],
    [PATTERNS.custom, '按需定制、bespoke 或 private-label 信号'],
    [PATTERNS.catalogue, '目录、在线商店或 company-store 模式'],
  ];
  for (const [regex, label] of definitions) {
    const source = tools.find(regex, { official: true });
    if (source) signals.push(`${label} [${tools.cite(source, `采购信号：${label}`, regex)}]`);
  }
  return signals;
}

function structuralRisks(tools, coverage, employeeRange) {
  const risks = [];
  if (tools.has(PATTERNS.rush, { official: true })) risks.push('rush/same-day/快速周转信号与 25–35 天计划型交期可能不兼容');
  if (tools.has(PATTERNS.budget, { official: true })) risks.push('低价/价格匹配措辞可能压缩 FOB US$18–50 套装的利润空间');
  if (tools.has(PATTERNS.localOnly, { official: true })) risks.push('仅本地制造/手工艺承诺与中国供货冲突');
  if (tools.has(PATTERNS.inHouseSourcing, { official: true })) risks.push('自有/海外采购团队可能已有成熟中国供应链');
  if (coverage.level === 'search-only') risks.push('研究覆盖不足：尚无关键页正文，当前分级为暂定');
  if (employeeRange === 'Unknown') risks.push('员工规模未知；不得据此推断公司过小或过大');
  return risks;
}

function unknownsFor({ coverage, employeeRange, contacts, tools, country, productLines }) {
  const unknowns = [];
  if (coverage.level === 'search-only') unknowns.push('Home/About/Products/Services/Team/Contact 等关键页正文尚未落盘');
  if (employeeRange === 'Unknown') unknowns.push('员工规模与稳定性');
  if (country === 'Unknown') unknowns.push('国家/市场归属');
  if (!contacts.some((contact) => contact.decision_power === 'High')) unknowns.push('具名采购决策人及其真实职权');
  if (!contacts.some((contact) => contact.email)) unknowns.push('可验证邮箱');
  if (!tools.has(PATTERNS.importer, { official: true })) unknowns.push('是否直接进口、从何处采购及现有供应商');
  if (!tools.has(PATTERNS.giftSet, { official: true })) unknowns.push('是否已有 executive/corporate gift 套件');
  if (!productLines.length) unknowns.push('主要产品线（当前官网证据不足）');
  unknowns.push('年采购量、采购频率、目标价、付款条款与下一项目时间');
  return unique(unknowns);
}

function researchSources(tools) {
  return [...tools.used.values()]
    .sort((left, right) => sourcePriority(right.source) - sourcePriority(left.source))
    .map(({ source, supports, regex }) => ({
      source_id: source.id,
      title: source.title,
      url: source.url,
      source_type: source.type,
      evidence_strength: source.official ? 'Strong' : /linkedin\.com|(?:PPAI|PPPC|BPMA|ASI)/i.test(source.url) ? 'Weak' : 'Weak',
      local_file: source.local_file,
      supports: [...supports].join('；'),
      evidence_excerpt: excerpt(source.text, regex, 460),
    }));
}

function analyzeCompany(company, batchDir, selectedPageMap) {
  const sources = buildSources(batchDir, company, selectedPageMap);
  const tools = makeEvidenceTools(sources);
  const metadataSource = sources.find((source) => source.type === 'gate1-metadata');
  const linkedinEvidenceRefs = metadataSource
    ? [tools.cite(metadataSource, '输入线索中的 LinkedIn 行业、定位、地区和粉丝数', /LinkedIn (?:industry|positioning|followers)/i)]
    : [];
  const coverage = evidenceCoverage(sources);
  const website = verifyWebsite(company, sources, tools);
  const gate1 = classifyGate1(company, website, tools);
  const country = inferCountry(company);
  const year = extractYear(sources, tools);
  const employees = extractEmployeeRange(sources, tools);
  const core = inferCoreBusiness(tools);
  const role = inferRole(tools);
  const productLines = extractProductLines(tools);
  const metalProducts = productMetalSummary(productLines, tools);
  const contacts = extractContacts(company, sources, tools);
  let grade = initialGrade({
    gate1, tools, coverage, role: role.role, productLines, metalProducts, employeeRange: employees.value,
  });
  // The audited Gate 1 file is authoritative. Search snippets alone must never
  // promote an identity/business Review into an A/B sales target.
  if (company.gate1 === 'Review') grade = 'D';
  if (company.gate1 === 'Reject') grade = 'Reject';
  const risks = structuralRisks(tools, coverage, employees.value);
  const scores = scoreCompany({
    gate1, role: role.role, tools, coverage, contacts, productLines, metalProducts, country, risks,
  });
  if (grade === 'A' && scores.fit_score < 60) grade = 'B';
  if (grade === 'B' && scores.fit_score < 42) grade = 'C';
  const target = ['A', 'B'].includes(grade);
  const potentialNeeds = buildPotentialNeeds({ grade, role: role.role, tools, productLines, metalProducts });
  const painPoints = buildPainPoints({ grade, tools, metalProducts });
  const entryAngles = buildEntryAngles({ grade, tools, metalProducts });
  const hasGiftSet = tools.has(PATTERNS.giftSet, { official: true });
  const hasSingles = productLines.some((line) => ['书写工具', '饮具', '桌面与办公用品', 'EDC、钥匙扣与工具', '奖项、奖牌、徽章与认可用品'].includes(line.category));
  const decision = company.gate1 === 'Reject'
    ? `不开发：${company.reason || gate1.reason}`
    : company.gate1 === 'Review'
      ? `暂不列为目标客户：${company.reason || '官网身份或业务匹配仍需人工复核'}。在官网归属与业务证据确认前不投入深调研。`
      : buildDecision({ grade, gate1, role: role.role, coverage, productLines, metalProducts, tools });
  const associationsFound = associations(tools);
  const sourcingFound = sourcingSignals(tools);
  const unknowns = unknownsFor({ coverage, employeeRange: employees.value, contacts, tools, country, productLines });
  if (tools.used.size < 2) {
    const tokens = companyTokens(company.company);
    const supplemental = sources.filter((source) => !tools.used.has(source.id) && (
      source.official || tokens.some((token) => `${source.title} ${plain(source.text).slice(0, 1200)}`.toLowerCase().includes(token))
    ));
    for (const source of supplemental) {
      tools.cite(source, '补充背景交叉核验；未单独作为硬性采购事实', /./);
      if (tools.used.size >= 2) break;
    }
  }
  if (tools.used.size < 2) unknowns.push('可独立核验的本地来源少于 2 个');

  const result = {
    schema_version: VERSION,
    generated_at: new Date().toISOString(),
    analysis_method: 'offline deterministic evidence-only classifier；未执行联网搜索，网页文本仅作为不可信证据读取',
    analysis_status: coverage.level === 'search-only' ? 'provisional' : coverage.level === 'limited' ? 'limited-evidence' : 'complete-from-available-evidence',
    evidence_coverage: coverage,
    id: Number(company.id),
    slug: company.slug || `${String(company.id).padStart(3, '0')}-${slugify(company.company)}`,
    company: company.company,
    country,
    city_region: company.location || 'Unknown',
    linkedin_industry: company.industry || 'Unknown',
    linkedin_positioning: company.linkedin_positioning || 'Unknown',
    linkedin_followers: company.followers || 'Unknown',
    linkedin_evidence_refs: linkedinEvidenceRefs,
    official_website: safeUrl(company.official_url),
    official_website_verified: website.verified,
    website_match_evidence: website.reason,
    website_match_evidence_refs: website.refs,
    gate1_result: company.gate1 || gate1.result,
    gate1_reason: company.reason || gate1.reason,
    local_evidence_gate1_result: gate1.result,
    local_evidence_gate1_reason: gate1.reason,
    gate1_evidence_refs: gate1.refs,
    original_gate1_machine_result: company.gate1 || company.status || 'Unknown',
    original_gate1_machine_reason: company.reason || 'Unknown',
    founded_year: year.value,
    founded_year_evidence_refs: year.refs,
    employee_range: employees.value,
    employee_range_evidence_refs: employees.refs,
    core_business: core.text,
    core_business_evidence_refs: core.refs,
    supply_chain_role: role.role,
    supply_chain_role_confidence: role.refs.length ? (coverage.key_page_count ? 'Medium' : 'Low') : 'Low',
    supply_chain_position_explanation: role.explanation,
    supply_chain_position_evidence_refs: role.refs,
    buys_from: role.role === 'Importer/Trader'
      ? '海外/进口供应商（官网有进口措辞；具体国家与供应商待确认）'
      : target ? '目录供应商、装饰商或项目型供应商；是否直接进口待确认' : 'Unknown',
    sells_to: tools.has(PATTERNS.corporateClients, { official: true }) || tools.has(PATTERNS.corporateGift, { official: true })
      ? '企业/机构客户（具体行业、客户名单和占比待确认）' : 'Unknown',
    business_model_tags: unique([
      tools.has(PATTERNS.catalogue, { official: true }) ? '目录驱动' : '',
      tools.has(PATTERNS.custom, { official: true }) ? '按需定制' : '',
      tools.has(PATTERNS.platform, { official: true }) ? '平台/公司商店' : '',
      tools.has(PATTERNS.decoration, { official: true }) ? '本地装饰服务' : '',
      tools.has(PATTERNS.giftSet, { official: true }) ? '项目/套件制' : '',
    ]),
    product_lines: productLines,
    metal_products: metalProducts,
    executive_gift_sets: hasGiftSet ? 'Yes — 本地证据出现 gift set/kit/pack 等明确措辞；具体 SKU 和材质待确认' : 'Unknown — 当前证据未确认，不能写作 No',
    executive_gift_singles: hasSingles ? 'Yes/Partial — 已抓证据显示相关单品类；具体金属材质待确认' : 'Unknown',
    client_industries: [],
    named_clients_or_cases: [],
    contact_hooks: associationsFound.length ? associationsFound.slice(0, 2) : [],
    association_and_trade_show_evidence: associationsFound,
    sourcing_import_signals: sourcingFound,
    customs_platform_checks: customsChecks(sources, batchDir, company),
    contacts,
    potential_procurement_needs: potentialNeeds,
    procurement_probability_overall: !target ? (grade === 'C' ? 'Low' : 'Unknown')
      : potentialNeeds.some((need) => need.probability === 'High') ? 'High' : potentialNeeds.length ? 'Medium' : 'Unknown',
    pain_points: painPoints,
    china_supplier_entry_angles: entryAngles,
    supplier_switch_hypothesis: target
      ? '优先定位为“品类扩充 / 定制项目伙伴 / 备用供应商”，不默认替换现有供应链；先确认其直接进口能力。'
      : '不建议提出供应商切换；先解决公司匹配或采购权证据缺口。',
    structural_risks: risks,
    gate2_grade: grade,
    grade_confidence: coverage.level === 'full' || coverage.level === 'adequate' ? 'Medium' : 'Low',
    target_customer: target,
    decision_reason: decision,
    fit_score: scores.fit_score,
    fit_breakdown: scores.fit_breakdown,
    value_score: scores.value_score,
    value_breakdown: scores.value_breakdown,
    scoring_notes: scores.scoring_notes,
    value_tier: tierFor(scores.value_score),
    account_type: accountTypeFor(grade, role.role, tools),
    recommended_action: grade === 'A' ? '进入深档与高接触开发；补查 Gate 2 外部证据和决策人'
      : grade === 'B' ? '进入深档并轻触达；先验证采购模式、规模和决策人'
        : grade === 'C' ? '不做详档；最多一次低成本 LinkedIn 触达或 CRM 备查'
            : grade === 'D' ? '不开发；待出现新证据时再复核' : 'Reject；停止投入',
    research_sources: [],
    unknowns,
  };
  result.research_sources = researchSources(tools);
  validateResult(result);
  return result;
}

function validateResult(result) {
  const required = [
    'id', 'company', 'official_website', 'official_website_verified', 'gate1_result', 'gate1_reason',
    'core_business', 'supply_chain_role', 'product_lines', 'contacts', 'potential_procurement_needs',
    'pain_points', 'china_supplier_entry_angles', 'gate2_grade', 'target_customer', 'decision_reason',
    'fit_score', 'fit_breakdown', 'value_score', 'value_breakdown', 'value_tier', 'recommended_action',
    'research_sources', 'unknowns',
  ];
  for (const key of required) if (!(key in result)) throw new Error(`missing required field: ${key}`);
  if (!ROLE_VALUES.has(result.supply_chain_role)) throw new Error(`invalid supply_chain_role: ${result.supply_chain_role}`);
  if (!GRADE_VALUES.has(result.gate2_grade)) throw new Error(`invalid gate2_grade: ${result.gate2_grade}`);
  if (result.target_customer !== ['A', 'B'].includes(result.gate2_grade)) throw new Error('target_customer disagrees with Gate 2 grade');
  if (sumBreakdown(result.fit_breakdown) !== result.fit_score) throw new Error('Fit total does not equal breakdown');
  if (sumBreakdown(result.value_breakdown) !== result.value_score) throw new Error('Value total does not equal breakdown');
  for (const value of Object.values(result.fit_breakdown)) if (!Number.isInteger(value)) throw new Error('non-integer Fit component');
  for (const value of Object.values(result.value_breakdown)) if (!Number.isInteger(value)) throw new Error('non-integer Value component');
  const sourceIds = new Set(result.research_sources.map((source) => source.source_id));
  const refs = [];
  const visit = (value, key = '') => {
    if (key.endsWith('evidence_refs') && Array.isArray(value)) refs.push(...value);
    else if (Array.isArray(value)) value.forEach((item) => visit(item));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, child]) => visit(child, childKey));
  };
  visit(result);
  for (const ref of unique(refs)) if (ref && !sourceIds.has(ref)) throw new Error(`unresolved evidence ref: ${ref}`);
  if (!result.target_customer && (result.pain_points.length || result.china_supplier_entry_angles.length)) {
    throw new Error('non-target account unexpectedly received pain points or entry angles');
  }
}

const options = parseArgs(process.argv.slice(2));
const root = process.cwd();
const batchDir = resolveFromRoot(root, options.batchDir);
const outputDir = options.outputDir
  ? resolveFromRoot(root, options.outputDir)
  : path.join(batchDir, 'local-analysis');
const companyDir = path.join(outputDir, 'companies');
mkdirSync(companyDir, { recursive: true });

const auditedGate1Path = path.join(batchDir, 'gate1-results-audited.json');
const gate1Path = existsSync(auditedGate1Path) ? auditedGate1Path : path.join(batchDir, 'gate1-results.json');
const gate1 = readJson(gate1Path);
if (!Array.isArray(gate1)) throw new Error(`Cannot read Gate 1 array: ${gate1Path}`);
const selectedPageMap = loadSelectedPages(batchDir);
let candidates = gate1;
if (options.ids) candidates = candidates.filter((item) => options.ids.has(Number(item.id)));
if (Number.isFinite(options.limit)) candidates = candidates.slice(0, options.limit);

const results = [];
const failures = [];
for (let index = 0; index < candidates.length; index += 1) {
  const company = candidates[index];
  try {
    const result = analyzeCompany(company, batchDir, selectedPageMap);
    const outputPath = path.join(companyDir, `${result.slug}.json`);
    atomicJson(outputPath, result);
    results.push(result);
  } catch (error) {
    failures.push({ id: company.id, company: company.company, slug: company.slug, error: error.message });
  }
  if ((index + 1) % 25 === 0 || index + 1 === candidates.length) {
    process.stdout.write(`local-analysis ${index + 1}/${candidates.length} failures=${failures.length}\n`);
  }
}

const gradeCounts = {};
const statusCounts = {};
for (const result of results) {
  gradeCounts[result.gate2_grade] = (gradeCounts[result.gate2_grade] || 0) + 1;
  statusCounts[result.analysis_status] = (statusCounts[result.analysis_status] || 0) + 1;
}
const decisions = results.map((result) => ({
  id: result.id,
  company: result.company,
  country: result.country,
  website: result.official_website,
  gate1: result.gate1_result,
  gate2: result.gate2_grade,
  target_customer: result.target_customer,
  fit: result.fit_score,
  value: result.value_score,
  value_tier: result.value_tier,
  analysis_status: result.analysis_status,
  reason: result.decision_reason,
  recommended_action: result.recommended_action,
}));
const runSummary = {
  schema_version: VERSION,
  generated_at: new Date().toISOString(),
  batch_dir: path.relative(root, batchDir),
  output_dir: path.relative(root, outputDir),
  requested: candidates.length,
  completed: results.length,
  failures: failures.length,
  grade_counts: gradeCounts,
  analysis_status_counts: statusCounts,
  caveat: '本脚本只分析已落盘的 search/Gate 1/key-page 证据；Unknown 不等于 No，search-only 结果应在关键页补齐后重跑。',
  failure_details: failures,
};

atomicJson(path.join(outputDir, 'companies.json'), { companies: results });
atomicJson(path.join(outputDir, 'decision-summary.json'), { decisions });
atomicJson(path.join(outputDir, 'run-summary.json'), runSummary);
process.stdout.write(`${JSON.stringify(runSummary)}\n`);
if (failures.length) process.exitCode = 2;
