import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputDir = path.join(batchDir, 'search-alt');
const logPath = path.join(batchDir, 'gate1-search-alt.log');
mkdirSync(outputDir, { recursive: true });

const all = JSON.parse(readFileSync(path.join(batchDir, 'gate1-results.json'), 'utf8'));
const selected = all.filter((item) => item.gate1 !== 'Pass');
const pending = selected.filter((item) => {
  const output = path.join(outputDir, `${item.slug}.json`);
  return !existsSync(output) || readFileSync(output, 'utf8').trim().length < 20;
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let cursor = 0;
let completed = selected.length - pending.length;
let failures = 0;
let nextStartAt = Date.now();
let rateQueue = Promise.resolve();

function waitForRateSlot() {
  const slot = rateQueue.then(async () => {
    const delay = Math.max(0, nextStartAt - Date.now());
    if (delay) await sleep(delay);
    nextStartAt = Date.now() + 7000;
  });
  rateQueue = slot.catch(() => {});
  return slot;
}

function execute(item, output) {
  return new Promise((resolve) => {
    const shortName = item.company.split('|')[0].trim();
    const city = item.location.split(',')[0].trim();
    const query = `"${shortName}" ${city} promotional merchandise`;
    const child = spawn('firecrawl', ['search', query, '--limit', '5', '--json', '-o', output], {
      cwd: root,
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => resolve({ code, stderr }));
  });
}

async function runOne(item) {
  const output = path.join(outputDir, `${item.slug}.json`);
  let error = '';
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    await waitForRateSlot();
    const result = await execute(item, output);
    if (result.code === 0 && existsSync(output) && readFileSync(output, 'utf8').trim().length >= 20) {
      appendFileSync(logPath, `${item.id}\tOK\t${item.company}\tattempt=${attempt}\n`);
      error = '';
      break;
    }
    error = result.stderr.replace(/\s+/g, ' ').slice(0, 500) || `exit=${result.code}`;
    if (error.includes('429') && attempt < 5) {
      appendFileSync(logPath, `${item.id}\tRETRY\t${error}\n`);
      await sleep(65000);
      continue;
    }
    break;
  }
  completed += 1;
  if (error) {
    failures += 1;
    appendFileSync(logPath, `${item.id}\tFAIL\t${item.company}\t${error}\n`);
  }
  if (completed % 10 === 0 || completed === selected.length) {
    process.stdout.write(`gate1-fallback ${completed}/${selected.length} failures=${failures}\n`);
  }
}

async function worker() {
  while (cursor < pending.length) {
    const item = pending[cursor];
    cursor += 1;
    await runOne(item);
  }
}

appendFileSync(logPath, `\n${new Date().toISOString()} start selected=${selected.length} pending=${pending.length}\n`);
await Promise.all([worker(), worker()]);
appendFileSync(logPath, `${new Date().toISOString()} done failures=${failures}\n`);
if (failures) process.exitCode = 2;

