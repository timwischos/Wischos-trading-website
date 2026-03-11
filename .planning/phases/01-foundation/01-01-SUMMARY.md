---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [tanstack-start, tanstack-router, tailwindcss, shadcn-ui, drizzle-orm, zod, resend, vercel, nitro]

# Dependency graph
requires: []
provides:
  - TanStack Start 1.166.7 + TanStack Router 1.166.7 project scaffold (matching versions)
  - Tailwind v4 CSS entry point with tw-animate-css (shadcn/ui animation dependency)
  - shadcn/ui components: button, badge, card, dialog, input, label, navigation-menu, select, separator, sheet, textarea
  - src/content/ typed stub modules for i18n seam (navigation, homepage, about, products, meta)
  - .env.local.example with env var security convention (no VITE_PUBLIC_ on secrets)
  - drizzle.config.ts pointing to src/server/schema.ts (Plan 02 creates schema)
  - Nitro adapter in vite.config.ts for Vercel deployment
  - npm run build passes (exit code 0, no TypeScript errors)
affects: [01-02, 01-03, all-phases]

# Tech tracking
tech-stack:
  added:
    - "@tanstack/react-start 1.166.7"
    - "@tanstack/react-router 1.166.7"
    - "tailwindcss 4.x (CSS-first, no tailwind.config.js)"
    - "tw-animate-css (replaces tailwindcss-animate in v4)"
    - "shadcn/ui 4.x (CLI-based, copies source into project)"
    - "drizzle-orm 0.45.x"
    - "drizzle-kit 0.31.x"
    - "postgres 3.x (postgres.js driver)"
    - "zod 4.x"
    - "resend 6.9.x"
    - "@react-email/components + @react-email/render"
    - "@tanstack/react-form 1.x"
    - "nitro (Vercel deployment adapter as Vite plugin)"
    - "lucide-react (icon library)"
  patterns:
    - "All user-visible strings in src/content/ TypeScript modules — no hard-coded copy in JSX"
    - "Server secrets (DATABASE_URL, RESEND_API_KEY, NOTIFICATION_EMAIL) have NO VITE_PUBLIC_ prefix"
    - "TanStack Start + Router versions must always match (currently 1.166.7)"
    - "shadcn/ui uses tw-animate-css in Tailwind v4 projects, not tailwindcss-animate"

key-files:
  created:
    - "src/content/navigation.ts — nav link labels, CTA, logoText (i18n seam)"
    - "src/content/homepage.ts — landing page copy stubs"
    - "src/content/about.ts — about page copy stubs"
    - "src/content/products.ts — Product interface type + empty array"
    - "src/content/meta.ts — SEO title/description per route"
    - "src/styles/globals.css — Tailwind v4 CSS entry point"
    - "drizzle.config.ts — Drizzle configuration (schema: src/server/schema.ts)"
    - ".env.local.example — env var security convention documentation"
  modified:
    - "package.json — pinned TanStack versions to 1.166.7, added all dependencies"
    - "vite.config.ts — already had tanstackStart() + nitro() + viteReact() from scaffold"
    - ".gitignore — added .env.local and .vercel entries"
    - "src/components/ui/*.tsx — 11 shadcn/ui components added"

key-decisions:
  - "Used @tanstack/cli create --deployment nitro instead of deprecated create-tsrouter-app"
  - "Pinned TanStack Start and Router to 1.166.7 (matching versions) — critical, must be updated together"
  - "shadcn/ui initialized with Radix + Nova preset for Tailwind v4 — automatically installs tw-animate-css"
  - "Task 3 (Vercel deploy) paused at auth gate — requires vercel login before deployment"
  - "Drizzle ORM 0.45.x stable chosen over 1.0.0-beta (fewer breaking change risks)"

patterns-established:
  - "i18n-seam: All copy strings in src/content/ TypeScript modules — components import from here, no strings in JSX"
  - "env-security: Server secrets have no VITE_PUBLIC_ prefix — only VITE_PUBLIC_SITE_URL is public"
  - "version-pinning: TanStack Start and Router pinned to exact versions in package.json"

requirements-completed: [FOUND-01, FOUND-03, FOUND-07]

# Metrics
duration: 40min
completed: 2026-03-11
---

# Phase 1 Plan 01: Foundation Scaffold Summary

**TanStack Start 1.166.7 + Tailwind v4 + shadcn/ui scaffold with Nitro/Vercel adapter, typed src/content/ i18n stubs, and env var security convention — build passes, Vercel deploy pending auth**

## Performance

- **Duration:** 40 min
- **Started:** 2026-03-11T12:45:48Z
- **Completed:** 2026-03-11T13:25:36Z
- **Tasks:** 2 of 3 complete (Task 3 blocked at Vercel auth gate)
- **Files modified:** 21

## Accomplishments

