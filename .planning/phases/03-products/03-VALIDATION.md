---
phase: 3
slug: products
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest ^3.0.5 with jsdom |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/content/__tests__/products.test.ts` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/content/__tests__/products.test.ts`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 0 | PROD-01, PROD-02, PROD-03, PROD-06 | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 0 | PROD-04 | unit (RTL) | `npx vitest run src/components/__tests__/ProductLightbox.test.tsx` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 0 | PROD-05 | unit (RTL) | `npx vitest run src/components/__tests__/ProductCard.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | PROD-01, PROD-02, PROD-03 | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | PROD-06 | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | PROD-01, PROD-04, PROD-05 | unit (RTL) | `npx vitest run` | ❌ W0 | ⬜ pending |
| 03-03-02 | 03 | 2 | PROD-02, PROD-03, PROD-04 | unit (RTL) | `npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/content/__tests__/products.test.ts` — stubs for PROD-01, PROD-02, PROD-03, PROD-06 (data shape + JSON-LD helper)
- [ ] `src/components/__tests__/ProductCard.test.tsx` — covers PROD-05 (customization callout rendering)
- [ ] `src/components/__tests__/ProductLightbox.test.tsx` — covers PROD-04 (Dialog open/close behavior)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lightbox dismisses on Escape key | PROD-04 | jsdom keyboard events are unreliable for Radix Dialog; need real browser | Open product detail page, click image, press Escape, verify overlay disappears |
| Lightbox works on mobile touch | PROD-04 | touch events require real device or Playwright device emulation | Open on mobile viewport, tap image, tap outside lightbox, verify dismiss |
| JSON-LD visible in page source | PROD-06 | SSR output must be verified in actual rendered HTML | `curl https://wischos-trading-website.vercel.app/products/[id]` and grep for `application/ld+json` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
