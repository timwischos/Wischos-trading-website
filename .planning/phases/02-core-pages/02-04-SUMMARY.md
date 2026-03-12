---
phase: 02-core-pages
plan: "04"
subsystem: ui
tags: [react, tanstack-router, tailwind, lucide-react, typography, gdpr]

# Dependency graph
requires:
  - phase: 02-core-pages/02-01
    provides: howItWorks and privacy content modules, SiteFooter SPA link fix

provides:
  - ProcessStepsSection.tsx — 4-step numbered process flow with icons (PROC-05)
  - ProcessPolicySection.tsx — sample policy, lead times, payment terms info cards (PROC-02, PROC-03, PROC-04)
  - HowItWorksPage route composing both sections (PROC-01)
  - PrivacyPage route with @tailwindcss/typography prose block and 6 GDPR sections (LEGAL-01)
  - Human-verified SPA navigation for footer Privacy Policy link (LEGAL-02)

affects: [03-catalog, 04-inquiry, seo, footer]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Section components import content modules directly (no prop drilling)
    - Privacy/legal pages use page-wrap + prose prose-neutral (no PageShell to avoid double padding)
    - Lucide icon map pattern — Record<string, ComponentType> keyed by step number string

key-files:
  created:
    - src/components/sections/ProcessStepsSection.tsx
    - src/components/sections/ProcessPolicySection.tsx
  modified:
    - src/routes/{-$locale}/how-it-works.tsx
    - src/routes/privacy.tsx

key-decisions:
  - "How It Works and Privacy routes use no PageShell — sections self-manage padding to avoid double py-12"
  - "ProcessStepsSection uses Lucide icon map keyed on step number string ('01'..'04') rather than index"
  - "Privacy page prose block uses prose prose-neutral max-w-prose mx-auto — @tailwindcss/typography handles all heading hierarchy"

patterns-established:
  - "Legal page pattern: page-wrap py-16 > article.prose.prose-neutral — reusable for Terms of Service etc."
  - "Process/step section pattern: numbered circle + icon + content, clean stacked layout without connector lines"

requirements-completed: [PROC-01, PROC-02, PROC-03, PROC-04, PROC-05, LEGAL-01, LEGAL-02]

# Metrics
duration: continuation (checkpoint resume)
completed: 2026-03-12
---

# Phase 02 Plan 04: How It Works + Privacy Policy Summary

**ProcessStepsSection (4-step flow with Lucide icons), ProcessPolicySection (sample/lead-time/payment cards), and GDPR-prose PrivacyPage — all human-verified for SPA navigation, responsive layout, and policy content accuracy**

## Performance

- **Duration:** Continuation plan (checkpoint resumed after human verification)
- **Started:** 2026-03-12
- **Completed:** 2026-03-12
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 4

## Accomplishments

- Built ProcessStepsSection with 4 numbered steps (Inquiry, Sample, Confirm, Delivery) and matching Lucide icons
- Built ProcessPolicySection with 3 info cards showing explicit sample policy, lead times (7–10 days / 30 days), and payment terms (T/T)
- Built PrivacyPage with @tailwindcss/typography prose block rendering 6 GDPR section headings
- Human-verified LEGAL-02: footer Privacy Policy link navigates as SPA with no full page reload
- Human-verified responsive layout at 375px with no horizontal scroll on all 4 Phase 2 pages
- Human-verified About page DEV warning banner visible in development mode

## Task Commits

Each task was committed atomically:

1. **Task 1: How It Works page sections and route** - `69356d3` (feat)
2. **Task 2: Privacy Policy page** - `e146b11` (feat)
3. **Task 3: Visual and LEGAL-02 verification checkpoint** - human-verify (no commit — verified by user)

## Files Created/Modified

- `src/components/sections/ProcessStepsSection.tsx` — 4-step numbered process flow with step-number-to-Lucide-icon map
- `src/components/sections/ProcessPolicySection.tsx` — 3 info cards for sample policy, lead times, payment terms
- `src/routes/{-$locale}/how-it-works.tsx` — HowItWorksPage composing both section components
- `src/routes/privacy.tsx` — PrivacyPage with prose typography block, maps privacy.sections array

## Decisions Made

- How It Works and Privacy routes intentionally omit PageShell — both use `page-wrap` directly to avoid double `py-12` padding that PageShell adds.
- ProcessStepsSection uses a `Record<string, React.ComponentType>` keyed on step number strings (`'01'`..`'04'`) to map content data to Lucide icons cleanly.
- Privacy prose block uses `prose prose-neutral max-w-prose mx-auto` — @tailwindcss/typography handles heading hierarchy, no custom heading styles needed.
- Connector lines between process steps were omitted — clean stacked layout is visually sufficient and simpler to maintain.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All Phase 2 core pages are complete: Homepage, About, How It Works, Privacy Policy
- Phase 2 success criteria met: SPA navigation verified, policy content visible, GDPR coverage confirmed, responsive layout at 375px confirmed
- Phase 3 (catalog/products) can proceed — ProductPreviewSection on homepage already provides the teaser entry point
- Blocker remains: company registration details (统一社会信用代码) still needed for About page TrustSection PLACEHOLDER before launch

---
*Phase: 02-core-pages*
*Completed: 2026-03-12*
