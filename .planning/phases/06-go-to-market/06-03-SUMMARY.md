---
phase: 06-go-to-market
plan: "03"
subsystem: marketing
tags: [linkedin, content-marketing, b2b, corporate-gifting, social-proof]

# Dependency graph
requires:
  - phase: 06-go-to-market-02
    provides: ICP personas, GEO/SEO audit baseline, Organization JSON-LD schema in __root.tsx
provides:
  - LinkedIn personal profile copy ready to paste (headline, About, Experience)
  - LinkedIn company page copy ready to paste (tagline, About, Specialties)
  - 4-week content calendar with 12 posts, full post copy, image direction
affects:
  - sameAs update in __root.tsx (deferred — requires LinkedIn company page URL)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "LinkedIn content follows 85/15 rule: 85% education/utility, 15% promotional"
    - "Personal profile optimized before company page — all original posts on personal, company reposts after 24h"
    - "Carousel format as primary engagement driver (Week 1 and Week 3)"

key-files:
  created:
    - ".planning/phases/06-go-to-market/LINKEDIN-KIT.md"
  modified: []

key-decisions:
  - "sameAs update to Organization JSON-LD deferred — LinkedIn company page not yet created, URL unknown"
  - "Content calendar anchored to Australian business hours (Tue–Thu 7–9 AM or 12–1 PM AEST) as AU is top priority market"
  - "Titanium products flagged in Week 4 post as suited for AU/EU/SG/KR markets, not US, consistent with 2026 tariff analysis"

patterns-established:
  - "LinkedIn copy follows buyer-first framing: every piece opens with buyer's pain point, not founder story"
  - "Post tone: no exclamation points in body, no 'excited to share' openers, expert voice assumed from post 1"

requirements-completed: [GTM-04]

# Metrics
duration: 3min
completed: 2026-04-01
---

# Phase 6 Plan 03: LinkedIn Launch Kit Summary

**Ready-to-paste LinkedIn profile copy (personal + company page) and 4-week content calendar with 12 full posts covering all four content pillars (material education, process transparency, buyer scenarios, social proof)**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-01T12:30:05Z
- **Completed:** 2026-04-01T12:33:34Z
- **Tasks:** 1 of 2 completed (Task 2/sameAs update deferred — see below)
- **Files modified:** 1

## Accomplishments

- Created LINKEDIN-KIT.md with complete personal profile copy: headline (130 chars, under 220 limit), About section (~1,950 chars, under 2,600 limit), Experience entry with 3 outcome-focused bullet points
- Created company page copy: tagline (91 chars, under 120 limit), About section (~1,400 chars, under 2,000 limit), full Specialties list and setup notes
- Wrote 12 full posts across 4 weeks and all 4 content pillars — every post has hook line, complete body text, and image direction; 2 posts are carousel outlines with slide-by-slide content
- Documented 4 brand pitfalls specific to Wischos Gift context

## Task Commits

1. **Task 1: Write LinkedIn launch kit document** - `15e0101` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `.planning/phases/06-go-to-market/LINKEDIN-KIT.md` — Complete LinkedIn launch kit: 5 sections, 469 lines, ready-to-paste copy for all LinkedIn fields and a 4-week content calendar

## Decisions Made

- Used buyer-first framing throughout all copy — About section opens with buyer's problem, not founder's story, consistent with ICP research showing Office Managers and EAs self-identify with the problem before the product
- Anchored content calendar to Australian business hours (Tue–Thu 7–9 AM or 12–1 PM AEST) — AU is top priority market per ICP and business decisions
- Included tariff note in Week 4 titanium post, consistent with the decision to de-prioritize US market due to 2026 tariff structure
- sameAs update to Organization JSON-LD deferred pending LinkedIn company page creation (see Deferred Items below)

## Deviations from Plan

### Deferred Task — sameAs Update

**Task: Task 3 (checkpoint → sameAs update in __root.tsx)**

Per execution instructions, this task was intentionally skipped. The LinkedIn company page does not yet exist, so the company page URL is unknown. The sameAs field cannot be added to the Organization JSON-LD without a confirmed URL.

**Action required when LinkedIn company page is created:**
1. Note the exact company page URL (format: `https://www.linkedin.com/company/wischos-gift/`)
2. Open `src/routes/__root.tsx`
3. Add `sameAs` property to the `organizationJsonLd` constant after the `areaServed` field:
   ```typescript
   areaServed: ['AU', 'EU', 'SG', 'KR', 'JP'],
   sameAs: [
     'https://www.linkedin.com/company/YOUR-SLUG-HERE/',
   ],
   ```
4. Run `npx tsc --noEmit` to verify TypeScript passes
5. Deploy to Vercel: `npx vercel --prod`

**Requirement GTM-03** (Organization JSON-LD sameAs) remains open until this step is completed.

## Issues Encountered

None.

## User Setup Required

**Action required:** Create the LinkedIn company page for Wischos Gift, then complete the deferred sameAs update described above. The LINKEDIN-KIT.md Section 3c contains all setup fields needed to create the company page.

## Next Phase Readiness

- LINKEDIN-KIT.md is complete and ready for immediate use — personal profile can be updated today
- Company page can be created using Section 3 copy and setup notes
- Once company page URL is confirmed, the sameAs update is a 5-minute change in __root.tsx
- GTM-03 (sameAs gap in Organization JSON-LD) remains open

---
*Phase: 06-go-to-market*
*Completed: 2026-04-01*
