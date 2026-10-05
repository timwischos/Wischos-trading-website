import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const companies = JSON.parse(readFileSync(path.join(batchDir, 'companies.json'), 'utf8'));
const searchDir = path.join(batchDir, 'search');
const searchDirs = [
  searchDir,
  path.join(batchDir, 'search-alt'),
  path.join(batchDir, 'search-v1'),
].filter((directory) => existsSync(directory));

const excludedHosts = [
  'linkedin.com', 'facebook.com', 'instagram.com', 'youtube.com', 'x.com', 'twitter.com',
  'zoominfo.com', 'crunchbase.com', 'signalhire.com', 'rocketreach.co', 'apollo.io',
  'glassdoor.', 'indeed.', 'yelp.', 'yell.com', 'endole.co.uk', 'companieshouse.gov.uk',
  'company-information.service.gov.uk', 'bloomberg.com', 'dnb.com', 'mapquest.com', 'wikipedia.org',
  'trustpilot.com', 'cylex-', 'approvedbusiness.co.uk', 'prospeo.io', 'amcis.co.uk',
  'businessmagnet.co.uk', 'quickorder.', 'shizune.co', 'bizapedia.com', 'opencorporates.com',
  'yellowpages.', 'canpages.ca', 'vancouver.ca', 'chamberofcommerce.', '192.com',
];

const genericTokens = new Set([
  'limited', 'ltd', 'inc', 'group', 'company', 'co', 'corp', 'corporation', 'marketing',
  'promotions', 'promotion', 'promotional', 'products', 'product', 'merchandise', 'branding',
  'brand', 'brands', 'solutions', 'services', 'international', 'global', 'uk', 'canada',
  'the', 'and', 'of', 'a', 'an', 'pty', 'gmbh', 'llc', 'agency', 'creative',
]);

function norm(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
}

function distinctiveTokens(company) {
  return norm(company).split(/\s+/).filter((token) => token.length > 2 && !genericTokens.has(token));
}

function brandTokens(company) {
  return norm(company)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !new Set(['limited', 'ltd', 'inc', 'corp', 'corporation', 'company', 'co', 'pty', 'gmbh', 'llc']).has(token));
}

function isExcluded(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return excludedHosts.some((excluded) => host.includes(excluded));
  } catch {
    return true;
  }
}

function candidateScore(company, item) {
  if (!item?.url || isExcluded(item.url)) return -100;
  const title = norm(item.title || '');
  const description = norm((item.description || '').slice(0, 1600));
  const haystack = `${title} ${description}`;
  const tokens = distinctiveTokens(company.company);
  const brands = brandTokens(company.company);
  const matched = tokens.filter((token) => haystack.includes(token)).length;
  const tokenScore = tokens.length ? matched / tokens.length : 0;
  let host = '';
  try { host = norm(new URL(item.url).hostname.replace(/^www\./, '')); } catch {}
  const domainMatches = brands.filter((token) => host.includes(token)).length;
  const domainScore = brands.length ? domainMatches / brands.length : 0;
  const corePhrase = brands.join(' ');
  let score = tokenScore * 25 + domainScore * 45;
  if (corePhrase && title.includes(corePhrase)) score += 35;
  if (corePhrase && description.includes(corePhrase)) score += 15;
  if ((item.position || 99) === 1) score += 15;
  if (/official|home/.test(norm(item.title || ''))) score += 3;
  if (/promotional|merchandise|corporate gift|branded|swag|workwear|apparel/.test(haystack)) score += 10;
  const locationTokens = norm(company.location).split(/\s+/).filter((token) => token.length > 3);
  if (locationTokens.some((token) => haystack.includes(token))) score += 5;
  return score;
}

