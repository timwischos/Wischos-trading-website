---
phase: 02-core-pages
plan: 01
subsystem: testing, content
tags: [vitest, testing-library, typescript, content-modules, privacy, gdpr, tanstack-router]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: route stubs, SiteFooter, SiteHeader, content module stubs, meta.ts

provides:
  - Vitest test infrastructure (vitest.config.ts, jsdom, setup.ts)
  - homepage.ts with full B2B copy (hero, valueProps, differentiators, credibility, productPreview, cta)
  - about.ts with market expertise, whyUs, trust (PLACEHOLDER for registration number)
  - howItWorks.ts with 4-step process, samplePolicy, leadTimes, paymentTerms
  - privacy.ts with 6 GDPR-covering sections
  - meta.ts with routes.privacy entry
  - SiteFooter.tsx using TanStack Router Link for /privacy (LEGAL-02 fix)

affects:
  - 02-02 (homepage page build uses homepage.ts, meta.ts)
  - 02-03 (about + howItWorks page builds)
  - 02-04 (inquiry form — uses meta.ts)
  - 03-privacy (privacy page renders privacy.ts)

# Tech tracking
tech-stack:
  added:
    - "@testing-library/jest-dom ^latest (dev)"
    - "vitest/config with jsdom environment"
    - "vite-tsconfig-paths (already installed, now wired into vitest)"
  patterns:
    - "Content modules in src/content/ as typed const objects — single source of truth for all page copy"
    - "TDD order: write failing tests first, then implement content to satisfy"
    - "Footer async router test: use act() + router.load() to await TanStack Router hydration in jsdom"

key-files:
  created:
    - vitest.config.ts
    - src/tests/setup.ts
    - src/content/__tests__/homepage.test.ts
    - src/content/__tests__/about.test.ts
    - src/content/__tests__/howItWorks.test.ts
    - src/content/__tests__/privacy.test.ts
    - src/content/__tests__/footer.test.tsx
    - src/content/howItWorks.ts
    - src/content/privacy.ts
  modified:
    - src/content/homepage.ts
    - src/content/about.ts
    - src/content/meta.ts
    - src/components/layout/SiteFooter.tsx

key-decisions:
  - "Use act() + router.load() in footer test to await async TanStack Router RouterProvider hydration in jsdom"
  - "about.trust.registrationNumber kept as PLACEHOLDER literal — user must supply 统一社会信用代码 before launch"
  - "privacy.effectiveDate set to 2025-01-01 — update to actual launch date before deployment"

patterns-established:
  - "Content module pattern: named export of const object with as const, no default exports"
  - "Test files in src/content/__tests__/ co-located with content modules"
  - "TanStack Router Link (not <a href>) for all internal routes in layout components"

requirements-completed:
  - LAND-01
  - LAND-02
  - LAND-03
  - LAND-04
  - LAND-05
  - LAND-06
  - ABOUT-01
  - ABOUT-02
  - ABOUT-03
  - ABOUT-04
  - ABOUT-05
  - PROC-01
  - PROC-02
  - PROC-03
  - PROC-04
  - PROC-05
  - LEGAL-01
  - LEGAL-02

# Metrics
duration: 8min
completed: 2026-03-12
---

# Phase 2 Plan 01: Content Modules and Test Infrastructure Summary

**Vitest jsdom test infra + 4 typed content modules (homepage/about/howItWorks/privacy) + SiteFooter Link fix, all 20 tests green**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-12T00:22:09Z
- **Completed:** 2026-03-12T00:30:07Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Wired Vitest with jsdom environment and @testing-library/jest-dom for component testing
- Authored 4 content modules covering all Phase 2 page copy needs — homepage (6 sections), about (5 sections), howItWorks (4 steps + policy/terms), privacy (6 GDPR sections)
- Fixed LEGAL-02: SiteFooter now uses `<Link to="/privacy">` from TanStack Router instead of bare `<a href>`

## Task Commits

