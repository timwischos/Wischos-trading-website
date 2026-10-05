#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const batchRoot = path.join(root, '.firecrawl', 'similar-apollo-2026-09-10');
const all = JSON.parse(await readFile(path.join(batchRoot, 'gate1-targets.json'), 'utf8'));
const ids = new Set([2, 8, 9, 13, 17, 18, 22, 24, 29, 33, 35, 37, 38, 42, 44, 46, 49, 50, 52, 54, 64, 66, 72, 73, 80, 87, 90, 94]);
const targets = all.filter((lead) => ids.has(lead.id));
const outputDir = path.join(batchRoot, 'identity-supplement');
await mkdir(outputDir, { recursive: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function usable(file) {
  try {
    if ((await stat(file)).size < 100) return false;
    const payload = JSON.parse(await readFile(file, 'utf8'));
    return payload?.success === true && payload?.data?.web?.length > 0;
  } catch { return false; }
}

function search(lead, output) {
  const query = `"${lead.company}" "${lead.location}" official website`;
  return new Promise((resolve) => {
    const child = spawn('firecrawl', ['search', query, '--limit', '5', '--json', '-o', output], {
      cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => resolve({ code, stderr }));
  });
}

let complete = 0;
for (const lead of targets) {
  const output = path.join(outputDir, `${String(lead.id).padStart(2, '0')}.json`);
  if (await usable(output)) {
    complete += 1;
    process.stdout.write(`[${complete}/${targets.length}] retained ${lead.id} ${lead.company}\n`);
    continue;
  }
  let ok = false;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const result = await search(lead, output);
    ok = result.code === 0 && await usable(output);
    if (ok) break;
    process.stderr.write(`[${lead.id}] attempt ${attempt} failed: ${result.stderr.trim().slice(-400)}\n`);
    if (attempt < 5) await pause(15000);
  }
  complete += ok ? 1 : 0;
  process.stdout.write(`[${complete}/${targets.length}] ${ok ? 'saved' : 'failed'} ${lead.id} ${lead.company}\n`);
  await pause(1200);
}
process.stdout.write(`Identity supplements finished: ${complete}/${targets.length}\n`);
