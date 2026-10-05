#!/usr/bin/env node
/** Merge a web-search fallback result chunk into external-evidence company files. */
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const base = path.join(root, '.firecrawl/similar-apollo-2026-09-10/external-evidence');
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/apply_similar_apollo_web_fallback.mjs <chunk.json>');
const chunk = JSON.parse(readFileSync(input, 'utf8'));
const plan = JSON.parse(readFileSync(path.join(base, 'plan.json'), 'utf8'));

function readJson(file) { return JSON.parse(readFileSync(file, 'utf8')); }
function atomicJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temp, file);
}
function refresh(evidence, tasks) {
  const active = tasks.map((task) => evidence.queries?.[task.key]).filter(Boolean);
  evidence.planned_queries = tasks.length;
  evidence.completed_queries = active.filter((query) => query.run_status === 'completed').length;
  evidence.failed_queries = active.filter((query) => query.run_status === 'failed').length;
  evidence.updated_at = new Date().toISOString();
}

const byCompany = new Map();
for (const row of chunk) {
  if (!row.searched) throw new Error(`Unsearched fallback row: ${row.slug}/${row.task.key}`);
  if (!byCompany.has(row.slug)) byCompany.set(row.slug, []);
  byCompany.get(row.slug).push(row);
}
for (const [slug, rows] of byCompany) {
  const planned = plan.companies.find((company) => company.slug === slug);
  if (!planned) throw new Error(`Unknown company slug: ${slug}`);
  const evidenceFile = path.join(base, 'companies', `${slug}.json`);
  const evidence = readJson(evidenceFile);
  for (const row of rows) {
    const task = planned.tasks[row.index];
    if (!task || task.key !== row.task.key) throw new Error(`Task mismatch: ${slug}/${row.task.key}`);
    const sources = (row.sources || []).slice(0, 3).map((source, index) => ({
      title: source.title || source.url, url: source.url, description: '', position: index + 1,
    }));
    const rawFile = path.join(base, 'raw', slug, `${String(row.index + 1).padStart(2, '0')}-${task.key}.json`);
    atomicJson(rawFile, { success: true, data: { web: sources }, fallback_provider: 'openai-web-search' });
    const hit = sources.length > 0;
    const canadaImportYeti = planned.country_detection?.value === 'Canada' && task.key === 'customs_importyeti';
    evidence.queries[task.key] = {
      ...task, searched_at: new Date().toISOString(), run_status: 'completed',
      raw_file: path.relative(root, rawFile), result_count: sources.length,
      assessment: hit ? 'candidate_hit_needs_verification' : 'no_public_match_found',
      status_zh: hit ? '有候选证据（待核验）' : '本次公开搜索未命中（中性）',
      matched_source_count: sources.length, matched_sources: sources,
      negative_inference_allowed: false,
      grading_effect: hit ? 'positive_candidate_only_pending_verification' : 'neutral',
      canada_importyeti_rule_applied: canadaImportYeti,
      interpretation: hit
        ? '搜索摘要只构成候选线索，需打开原始来源核验公司身份和事实后方可引用。'
        : (canadaImportYeti
          ? 'ImportYeti 仅覆盖美国海关数据；加拿大公司未命中不得推断未进口或采购弱。'
          : '公开搜索未命中不等于现实中不存在该记录，不作为单独降级依据。'),
      sources, search_provider: 'openai-web-search-fallback',
    };
  }
  refresh(evidence, planned.tasks);
  atomicJson(evidenceFile, evidence);
}

const states = plan.companies.map((company) => readJson(path.join(base, 'companies', `${company.slug}.json`)));
const summary = {
  updated_at: new Date().toISOString(), companies_total: states.length,
  companies_complete: states.filter((state) => state.completed_queries === state.planned_queries && state.failed_queries === 0).length,
  queries_planned: states.reduce((sum, state) => sum + state.planned_queries, 0),
  queries_complete: states.reduce((sum, state) => sum + state.completed_queries, 0),
  queries_failed: states.reduce((sum, state) => sum + state.failed_queries, 0),
  canada_companies: states.filter((state) => state.company?.country_detection?.value === 'Canada').length,
  fallback_provider: 'openai-web-search',
};
atomicJson(path.join(base, 'summary.json'), summary);
process.stdout.write(`${JSON.stringify(summary)}\n`);
