import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, '临时/LinkedIn品牌商品公司搜索结果.md');
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const searchDir = path.join(batchDir, 'search');
const manifestPath = path.join(batchDir, 'companies.json');
const logPath = path.join(batchDir, 'gate1-search.log');

mkdirSync(searchDir, { recursive: true });

function splitRow(line) {
  const cells = [];
  let current = '';
  let escaped = false;
  for (const ch of line) {
    if (escaped) {
      current += ch;
      escaped = false;
    } else if (ch === '\\') {
      escaped = true;
    } else if (ch === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells.slice(1, -1);
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 70) || 'company';
}

const companies = readFileSync(sourcePath, 'utf8')
  .split(/\r?\n/)
  .filter((line) => /^\|\s*\d+\s*\|/.test(line))
  .map((line) => {
    const [sequence, company, industry, location, positioning, followers, notes] = splitRow(line);
    const id = Number(sequence);
    return {
      id,
      company,
      industry,
      location,
      linkedin_positioning: positioning,
      followers,
      linkedin_notes: notes,
      slug: `${String(id).padStart(3, '0')}-${slugify(company)}`,
    };
  });

writeFileSync(manifestPath, JSON.stringify(companies, null, 2));

const pending = companies.filter((company) => {
  const outputPath = path.join(searchDir, `${company.slug}.json`);
  return !existsSync(outputPath) || readFileSync(outputPath, 'utf8').trim().length < 20;
});

appendFileSync(logPath, `\n${new Date().toISOString()} start total=${companies.length} pending=${pending.length}\n`);

let cursor = 0;
let completed = companies.length - pending.length;
let failures = 0;
let nextStartAt = Date.now();
let rateQueue = Promise.resolve();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForRateSlot() {
  const slot = rateQueue.then(async () => {
    const delay = Math.max(0, nextStartAt - Date.now());
    if (delay > 0) await sleep(delay);
    nextStartAt = Date.now() + 7000;
  });
  rateQueue = slot.catch(() => {});
  return slot;
}

function executeSearch(company, outputPath) {
  return new Promise((resolve) => {
    const city = company.location.split(',')[0].trim();
    const query = `"${company.company}" ${city} official website`;
    const child = spawn('firecrawl', ['search', query, '--limit', '5', '--json', '-o', outputPath], {
      cwd: root,
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('close', (code) => {
      resolve({ code, stderr });
    });
  });
}

async function runOne(company) {
  const outputPath = path.join(searchDir, `${company.slug}.json`);
  let finalError = '';
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    await waitForRateSlot();
    const result = await executeSearch(company, outputPath);
    if (result.code === 0 && existsSync(outputPath) && readFileSync(outputPath, 'utf8').trim().length >= 20) {
      appendFileSync(logPath, `${company.id}\tOK\t${company.company}\tattempt=${attempt}\n`);
      finalError = '';
      break;
    }
    finalError = result.stderr.replace(/\s+/g, ' ').slice(0, 500) || `exit=${result.code}`;
    if (finalError.includes('429') && attempt < 5) {
      appendFileSync(logPath, `${company.id}\tRETRY\t${company.company}\tattempt=${attempt}\t${finalError}\n`);
      await sleep(65000);
      continue;
    }
    break;
  }

  completed += 1;
  if (finalError) {
    failures += 1;
    appendFileSync(logPath, `${company.id}\tFAIL\t${company.company}\t${finalError}\n`);
  }
  if (completed % 10 === 0 || completed === companies.length) {
    process.stdout.write(`gate1-search ${completed}/${companies.length} failures=${failures}\n`);
  }
}

async function worker() {
  while (cursor < pending.length) {
    const company = pending[cursor];
    cursor += 1;
    await runOne(company);
  }
}

await Promise.all([worker(), worker()]);
appendFileSync(logPath, `${new Date().toISOString()} done failures=${failures}\n`);

if (failures > 0) process.exitCode = 2;
