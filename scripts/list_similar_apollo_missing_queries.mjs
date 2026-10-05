#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const base = path.join(root, '.firecrawl/similar-apollo-2026-09-10/external-evidence');
const plan = JSON.parse(readFileSync(path.join(base, 'plan.json'), 'utf8'));
const missing = [];
for (const company of plan.companies) {
  const evidence = JSON.parse(readFileSync(path.join(base, 'companies', `${company.slug}.json`), 'utf8'));
  for (let index = 0; index < company.tasks.length; index += 1) {
    const task = company.tasks[index];
    if (evidence.queries?.[task.key]?.run_status === 'completed') continue;
    missing.push({
      slug: company.slug, company: company.company, country_detection: company.country_detection,
      index, task,
    });
  }
}
const offset = Number(process.argv[2] || 0);
const limit = Number(process.argv[3] || missing.length);
process.stdout.write(JSON.stringify(missing.slice(offset, offset + limit)));
