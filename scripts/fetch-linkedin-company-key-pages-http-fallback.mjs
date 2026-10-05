import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputRoot = path.join(batchDir, 'key-pages');
const logPath = path.join(batchDir, 'http-fallback.log');
const sites = JSON.parse(readFileSync(path.join(batchDir, 'selected-pages-manifest.json'), 'utf8'));
const jobs = [];
let total = 0;
for (const site of sites) {
  const siteDir = path.join(outputRoot, String(site.id).padStart(3, '0'));
  mkdirSync(siteDir, { recursive: true });
  site.pages.forEach((page, index) => {
    total += 1;
    const output = path.join(siteDir, `${String(index + 1).padStart(2, '0')}-${page.type}.md`);
    if (!existsSync(output) || readFileSync(output, 'utf8').trim().length < 100) jobs.push({ ...site, page, output });
  });
}

function fetchHtml(url) {
  return new Promise((resolve) => {
    const child = spawn('curl', [
      '-L', '--silent', '--show-error', '--compressed', '--connect-timeout', '7', '--max-time', '25',
      '--retry', '1', '--retry-delay', '1',
      '--user-agent', 'Mozilla/5.0 (compatible; WischosResearch/1.0; public-company-research)',
      url,
    ], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
    const stdout = [];
    let stderr = '';
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('close', (code) => resolve({ code, html: Buffer.concat(stdout).toString('utf8'), error: stderr }));
  });
}

function decodeEntities(value) {
  const named = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', copy: '©', reg: '®', trade: '™',
  };
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function htmlToText(html, url) {
  let body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    || html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    || html;
  body = body
    .replace(/<(script|style|svg|noscript|template|iframe)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<h1\b[^>]*>/gi, '\n# ').replace(/<\/h1>/gi, '\n')
    .replace(/<h2\b[^>]*>/gi, '\n## ').replace(/<\/h2>/gi, '\n')
    .replace(/<h[3-6]\b[^>]*>/gi, '\n### ').replace(/<\/h[3-6]>/gi, '\n')
    .replace(/<(p|div|section|article|header|footer|nav|ul|ol|table|tr)\b[^>]*>/gi, '\n')
    .replace(/<\/(p|div|section|article|header|footer|nav|ul|ol|table|tr)>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '\n')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  body = decodeEntities(body)
    .replace(/[\t\f\v ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return `> HTTP fallback source: ${url}\n\n${body}\n`;
}

let cursor = 0;
let done = total - jobs.length;
let failures = 0;
async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    const result = await fetchHtml(job.page.url);
    const text = result.code === 0 ? htmlToText(result.html, job.page.url) : '';
    if (text.length >= 300) {
      writeFileSync(job.output, text);
      appendFileSync(logPath, `${job.id}\tOK\t${job.page.type}\t${job.page.url}\n`);
    } else {
      failures += 1;
      appendFileSync(logPath, `${job.id}\tFAIL\t${job.page.type}\t${job.page.url}\t${(result.error || `content-length=${text.length}`).replace(/\s+/g, ' ').slice(0, 500)}\n`);
    }
    done += 1;
    if (done % 25 === 0 || done === total) process.stdout.write(`http-fallback ${done}/${total} failures=${failures}\n`);
  }
}

appendFileSync(logPath, `\n${new Date().toISOString()} start total=${total} pending=${jobs.length}\n`);
await Promise.all(Array.from({ length: 8 }, () => worker()));
appendFileSync(logPath, `${new Date().toISOString()} done failures=${failures}\n`);
if (failures) process.exitCode = 2;
