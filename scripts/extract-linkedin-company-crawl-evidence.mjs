import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const batchDir = path.join(root, '.firecrawl/linkedin-company-batch-2026-08-13');
const crawlDir = path.join(batchDir, 'crawl');
const evidenceDir = path.join(batchDir, 'evidence');
mkdirSync(evidenceDir, { recursive: true });

const gate1 = JSON.parse(readFileSync(path.join(batchDir, 'gate1-results.json'), 'utf8'));
const keywordPattern = /promotional|merchandise|corporate gift|executive gift|branded|swag|award|recognition|incentive|metal|stainless|aluminium|aluminum|brass|zinc|pen|drinkware|tumbler|bottle|desk|edc|keyring|medal|pin|apparel|clothing|uniform|print|embroid|sustain|eco|supplier|sourc|import|warehouse|fulfil|fulfill|distribut|wholesale|trade only|private label|custom|bespoke|client|industry|founded|established|years|team|director|owner|founder|contact|email|phone|rush|same day|local made|made in canada|handmade|artisan/i;

function compactLines(markdown) {
  const lines = markdown.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const selected = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^#{1,4}\s/.test(line) || keywordPattern.test(line)) {
      selected.push(line.slice(0, 1200));
      if (selected.length >= 140) break;
    }
  }
  return [...new Set(selected)];
}

function extractEmails(text) {
  return [...new Set(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])].slice(0, 20);
}

function extractPhones(text) {
  return [...new Set(text.match(/(?:\+?\d[\d().\s-]{7,}\d)/g) || [])]
    .map((phone) => phone.replace(/\s+/g, ' ').trim())
    .filter((phone) => phone.length <= 30)
    .slice(0, 15);
}

let completed = 0;
let missing = 0;
const manifest = [];

for (const item of gate1) {
  const crawlPath = path.join(crawlDir, `${item.slug}.json`);
  if (!existsSync(crawlPath)) {
    missing += 1;
    manifest.push({ id: item.id, company: item.company, evidence: '', status: 'no-crawl' });
    continue;
  }
  let raw;
  try {
    raw = JSON.parse(readFileSync(crawlPath, 'utf8'));
  } catch {
    manifest.push({ id: item.id, company: item.company, evidence: '', status: 'invalid-crawl' });
    continue;
  }
  const pages = (raw.data || []).map((page) => {
    const markdown = page.markdown || '';
    return {
      title: page.metadata?.title || '',
      url: page.metadata?.sourceURL || page.metadata?.url || '',
      description: page.metadata?.description || '',
      status_code: page.metadata?.statusCode || null,
      relevant_lines: compactLines(markdown),
      emails: extractEmails(markdown),
      phones: extractPhones(markdown),
    };
  });
  const evidence = {
    id: item.id,
    company: item.company,
    input_location: item.location,
    linkedin_industry: item.industry,
    linkedin_positioning: item.linkedin_positioning,
    linkedin_followers: item.followers,
    linkedin_notes: item.linkedin_notes,
    official_url: item.official_url,
    gate1_machine: item.gate1,
    gate1_reason_machine: item.reason,
    homepage_evidence: item.homepage_evidence,
    search_sources: item.search_sources,
    crawl_status: raw.status,
    crawl_credits: raw.creditsUsed,
    pages,
  };
  const outputPath = path.join(evidenceDir, `${item.slug}.json`);
  writeFileSync(outputPath, JSON.stringify(evidence, null, 2));
  manifest.push({ id: item.id, company: item.company, evidence: path.relative(root, outputPath), status: 'ready' });
  completed += 1;
}

writeFileSync(path.join(batchDir, 'evidence-manifest.json'), JSON.stringify(manifest, null, 2));
process.stdout.write(`evidence-ready=${completed} missing-crawl=${missing}\n`);

