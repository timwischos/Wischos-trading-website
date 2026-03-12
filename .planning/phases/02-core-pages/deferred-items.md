# Deferred Items — Phase 02 Core Pages

## Pre-existing TypeScript Errors (out of scope for 02-01)

Discovered during `npx tsc --noEmit` run in 02-01 execution. These errors pre-existed before any 02-01 changes (verified by git stash test).

**Files affected:**
- `src/components/Header.tsx` (line 60)
- `src/components/layout/SiteHeader.tsx` (lines 24, 36, 52, 60)

**Error type:** TS2322 — TanStack Router strict route type checking

**Root cause:** Navigation links use plain string paths like `/products`, `/about`, `/contact`, `/inquiry`. TanStack Router's generated route types expect the i18n-prefixed forms `/{-$locale}/products`, `/{-$locale}/about` etc., and doesn't allow the non-prefixed forms.

**Impact:** TypeScript compilation fails but runtime works (Vite builds and serves fine). No user-visible breakage.

**Recommended fix:** In a dedicated plan (or during 02-02/02-03 when pages are being built), cast navigation link hrefs using `as RegisteredRouter['routePaths']` or add a `@ts-expect-error` comment, or fix navigation.ts to use the i18n-prefixed paths with the optional locale segment pattern.

**Discovered:** 2026-03-12, Plan 02-01