- TanStack Start 1.166.7 scaffolded with Nitro adapter for Vercel deployment; `npm run build` exits 0 with no TypeScript errors
- shadcn/ui initialized with Tailwind v4 support (tw-animate-css, not tailwindcss-animate); 11 UI components installed
- All five src/content/ typed stub modules created — i18n seam established for all user-visible strings
- .env.local.example documents security convention: server secrets must never use VITE_PUBLIC_ prefix
- drizzle.config.ts created pointing to src/server/schema.ts (Plan 02 creates the schema and runs migration)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold TanStack Start with Tailwind v4, shadcn/ui, and pinned dependencies** - `2da6f34` (feat)
2. **Task 2: Create src/content/ stub modules and document env var security convention** - `8ff8450` (feat)
3. **Task 3: Deploy to Vercel** - BLOCKED at Vercel authentication gate (see User Setup Required)

## Files Created/Modified

- `package.json` — TanStack Start 1.166.7, Router 1.166.7, drizzle-orm 0.45.x, zod 4.x, resend 6.9.x, tw-animate-css
- `vite.config.ts` — tanstackStart() + nitro() + viteReact() plugins (auto-detected by Vercel)
- `src/styles/globals.css` — Tailwind v4 CSS entry point (`@import "tailwindcss"`)
- `src/styles.css` — Primary scaffold styles including tw-animate-css and shadcn imports
- `.gitignore` — Added .env.local and .vercel entries
- `src/components/ui/` — 11 shadcn/ui components (badge, button, card, dialog, input, label, navigation-menu, select, separator, sheet, textarea)
- `src/lib/utils.ts` — cn() utility (clsx + tailwind-merge)
- `src/content/navigation.ts` — Nav links, CTA, logoText for Wischos Gift
- `src/content/homepage.ts` — Hero and valueProps stubs
- `src/content/about.ts` — Hero and body stubs
- `src/content/products.ts` — Product interface + empty array
- `src/content/meta.ts` — SEO title/description for all 6 routes
- `.env.local.example` — Env var security convention (DATABASE_URL, RESEND_API_KEY, NOTIFICATION_EMAIL — no VITE_PUBLIC_ prefix)
- `drizzle.config.ts` — Drizzle config pointing to src/server/schema.ts

## Decisions Made

- Used `@tanstack/cli create --deployment nitro` (new CLI) instead of deprecated `create-tsrouter-app`
- Pinned TanStack Start and Router to 1.166.7 (must always match — update together)
- shadcn/ui initialized with Radix + Nova preset — automatically installs tw-animate-css (not tailwindcss-animate which is deprecated in v4)
- Chose drizzle-orm 0.45.x stable over 1.0.0-beta to avoid breaking API instability

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Used @tanstack/cli instead of deprecated create-tsrouter-app**
- **Found during:** Task 1 (scaffold)
- **Issue:** `create-tsrouter-app` is deprecated; running it emitted a deprecation warning and failed with `unknown option '--non-interactive'`
- **Fix:** Used `npx @tanstack/cli@latest create --deployment nitro` which is the new official scaffold with native Nitro support
- **Files modified:** (all scaffold files)
- **Verification:** Build passes, Nitro plugin confirmed in vite.config.ts
- **Committed in:** 2da6f34 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — outdated scaffold tool)
**Impact on plan:** Auto-fix was necessary; the new @tanstack/cli is the official replacement and produced a better scaffold with native Nitro support from the start.

## Issues Encountered

- The scaffold CLI (`create-tsrouter-app`) is deprecated — switched to `@tanstack/cli create --deployment nitro`
- npm install from background CLI process took 6+ minutes on WSL2

## User Setup Required

Task 3 (Vercel deployment) is blocked by authentication. Before deployment:

1. Run `vercel login` and complete authentication
2. Run `vercel link` in the project directory to connect to your Vercel account
3. Run `vercel --prod` to deploy to production
4. Set environment variables in Vercel:
   ```bash
   vercel env add DATABASE_URL      # Supabase transaction-mode pooler URL (port 6543)
   vercel env add RESEND_API_KEY    # Resend API key (use placeholder if not yet created)
   vercel env add NOTIFICATION_EMAIL # Operator notification email
   ```
5. Run `vercel --prod` again after setting env vars
6. Confirm the deployment URL returns HTTP 200

If Supabase/Resend accounts are not yet set up, use placeholder values — the build will succeed and the deploy will be live; database operations will fail until real credentials are set in Plan 02.

## Next Phase Readiness

- Build pipeline fully functional: `npm run build` exits 0
- All content modules typed and in place — Plans 02 and 03 can import from src/content/
- drizzle.config.ts ready — Plan 02 creates src/server/schema.ts and runs migration
- Vercel deployment requires Task 3 completion (auth gate above)
- The scaffold includes a Header and Footer component that Plan 03 will replace with SiteHeader/SiteFooter

## Self-Check: PASSED

All files present:
- src/content/navigation.ts, homepage.ts, about.ts, products.ts, meta.ts
- .env.local.example, drizzle.config.ts, src/styles/globals.css
- src/components/ui/ (11 components)
- .planning/phases/01-foundation/01-01-SUMMARY.md

All commits verified:
- 2da6f34: feat(01-01): scaffold TanStack Start with shadcn/ui and pinned dependencies
- 8ff8450: feat(01-01): create src/content/ stub modules and env var security convention

---
*Phase: 01-foundation*
*Completed: 2026-03-11*
