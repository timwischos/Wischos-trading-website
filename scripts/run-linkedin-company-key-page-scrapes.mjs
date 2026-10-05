import { readFileSync, existsSync, mkdirSync, appendFileSync, renameSync, readdirSync, statSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputRoot = path.join(batchDir, 'key-pages');
const logPath = path.join(batchDir, 'key-page-scrape.log');
mkdirSync(outputRoot, { recursive: true });
const sites = JSON.parse(readFileSync(path.join(batchDir, 'selected-pages-manifest.json'), 'utf8'));
const fileKey = (value) => value.toLowerCase().replace(/\.md$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const urlKey = (value) => {
  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = decodeURIComponent(parsed.pathname).replace(/^\/+|\/+$/g, '');
    return fileKey(`${hostname}${pathname ? `-${pathname}` : ''}`);
  } catch { return ''; }
};
const jobs = [];
for (const site of sites) {
  const siteDir = path.join(outputRoot, `${String(site.id).padStart(3, '0')}`);
  mkdirSync(siteDir, { recursive: true });
  site.pages.forEach((page, index) => {
    const output = path.join(siteDir, `${String(index + 1).padStart(2, '0')}-${page.type}.md`);
    if (!existsSync(output) || readFileSync(output, 'utf8').trim().length < 30) jobs.push({ ...site, page, output });
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const looseByKey = new Map(readdirSync(path.join(root, '.firecrawl'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => [fileKey(name), path.join(root, '.firecrawl', name)]));
const pendingJobs = [];
for (const job of jobs) {
  const loose = looseByKey.get(urlKey(job.page.url));
  if (loose && existsSync(loose) && statSync(loose).size >= 30) {
    renameSync(loose, job.output);
    looseByKey.delete(urlKey(job.page.url));
    appendFileSync(logPath, `${job.id}\tRECOVERED\t${job.page.type}\t${job.page.url}\n`);
  } else pendingJobs.push(job);
}
const total = sites.reduce((sum, site) => sum + site.pages.length, 0);
let done = total - pendingJobs.length;
const batchSize = 10; // below the current 14 req/min account ceiling

function executeBatch(batch) {
  return new Promise((resolve) => {
    const child = spawn('firecrawl', ['scrape', ...batch.map((job) => job.page.url), '--only-main-content'], {
      cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    const timeout = setTimeout(() => {
      stderr += ' batch-timeout-after-120s';
      child.kill('SIGTERM');
    }, 120000);
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({ code, stdout, stderr });
    });
  });
}

async function runBatch(batch, attempt) {
  const result = await executeBatch(batch);
  const saved = [];
  const combinedOutput = `${result.stdout}\n${result.stderr}`.replace(/\u001b\[[0-9;]*m/g, '');
  for (const line of combinedOutput.split(/\r?\n/)) {
    const match = line.match(/\[(\d+)\/\d+\]\s+Saved:\s+(.+)$/);
    if (match) saved.push(match[2].trim());
  }
  const savedByKey = new Map(saved.map((savedPath) => [fileKey(path.basename(savedPath)), savedPath]));
  const retry = [];
  for (let index = 0; index < batch.length; index += 1) {
    const job = batch[index];
    const savedPath = savedByKey.get(urlKey(job.page.url));
    const absoluteSaved = savedPath ? path.resolve(root, savedPath) : '';
    if (absoluteSaved && existsSync(absoluteSaved) && readFileSync(absoluteSaved, 'utf8').trim().length >= 30) {
      renameSync(absoluteSaved, job.output);
      done += 1;
      appendFileSync(logPath, `${job.id}\tOK\t${job.page.type}\t${job.page.url}\tbatch-attempt=${attempt}\n`);
    } else retry.push(job);
  }
  if (retry.length) {
    const error = combinedOutput.replace(/\s+/g, ' ').slice(0, 900) || `exit=${result.code}`;
    for (const job of retry) appendFileSync(logPath, `${job.id}\tRETRY\t${job.page.type}\tattempt=${attempt}\t${error}\n`);
  }
  process.stdout.write(`key-page-scrape ${done}/${total} retry=${retry.length}\n`);
  return retry;
}

appendFileSync(logPath, `\n${new Date().toISOString()} start total=${total} pending=${pendingJobs.length} recovered=${jobs.length - pendingJobs.length}\n`);
let pending = pendingJobs;
for (let attempt = 1; attempt <= 3 && pending.length; attempt += 1) {
  const retry = [];
  for (let offset = 0; offset < pending.length; offset += batchSize) {
    const batch = pending.slice(offset, offset + batchSize);
    const batchStartedAt = Date.now();
    retry.push(...await runBatch(batch, attempt));
    if (offset + batchSize < pending.length) {
      const waitForWindow = Math.max(0, 65000 - (Date.now() - batchStartedAt));
      if (waitForWindow) await sleep(waitForWindow);
    }
  }
  pending = retry;
  if (pending.length && attempt < 3) await sleep(65000);
}
for (const job of pending) appendFileSync(logPath, `${job.id}\tFAIL\t${job.page.type}\tbatch retries exhausted\n`);
appendFileSync(logPath, `${new Date().toISOString()} done failures=${pending.length}\n`);
if (pending.length) process.exitCode = 2;
