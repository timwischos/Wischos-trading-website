import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const manifestPath = path.join(batchDir, 'selected-pages-manifest.json');
const analysisPath = path.join(batchDir, 'local-analysis/companies.json');
if (!existsSync(analysisPath)) throw new Error('请先完成本地证据初筛，再扩展 A/B 页面。');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const analysis = JSON.parse(readFileSync(analysisPath, 'utf8')).companies || [];
const byId = new Map(analysis.map((item) => [Number(item.id), item]));
const junk = /privacy|terms|cookie|login|sign-in|register|cart|checkout|wishlist|account|search|faq|delivery|returns?|refund|accessibility|sitemap|tag\/|author\/|page\/\d|wp-json|feed|\.xml$/i;
const priority = [
  { type: 'deep-metal', re: /metal|stainless|aluminium|aluminum|brass|award|medal|badge|lapel|pin|pen|drinkware|tumbler|bottle|desk|keyring|keychain|edc|multi-?tool|gift-?set|gift-?box|executive|onboarding/i, score: 100 },
  { type: 'deep-products', re: /products?|merchandise|catalog|shop|collections?|categories|corporate-gifts?|business-gifts?/i, score: 88 },
  { type: 'deep-cases', re: /case-stud|portfolio|clients?|our-work|projects?|success-stor/i, score: 80 },
  { type: 'deep-services', re: /services?|solutions?|capabilities|fulfil|fulfill|sourcing|sustainab/i, score: 72 },
  { type: 'deep-news', re: /news|blog|insights?|press/i, score: 55 },
];

function host(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
}

let targets = 0;
let added = 0;
for (const site of manifest) {
  const result = byId.get(Number(site.id));
  if (!result || !['A', 'B'].includes(result.gate2_grade)) continue;
  targets += 1;
  const cap = result.gate2_grade === 'A' ? 20 : 12;
  const mapPath = path.join(batchDir, 'maps', `${result.slug}.json`);
  if (!existsSync(mapPath)) continue;
  let links = [];
  try {
    const map = JSON.parse(readFileSync(mapPath, 'utf8'));
    links = map?.data?.links ?? map?.links ?? [];
  } catch { continue; }
  const officialHost = host(site.official_url);
  const existing = new Set(site.pages.map((page) => page.url));
  const candidates = [];
  for (const link of links) {
    const url = typeof link === 'string' ? link : link?.url;
    if (!url || existing.has(url)) continue;
    let parsed;
    try { parsed = new URL(url); } catch { continue; }
    const mappedHost = host(url);
    if (!(mappedHost === officialHost || mappedHost.endsWith(`.${officialHost}`) || officialHost.endsWith(`.${mappedHost}`))) continue;
    if (junk.test(`${parsed.pathname}${parsed.search}`) || parsed.search) continue;
    const depth = parsed.pathname.split('/').filter(Boolean).length;
    const match = priority.find((rule) => rule.re.test(parsed.pathname));
    if (!match || (match.type !== 'deep-metal' && depth > 3) || depth > 5) continue;
    candidates.push({ url, type: match.type, score: match.score - depth });
  }
  candidates.sort((left, right) => right.score - left.score || left.url.length - right.url.length);
  for (const candidate of candidates) {
    if (site.pages.length >= cap) break;
    if (existing.has(candidate.url)) continue;
    site.pages.push(candidate);
    existing.add(candidate.url);
    added += 1;
  }
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`expanded-targets=${targets} added-pages=${added} total-pages=${manifest.reduce((sum, site) => sum + site.pages.length, 0)}\n`);
