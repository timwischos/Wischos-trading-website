---
phase: 6
slug: go-to-market
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (existing) |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 1 | GTM-01 | manual | — | ✅ doc | ⬜ pending |
| 6-01-02 | 01 | 1 | GTM-02 | manual | — | ✅ doc | ⬜ pending |
| 6-02-01 | 02 | 1 | GTM-03 | unit | `npx vitest run src/routes` | ❌ W0 | ⬜ pending |
| 6-02-02 | 02 | 1 | GTM-03 | unit | `npx vitest run src/routes` | ❌ W0 | ⬜ pending |
| 6-02-03 | 02 | 2 | GTM-03 | unit | `npx vitest run src/routes` | ❌ W0 | ⬜ pending |
| 6-03-01 | 03 | 1 | GTM-04 | manual | — | ✅ doc | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/routes/__tests__/seo-gaps.test.ts` — stubs for GTM-03 SEO/GEO fixes
- [ ] `src/routes/__tests__/faq-page.test.ts` — stubs for FAQ page route

*If existing test infrastructure covers: supplement only for new routes/components.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ICP document completeness | GTM-01 | Document artifact, not code | Read ICP.md — confirm all 5 fields present: roles, company sizes, industries, geographies, pain points |
| Google search operator playbook | GTM-02 | External search, not code | Run 3 sample queries in Google — confirm results surface SMB prospects |
| LinkedIn launch kit completeness | GTM-04 | External platform, not code | Read LinkedIn kit doc — confirm personal + company copy + 4-week calendar present |
| `robots.txt` AI bot directives | GTM-03 | File content check | `curl https://wischosgift.com/robots.txt` — confirm GPTBot, ClaudeBot, PerplexityBot rules present |
| FAQ page JSON-LD | GTM-03 | Rich results validation | Google Rich Results Test on /faq page |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
