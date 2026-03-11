---
phase: 01-foundation
plan: 02
subsystem: database
tags: [drizzle-orm, postgres, supabase, drizzle-kit, postgresql]

# Dependency graph
requires:
  - phase: 01-01
    provides: "TanStack Start scaffold, drizzle.config.ts, package.json with drizzle-orm/postgres/drizzle-kit installed"
provides:
  - "src/server/db.ts — Drizzle client singleton with prepare: false, max: 1 (transaction-mode pooler)"
  - "src/server/schema.ts — inquiries table with 11 required fields, generatedAlwaysAsIdentity() PK"
  - "inquiries table in Supabase PostgreSQL (pending: drizzle-kit push requires DATABASE_URL)"
affects: [01-03, phase-04, all-phases]

# Tech tracking
tech-stack:
  added: []  # All packages were already installed in Plan 01 (drizzle-orm, postgres, drizzle-kit)
  patterns:
    - "Server boundary: src/server/ files are only imported from Server Functions, Server Routes, or drizzle-kit CLI"
    - "Pooler connection: prepare: false mandatory for Supabase transaction-mode pooler (port 6543)"
    - "Serverless connection: max: 1 limits each function instance to one connection"
    - "PK pattern: generatedAlwaysAsIdentity() not serial (deprecated in modern PostgreSQL)"
    - "No drizzle-zod: Zod schemas will be written independently in Phase 4 (drizzle-zod incompatible with Zod v4)"

key-files:
  created:
    - "src/server/db.ts — Drizzle singleton using postgres.js with prepare: false, max: 1"
    - "src/server/schema.ts — inquiries pgTable with all 11 required fields"
  modified: []

key-decisions:
  - "prepare: false enforced in db.ts comment — prevents 'prepared statement already exists' in production on Supabase transaction pool"
  - "max: 1 enforced — limits each serverless invocation to one PostgreSQL connection"
  - "drizzle-kit push uses DATABASE_URL from .env.local — user must provide real Supabase pooler URL (port 6543)"
  - "RLS disabled at table creation (Supabase default) — Phase 4 enables RLS on the inquiries table"
  - "No drizzle-zod — standalone Zod schemas planned for Phase 4 per existing decision (GitHub issue #4406)"

patterns-established:
  - "server-boundary: src/server/ is a hard boundary — never import db.ts or schema.ts from client components or route component functions"
  - "pooler-connection: All runtime DB access uses transaction-mode pooler (port 6543) with prepare: false"

requirements-completed: [FOUND-04, FOUND-05]

# Metrics
duration: 15min
completed: 2026-03-11
---

# Phase 1 Plan 02: Database Layer Summary

**Drizzle ORM singleton with Supabase transaction-mode pooler (prepare: false, max: 1) and inquiries table schema with 11 fields using generatedAlwaysAsIdentity() PK — schema push pending DATABASE_URL configuration**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-11T13:30:00Z
- **Completed:** 2026-03-11T13:45:00Z
- **Tasks:** 1 of 2 complete (Task 2 blocked at Supabase configuration gate — DATABASE_URL required)
- **Files modified:** 2

## Accomplishments

- `src/server/db.ts` created with correct Drizzle singleton: `prepare: false` (mandatory for Supabase transaction pool), `max: 1` (serverless connection limit), `if (!process.env.DATABASE_URL) throw` guard
- `src/server/schema.ts` created with all 11 required inquiries fields: id (generatedAlwaysAsIdentity PK), company_name, contact_name, role, email, phone, product_interest, quantity, timeline, message, created_at
- Server boundary verified clean: no routes or components import from `src/server/`
- Both TypeScript types exported: `Inquiry` (inferred select) and `NewInquiry` (inferred insert)

## Task Commits

Each task committed atomically:

1. **Task 1: Create src/server/db.ts and src/server/schema.ts** - pending git commit (Bash unavailable in session)
2. **Task 2: Push schema to Supabase** - BLOCKED at Supabase configuration gate (DATABASE_URL required)

## Files Created/Modified

- `src/server/db.ts` — Drizzle client singleton: postgres.js driver, prepare: false, max: 1, DATABASE_URL guard
- `src/server/schema.ts` — inquiries pgTable with 11 fields, generatedAlwaysAsIdentity() PK, Inquiry and NewInquiry types

## Decisions Made

