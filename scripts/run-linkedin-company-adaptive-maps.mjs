import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputDir = path.join(batchDir, 'maps');
const logPath = path.join(batchDir, 'adaptive-map.log');
mkdirSync(outputDir, { recursive: true });

const auditedPath = path.join(batchDir, 'gate1-results-audited.json');
const all = JSON.parse(readFileSync(existsSync(auditedPath) ? auditedPath : path.join(batchDir, 'gate1-results.json'), 'utf8'));
// Full mapping is the expensive Gate 1.5 step: only machine-Pass sites receive it.
// Review sites retain search/homepage evidence and are resolved as C/D/Reject unless later rescued.
const candidates = all.filter((item) => item.official_url && item.gate1 === 'Pass');

function normaliseHost(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

function mapMatchesOfficial(output, officialUrl) {
  if (!existsSync(output) || readFileSync(output, 'utf8').trim().length < 20) return false;
  try {
    const payload = JSON.parse(readFileSync(output, 'utf8'));
    const links = payload?.data?.links ?? payload?.links ?? [];
    const officialHost = normaliseHost(officialUrl);
    return Boolean(officialHost) && links.some((link) => {
      const url = typeof link === 'string' ? link : link?.url;
      const mappedHost = normaliseHost(url);
      return mappedHost === officialHost
        || mappedHost.endsWith(`.${officialHost}`)
        || officialHost.endsWith(`.${mappedHost}`);
    });
  } catch {
    return false;
  }
}

const pending = candidates.filter((item) => {
  const output = path.join(outputDir, `${item.slug}.json`);
  return !mapMatchesOfficial(output, item.official_url);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let cursor = 0;
let done = candidates.length - pending.length;
let failures = 0;

function execute(item, output) {
  return new Promise((resolve) => {
    const child = spawn('firecrawl', ['map', item.official_url, '--limit', '150', '--json', '-o', output], {
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
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const result = await execute(item, output);
    if (result.code === 0 && mapMatchesOfficial(output, item.official_url)) {
      appendFileSync(logPath, `${item.id}\tOK\t${item.company}\tattempt=${attempt}\n`);
      error = '';
      break;
    }
    error = result.stderr.replace(/\s+/g, ' ').slice(0, 700) || `exit=${result.code}`;
    await sleep(error.includes('429') ? 65000 : 8000);
  }
  done += 1;
  if (error) {
    failures += 1;
    appendFileSync(logPath, `${item.id}\tFAIL\t${item.company}\t${error}\n`);
  }
  if (done % 10 === 0 || done === candidates.length) {
    process.stdout.write(`adaptive-map ${done}/${candidates.length} failures=${failures}\n`);
  }
}

async function worker() {
  while (cursor < pending.length) {
    const item = pending[cursor++];
    await runOne(item);
  }
}

appendFileSync(logPath, `\n${new Date().toISOString()} start candidates=${candidates.length} pending=${pending.length}\n`);
await Promise.all([worker(), worker()]);
appendFileSync(logPath, `${new Date().toISOString()} done failures=${failures}\n`);
if (failures) process.exitCode = 2;