function classify(company, candidate) {
  if (!candidate) {
    return { gate1: 'Reject', reason: '未找到可验证的独立官网', confidence: 'medium' };
  }
  const text = norm(`${candidate.title || ''} ${candidate.description || ''}`);
  const hasPromo = /promotional|merchandise|corporate gift|branded product|business gift|swag|giveaway|incentive|recognition|award/.test(text);
  const apparel = /apparel|clothing|uniform|workwear|embroidery|screen print/.test(text);
  const print = /printing|print services|signage|lithograph/.test(text);
  const localOnly = /handmade only|locally made only|canadian made only|artisan only/.test(text);
  const foodOnly = /bakery|biscuits|food hamper|gift basket|confectionery/.test(text) && !hasPromo;
  if (localOnly) return { gate1: 'Reject', reason: '官网显示仅本地制造/手工艺产品', confidence: 'medium' };
  if (foodOnly) return { gate1: 'Reject', reason: '主营食品或礼篮，未见金属促销商品', confidence: 'medium' };
  if (!hasPromo && (apparel || print)) return { gate1: 'Reject', reason: '主营服装/印刷/装饰，未见明确促销商品业务', confidence: 'medium' };
  if (!hasPromo) return { gate1: 'Review', reason: '独立官网已找到，但首页摘要中的促销商品证据不足', confidence: 'low' };
  return { gate1: 'Pass', reason: '官网可验证且有促销商品、品牌商品或企业礼赠业务', confidence: 'medium' };
}

const results = companies.map((company) => {
  const filename = `${company.slug}.json`;
  const files = searchDirs.map((directory) => path.join(directory, filename)).filter((file) => existsSync(file));
  if (!files.length) return { ...company, status: 'pending' };
  const web = [];
  for (const file of files) {
    try {
      const parsed = JSON.parse(readFileSync(file, 'utf8'));
      web.push(...(parsed?.data?.web || []));
    } catch {
      // Keep usable results from the other search passes.
    }
  }
  if (!web.length) return { ...company, status: 'invalid-search-output' };
  const dedupedWeb = [...new Map(web.filter((item) => item?.url).map((item) => [item.url, item])).values()];
  const ranked = dedupedWeb
    .map((item) => ({ ...item, candidate_score: candidateScore(company, item) }))
    .sort((a, b) => b.candidate_score - a.candidate_score);
  const candidate = ranked.find((item) => item.candidate_score >= 55);
  const gate = classify(company, candidate);
  return {
    ...company,
    status: 'searched',
    official_url: candidate?.url || '',
    official_title: candidate?.title || '',
    homepage_evidence: (candidate?.description || '').slice(0, 4000),
    search_sources: dedupedWeb.map((item) => ({ url: item.url, title: item.title, description: (item.description || '').slice(0, 600) })),
    ...gate,
  };
});

writeFileSync(path.join(batchDir, 'gate1-results.json'), JSON.stringify(results, null, 2));

const counts = results.reduce((acc, item) => {
  const key = item.gate1 || item.status;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const lines = [
  '# LinkedIn 品牌商品公司 Gate 1 初筛',
  '',
  `> 自动初筛生成时间：${new Date().toISOString()}`,
  `> 统计：${Object.entries(counts).map(([key, value]) => `${key}=${value}`).join('；')}`,
  '> 说明：该文件是官网搜索后的机器初判；Review 和低置信度结果必须人工或深度抓取复核。',
  '',
  '| 序号 | 公司 | 官网 | Gate 1 | 原因 | 置信度 |',
  '|---:|---|---|---|---|---|',
  ...results.map((item) => `| ${item.id} | ${item.company.replaceAll('|', '\\|')} | ${item.official_url || '—'} | ${item.gate1 || item.status} | ${(item.reason || '等待搜索').replaceAll('|', '\\|')} | ${item.confidence || '—'} |`),
  '',
];
writeFileSync(path.join(batchDir, 'gate1-review.md'), lines.join('\n'));
writeFileSync(
  path.join(batchDir, 'official-urls.txt'),
  results.filter((item) => item.official_url).map((item) => `${item.id}\t${item.company}\t${item.official_url}`).join('\n') + '\n',
);

process.stdout.write(`${JSON.stringify(counts)}\n`);
