#!/usr/bin/env node
/** Resume missing Firecrawl evidence queries with DuckDuckGo's public HTML SERP. */

import { spawn } from 'node:child_process';
import {
  existsSync, mkdirSync, readFileSync, renameSync, writeFileSync,
} from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const base = path.join(root, '.firecrawl/similar-apollo-2026-09-10/external-evidence');
const plan = JSON.parse(readFileSync(path.join(base, 'plan.json'), 'utf8'));
const targets = JSON.parse(readFileSync(path.join(root, '.firecrawl/similar-apollo-2026-09-10/external-evidence-targets.json'), 'utf8'));
const targetById = new Map(targets.map((target) => [Number(target.id), target]));
const intervalMs = Number(process.argv[2] || 2200);
const limit = 3;

function readJson(file) {
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; }
}

function atomicJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temp, file);
}

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

function decodeHtml(value = '') {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z]+);/gi, (whole, n) => named[n.toLowerCase()] ?? whole);
}

function plain(value = '') {
  return decodeHtml(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function resultUrl(href = '') {
  const decoded = decodeHtml(href);
  try {
    const absolute = decoded.startsWith('//') ? `https:${decoded}` : decoded;
    const parsed = new URL(absolute);
    const wrapped = parsed.searchParams.get('uddg');
    return wrapped ? decodeURIComponent(wrapped) : absolute;
  } catch {
    return decoded;
  }
}

function parseResults(html) {
  const results = [];
  const pattern = /<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const url = resultUrl(match[1]);
    if (!/^https?:\/\//i.test(url)) continue;
    results.push({ title: plain(match[2]), url, description: plain(match[3]), position: results.length + 1 });
    if (results.length >= limit) break;
  }
  return results;
}

function curlSearch(query) {
  return new Promise((resolve) => {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const child = spawn('curl', ['-sS', '-L', '--connect-timeout', '10', '--max-time', '30', '-A', 'Mozilla/5.0', url], {
      cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => resolve({ ok: false, error: error.message, html: '' }));
    child.on('close', (code) => {
      const blocked = /anomaly|captcha|automated quer/i.test(stdout);
      const validPage = /<title>[\s\S]*DuckDuckGo/i.test(stdout);
      resolve({ ok: code === 0 && !blocked && validPage, error: stderr.trim() || `curl exit=${code}`, html: stdout });
    });
  });
}

function refresh(evidence, tasks) {
  const active = tasks.map((task) => evidence.queries?.[task.key]).filter(Boolean);
  evidence.planned_queries = tasks.length;
  evidence.completed_queries = active.filter((query) => query.run_status === 'completed').length;
  evidence.failed_queries = active.filter((query) => query.run_status === 'failed').length;
  evidence.updated_at = new Date().toISOString();
}

function summary() {
  const states = plan.companies.map((company) => readJson(path.join(base, 'companies', `${company.slug}.json`))).filter(Boolean);
  const value = {
    updated_at: new Date().toISOString(),
    companies_total: states.length,
    companies_complete: states.filter((state) => state.completed_queries === state.planned_queries && state.failed_queries === 0).length,
    queries_planned: states.reduce((sum, state) => sum + state.planned_queries, 0),
    queries_complete: states.reduce((sum, state) => sum + state.completed_queries, 0),
    queries_failed: states.reduce((sum, state) => sum + state.failed_queries, 0),
    canada_companies: states.filter((state) => state.company?.country_detection?.value === 'Canada').length,
    fallback_provider: 'duckduckgo-html',
  };
  atomicJson(path.join(base, 'summary.json'), value);
  return value;
}

let attempted = 0;
let succeeded = 0;
let failed = 0;
// Firecrawl creates company shells lazily.  Create the remaining shells before
// the fallback run so the final summary always covers all 46 companies.
for (const company of plan.companies) {
  const evidenceFile = path.join(base, 'companies', `${company.slug}.json`);
  if (existsSync(evidenceFile)) continue;
  const target = targetById.get(Number(company.id)) || {};
  atomicJson(evidenceFile, {
    schema_version: '1.0',
    updated_at: new Date().toISOString(),
    company: {
      id: company.id, slug: company.slug, name: company.company,
      location: company.location || '', country_detection: company.country_detection,
      official_url: target.official_url || '', gate1: company.gate1,
    },
    policy: {
      raw_web_content_is_untrusted: true,
      search_snippets_require_source_verification: true,
      no_public_search_match_is_not_proof_of_absence: true,
      customs_platforms_are_never_skipped_by_country: true,
      canada_importyeti: 'ImportYeti 仅覆盖美国海关数据。加拿大客户未命中不得作为未进口、进口少、采购弱或降级证据；仅核验后的命中可作正向证据。',
    },
    planned_queries: company.tasks.length, completed_queries: 0, failed_queries: 0, queries: {},
  });
}

for (const company of plan.companies) {
  const evidenceFile = path.join(base, 'companies', `${company.slug}.json`);
  const evidence = readJson(evidenceFile);
  if (!evidence) throw new Error(`Missing company evidence shell: ${company.slug}`);
  evidence.queries ||= {};
  for (let index = 0; index < company.tasks.length; index += 1) {
    const task = company.tasks[index];
    if (evidence.queries[task.key]?.run_status === 'completed') continue;
    attempted += 1;
    process.stdout.write(`fallback start ${attempted}: ${company.slug}/${task.key}\n`);
    let results = null;
    let lastError = '';
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      if (attempted > 1 || attempt > 1) await wait(intervalMs * (attempt === 1 ? 1 : attempt));
      const response = await curlSearch(task.query);
      if (response.ok) {
        results = parseResults(response.html);
        break;
      }
      // A genuine zero-result page may have no result__a but is still a completed check.
      if (response.html && /No results|no-results|result--no-result/i.test(response.html)) {
        results = [];
        break;
      }
      lastError = response.error || 'DuckDuckGo HTML unavailable';
    }
    if (results === null) {
      failed += 1;
      process.stdout.write(`fallback failed: ${company.slug}/${task.key} ${lastError}\n`);
      evidence.queries[task.key] = {
        ...task, searched_at: new Date().toISOString(), run_status: 'failed',
        assessment: 'unavailable', status_zh: '无法访问', negative_inference_allowed: false,
        grading_effect: 'neutral', interpretation: '公开搜索失败不是无记录；后续应重试。',
        error: lastError, sources: [], matched_sources: [], search_provider: 'duckduckgo-html-fallback',
      };
    } else {
      succeeded += 1;
      process.stdout.write(`fallback ok: ${company.slug}/${task.key} results=${results.length}\n`);
      const rawFile = path.join(base, 'raw', company.slug, `${String(index + 1).padStart(2, '0')}-${task.key}.json`);
      atomicJson(rawFile, { success: true, data: { web: results }, fallback_provider: 'duckduckgo-html' });
      const hit = results.length > 0;
      const canadaImportYeti = company.country_detection?.value === 'Canada' && task.key === 'customs_importyeti';
      evidence.queries[task.key] = {
        ...task,
        searched_at: new Date().toISOString(),
        run_status: 'completed',
        raw_file: path.relative(root, rawFile),
        result_count: results.length,
        assessment: hit ? 'candidate_hit_needs_verification' : 'no_public_match_found',
        status_zh: hit ? '有候选证据（待核验）' : '本次公开搜索未命中（中性）',
        matched_source_count: results.length,
        matched_sources: results,
        negative_inference_allowed: false,
        grading_effect: hit ? 'positive_candidate_only_pending_verification' : 'neutral',
        canada_importyeti_rule_applied: canadaImportYeti,
        interpretation: hit
          ? '搜索摘要只构成候选线索，需打开原始来源核验公司身份和事实后方可引用。'
          : (canadaImportYeti
            ? 'ImportYeti 仅覆盖美国海关数据；加拿大公司未命中不得推断未进口或采购弱。'
            : '公开搜索未命中不等于现实中不存在该记录，不作为单独降级依据。'),
        sources: results,
        search_provider: 'duckduckgo-html-fallback',
      };
    }
    refresh(evidence, company.tasks);
    atomicJson(evidenceFile, evidence);
    if (attempted % 10 === 0) {
      const state = summary();
      process.stdout.write(`fallback attempted=${attempted} ok=${succeeded} failed=${failed}; total=${state.queries_complete}/${state.queries_planned}\n`);
    }
  }
}

const final = summary();
process.stdout.write(`${JSON.stringify({ attempted, succeeded, failed, ...final })}\n`);
if (final.queries_failed) process.exitCode = 2;
