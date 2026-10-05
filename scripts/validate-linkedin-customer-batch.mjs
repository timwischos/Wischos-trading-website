import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const outputDir = path.join(root, '临时/批量客户调查-2026-08-13');
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const audited = readJson(path.join(batchDir, 'gate1-results-audited.json'));
const manifest = readJson(path.join(batchDir, 'selected-pages-manifest.json'));
const local = readJson(path.join(batchDir, 'local-analysis/companies.json')).companies;
const externalSummaryPath = path.join(batchDir, 'external-evidence/summary.json');
const externalSummary = existsSync(externalSummaryPath) ? readJson(externalSummaryPath) : null;
const externalDir = path.join(batchDir, 'external-evidence/companies');
const targets = local.filter((item) => item.target_customer && ['A', 'B'].includes(item.gate2_grade));
const issues = [];

if (audited.length !== 360) issues.push(`Gate 1 公司数应为 360，实际 ${audited.length}`);
if (new Set(audited.map((item) => item.id)).size !== audited.length) issues.push('Gate 1 存在重复 id');
if (local.length !== audited.length) issues.push(`本地分析公司数 ${local.length} 与 Gate 1 ${audited.length} 不一致`);
if (manifest.length !== audited.filter((item) => item.gate1 === 'Pass').length) issues.push('关键页站点数与 Gate 1 Pass 数不一致');

for (const item of local) {
  const shouldTarget = ['A', 'B'].includes(item.gate2_grade);
  if (item.target_customer !== shouldTarget) issues.push(`${item.id} ${item.company}: target_customer 与评级不一致`);
  if (!shouldTarget && ((item.pain_points || []).length || (item.china_supplier_entry_angles || []).length)) {
    issues.push(`${item.id} ${item.company}: 非目标客户含痛点/切入角度`);
  }
  if (shouldTarget && (!(item.pain_points || []).length || !(item.china_supplier_entry_angles || []).length)) {
    issues.push(`${item.id} ${item.company}: A/B 缺痛点或切入角度`);
  }
}

for (const item of targets) {
  const file = path.join(externalDir, `${item.slug}.json`);
  if (!existsSync(file)) {
    issues.push(`${item.id} ${item.company}: 缺 Gate 2 外部证据文件`);
    continue;
  }
  const evidence = readJson(file);
  // A retried query that still fails is deliberately persisted as Unknown.
  // It is complete for coverage purposes and must not be treated as a missing
  // query or as negative evidence about the company.
  if ((evidence.completed_queries + evidence.failed_queries) !== 17) {
    issues.push(`${item.id} ${item.company}: 外部查询 completed=${evidence.completed_queries}, failed=${evidence.failed_queries}`);
  }
  const customs = Object.values(evidence.queries || {}).filter((query) => query.family === 'customs');
  if (customs.length !== 8) issues.push(`${item.id} ${item.company}: 海关平台记录数 ${customs.length}/8`);
  if (customs.some((query) => query.negative_inference_allowed !== false)) issues.push(`${item.id} ${item.company}: 存在允许负向推断的海关结果`);
}

const summaryMd = path.join(outputDir, '全部客户取舍原因.md');
if (existsSync(summaryMd)) {
  const reasonRows = (readFileSync(summaryMd, 'utf8').match(/^\| \d+ \|/gm) || []).length;
  if (reasonRows !== audited.length) issues.push(`全部客户取舍 Markdown 行数 ${reasonRows}/360`);
}
const profileRoot = path.join(outputDir, '档案');
const countProfiles = (directory) => existsSync(directory)
  ? readdirSync(directory, { withFileTypes: true }).reduce((sum, entry) => sum + (entry.isDirectory() ? countProfiles(path.join(directory, entry.name)) : entry.name.endsWith('.md') ? 1 : 0), 0)
  : 0;
const profileCount = countProfiles(profileRoot);
if (existsSync(summaryMd) && profileCount !== targets.length) issues.push(`目标客户档案数 ${profileCount}/${targets.length}`);

const report = {
  checked_at: new Date().toISOString(),
  pass: issues.length === 0,
  totals: {
    companies: audited.length,
    gate1_pass: audited.filter((item) => item.gate1 === 'Pass').length,
    targets: targets.length,
    profiles: profileCount,
    planned_pages: manifest.reduce((sum, site) => sum + site.pages.length, 0),
    key_page_files: readdirSync(path.join(batchDir, 'key-pages'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .reduce((sum, entry) => sum + readdirSync(path.join(batchDir, 'key-pages', entry.name)).filter((name) => name.endsWith('.md')).length, 0),
    external_queries_planned: externalSummary?.queries_planned ?? 0,
    external_queries_complete: externalSummary?.queries_complete ?? 0,
    external_queries_failed: externalSummary?.queries_failed ?? 0,
  },
  issues,
};
writeFileSync(path.join(outputDir, '质量检查.json'), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(report)}\n`);
if (issues.length) process.exitCode = 2;
