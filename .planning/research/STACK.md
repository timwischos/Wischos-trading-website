# Stack Research

**Domain:** B2B showcase website — inquiry-driven, full-stack TypeScript, Vercel deployment
**Researched:** 2026-03-11
**Confidence:** MEDIUM-HIGH (stack is fixed by project constraints; research focused on integration patterns, versions, and gotchas)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| TanStack Start | 1.166.x (RC) | Full-stack React framework — SSR, server functions, API routes, routing | Fixed by project. Full-stack TypeScript with type-safe routing, file-based route conventions, built-in server functions that eliminate need for a separate backend. Nitro-powered for Vercel deployment. |
| TanStack Router | 1.166.x (bundled with Start) | Client + server routing, file-based, fully type-safe | Included with TanStack Start. Provides type-safe navigation, dynamic params, route loaders, and SEO head management via `routeOptions.head`. |
| Tailwind CSS | 4.x | Utility-first CSS | Fixed by project. v4 is CSS-first (no tailwind.config.js), CSS variables replace JS config. shadcn/ui is fully compatible with v4. |
| shadcn/ui | Latest CLI | Accessible, customizable UI component collection | Fixed by project. Not a library — copies component source into your project. Fully compatible with Tailwind v4 and React 19. Ideal for professional B2B aesthetics. |
| Supabase | (cloud service) | PostgreSQL database + storage + auth infrastructure | Fixed by project. Provides managed PostgreSQL with connection pooling via Supavisor. For this project: database only (no Supabase Auth — inquiry form is unauthenticated). |
| Drizzle ORM | 0.45.x stable | TypeScript-native ORM for PostgreSQL schema + queries | Fixed by project. Lightweight, SQL-like syntax, excellent TypeScript inference. Use 0.45.x stable — the 1.0.0-beta series exists but introduces breaking changes not yet worth adopting. |
| Zod | 4.x | Schema validation and TypeScript type inference | Fixed by project. Latest major version (v4). Use for server function input validation. WARNING: drizzle-zod is not fully compatible with Zod v4 yet — see integration notes below. |
| Resend | 6.9.x | Transactional email for inquiry notifications | Fixed by project. Free tier sufficient for early-stage inquiry volume. Simple SDK. Gotcha: use server routes (not server functions) for Resend email sending — see integration notes. |
| Vercel | (platform) | Hosting and deployment | Fixed by project. TanStack Start officially supported via Nitro adapter. Zero-config detection. Fluid compute by default (pay per use, not idle). |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| drizzle-kit | 0.30.x | Drizzle CLI for migrations and schema push | Always — needed for `drizzle-kit push` (dev) and `drizzle-kit generate` + `migrate` (prod) |
| postgres | 3.x | postgres.js driver (used by drizzle-orm/postgres-js) | Always — the underlying PostgreSQL client Drizzle connects through |
| @tanstack/react-form | 1.x | Form state management native to TanStack ecosystem | Preferred for the inquiry form — native SSR compatibility with TanStack Start, type-safe field validation, works with Zod validators |
| react-hook-form | 7.x | Alternative form library | Acceptable alternative if team already knows it — integrates with TanStack Start but requires more boilerplate for SSR |
| @react-email/components | 0.0.x | React-based email templates | Use for structuring Resend email notification templates |
| @react-email/render | 0.0.x | Renders React email components to HTML string | Required because TanStack Start server functions cannot render React email components directly — must render to HTML then pass to Resend SDK |
| nitro | 2.x | Server adapter enabling Vercel deployment | Required for Vercel deployment — add as Vite plugin in vite.config.ts |
| tw-animate-css | Latest | CSS animations for Tailwind v4 | Replaces deprecated `tailwindcss-animate` — shadcn/ui installs this by default in new v4 projects |
| lucide-react | Latest | Icon library native to shadcn/ui | shadcn/ui components expect lucide-react for icons |
| class-variance-authority | Latest | Component variant management | Used internally by shadcn/ui components — installed automatically |
| clsx + tailwind-merge | Latest | Conditional class merging | Used internally by shadcn/ui's `cn()` utility — installed automatically |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| drizzle-kit studio | Browser-based DB explorer | Run `npx drizzle-kit studio` to inspect Supabase data during dev |
| TypeScript | Full type safety across client and server | TanStack Start generates `routeTree.gen.ts` automatically — do not edit manually |
| Vite | Bundler underlying TanStack Start | Configuration in `vite.config.ts` — add `tanstackStart()`, `nitro()`, and `viteReact()` plugins |
| dotenv | Environment variable management | Use `.env.local` for local dev secrets; Vercel dashboard for production secrets |

