---
phase: 06-go-to-market
plan: 01
subsystem: gtm
tags: [icp, prospecting, linkedin, b2b, outreach, google-operators]

# Dependency graph
requires: []
provides:
  - ICP document defining four buyer personas (Office Manager, EA, HR Manager, Marketing Coordinator) with disqualifiers, firmographic table, and qualification checklist
  - Google search operator playbook with 20 ready-to-use strings covering AU, EU, SG, KR, JP geographies
affects: [06-go-to-market-04, linkedin-kit, outreach]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created:
    - .planning/phases/06-go-to-market/ICP.md
    - .planning/phases/06-go-to-market/GOOGLE-PLAYBOOK.md
  modified: []

key-decisions:
  - "ICP excludes USA market due to 2026 tariff complexity — priority order is AU > EU > SG > KR > JP"
  - "Marketing Coordinator designated secondary persona — included for completeness but lower priority than Office Manager / EA / HR Manager"
  - "Google playbook written as manual research reference only — not for automated scraping"
  - "Company-level searches (site:linkedin.com/company/) included alongside personal profile strings to allow top-down (company first) prospecting alongside bottom-up (person first)"

patterns-established: []

requirements-completed: [GTM-01, GTM-02]

# Metrics
duration: 20min
completed: 2026-04-01
---

# Phase 6 Plan 01: ICP and Google Prospecting Playbook Summary

**ICP with four SMB buyer personas and 20 Google search operator strings for AU/EU/SG/KR/JP prospect discovery**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-04-01T06:50:19Z
- **Completed:** 2026-04-01T11:10:42Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- ICP document with five sections: overview, four personas (each with job titles, pain points, discovery channels, decision speed, geographies, disqualifiers), firmographic parameters table, five-item qualification checklist, and hard stop signals
- Google playbook with 20 search strings in fenced code blocks, each with a comment header naming persona and geography — covers all five priority markets (AU, EU, SG, KR, JP)
- Operator reference table documenting all six verified Google operators (site:, intitle:, "...", OR, -)
- Post-Google LinkedIn filtering checklist and outreach guidance included

## Task Commits

1. **Task 1: Write ICP document** - `fcbe7eb` (docs)
2. **Task 2: Write Google search operator playbook** - `80044cb` (docs)

**Plan metadata:** (this commit — docs: complete plan summary)

## Files Created/Modified

- `.planning/phases/06-go-to-market/ICP.md` — Five-section ICP reference: four buyer personas with disqualifiers, firmographic table, qualification checklist, stop signals
- `.planning/phases/06-go-to-market/GOOGLE-PLAYBOOK.md` — 20 search strings (site:linkedin.com/in/ and site:linkedin.com/company/) with operator reference, post-Google filtering, and outreach guidance

## Decisions Made

- USA excluded from target geographies in the ICP firmographic table — 2026 tariff complexity makes pricing uncompetitive without dedicated repositioning work, consistent with existing project strategy
- Marketing Coordinator listed as a secondary persona — included in both ICP and playbook for completeness, but deprioritised relative to the three primary operational-layer personas
- Company-level search strings (site:linkedin.com/company/) added as a separate group in the playbook — allows prospecting top-down (identify target company first, then find the right contact) rather than only bottom-up (find individual first)
- Playbook explicitly framed as manual research only, not automated scraping — stated in Section 1 and consistent with legal and practical constraints of solo operator outreach

## Deviations from Plan

None — plan executed exactly as written. String count (20) exceeds the 12-string minimum. All four persona groups and all five priority geographies (AU, EU/NL/DE/UK, SG, KR, JP) are covered.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. Both deliverables are plain Markdown documents ready for immediate use.

## Next Phase Readiness

- ICP.md is ready for use in prospect evaluation immediately
- GOOGLE-PLAYBOOK.md is ready to run — paste any string into google.com to begin prospecting
- GTM-03 (SEO/GEO code fixes) and GTM-04 (LinkedIn launch kit) are independent and can proceed in any order
- The ICP personas feed directly into GTM-04 LinkedIn profile copy — the four personas define the audience the profile headline and About section should speak to

---
*Phase: 06-go-to-market*
*Completed: 2026-04-01*
