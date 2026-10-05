import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputRoot = path.join(batchDir, 'key-pages');
const logPath = path.join(batchDir, 'key-page-scrape.log');
const sites = JSON.parse(readFileSync(path.join(batchDir, 'selected-pages-manifest.json'), 'utf8'));
const jobs = [];
let total = 0;
for (const site of sites) {
  const siteDir = path.join(outputRoot, String(site.id).padStart(3, '0'));
  mkdirSync(siteDir, { recursive: true });
  site.pages.forEach((page, index) => {
    total += 1;
    const output = path.join(siteDir, `${String(index + 1).padStart(2, '0')}-${page.type}.md`);
    if (!existsSync(output) || readFileSync(output, 'utf8').trim().length < 30) jobs.push({ ...site, page, output });
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let nextRequestAt = Date.now();
let rateQueue = Promise.resolve();
function acquireSlot() {
  const slot = rateQueue.then(async () => {
    const delay = Math.max(0, nextRequestAt - Date.now());
    if (delay) await sleep(delay);
    nextRequestAt = Date.now() + 4800;
  });
  rateQueue = slot.catch(() => {});
  return slot;
}

function execute(job) {
  return new Promise((resolve) => {
    const child = spawn('firecrawl', ['scrape', job.page.url, '--only-main-content', '-o', job.output], {
      cwd: root, stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    const timeout = setTimeout(() => {
      stderr += ' timeout-after-35s';
      child.kill('SIGTERM');
    }, 35000);
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({ code, stderr });
    });
  });
}

let cursor = 0;
let done = total - jobs.length;
let failures = 0;
async function runOne(job) {
  let error = '';
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    await acquireSlot();
    const result = await execute(job);
    if (result.code === 0 && existsSync(job.output) && readFileSync(job.output, 'utf8').trim().length >= 30) {
      appendFileSync(logPath, `${job.id}\tOK\t${job.page.type}\t${job.page.url}\tindividual-attempt=${attempt}\n`);
      error = '';
      break;
    }
    error = result.stderr.replace(/\s+/g, ' ').slice(0, 800) || `exit=${result.code}`;
    if (/429|rate limit/i.test(error)) await sleep(65000);
    else if (attempt < 2) await sleep(5000 * attempt);
  }
  done += 1;
  if (error) {
    failures += 1;
    appendFileSync(logPath, `${job.id}\tFAIL\t${job.page.type}\t${job.page.url}\t${error}\n`);
  }
  if (done % 20 === 0 || done === total) process.stdout.write(`key-page-individual ${done}/${total} failures=${failures}\n`);
}

async function worker() {
  while (cursor < jobs.length) await runOne(jobs[cursor++]);
}

appendFileSync(logPath, `\n${new Date().toISOString()} individual-start total=${total} pending=${jobs.length}\n`);
await Promise.all([worker(), worker()]);
appendFileSync(logPath, `${new Date().toISOString()} individual-done failures=${failures}\n`);
if (failures) process.exitCode = 2;