---

## Installation

```bash
# Scaffold TanStack Start project (use official template)
npx create-tsrouter-app@latest my-app --framework react --template start-basic

# Database
npm install drizzle-orm postgres
npm install -D drizzle-kit

# Validation
npm install zod

# Email
npm install resend @react-email/components @react-email/render

# Vercel/Nitro deployment adapter
npm install nitro

# Form handling (choose one — TanStack Form recommended)
npm install @tanstack/react-form

# shadcn/ui initialization (after project is scaffolded)
npx shadcn@latest init

# shadcn/ui components needed for this project
npx shadcn@latest add button input textarea label card form select badge separator navigation-menu sheet dialog
```

---

## Key Integration Patterns

### TanStack Start File Structure

```
src/
  routes/
    __root.tsx          # Root layout, HeadContent, Scripts
    index.tsx           # Landing page (/)
    products/
      index.tsx         # Products page (/products)
      $productId.tsx    # Product detail (/products/:id)
    about.tsx           # About Us (/about)
    contact.tsx         # Contact (/contact)
    inquiry.tsx         # Inquiry form page (/inquiry)
    api/
      inquiry.ts        # POST /api/inquiry — server route for form + email
  server/
    db.ts               # Drizzle client singleton
    schema.ts           # Drizzle table definitions
  components/           # Shared React components
  lib/
    utils.ts            # cn() utility from shadcn
    validations.ts      # Zod schemas for inquiry form
  styles/
    globals.css         # Tailwind v4 CSS entry point
routeTree.gen.ts        # Auto-generated — DO NOT EDIT
vite.config.ts
drizzle.config.ts
```

### TanStack Start SEO Head Management

Each route controls its own `<head>` via `routeOptions.head`:

```typescript
// src/routes/index.tsx
export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Premium Metal Gift Sets | Wischos Gift' },
      { name: 'description', content: 'Custom branded metal gift sets for corporate buyers. MOQ 50 sets.' },
      { property: 'og:title', content: 'Premium Metal Gift Sets | Wischos Gift' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: HomePage,
})
```

The root route (`__root.tsx`) must render `<HeadContent />` and `<Scripts />` — child route head properties merge and deduplicate automatically.

### Drizzle ORM + Supabase Connection

```typescript
// src/server/db.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// CRITICAL: prepare: false required for Supabase Transaction pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle(client, { schema })
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/server/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
```

### Drizzle Schema for Inquiry Form

```typescript
// src/server/schema.ts
import { pgTable, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const inquiries = pgTable('inquiries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  country: varchar({ length: 100 }),
  productInterest: text('product_interest'),
  quantity: varchar({ length: 100 }),
  message: text(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### Inquiry Form Server Route (Preferred Pattern for Resend)

Use a **server route** (not a server function) for Resend email sending. Server functions had reported issues rendering React Email components in TanStack Start; the workaround is to render to HTML first:

```typescript
// src/routes/api/inquiry.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import { db } from '~/server/db'
import { inquiries } from '~/server/schema'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { InquiryNotificationEmail } from '~/components/emails/InquiryNotification'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const inquirySchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  country: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
})

