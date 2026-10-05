import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const mapDir = path.join(batchDir, 'maps');
const outputDir = path.join(batchDir, 'selected-pages');
mkdirSync(outputDir, { recursive: true });
const auditedPath = path.join(batchDir, 'gate1-results-audited.json');
const all = JSON.parse(readFileSync(existsSync(auditedPath) ? auditedPath : path.join(batchDir, 'gate1-results.json'), 'utf8'));

const groups = [
  { name: 'about', re: /about|our-story|who-we-are|company|history/i, weight: 90 },
  { name: 'products', re: /products?|merchandise|catalog|shop|collections?|categories/i, weight: 88 },
  { name: 'services', re: /services?|solutions?|capabilities|fulfil|fulfill|sourcing/i, weight: 84 },
  { name: 'team', re: /\/(?:our-)?team\/?$|\/people\/?$|\/leadership\/?$|\/management\/?$|\/staff\/?$/i, weight: 82 },
  { name: 'contact', re: /contact|locations?|get-in-touch/i, weight: 80 },
  { name: 'cases', re: /case-stud|portfolio|clients?|our-work|projects?|success-stor/i, weight: 78 },
  { name: 'awards', re: /awards?|recognition|certification|sustainab|responsib|b-corp/i, weight: 72 },
  { name: 'news', re: /\/news(?:\/|$)|\/blog(?:\/|$)|\/insights?(?:\/|$)|\/press(?:\/|$)/i, weight: 65 },
];
const junk = /privacy|terms|cookie|login|sign-in|register|cart|checkout|wishlist|account|search|faq|delivery|returns?|refund|accessibility|sitemap|tag\/|author\/|page\/\d/i;

function urlsFromMap(raw) {
  if (Array.isArray(raw)) return raw.map((item) => typeof item === 'string' ? item : item.url).filter(Boolean);
  if (Array.isArray(raw.links)) return raw.links.map((item) => typeof item === 'string' ? item : item.url).filter(Boolean);
  if (Array.isArray(raw.data?.links)) return raw.data.links.map((item) => typeof item === 'string' ? item : item.url).filter(Boolean);
  if (Array.isArray(raw.data)) return raw.data.map((item) => typeof item === 'string' ? item : item.url).filter(Boolean);
  return [];
}

function normaliseHost(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
}

const manifest = [];
for (const item of all) {
  if (!item.official_url || item.gate1 !== 'Pass') continue;
  const mapPath = path.join(mapDir, `${item.slug}.json`);
  let mapped = [];
  if (existsSync(mapPath)) {
    try { mapped = urlsFromMap(JSON.parse(readFileSync(mapPath, 'utf8'))); } catch {}
  }
  const home = item.official_url;
  const officialHost = normaliseHost(home);
  const urls = [...new Set([home, ...mapped])].filter((url) => {
    try {
      const mappedHost = normaliseHost(url);
      const sameSite = mappedHost === officialHost
        || mappedHost.endsWith(`.${officialHost}`)
        || officialHost.endsWith(`.${mappedHost}`);
      return sameSite && !junk.test(new URL(url).pathname);
    } catch { return false; }
  });
  const selected = [{ url: home, type: 'home', score: 100 }];
  for (const group of groups) {
    const matches = urls
      .filter((url) => {
        const pathname = new URL(url).pathname;
        if (group.name === 'team' && (/\/blog\//i.test(pathname) || /sports?-teams?/i.test(pathname))) return false;
        if (!['news', 'cases'].includes(group.name) && /\/blog\//i.test(pathname)) return false;
        return group.re.test(pathname);
      })
      .map((url) => ({ url, type: group.name, score: group.weight - new URL(url).pathname.split('/').filter(Boolean).length }))
      .sort((a, b) => b.score - a.score);
    if (matches[0] && !selected.some((entry) => entry.url === matches[0].url)) selected.push(matches[0]);
  }
  const final = selected.slice(0, 8);
  const output = { id: item.id, company: item.company, official_url: home, mapped_count: mapped.length, pages: final };
  writeFileSync(path.join(outputDir, `${item.slug}.json`), JSON.stringify(output, null, 2));
  manifest.push(output);
}
writeFileSync(path.join(batchDir, 'selected-pages-manifest.json'), JSON.stringify(manifest, null, 2));
process.stdout.write(`selected-sites=${manifest.length} selected-pages=${manifest.reduce((sum, item) => sum + item.pages.length, 0)}\n`);
