#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const batchRoot = path.join(root, '.firecrawl', 'similar-apollo-2026-09-10');
const targets = JSON.parse(await readFile(path.join(batchRoot, 'gate1-targets.json'), 'utf8'));
const outputDir = path.join(batchRoot, 'gate1-search');
const concurrency = 2;
const maxAttempts = 5;
await mkdir(outputDir, { recursive: true });

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isComplete(file) {
  try {
    if ((await stat(file)).size < 100) return false;
    const payload = JSON.parse(await readFile(file, 'utf8'));
    return payload?.success === true && Array.isArray(payload?.data?.web) && payload.data.web.length > 0;
  } catch {
    return false;
  }
}

function runSearch(lead, output) {
  const query = `"${lead.company}" ${lead.location} promotional products corporate gifts official website`;
  return new Promise((resolve) => {
    const child = spawn('firecrawl', [
      'search', query,
      '--scrape',
      '--limit', '3',
      '--json',
      '-o', output,
    ], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
}

const queue = [];
for (const lead of targets) {
  const output = path.join(outputDir, `${String(lead.id).padStart(2, '0')}.json`);
  if (await isComplete(output)) {
    process.stdout.write(`[${lead.id}/95] retained ${lead.company}\n`);
  } else {
    queue.push({ lead, output });
  }
}

let next = 0;
let completed = targets.length - queue.length;
let failed = 0;

async function worker(workerId) {
  while (next < queue.length) {
    const item = queue[next];
    next += 1;
    let ok = false;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const result = await runSearch(item.lead, item.output);
      ok = result.code === 0 && await isComplete(item.output);
      if (ok) break;
      const summary = `${result.stderr}\n${result.stdout}`.replace(/\x1b\[[0-9;]*m/g, '').trim().slice(-500);
      process.stderr.write(`[worker ${workerId}] ${item.lead.id} attempt ${attempt} failed: ${summary}\n`);
      if (attempt < maxAttempts) await pause(20000);
    }
    if (ok) {
      completed += 1;
      process.stdout.write(`[${completed}/${targets.length}] saved ${item.lead.id} ${item.lead.company}\n`);
    } else {
      failed += 1;
      process.stderr.write(`[failed] ${item.lead.id} ${item.lead.company}\n`);
    }
    await pause(1500);
  }
}

await Promise.all(Array.from({ length: concurrency }, (_, index) => worker(index + 1)));
process.stdout.write(`Gate 1 searches finished: complete=${completed}, failed=${failed}, total=${targets.length}\n`);