export const ServerRoute = createServerFileRoute('/api/inquiry').methods({
  POST: async ({ request }) => {
    const body = await request.json()
    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 })
    }

    // Save to Supabase via Drizzle
    await db.insert(inquiries).values(parsed.data)

    // Render React Email to HTML string, then send via Resend
    const html = await render(InquiryNotificationEmail({ inquiry: parsed.data }))
    await resend.emails.send({
      from: 'inquiries@wischosgift.com',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New inquiry from ${parsed.data.companyName}`,
      html,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  },
})
```

### Zod Validation (Standalone — Not drizzle-zod)

Do NOT use `drizzle-zod` with Zod v4 — it has known compatibility issues as of early 2026 (type errors with enum arrays, `createInsertSchema` incompatibilities). Define Zod schemas independently:

```typescript
// src/lib/validations.ts
import { z } from 'zod'

export const inquiryFormSchema = z.object({
  companyName: z.string().min(2, 'Company name required'),
  contactName: z.string().min(2, 'Contact name required'),
  email: z.string().email('Valid email required'),
  country: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().max(2000).optional(),
})

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>
```

### Vercel Deployment Configuration

```typescript
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro(),       // Required for Vercel deployment
    viteReact(),
  ],
})
```

No `vercel.json` required — Vercel auto-detects TanStack Start. TanStack Start apps use Fluid Compute (active CPU pricing) by default on Vercel.

### i18n-Ready Architecture

TanStack Router supports optional path parameter locale prefixes. For v1 (English-only), set up the routing structure so adding `/[locale]/...` prefixes later requires no component rewrites:

- Keep all content strings in a `src/content/` directory from day one (even for English-only)
- Use `src/routes/__root.tsx` as the layout boundary — locale detection middleware can be inserted here later
- Community solution for TanStack Start i18n: **Paraglide JS** (by inlang) — has official TanStack Start support as of January 2026, zero runtime overhead, compile-time type safety. Defer integration to v2.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| TanStack Start | Next.js | Next.js is more mature and has RSC — prefer if team has Next.js expertise and RSC patterns are needed |
| TanStack Start | Remix | Remix is more stable — prefer if RSC and data mutation patterns are the core concern |
| drizzle-orm 0.45.x stable | drizzle-orm 1.0.0-beta | Use beta only when team wants to test new RQBv2 syntax and accepts API instability risk |
| Server Route for email | Server Function for email | Server functions may work with plain-text Resend; server routes are more reliable for complex email workflows |
| @tanstack/react-form | react-hook-form | Use react-hook-form if team already knows it — both work with TanStack Start; RHF has 10x more community resources |
| Zod v4 (standalone schemas) | drizzle-zod | Use drizzle-zod only when it has confirmed Zod v4 compatibility (check GitHub issue #4406) |
| Supabase (database only) | Supabase Auth | Enable Supabase Auth only if admin panel / authenticated routes are added in a later version |
| Paraglide JS (future) | i18next | i18next is more popular but heavier; Paraglide has better TanStack Start native integration |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `tailwindcss-animate` | Deprecated in Tailwind v4 ecosystem | `tw-animate-css` — shadcn/ui installs this by default now |
| `drizzle-zod` with Zod v4 | Type errors with enum arrays; `createInsertSchema` incompatibility tracked in drizzle-orm issue #4406 and zod issue #5591 | Write Zod schemas independently; validate with them directly |
| Supabase client SDK (`@supabase/supabase-js`) for DB queries | Redundant when Drizzle ORM is present — two ORMs for the same database creates confusion and potential RLS bypass | Use Drizzle ORM for all DB access; Supabase dashboard for admin operations |
| React Server Components | TanStack Start explicitly does not support RSC as of March 2026 — the team is working on it but it is not available | Use TanStack Start Server Functions and Server Routes for server-side logic |
| `serial` primary key type in Drizzle | Deprecated in modern PostgreSQL and Drizzle | Use `generatedAlwaysAsIdentity()` for auto-increment PKs |
| `prepare: true` (default) with Supabase Transaction pool | Causes "prepared statement already exists" errors in production | Set `prepare: false` in postgres.js client options |

---

## Version Compatibility Matrix

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| `@tanstack/react-start` | 1.166.x | `@tanstack/react-router` 1.166.x | Versions must match exactly — always update together |
| `tailwindcss` | 4.x | `shadcn/ui` latest | shadcn/ui fully migrated to Tailwind v4. Do not mix v3 and v4 components. |
| `drizzle-orm` | 0.45.x | `postgres` 3.x, `drizzle-kit` 0.30.x | Stable line. The 1.0.0-beta introduces RQBv2 — breaking change if upgrading later. |
| `zod` | 4.x | `@tanstack/react-form` 1.x | TanStack Form has native Zod v4 adapter. |
| `zod` | 4.x | `drizzle-zod` 0.8.x | **Incompatible** — drizzle-zod has open GitHub issues for Zod v4 support. Avoid drizzle-zod. |
| `resend` | 6.9.x | `@react-email/render` | Use `render()` from `@react-email/render` to convert React Email templates to HTML before passing to Resend SDK |
| `nitro` | 2.x | TanStack Start 1.166.x + Vercel | Required as Vite plugin for Vercel deployment; TanStack Start is ditching manual adapter config in favor of Nitro |

---

## shadcn/ui Component Recommendations for This Project

The following shadcn/ui components serve the Wischos Gift showcase site's needs:

| Component | Use Case | Notes |
|-----------|----------|-------|
| `Button` | CTAs, form submit, inquiry actions | Use `variant="default"` for primary CTAs, `variant="outline"` for secondary |
| `Card` | Product tiles, feature highlights | Core layout primitive for product grid |
| `Form` + `FormField` + `FormItem` | Inquiry form structure | shadcn Form wraps react-hook-form; if using TanStack Form, use Field component instead |
| `Input` | Text inputs in inquiry form | |
| `Textarea` | Message field in inquiry form | |
| `Label` | Form field labels | Included in Form component |
| `Select` | Country, product category dropdowns | |
| `Badge` | Tags like "MOQ 50 sets", product materials | |
| `Separator` | Section dividers | |
| `NavigationMenu` | Top navigation bar | Accessible, mobile-friendly |
| `Sheet` | Mobile navigation drawer | Replaces hamburger menu |
| `Dialog` | Product image lightbox | Use with Radix Portal for full-screen images |
| `Skeleton` | Loading states | |
| `Toast` / `Sonner` | Form submission feedback | shadcn now recommends Sonner over its own Toast |

**Do not install** shadcn Table, DataTable, or Dashboard components — this is a showcase site, not an admin panel.

---

## Environment Variables Required

```bash
# .env.local (never commit)
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres?pgbouncer=true
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=your-personal@email.com

# Optional for production
VITE_SITE_URL=https://wischosgift.com
```

**Supabase connection URL format:** Use the "Shared Pooler" (Transaction mode) URL from Supabase dashboard — it includes `?pgbouncer=true`. This is what requires `prepare: false` in the Drizzle client.

---

## Sources

- [TanStack Start Overview](https://tanstack.com/start/latest/docs/framework/react/overview) — Framework features, RC status (HIGH confidence)
- [TanStack Start Server Routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes) — API route file conventions (HIGH confidence)
- [TanStack Start SEO Guide](https://tanstack.com/start/latest/docs/framework/react/guide/seo) — Head management patterns (HIGH confidence)
- [Vercel TanStack Start Docs](https://vercel.com/docs/frameworks/full-stack/tanstack-start) — Nitro plugin config, Fluid Compute (HIGH confidence)
- [Drizzle ORM Supabase Guide](https://orm.drizzle.team/docs/get-started/supabase-new) — Connection setup, `prepare: false` requirement (HIGH confidence)
- [Drizzle ORM Connect Supabase](https://orm.drizzle.team/docs/connect-supabase) — Official integration docs (HIGH confidence)
- [shadcn/ui Tailwind v4 Docs](https://ui.shadcn.com/docs/tailwind-v4) — Confirmed Tailwind v4 + React 19 compatibility (HIGH confidence)
- [drizzle-orm issue #4406](https://github.com/drizzle-team/drizzle-orm/issues/4406) — drizzle-zod Zod v4 compatibility tracking (HIGH confidence — live issue)
- [Resend npm package](https://www.npmjs.com/package/resend) — Version 6.9.3 current (MEDIUM confidence — npm page returned 403 during research, version sourced from search snippet)
- [Paraglide JS TanStack Start i18n](https://eugeneistrach.com/blog/paraglide-tanstack-start/) — Official TanStack Start support Jan 2026 (MEDIUM confidence)
- [TanStack Form Quick Start](https://tanstack.com/form/latest/docs/framework/react/quick-start) — TanStack Form SSR compatibility (HIGH confidence)
- AnswerOverflow Resend/TanStack Start thread (August 2025) — `render()` workaround for React Email in server functions (MEDIUM confidence — community source, single report)

---

## Open Questions / Flags for Phase Research

1. **Resend in server functions vs server routes:** Community reports from August 2025 indicate React Email rendering fails in server functions — the `render()` + HTML workaround is confirmed, but this should be validated during implementation. The server route approach (documented above) is the safer default.

2. **drizzle-zod Zod v4 status:** GitHub issue #4406 was open as of research date. Check before implementing any schema-bridging — it may have been resolved.

3. **TanStack Start RC stability:** The framework is in Release Candidate status as of March 2026. API is considered stable, but minor breaking changes between 1.166.x patch versions are possible. Pin exact versions in package.json.

4. **Supabase free tier limits:** Supabase free tier pauses projects after 7 days of inactivity. For a pre-launch site, this is acceptable, but set a reminder to keep the project active or upgrade before public launch.

---

*Stack research for: Wischos Gift — B2B metal gift showcase website*
*Researched: 2026-03-11*