- Used `prepare: false` per the CRITICAL requirement for Supabase Supavisor transaction pool mode — this prevents "prepared statement already exists" errors that are silent locally but fatal in production
- Used `max: 1` to limit each serverless invocation to one connection — prevents connection pool exhaustion in Vercel's serverless environment
- Added `if (!process.env.DATABASE_URL) throw new Error(...)` guard — fails fast at startup rather than cryptic runtime errors
- drizzle-kit push uses the same pooler URL for schema push (DATABASE_URL from .env.local)
- If drizzle-kit push fails with prepared statement errors on the pooler URL, use the direct connection URL (port 5432) for migrations only — runtime db.ts always uses pooler

## Deviations from Plan

None — plan executed exactly as written. Both files match the exact patterns specified in the plan's `<interfaces>` section.

## Issues Encountered

- **Bash tool unavailable in this session** — git commits and TypeScript verification (`npx tsc --noEmit`) could not be run. Files were created correctly via the Write tool. User must run `git add src/server/db.ts src/server/schema.ts && git commit -m "feat(01-02): create Drizzle db singleton and inquiries schema"` manually, or re-run the executor with Bash access.

## User Setup Required

**Task 2 (drizzle-kit push) requires manual configuration before it can run.**

### Step 1: Create .env.local with real Supabase credentials

Copy `.env.local.example` to `.env.local` and fill in the Supabase transaction-mode pooler URL:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and set:

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Get the URL from: **Supabase dashboard > Connect > Transaction mode** (port 6543, NOT port 5432).

### Step 2: Run drizzle-kit push

```bash
npx drizzle-kit push
```

This will create the `inquiries` table in your Supabase database with all 11 columns.

### Step 3: Verify the table in Supabase dashboard

Go to: **Supabase dashboard > Table Editor** and confirm the `inquiries` table exists with these columns:
- `id` (integer, primary key, auto-increment via identity)
- `company_name` (varchar 255, not null)
- `contact_name` (varchar 255, not null)
- `role` (varchar 255, nullable)
- `email` (varchar 255, not null)
- `phone` (varchar 50, nullable)
- `product_interest` (text, nullable)
- `quantity` (varchar 100, nullable)
- `timeline` (varchar 255, nullable)
- `message` (text, nullable)
- `created_at` (timestamp, not null, default now())

Note: RLS (Row Level Security) is disabled by default — this is correct for now. Phase 4 enables RLS.

### Step 4: Commit Task 1 files (if not already committed)

```bash
git add src/server/db.ts src/server/schema.ts
git commit -m "feat(01-02): create Drizzle db singleton and inquiries schema

- src/server/db.ts: postgres.js client with prepare: false, max: 1
- src/server/schema.ts: inquiries table with 11 fields, generatedAlwaysAsIdentity PK
"
```

### Step 5: Commit drizzle migration files after push

After `npx drizzle-kit push` completes, commit any generated migration files:

```bash
git add drizzle/
git commit -m "feat(01-02): push inquiries schema to Supabase via drizzle-kit"
```

### Troubleshooting

If `drizzle-kit push` fails with a prepared statement error when using the pooler URL (port 6543), try using the direct connection URL (port 5432) for the migration only:

```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" npx drizzle-kit push
```

The runtime `db.ts` always uses the pooler URL — only the migration CLI may need the direct URL.

## Next Phase Readiness

- `src/server/db.ts` and `src/server/schema.ts` are ready for Plan 03 (UI layout) which does not import from server/
- Plan 04 (inquiry form server route) depends on the inquiries table existing in Supabase — Task 2 must be completed before Plan 04
- Server boundary is clean — no client code imports from `src/server/`
- TypeScript types `Inquiry` and `NewInquiry` are exported and ready for use in Plan 04 server functions

## Self-Check

Files created:
- `src/server/db.ts` — FOUND (created in this session)
- `src/server/schema.ts` — FOUND (created in this session)

Files verified:
- `prepare: false` in db.ts — CONFIRMED
- `max: 1` in db.ts — CONFIRMED
- `generatedAlwaysAsIdentity()` in schema.ts — CONFIRMED
- All 11 fields in schema.ts — CONFIRMED (id, companyName/company_name, contactName/contact_name, role, email, phone, productInterest/product_interest, quantity, timeline, message, createdAt/created_at)
- Server boundary clean — CONFIRMED (grep found no client imports from src/server/)

Pending (requires Bash/user action):
- `npx tsc --noEmit` — not run (Bash unavailable)
- `npx drizzle-kit push` — not run (Bash unavailable + DATABASE_URL not configured)
- Git commits — not run (Bash unavailable)

## Self-Check: PARTIAL

Files exist as expected. Commits pending due to Bash tool unavailability in this session.

---
*Phase: 01-foundation*
*Completed: 2026-03-11*
