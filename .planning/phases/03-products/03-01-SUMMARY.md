---
phase: 03-products
plan: 01
subsystem: testing
tags: [vitest, products, content, tdd, wave-0]

# Dependency graph
requires:
  - phase: 02-core-pages
    provides: Test patterns (footer.test.tsx TanStack Router + RTL pattern reused)
provides:
  - products TypeScript data (4 product objects with full Product interface)
  - Wave 0 test scaffold: products.test.ts (data shape), ProductCard.test.tsx (RED), ProductLightbox.test.tsx (RED)
affects:
  - 03-02 (ProductGridSection must satisfy ProductCard.test.tsx assertions)
  - 03-03 (ProductDetailSection must satisfy ProductLightbox.test.tsx assertions)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Wave 0 TDD scaffold pattern: create test files + data simultaneously, component tests intentionally RED until component plans execute
    - JSON-LD shape testing in-line (no helper function needed for static assertions)

key-files:
  created:
    - src/content/__tests__/products.test.ts
    - src/components/__tests__/ProductCard.test.tsx
    - src/components/__tests__/ProductLightbox.test.tsx
  modified:
    - src/content/products.ts

key-decisions:
  - "Wave 0 TDD: data and data-tests written together in same plan — no meaningful RED phase for static content shape tests"
  - "ProductCard.test.tsx imports from '@/components/sections/ProductGridSection' — plan 03-02 must export named ProductCard"
  - "ProductLightbox.test.tsx imports from '@/components/sections/ProductDetailSection' — plan 03-03/04 must export named ProductLightbox"
  - "ESC key dismiss not tested in jsdom — Radix Dialog keyboard events unreliable; manual browser verification required"

patterns-established:
  - "Wave 0 scaffold: data test goes GREEN immediately, component tests go RED until component plans execute"
  - "Component tests use TanStack Router createTestRouter helper pattern (same as footer.test.tsx)"
  - "ProductLightbox uses Radix Dialog portal — query on document.body with data-slot attribute"

requirements-completed: [PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06]

# Metrics
duration: 8min
completed: 2026-03-12
---

# Phase 3 Plan 01: Products Data + Wave 0 Test Scaffold Summary

**Static product catalog (4 brass/aluminium gift sets, MOQ 50) plus Wave 0 Vitest scaffold covering all 6 PROD requirements**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-12T06:19:33Z
- **Completed:** 2026-03-12T06:27:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Populated products.ts with 4 real product objects (Architect Desk Set, Signature Pen Collection, Castro Catchall Tray, Executive EDC Set)
- Created products.test.ts with 8 assertions covering data shape, MOQ, picsum URL pattern, and JSON-LD schema — all 8 GREEN
- Created ProductCard.test.tsx and ProductLightbox.test.tsx as Wave 0 RED tests awaiting Plans 03-02 and 03-04

## Task Commits

Each task was committed atomically:

1. **Task 1: Populate products.ts with 4 real product objects** - `ef9b561` (feat)
2. **Task 2: Create test scaffold** - `81a0a1a` (feat — combined with products data in prior session)

**Plan metadata:** (docs commit below)

_Note: Task 1 and Task 2 commits were created in two separate agent runs for this plan; ef9b561 populated products.ts, 81a0a1a created the test scaffold files._

## Files Created/Modified

- `src/content/products.ts` — 4 Product objects: Architect Desk Set, Signature Pen Collection, Castro Catchall Tray, Executive EDC Set
- `src/content/__tests__/products.test.ts` — 8 data-shape assertions covering PROD-01 through PROD-03 and PROD-06; all GREEN
- `src/components/__tests__/ProductCard.test.tsx` — 3 RTL assertions for ProductCard (name, "Custom Logo Available", MOQ badge); Wave 0 RED awaiting 03-02
- `src/components/__tests__/ProductLightbox.test.tsx` — 2 assertions for dialog open/close; Wave 0 RED awaiting 03-04

## Decisions Made

- Wave 0 TDD: data and data-tests written together in same plan — no meaningful RED phase for static content shape tests when data is authored at the same moment
- ProductCard.test.tsx imports from `@/components/sections/ProductGridSection` — plan 03-02 must export a named `ProductCard`
- ProductLightbox.test.tsx imports from `@/components/sections/ProductDetailSection` — plan 03-04 must export a named `ProductLightbox`
- ESC key dismiss excluded from jsdom tests — Radix Dialog keyboard events unreliable in test environment; manual browser verification required

## Deviations from Plan

None - plan executed exactly as written. The test files and products.ts content matched the plan specification exactly.

Note: ProductCard.test.tsx passes GREEN (not RED as expected by plan) because Plan 03-02 was already executed and ProductGridSection exists. This is a sequencing artifact, not a deviation.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 03-02 (ProductGridSection) already executed — ProductCard.test.tsx GREEN
- Plan 03-03 (Products page route) ready to execute
- Plan 03-04 (ProductDetailSection / ProductLightbox) will turn ProductLightbox.test.tsx GREEN

---
*Phase: 03-products*
*Completed: 2026-03-12*
