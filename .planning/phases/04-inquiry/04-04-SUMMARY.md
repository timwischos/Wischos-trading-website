---
phase: 04-inquiry
plan: "04"
subsystem: ui
tags: [tanstack-router, react, contact-form, redirect]

# Dependency graph
requires:
  - phase: 04-inquiry
    provides: ContactSection and InquiryFormSection components (built in 04-03)
provides:
  - /contact page: ContactSection + InquiryFormSection assembled inside PageShell
  - /inquiry route: beforeLoad redirect to /contact preserving all query params
affects: [phase-05, product-detail-cta]

# Tech tracking
tech-stack:
  added: []
  patterns: [TanStack Router beforeLoad redirect with search param passthrough]

key-files:
  created: []
  modified:
    - src/routes/{-$locale}/contact.tsx
    - src/routes/{-$locale}/inquiry.tsx

key-decisions:
  - "inquiry.tsx uses beforeLoad throw redirect() — redirect happens before component render, not inside it"
  - "search: location.search cast as Record<string,string> — TanStack Router 1.166.7 type narrowing"

patterns-established:
  - "Route assembly: PageShell wraps section components in order (info section → form section)"
  - "Redirect pattern: beforeLoad + throw redirect() + replace:true for canonical URL consolidation"

requirements-completed: [INQ-01, INQ-02, INQ-03, INQ-07]

# Metrics
duration: 5min
completed: 2026-03-12
---

# Phase 4 Plan 04: Route Wiring Summary

**Contact page assembled from ContactSection + InquiryFormSection; /inquiry route redirects to /contact with query param passthrough for product pre-fill**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-12T22:17:00Z
- **Completed:** 2026-03-12T22:22:00Z
- **Tasks:** 1 of 2 (Task 2 is human-verify checkpoint — pending)
- **Files modified:** 2

## Accomplishments
- Replaced contact.tsx stub with full page: ContactSection above InquiryFormSection inside PageShell
- Replaced inquiry.tsx stub with beforeLoad redirect to /{-$locale}/contact preserving search params
- All 34 tests pass, 0 TypeScript errors

## Task Commits

1. **Task 1: Wire /contact route and redirect /inquiry** - `7954ac6` (feat)

## Files Created/Modified
- `src/routes/{-$locale}/contact.tsx` - Full contact page: ContactSection + InquiryFormSection in PageShell
- `src/routes/{-$locale}/inquiry.tsx` - beforeLoad redirect to /contact with search param passthrough

## Decisions Made
- Used `search: location.search as Record<string, string>` cast to satisfy TanStack Router 1.166.7 type constraint
- `component: () => null` on inquiry.tsx — redirect fires in beforeLoad before component, null component prevents any render flash

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /contact page fully functional, awaiting human browser verification
- All Phase 3 product CTAs (/inquiry?product=...) will redirect correctly once verified
- Phase 5 can begin after checkpoint approval

---
*Phase: 04-inquiry*
*Completed: 2026-03-12*
