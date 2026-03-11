---
phase: 2
slug: core-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (already installed) |
| **Config file** | `vite.config.ts` (shared with Vite build) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | LAND-01..06, ABOUT-01..05 | unit | `npx vitest run src/content` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | PROC-01..05 | unit | `npx vitest run src/content` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | LEGAL-01 | unit | `npx vitest run src/content` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | LAND-01 | manual | Visual check at localhost:3000 | N/A | ⬜ pending |
| 02-02-02 | 02 | 2 | LAND-02, LAND-03 | manual | Visual check at localhost:3000 | N/A | ⬜ pending |
| 02-02-03 | 02 | 2 | LAND-04, LAND-05, LAND-06 | manual | Visual check at localhost:3000 | N/A | ⬜ pending |
| 02-03-01 | 03 | 2 | ABOUT-01..05 | manual | Visual check at localhost:3000/about | N/A | ⬜ pending |
| 02-04-01 | 04 | 2 | PROC-01..05 | manual | Visual check at localhost:3000/how-it-works | N/A | ⬜ pending |
| 02-05-01 | 05 | 2 | LEGAL-01, LEGAL-02 | manual | Visual check at localhost:3000/privacy | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/content/__tests__/homepage.test.ts` — assert required keys exist and are non-empty strings
- [ ] `src/content/__tests__/about.test.ts` — assert required keys exist; PLACEHOLDER key contains expected text
- [ ] `src/content/__tests__/howItWorks.test.ts` — assert steps.length >= 4; samplePolicy, leadTimes, paymentTerms all present
- [ ] `src/content/__tests__/privacy.test.ts` — assert sections.length >= 6; effectiveDate set

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero section is full-bleed, no horizontal scroll at 375px | LAND-01 + SC5 | CSS layout — no DOM-accessible assertion | Dev tools → 375px viewport, check no `overflow-x` |
| About page shows DEV warning for PLACEHOLDER | ABOUT-04 | DEV-only conditional render | `npm run dev` → /about → look for yellow banner |
| Privacy Policy link in footer navigates without full reload | LEGAL-02 | SPA navigation behaviour | Open Network tab → click footer link → confirm no full page request |
| How It Works shows all 4 steps visible without scrolling on 1280px | PROC-05 | Viewport-dependent layout | Chrome DevTools 1280px → count visible step numbers |
| No horizontal scroll at 768px on any page | SC5 | CSS layout | DevTools → 768px → each page |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
