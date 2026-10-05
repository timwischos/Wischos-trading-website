import {
  existsSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync,
} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const marker = path.join(batchDir, 'batch-page-repair.json');
if (existsSync(marker)) {
  process.stdout.write(`${readFileSync(marker, 'utf8')}\n`);
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(path.join(batchDir, 'selected-pages-manifest.json'), 'utf8'));
const sites = new Map(manifest.map((site) => [Number(site.id), site]));
const log = readFileSync(path.join(batchDir, 'key-page-scrape.log'), 'utf8');
const jobs = [];
for (const line of log.split(/\r?\n/)) {
  if (!line.includes('batch-attempt=')) continue;
  const [idRaw, status, type, url] = line.split('\t');
  if (status !== 'OK') continue;
  const id = Number(idRaw);
  const site = sites.get(id);
  const pageIndex = site?.pages?.findIndex((page) => page.url === url);
  if (pageIndex < 0) continue;
  jobs.push({
    id,
    type,
    url,
    output: path.join(batchDir, 'key-pages', String(id).padStart(3, '0'), `${String(pageIndex + 1).padStart(2, '0')}-${type}.md`),
  });
}

const fileKey = (value) => value.toLowerCase().replace(/\.md$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const urlKey = (value) => {
  const parsed = new URL(value);
  const pathname = decodeURIComponent(parsed.pathname).replace(/^\/+|\/+$/g, '');
  return fileKey(`${parsed.hostname}${pathname ? `-${pathname}` : ''}`);
};
const looseFiles = new Map(
  readdirSync(path.join(root, '.firecrawl'))
    .filter((name) => name.endsWith('.md'))
    .map((name) => [fileKey(name), path.join(root, '.firecrawl', name)]),
);

let removedCorrupt = 0;
let recovered = 0;
for (const job of jobs) {
  if (existsSync(job.output)) {
    unlinkSync(job.output);
    removedCorrupt += 1;
  }
  const loose = looseFiles.get(urlKey(job.url));
  if (loose && existsSync(loose) && statSync(loose).size >= 30) {
    renameSync(loose, job.output);
    looseFiles.delete(urlKey(job.url));
    recovered += 1;
  }
}

const result = {
  repaired_at: new Date().toISOString(),
  logged_batch_outputs: jobs.length,
  removed_corrupt: removedCorrupt,
  recovered_from_url_named_files: recovered,
  queued_for_rescrape: jobs.length - recovered,
};
writeFileSync(marker, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