1. **Task 1: Vitest config and test scaffold (RED)** - `321d90e` (test)
2. **Task 2: Content modules — homepage, about, howItWorks, privacy (GREEN)** - `c9f8c31` (feat)

## Files Created/Modified

- `vitest.config.ts` — Vitest config: jsdom environment, vite-tsconfig-paths plugin, globals
- `src/tests/setup.ts` — @testing-library/jest-dom import
- `src/content/__tests__/homepage.test.ts` — 6 assertions covering LAND-01..06 shape
- `src/content/__tests__/about.test.ts` — 5 assertions covering ABOUT-01..05 shape
- `src/content/__tests__/howItWorks.test.ts` — 5 assertions covering PROC-01..05 shape
- `src/content/__tests__/privacy.test.ts` — 3 assertions covering LEGAL-01 shape
- `src/content/__tests__/footer.test.tsx` — Async RouterProvider render test for LEGAL-02
- `src/content/homepage.ts` — Full B2B homepage copy with hero, valueProps, differentiators, credibility, productPreview, cta
- `src/content/about.ts` — Full about copy with expertise.markets (3 regions), whyUs.points (3), trust with PLACEHOLDER
- `src/content/howItWorks.ts` — 4-step process + samplePolicy + leadTimes + paymentTerms (new file)
- `src/content/privacy.ts` — 6 GDPR sections with effectiveDate (new file)
- `src/content/meta.ts` — Added routes.privacy entry
- `src/components/layout/SiteFooter.tsx` — Import Link from @tanstack/react-router, replace `<a href="/privacy">` with `<Link to="/privacy">`

## Decisions Made

- Used `act() + router.load()` pattern in footer.test.tsx — TanStack Router's RouterProvider is async and renders a Transitioner; without awaiting router.load() inside act(), the component renders in loading state and the Link anchor is not yet in the DOM.
- about.trust.registrationNumber kept as explicit PLACEHOLDER string literal — company registration details not yet provided by client. This is intentional, tested, and the test asserts the PLACEHOLDER text is present.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed missing @testing-library/jest-dom dependency**
- **Found during:** Task 1 (Vitest config and test scaffold)
- **Issue:** @testing-library/jest-dom not in devDependencies; `import '@testing-library/jest-dom'` in setup.ts would fail at runtime
- **Fix:** Ran `npm install --save-dev @testing-library/jest-dom`
- **Files modified:** package.json, package-lock.json
- **Verification:** Import resolves, vitest setup file loads without error
- **Committed in:** 321d90e (Task 1 commit)

**2. [Rule 1 - Bug] Fixed footer test async rendering with act() wrapper**
- **Found during:** Task 2 (content modules implementation, GREEN phase run)
- **Issue:** Initial footer test used synchronous render, but RouterProvider is async — anchor element was null during assertion
- **Fix:** Wrapped render in `act(async () => { ... await router.load() })` to ensure router hydration before assertion
- **Files modified:** src/content/__tests__/footer.test.tsx
- **Verification:** Test passes green: `a[href="/privacy"]` found with "Privacy Policy" text
- **Committed in:** c9f8c31 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 missing dependency, 1 test async bug)
**Impact on plan:** Both fixes necessary for test infrastructure to function correctly. No scope creep.

## Issues Encountered

Pre-existing TypeScript errors in `src/components/Header.tsx` and `src/components/layout/SiteHeader.tsx` (6 TS2322 errors about TanStack Router route type strictness for i18n paths). These existed before any 02-01 changes (verified by git stash test). Logged to `deferred-items.md` — out of scope for this plan.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All content modules complete and type-safe — 02-02 (homepage), 02-03 (about + howItWorks), and future privacy page can import directly
- Test infrastructure live — future content changes can be validated with `npx vitest run`
- Blocker: company registration details (统一社会信用代码) still needed before launch to replace PLACEHOLDER in about.ts
- Blocker: privacy.effectiveDate should be updated to actual launch date before go-live

---
*Phase: 02-core-pages*
*Completed: 2026-03-12*
