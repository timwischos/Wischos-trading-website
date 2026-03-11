# Architecture Research

**Domain:** B2B premium gift showcase website — inquiry-driven, static product catalog, full-stack TypeScript
**Researched:** 2026-03-11
**Confidence:** HIGH (TanStack Start is in RC with stable APIs; patterns derived from official docs and confirmed community patterns)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE / CDN                           │
│  Static assets, public/ images served at edge                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                     TANSTACK START (Nitro/SSR)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  Page Routes │  │ Server       │  │ Server       │               │
│  │  (SSR)       │  │ Functions    │  │ Routes       │               │
│  │  /           │  │ (RPC-style)  │  │ /api/*       │               │
│  │  /products   │  │              │  │ (HTTP POST)  │               │
│  │  /products/* │  │              │  │              │               │
│  │  /about      │  │              │  │              │               │
│  │  /contact    │  └──────┬───────┘  └──────┬───────┘               │
│  │  /inquiry    │         │                 │                        │
│  └──────┬───────┘         │                 │                        │
│         │           (server-only)     (server-only)                  │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          │          ┌──────▼─────────────────▼────────┐
          │          │         SERVER LAYER              │
          │          │  ┌────────────┐ ┌─────────────┐  │
          │          │  │  Drizzle   │ │   Resend    │  │
          │          │  │  ORM       │ │   (email)   │  │
          │          │  └─────┬──────┘ └──────┬──────┘  │
          │          └────────┼───────────────┼─────────┘
          │                   │               │
          │          ┌────────▼───────┐       │ (SMTP/API)
          │          │   SUPABASE     │       │
          │          │  PostgreSQL    │  ┌────▼──────────┐
          │          │  (inquiries    │  │  Resend cloud │
          │          │   table)       │  │  email infra  │
          │          └────────────────┘  └───────────────┘
          │
┌─────────▼─────────────────────────────────────────────────────────┐
│                      REACT CLIENT (Hydrated)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  shadcn/ui   │  │  TanStack    │  │  TanStack Router         │  │
│  │  Components  │  │  Form        │  │  (navigation, params)    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Page Routes (`src/routes/*.tsx`) | SSR-rendered pages, SEO head, route loaders | Server Functions, shadcn/ui components |
| Root Layout (`__root.tsx`) | HTML shell, `<HeadContent />`, `<Scripts />`, global nav + footer | All page routes (via `<Outlet />`) |
| Server Functions (`createServerFn`) | Type-safe server-side data fetching called from route loaders | Drizzle ORM, external APIs |
| Server Routes (`src/routes/api/*.ts`) | Raw HTTP endpoints for form submission and email trigger | Drizzle ORM, Resend SDK |
| Drizzle ORM (`src/server/db.ts`) | Type-safe database client singleton | Supabase PostgreSQL |
| Drizzle Schema (`src/server/schema.ts`) | Table definitions, inferred TypeScript types | Drizzle ORM, Drizzle Kit migrations |
| Zod Schemas (`src/lib/validations.ts`) | Input validation shapes for inquiry form | Server Route (validation), TanStack Form (client validation) |
| TanStack Form (`InquiryForm` component) | Client-side form state, field validation, submission | Server Route `/api/inquiry` via `fetch()` |
| shadcn/ui Components (`src/components/ui/`) | Accessible, styled primitive UI elements | All page components |
| Page Components (`src/components/`) | Domain-specific layouts composed from shadcn/ui | shadcn/ui, content module |
| Content Module (`src/content/`) | All user-facing strings, product data | Page components (import only) |
| Email Templates (`src/components/emails/`) | React Email components for notification emails | Server Route (rendered to HTML via `@react-email/render`) |
| Resend SDK | Transactional email delivery | Called only from Server Route, never from client |

---

## Recommended Project Structure

```
project-root/
├── public/                        # Static assets served by CDN
│   ├── images/
│   │   └── products/              # AI-generated product images (v1 placeholder)
│   └── og/                        # Open Graph images per page
│
├── src/
│   ├── routes/                    # TanStack Start file-based routing
│   │   ├── __root.tsx             # Root layout: Nav, Footer, HeadContent, Scripts
│   │   ├── index.tsx              # Landing page (/) — AIDA copy, hero, CTA
│   │   ├── products/
│   │   │   ├── index.tsx          # Products grid page (/products)
│   │   │   └── $productId.tsx     # Product detail page (/products/:productId)
│   │   ├── about.tsx              # About Us (/about) — E-E-A-T content
│   │   ├── contact.tsx            # Contact (/contact)
│   │   ├── inquiry.tsx            # Inquiry form page (/inquiry)
│   │   └── api/
│   │       └── inquiry.ts         # POST /api/inquiry — saves to DB + sends email
│   │
│   ├── server/                    # Server-only modules (never imported by client)
│   │   ├── db.ts                  # Drizzle client singleton (postgres.js + drizzle)
│   │   └── schema.ts              # Drizzle table definitions
│   │
│   ├── components/                # Shared React components
│   │   ├── ui/                    # shadcn/ui generated components (do not edit manually)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── layout/                # Site-wide layout components
│   │   │   ├── SiteHeader.tsx     # Navigation bar (desktop + Sheet for mobile)
│   │   │   ├── SiteFooter.tsx     # Footer: links, contact, legal
│   │   │   └── PageShell.tsx      # Consistent page padding/width wrapper
│   │   ├── sections/              # Page section components (used in routes)
│   │   │   ├── HeroSection.tsx    # Landing page hero
│   │   │   ├── DifferentiatorsSection.tsx
│   │   │   ├── ProductGrid.tsx    # Product card grid
│   │   │   ├── ProductCard.tsx    # Individual product tile
│   │   │   ├── ImageLightbox.tsx  # Dialog-based image viewer
│   │   │   └── InquiryForm.tsx    # Full inquiry form component
│   │   └── emails/                # React Email templates (server-side only)
│   │       └── InquiryNotification.tsx
│   │
│   ├── content/                   # All user-facing content strings (i18n-ready)
│   │   ├── products.ts            # Product catalog data (typed, static for v1)
│   │   ├── navigation.ts          # Nav link labels
│   │   ├── homepage.ts            # Landing page copy
│   │   ├── about.ts               # About page copy
│   │   └── meta.ts                # Default SEO titles/descriptions per route
│   │
│   ├── lib/                       # Shared utilities
│   │   ├── utils.ts               # cn() from shadcn/ui, general helpers
│   │   └── validations.ts         # Zod schemas (inquiry form, shared)
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind v4 CSS entry point (@import "tailwindcss")
│   │
│   ├── router.tsx                 # TanStack Router configuration
│   └── routeTree.gen.ts           # Auto-generated — DO NOT EDIT
│
├── drizzle/                       # Drizzle Kit migration output
│   └── *.sql
│
├── vite.config.ts                 # TanStack Start + Nitro + viteReact plugins
├── drizzle.config.ts              # Drizzle Kit configuration
├── tsconfig.json
├── package.json
└── .env.local                     # Secrets (never commit)
```

### Structure Rationale

- **`src/routes/`** — File path = URL path. TanStack Router auto-generates `routeTree.gen.ts` from this. API routes live at `routes/api/` and are server-only by file convention.
- **`src/server/`** — Database client and schema. Files here should only ever be imported by server functions and server routes. TanStack Start enforces a server-client import boundary — importing `src/server/db.ts` from a client component will throw a build error.
- **`src/components/ui/`** — shadcn/ui generated files. The CLI writes here. Do not co-edit manually and through the CLI — divergence causes style drift.
- **`src/components/sections/`** — Domain sections that compose multiple `ui/` primitives. This is where the actual page layouts live. Keeps route files thin.
- **`src/content/`** — All product data and copy strings live here as typed TypeScript modules, not in route files or components. This is the i18n seam: when adding languages, swap this layer without touching components.
- **`public/images/products/`** — Served directly by CDN. Naming convention: `[productId]-hero.jpg`, `[productId]-detail-1.jpg`. `content/products.ts` references these paths.

---

## Architectural Patterns

### Pattern 1: Route Loader + Server Function for SSR Data

**What:** Route files declare a `loader` function that calls a `createServerFn`. The loader runs on the server before the component renders, so the page arrives fully populated (no client-side loading spinners for above-the-fold content).

**When to use:** Any page with data that must be in the initial HTML for SEO — product pages, about page with dynamic content.

**Trade-offs:** Adds server round-trip latency on first load, but critical for SEO and perceived performance. For a showcase site with a small product catalog, the latency is negligible.

**Example:**
```typescript
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '~/server/db'

const getProducts = createServerFn({ method: 'GET' }).handler(async () => {
  // This runs on server. Client never sees db import.
  return db.query.products.findMany()
})

export const Route = createFileRoute('/products/')({
  loader: () => getProducts(),
  head: () => ({
    meta: [
      { title: 'Metal Gift Sets | Wischos Gift' },
      { name: 'description', content: 'Browse our curated range of premium corporate metal gift sets. MOQ 50 sets.' },
    ],
  }),
  component: ProductsPage,
})

function ProductsPage() {
  const products = Route.useLoaderData()
  return <ProductGrid products={products} />
}
```

### Pattern 2: Static Content Module for Product Catalog

**What:** Product catalog data (names, descriptions, images, categories) is stored as typed TypeScript in `src/content/products.ts`, not in the database. The database stores only inquiries. Products are static for v1 — no admin panel.

**When to use:** Any data that does not change without a code deployment and has no user-generated content. For this project: all products, page copy, nav links.

**Trade-offs:** Simpler (no CMS, no DB queries for products), faster (zero DB latency for product pages), but requires a redeploy to update product copy. Acceptable for v1.

**Example:**
```typescript
// src/content/products.ts
export const products = [
  {
    id: 'desk-accessory-set',
    name: 'Executive Desk Accessory Set',
    tagline: 'Precision-crafted metal stationery for the modern executive.',
    category: 'desk-accessories',
    materials: ['Stainless Steel', 'Anodized Aluminum'],
    heroImage: '/images/products/desk-accessory-set-hero.jpg',
    moq: 50,
  },
  // ...
] as const

export type Product = typeof products[number]
```

### Pattern 3: Server Route as API Boundary for Form Submission

**What:** The inquiry form posts to `/api/inquiry` (a TanStack Start Server Route). The server route validates the payload with Zod, inserts to Supabase via Drizzle, renders an email template to HTML, and sends via Resend. The client receives a simple `{ ok: true }` or error response.

**When to use:** Any mutation with external side effects (DB write + email). Prefer server routes over server functions for this pattern because server routes handle raw HTTP and are more reliable for Resend email sending (see STACK.md — known issue with React Email in server functions).

**Trade-offs:** Slightly more verbose than a server function call, but the HTTP boundary makes it independently testable and Resend-compatible.

### Pattern 4: Per-Route Head for SEO

**What:** Each route file exports a `head()` function that returns `meta` and `links` arrays. These merge into the `<head>` at SSR time. The root route renders `<HeadContent />` which consumes the merged head state.

**When to use:** All routes. Every page needs its own title, description, and Open Graph tags. This is not optional for a B2B site targeting international buyers via search.

**Example:**
```typescript
export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Wischos Gift — Corporate Gift Specialists' },
      { name: 'description', content: 'Wischos Gift is a trading company specializing in premium custom metal gift sets for corporate buyers in Europe, the US, and Australia.' },
      { property: 'og:title', content: 'About Wischos Gift' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'canonical', href: 'https://wischosgift.com/about' },
    ],
  }),
})
```

### Pattern 5: i18n-Ready Content Separation

**What:** Keep all user-visible strings — product names, page copy, navigation labels, form field labels — in `src/content/` as plain TypeScript objects. Components receive these strings as props, never hard-code them.

**When to use:** From day one. The cost is near-zero (it is just a file), and the future benefit is that adding Paraglide JS (the recommended i18n library for TanStack Start) only requires swapping the content layer.

**Trade-offs:** Slight overhead in project setup. Worth it for any project with explicit i18n requirements.

---

## Data Flow

### Inquiry Form Submission Flow

```
[User fills InquiryForm.tsx]
    ↓
[TanStack Form validates with Zod schema (client)]
    ↓ (fetch POST)
[/api/inquiry Server Route]
    ↓
[Zod safeParse() — server-side re-validation]
    ↓ (parallel)
[Drizzle INSERT → Supabase PostgreSQL]   [render() → Resend.send()]
    ↓                                          ↓
[{ ok: true } response]              [Email delivered to operator inbox]
    ↓
[InquiryForm shows success state via Sonner toast]
```

### Product Page Rendering Flow (SSR)

```
[Browser requests /products/:productId]
    ↓
[TanStack Start SSR on Vercel Nitro]
    ↓
[Route loader calls getProduct() Server Function]
    ↓
[Server Function reads from content/products.ts (static)]
    ↓ (no DB call — static data)
[Component renders with data, head() metadata injected]
    ↓
[Full HTML streamed to browser]
    ↓
[React hydrates on client — no re-fetch needed]
```

### SEO / Metadata Flow

```
[Route file declares head() → returns meta/links arrays]
    ↓
[TanStack Router merges child head with parent head]
    ↓
[__root.tsx renders <HeadContent /> in <head> tag]
    ↓
[SSR output includes all meta tags in initial HTML]
    ↓
[Search engine crawlers and AI scrapers see full metadata]
```

### Key Data Flows Summary

1. **Product catalog data:** `src/content/products.ts` → route loaders → page components → rendered HTML. No database involved.
2. **Inquiry form:** Client form → `fetch()` → `/api/inquiry` server route → Drizzle (Supabase) + Resend (email) → success response → client UI feedback.
3. **SEO metadata:** Per-route `head()` function → TanStack Router head merge → `<HeadContent />` in root layout → SSR HTML output.
4. **Global navigation state:** Handled by TanStack Router (active link detection, params). No additional state management library needed.

---

## Scaling Considerations

This is a low-traffic B2B showcase site. The table below is provided for awareness, not as an action plan.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–1K unique visitors/mo | Current architecture is correct. Vercel free tier handles this. Supabase free tier handles inquiry volume. No changes needed. |
| 1K–50K unique visitors/mo | Still fine as-is. Add Vercel Analytics. Consider upgrading Supabase to Pro tier ($25/mo) to avoid the 7-day inactivity pause. |
| 50K+ unique visitors/mo | Product catalog moves from static TypeScript to a Supabase table to allow non-developer updates. Add an admin-authenticated route for managing products. Consider a CDN for product images (Vercel Blob or Cloudflare R2). |

### Scaling Priorities

1. **First bottleneck:** Product image loading speed — AI-generated images at full resolution. Fix: compress images to WebP, add `width`/`height` attributes to avoid CLS.
2. **Second bottleneck:** Supabase free tier pausing — Fix: upgrade to Pro, or ping the DB daily via a cron job.

---

## Anti-Patterns

### Anti-Pattern 1: Database for Product Catalog in v1

**What people do:** Put product names, descriptions, and images into a `products` table in the database because "that's how e-commerce works."

**Why it's wrong:** There is no admin panel. The only way to update products is via Supabase dashboard SQL queries, which is worse UX than editing a TypeScript file. It adds DB latency to every product page load. It introduces schema migrations for copy changes.

**Do this instead:** Store products as typed TypeScript in `src/content/products.ts`. When a real CMS need emerges (v2), migrate at that point.

### Anti-Pattern 2: Business Logic in Route Components

**What people do:** Put Drizzle queries, email sending logic, and validation inside the `.component` function of a route file.

**Why it's wrong:** TanStack Start cannot enforce the server/client boundary inside component functions. Drizzle and Resend imports will attempt to bundle into client code, causing build failures or credential leaks.

**Do this instead:** All database and external API calls must live in Server Functions (`createServerFn`) or Server Routes (`createServerFileRoute`). Components only receive data as props or via `Route.useLoaderData()`.

### Anti-Pattern 3: Importing `src/server/` from Client Components

**What people do:** Import `~/server/db` directly inside a React component or non-server file to "keep things simple."

**Why it's wrong:** TanStack Start has import protection that detects this and throws a build error. Even if you work around it, `postgres` and `drizzle-orm` would bundle into client JavaScript, exposing database credentials.

**Do this instead:** The `src/server/` boundary is absolute. Components call server functions. Server functions call `src/server/db`. Never cross this boundary in the other direction.

### Anti-Pattern 4: `prepare: true` with Supabase Connection Pooling

**What people do:** Use the default `postgres.js` configuration (which has `prepare: true`) when connecting through Supabase's Transaction pool mode (Supavisor).

**Why it's wrong:** Transaction pool mode does not support PostgreSQL prepared statements. The app will throw "prepared statement already exists" errors in production on Vercel.

**Do this instead:** Always set `{ prepare: false }` in the `postgres()` client when using the Supabase shared pooler URL. This is a one-line fix that must be in place from day one.

### Anti-Pattern 5: Hard-coding Copy Strings in Components

**What people do:** Write English strings directly in JSX — `<h1>Premium Metal Gift Sets</h1>` — because i18n "isn't needed yet."

**Why it's wrong:** When v2 adds Chinese or German language support, every component needs to be touched to extract strings. The refactor is large and error-prone.

**Do this instead:** All user-visible strings live in `src/content/`. Components import and render. The one-time cost of this discipline is minutes per component; the future benefit is a clean i18n migration.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Supabase PostgreSQL | Drizzle ORM via `postgres.js` in `src/server/db.ts` | Transaction pool mode — `prepare: false` required |
| Resend | SDK called in Server Route handler, never from client | Render React Email to HTML first via `@react-email/render` |
| Vercel | Zero-config via Nitro adapter in `vite.config.ts` | No `vercel.json` needed |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Client components ↔ Server Functions | `createServerFn()` RPC call via TanStack Start's bundled transport | Type-safe end-to-end via TypeScript inference |
| Client form ↔ Server Route | `fetch('/api/inquiry', { method: 'POST', body: JSON.stringify(data) })` | Manual HTTP call — not typed end-to-end; use shared Zod schema for both validation points |
| Routes ↔ Content module | Direct TypeScript import (`import { products } from '~/content/products'`) | Static — no runtime dependency, tree-shaken by Vite |
| Server Route ↔ Email template | `render(InquiryNotification({ inquiry }))` — converts React tree to HTML string | Server-only; email component never hydrates on client |

---

## Build Order (Phase Implications)

Based on component dependencies, the recommended build order for phases is:

```
Phase 1 — Foundation
  ├── Project scaffold (TanStack Start + Tailwind + shadcn/ui)
  ├── src/server/db.ts + schema.ts (Drizzle + Supabase)
  ├── __root.tsx (layout shell, nav, footer)
  └── src/content/ structure (all content modules, empty stubs)

Phase 2 — Core Pages (no form, no DB writes)
  ├── Landing page (/)              — depends on: layout, content/homepage.ts
  ├── About page (/about)           — depends on: layout, content/about.ts
  ├── Contact page (/contact)       — depends on: layout
  └── Products grid (/products)     — depends on: layout, content/products.ts, ProductCard component

Phase 3 — Product Detail + Lightbox
  └── /products/:productId          — depends on: Phase 2 products, ImageLightbox component

Phase 4 — Inquiry Form + API
  ├── /inquiry route                — depends on: InquiryForm component
  ├── InquiryForm.tsx               — depends on: TanStack Form, Zod schema, shadcn/ui Form components
  ├── /api/inquiry Server Route     — depends on: db.ts, schema.ts, Zod schema, Resend
  └── InquiryNotification.tsx       — depends on: @react-email/components

Phase 5 — SEO + Polish
  ├── per-route head() metadata     — depends on: all routes existing
  ├── structured data (JSON-LD)     — depends on: product and org content
  ├── Open Graph images             — depends on: brand assets / og/ in public/
  └── Performance audit             — depends on: all content + images present
```

**Key dependency constraint:** The Server Route for inquiry (`/api/inquiry`) cannot be tested end-to-end until Supabase is provisioned, Drizzle schema is pushed, and Resend API key is configured. Do this at the start of Phase 4, not during Phase 4 component work.

---

## SEO / GEO Architecture Notes

GEO (Generative Engine Optimization) and SIO (Search Intelligence Optimization) require that AI search engines can extract structured meaning from the page. For this site:

1. **Structured data (JSON-LD):** Add `Organization` schema in `__root.tsx` head and `Product` schema in product detail routes. This is a direct signal to both Google and LLM-powered search.

2. **Semantic HTML:** Use correct heading hierarchy (`h1` → `h2` → `h3`). Use `<article>`, `<section>`, `<main>`, `<nav>`. AI crawlers weight semantic structure.

3. **Canonical URLs:** Every route emits a `<link rel="canonical">` tag. Prevents duplicate content penalties when the site is eventually multilingual.

4. **Content in initial HTML:** Because TanStack Start SSR renders all product and page copy in the server-side HTML, AI scrapers (which often do not execute JavaScript) will see full content. This is a structural advantage over client-only SPAs.

5. **i18n canonical strategy (future):** When adding languages, use `hreflang` link tags in head and `/:locale/` URL prefixes. The current content module structure makes this a clean addition to `__root.tsx`.

---

## Sources

- [TanStack Start — Server Routes Guide](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes) — Server route file conventions (HIGH confidence)
- [TanStack Start — Server Functions Guide](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions) — `createServerFn` middleware, input validation, Zod adapter (HIGH confidence)
- [TanStack Start — SEO Guide](https://tanstack.com/start/latest/docs/framework/react/guide/seo) — `head()` API, `<HeadContent />` placement (HIGH confidence)
- [TanStack Router — File Naming Conventions](https://tanstack.com/router/latest/docs/routing/file-naming-conventions) — Route file naming, flat vs nested, dynamic params (HIGH confidence)
- [TanStack Router — Internationalization Guide](https://tanstack.com/router/v1/docs/framework/react/guide/internationalization-i18n) — i18n primitive patterns (HIGH confidence)
- [Drizzle ORM — Supabase Integration](https://orm.drizzle.team/docs/get-started/supabase-new) — Connection setup, `prepare: false` requirement (HIGH confidence)
- [TanStack Start — Build From Scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch) — Official starter project structure (HIGH confidence)
- [shadcn/ui — Components](https://ui.shadcn.com/docs/components) — Component list, installation patterns (HIGH confidence)
- [Paraglide JS for TanStack Start](https://eugeneistrach.com/blog/paraglide-tanstack-start/) — i18n integration approach, routing structure (MEDIUM confidence — community blog, January 2026)
- [AnswerOverflow — Resend in TanStack Start](https://www.answeroverflow.com/m/1405648247657336852) — Server function vs server route for email (MEDIUM confidence — community thread, August 2025)
- [DeepWiki — TanStack Server Functions and API Integration](https://deepwiki.com/tanstack/router/5.2-server-functions-and-api-integration) — Server function/API route relationship, shared business logic pattern (MEDIUM confidence)

---

*Architecture research for: Wischos Gift — B2B premium metal gift showcase website*
*Researched: 2026-03-11*
