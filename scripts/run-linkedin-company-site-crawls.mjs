import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputDir = path.join(batchDir, 'crawl');
const logPath = path.join(batchDir, 'site-crawl.log');
mkdirSync(outputDir, { recursive: true });

const all = JSON.parse(readFileSync(path.join(batchDir, 'gate1-results.json'), 'utf8'));
const candidates = all.filter((item) => item.official_url && item.gate1 !== 'Reject');
const pending = candidates.filter((item) => {
  const output = path.join(outputDir, `${item.slug}.json`);
  return !existsSync(output) || readFileSync(output, 'utf8').trim().length < 100;
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let cursor = 0;
let completed = candidates.length - pending.length;
let failures = 0;

function execute(item, output) {
  return new Promise((resolve) => {
    const child = spawn('firecrawl', [
      'crawl', item.official_url, '--max-depth', '2', '--limit', '5', '--wait', '-o', output,
    ], { cwd: root, stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => resolve({ code, stderr }));
  });
}

async function runOne(item) {
  const output = path.join(outputDir, `${item.slug}.json`);
  let error = '';
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const result = await execute(item, output);
    if (result.code === 0 && existsSync(output) && readFileSync(output, 'utf8').trim().length >= 100) {
      appendFileSync(logPath, `${item.id}\tOK\t${item.company}\tattempt=${attempt}\n`);
      error = '';
      break;
    }
    error = result.stderr.replace(/\s+/g, ' ').slice(0, 800) || `exit=${result.code}`;
    appendFileSync(logPath, `${item.id}\tRETRY\t${item.company}\tattempt=${attempt}\t${error}\n`);
    await sleep(error.includes('429') ? 65000 : 15000);
  }
  completed += 1;
  if (error) {
    failures += 1;
    appendFileSync(logPath, `${item.id}\tFAIL\t${item.company}\t${error}\n`);
  }
  if (completed % 5 === 0 || completed === candidates.length) {
    process.stdout.write(`site-crawl ${completed}/${candidates.length} failures=${failures}\n`);
  }
}

async function worker() {
  while (cursor < pending.length) {
    const item = pending[cursor];
    cursor += 1;
    await runOne(item);
  }
}

appendFileSync(logPath, `\n${new Date().toISOString()} start candidates=${candidates.length} pending=${pending.length}\n`);
await Promise.all([worker(), worker()]);
appendFileSync(logPath, `${new Date().toISOString()} done failures=${failures}\n`);
if (failures) process.exitCode = 2;
