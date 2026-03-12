---
phase: 4
slug: inquiry
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npm run test -- --run` |
| **Full suite command** | `npm run test -- --run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test -- --run`
- **After every plan wave:** Run `npm run test -- --run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 0 | INQ-04 | unit | `npm run test -- --run src/server/schema.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | INQ-08 | manual | — Supabase dashboard | N/A | ⬜ pending |
| 04-02-01 | 02 | 1 | INQ-04, INQ-05 | unit | `npm run test -- --run src/routes/api/inquiry.test.ts` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | INQ-06 | unit | `npm run test -- --run src/routes/api/inquiry.test.ts` | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 2 | INQ-01, INQ-02 | unit | `npm run test -- --run src/components/sections/InquiryFormSection.test.tsx` | ❌ W0 | ⬜ pending |
| 04-03-02 | 03 | 2 | INQ-03 | unit | `npm run test -- --run src/components/sections/InquiryFormSection.test.tsx` | ❌ W0 | ⬜ pending |
| 04-03-03 | 03 | 2 | INQ-07 | unit | `npm run test -- --run src/components/sections/InquiryFormSection.test.tsx` | ❌ W0 | ⬜ pending |
| 04-04-01 | 04 | 3 | INQ-01 | unit | `npm run test -- --run src/components/sections/ContactSection.test.tsx` | ❌ W0 | ⬜ pending |
| 04-04-02 | 04 | 3 | INQ-01 | manual | — browser: /contact page renders | N/A | ⬜ pending |
| 04-05-01 | 05 | 4 | INQ-04, INQ-05 | manual | — real submission in prod | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/server/schema.test.ts` — stubs for INQ-04 (DB schema shape)
- [ ] `src/routes/api/inquiry.test.ts` — stubs for INQ-04, INQ-05, INQ-06 (API route handler)
- [ ] `src/components/sections/InquiryFormSection.test.tsx` — stubs for INQ-02, INQ-03, INQ-07 (form rendering + validation + success state)
- [ ] `src/components/sections/ContactSection.test.tsx` — stubs for INQ-01 (contact page section renders)

*Existing vitest infrastructure covers all new tests — no framework installs needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| RLS allows anon INSERT, blocks anon SELECT | INQ-08 | Supabase RLS is dashboard-configured SQL, not testable locally | 1. Submit form in prod → check Supabase dashboard for row. 2. Try `curl` SELECT — expect 403/empty. |
| Operator receives Resend email within 60s | INQ-05 | Requires live Resend + prod env vars | Submit via deployed URL, check operator inbox within 60s |
| Inquiry row appears in Supabase within 5s | INQ-04 | Requires live Supabase connection | Submit via deployed URL, check dashboard within 5s |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
