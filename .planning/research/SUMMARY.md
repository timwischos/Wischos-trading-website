# Project Research Summary

**Project:** Wischos Gift — B2B Metal Gift Showcase Website
**Domain:** B2B premium corporate gift showcase — inquiry-driven, international buyers (EU/US/AU)
**Researched:** 2026-03-11
**Confidence:** MEDIUM-HIGH

## Executive Summary

Wischos Gift is a B2B showcase website for a trading company selling premium custom metal gift sets to corporate buyers in Europe, the US, and Australia. The site's sole commercial purpose is to convert qualified visitors into inquiries — there is no cart, no checkout, no transactional e-commerce. Research confirms this is the correct scope: B2B buyers at this price/MOQ level require human-mediated negotiation, and a shopping cart would attract the wrong buyer type while undermining premium positioning. The recommended approach is a server-rendered showcase built on TanStack Start (full-stack TypeScript), Tailwind CSS v4, shadcn/ui, Supabase (PostgreSQL), and Resend for inquiry notifications — the entire stack is fixed by project constraints, and research focused on validating integration patterns, version compatibility, and architectural traps.

The recommended architecture separates concerns cleanly: static product catalog data in typed TypeScript modules (no database reads for product pages), a single Supabase table for inquiry persistence, one Server Route handling form submission and email notification, and per-route SSR head management for SEO. This is not over-engineering — it is the minimum structure required to support i18n in v2 and to maintain the server/client security boundary that prevents credential leakage. Three patterns are non-negotiable from day one: Supabase transaction-mode pooler connection (port 6543, `prepare: false`), all copy strings in `src/content/` modules (not hard-coded in JSX), and optional locale prefix in the route tree. Retrofitting any of these after launch carries a HIGH recovery cost.

The primary risks are not technical — they are positioning and trust. EU and US procurement managers are experienced supplier evaluators. A site that reads as a one-person operation, uses generic B2B filler language, has no trust signals (company registration, address, MOQ, lead times, payment terms), or has obvious AI-generated product images will not generate qualified inquiries regardless of how well the code is written. Technical build and content/positioning must be co-developed: foundation and routing architecture are Phase 1, but copywriting strategy and trust signal placement are equally Phase 1 constraints, not cosmetic afterthoughts.

---

## Key Findings

### Recommended Stack

The stack is fixed by project constraints. Research confirmed that all components are production-viable and mutually compatible at the specified versions, with one significant exception: `drizzle-zod` is incompatible with Zod v4 (GitHub issue #4406 open as of research date) and must be avoided. Zod schemas are written independently and used for both server-side validation and TanStack Form client validation. TanStack Start remains in Release Candidate status as of March 2026 — API is stable but patch versions should be pinned.

**Core technologies:**
- **TanStack Start 1.166.x:** Full-stack React framework — SSR, server functions, file-based routing, Vercel deployment via Nitro adapter. No separate backend required.
- **TanStack Router 1.166.x:** Bundled with Start. Type-safe routing, dynamic params, per-route `head()` for SEO metadata. Versions must match Start exactly.
- **Tailwind CSS 4.x + shadcn/ui:** CSS-first utility styling (no `tailwind.config.js`). shadcn/ui fully compatible with v4. Use `tw-animate-css` — `tailwindcss-animate` is deprecated in v4.
- **Supabase (cloud PostgreSQL):** Database only — no Supabase Auth. Must use transaction-mode pooler URL (port 6543) on Vercel. `prepare: false` in postgres.js client is mandatory.
- **Drizzle ORM 0.45.x stable:** TypeScript-native ORM. Use stable line, not 1.0.0-beta. Only one table needed: `inquiries` with `generatedAlwaysAsIdentity()` PK.
- **Zod 4.x (standalone schemas):** Do not use `drizzle-zod` — incompatible. Write Zod schemas directly in `src/lib/validations.ts`.
- **Resend 6.9.x:** Transactional email. Must be called from a Server Route (not a server function) for reliable React Email rendering. Always `await` the send call before returning a response.
- **Vercel:** Zero-config deployment via Nitro Vite plugin. Fluid Compute (active CPU billing). Free tier adequate for pre-launch volume; Supabase free tier pauses after 7 days of inactivity.
- **@tanstack/react-form 1.x:** Preferred for inquiry form — native SSR compatibility, Zod v4 adapter built in.

See `.planning/research/STACK.md` for full version compatibility matrix, integration patterns, and code examples.

### Expected Features

Research identifies three distinct tiers of features. The critical insight: the site's conversion depends as much on what is deliberately excluded (cart, live pricing, blog) as what is included. Anti-features that seem sensible in isolation actively damage the B2B inquiry model.

**Must have (table stakes — missing any = buyer leaves without inquiring):**
- Product gallery with categories, specifications (materials, MOQ, finish options), and image lightbox
- MOQ (50 sets) stated on every product entry point — not buried in FAQ
- Inquiry form: Supabase persistence + Resend email notification, 6–8 fields maximum
- About page with E-E-A-T framing (company registration, expertise signals, "we/our" voice throughout)
- Contact page with professional domain email and explicit response time commitment (1 business day)
- Privacy policy page (legally required for EU/GDPR buyers; form cannot exist without it)
- "How It Works" process section (removes cross-border anxiety for EU/US/AU buyers)
- FAQ with FAQPage JSON-LD schema (GEO/AI search citation; addresses top buyer objections)
- Open Graph and Organization schema markup across all pages
- Mobile-responsive design throughout
- i18n-ready routing and content architecture (prevents costly v2 rewrite)
- Lead time, sample policy, and payment terms (T/T) stated clearly — not "contact us"

**Should have (competitive differentiators — add in v1.x after first inquiries):**
- Inquiry confirmation email to buyer (Resend template)
- Custom packaging showcase / mockup section (requires real product photography)
- Testimonial section (requires first 1–3 completed clients)
- WhatsApp contact option (add if buyers request it)
- Logo customization illustration showing placement zones and print methods

**Defer (v2+ — not essential, requires validated demand):**
- Chinese language version (requires full localisation, separate SEO strategy)
- Client portal / order tracking (requires repeat buyer base)
- Blog / content marketing (requires editorial capacity a SOHO cannot sustain)
- CMS / admin panel (Supabase dashboard covers v1 data needs)
- Product configurator (collaborative design cannot be replaced by a UI tool)

See `.planning/research/FEATURES.md` for full prioritization matrix, anti-features analysis, and competitor comparison.

### Architecture Approach

The architecture is a clean separation between three layers: static content (product catalog, copy strings in `src/content/` TypeScript modules), SSR page rendering (TanStack Start routes with per-route `head()`), and a single mutation path (inquiry form → Server Route → Drizzle insert + Resend email). There are no client-side data fetches for product content because product data is static and must be in the initial SSR HTML for SEO. The only database interaction is inquiry form submission. The server/client boundary is hard: `src/server/` modules must never be imported by client components — TanStack Start enforces this at build time.

**Major components:**
1. **`src/routes/`** — File-based routes (SSR). Each route owns its `head()` metadata. Root layout (`__root.tsx`) renders `<HeadContent />` and `<Scripts />`. API routes live at `routes/api/`.
2. **`src/server/db.ts` + `schema.ts`** — Drizzle ORM singleton with Supabase connection. Schema: single `inquiries` table. Absolute server boundary — never imported by client code.
3. **`src/content/`** — All product data and copy strings as typed TypeScript. The i18n seam: swap this layer when adding languages without touching components.
4. **`src/components/sections/`** — Domain-specific page sections (HeroSection, ProductGrid, InquiryForm) composed from `src/components/ui/` shadcn primitives. Route files stay thin.
5. **`src/routes/api/inquiry.ts`** — Server Route: validates with Zod, inserts via Drizzle, renders React Email template to HTML, sends via Resend. The only path where DB and email interact.
6. **`src/components/emails/`** — React Email templates. Server-side only; never hydrated on client. Rendered to HTML string via `@react-email/render` before passing to Resend SDK.

See `.planning/research/ARCHITECTURE.md` for full data flow diagrams, anti-patterns, and the recommended build order.

### Critical Pitfalls

Research surfaced 10 pitfalls across technical and business domains. The top 5 that would cause the most damage if missed:

1. **VITE_PUBLIC_ prefix on server secrets** — Bakes DATABASE_URL or RESEND_API_KEY into client JavaScript bundle. Prevention: all secrets without `VITE_PUBLIC_` prefix; all DB/email access inside `createServerFn` or Server Routes. Address in Phase 1, before any feature code.

2. **Supabase direct connection on Vercel** — Using port 5432 direct connection exhausts the 90-connection free tier limit under moderate serverless concurrency. Prevention: always use transaction-mode pooler URL (port 6543) with `{ prepare: false, max: 1 }` from day one. Address in Phase 1 (database setup).

3. **i18n routing added as afterthought** — Flat routes (`/about`, `/products`) require full route tree restructure and 301-redirect management when v2 adds language support, breaking months of SEO equity. Prevention: optional locale prefix in route tree from day one; all strings through `src/content/` abstraction. Address in Phase 1 (project scaffold).

4. **Website reads as a one-person operation** — First-person singular copy, Gmail/QQ email, WhatsApp-only contact, "small team" language triggers procurement managers to disengage or negotiate aggressively on price. Prevention: "we/our" voice throughout, professional domain email, company registration number on About page, registered business address. Address in Phase 2–3 (copywriting review gate before launch).

5. **Generic value proposition indistinguishable from Alibaba** — "High quality products, competitive prices, trusted partner" is what 40,000 Alibaba stores say. Prevention: lead with specific differentiator ("50-set minimum, full packaging design, single counterpart from selection to delivery"), use numbers (MOQ, lead times), apply "could an Alibaba store say this?" test to every claim. Address in Phase 2 (landing page and product copy).

Additional pitfalls requiring attention: AI image credibility risk (Phase 2, products), inquiry form friction and notification pipeline failures (Phase 4, requires end-to-end production test), GEO entity inconsistency (Phase 1 schema + Phase 2 content), and missing Supabase RLS on the inquiries table (Phase 1, security baseline).

See `.planning/research/PITFALLS.md` for full pitfall documentation with recovery strategies and the pre-launch checklist.

---

## Implications for Roadmap

Research, architecture analysis, and pitfall dependencies converge on a clear 5-phase build order. The architecture file explicitly derived this order from component dependencies — it is reproduced here with pitfall and feature context added.

### Phase 1: Foundation

**Rationale:** Infrastructure correctness is not recoverable cheaply after features are built. The three hardest-to-retrofit decisions — Supabase pooler connection, i18n route structure, and env var security boundary — must be locked in before any page work begins. This phase has no visible output for an end user but creates the conditions that prevent high-cost failures in every later phase.

**Delivers:** Working TanStack Start scaffold on Vercel, Supabase connected via pooler with Drizzle schema pushed, root layout with nav/footer shell, `src/content/` module structure (empty stubs), Organization JSON-LD schema stub in root head, and env var convention documented and enforced.

**Addresses:** i18n-ready architecture (FEATURES.md P1), Organization schema stub (FEATURES.md P1), SSL/HTTPS via Vercel (FEATURES.md table stakes).

**Avoids:** VITE_PUBLIC_ secret exposure (Pitfall 1), Supabase connection exhaustion (Pitfall 2), i18n routing retrofit (Pitfall 3), GEO entity setup omission (Pitfall 9).

**No research needed:** Patterns are well-documented in official TanStack Start, Drizzle, and Vercel docs. Standard setup phase.

### Phase 2: Core Pages and Copy

**Rationale:** The landing page, about page, products grid, and contact page are content deliverables, not just UI exercises. Copy strategy (positioning, voice, trust signals) must be validated before implementation — a page coded with wrong copy requires as much rework as a page coded with wrong layout. Product images (AI placeholder vs real photography) must also be decided and sourced here, not during a later polish phase.

**Delivers:** Landing page (AIDA hero, differentiators, CTA), Products grid with categories and product cards, About Us page (E-E-A-T, company registration, address, sample/payment/lead time policy), Contact page (professional email, response commitment), Privacy Policy page, "How It Works" section, and mobile-responsive layout throughout.

**Addresses:** Landing page (FEATURES.md P1), Product gallery (FEATURES.md P1), Product specs + MOQ (FEATURES.md P1), About page (FEATURES.md P1), Contact page (FEATURES.md P1), Privacy policy (FEATURES.md P1), "How It Works" (FEATURES.md P1), mobile-responsive design (FEATURES.md P1).

**Avoids:** Generic value proposition (Pitfall 7), SOHO-reading copy (Pitfall 4), missing trust signals (Pitfall 5), AI image credibility risk (Pitfall 6), positioning against large suppliers (Pitfall 10).

**Research flag:** Copywriting and positioning decisions are domain-specific and require input from the client. The "could an Alibaba store say this?" test should be applied by a human reviewer before this phase is marked done. No technical research needed; business validation is the gate.

### Phase 3: Product Detail Pages and Lightbox

**Rationale:** Product detail pages depend on the product content module and ProductCard component built in Phase 2. The image lightbox (shadcn Dialog) is a contained feature with no server dependencies. This phase completes the buyer's product research journey before they reach the inquiry form.

**Delivers:** `/products/:productId` dynamic routes with full specification display, image lightbox for close-up inspection, product-level Open Graph tags and Product JSON-LD schema, and a "Request inquiry" CTA on every product page.

**Addresses:** High-resolution product image with lightbox (FEATURES.md table stakes), Product specification details (FEATURES.md table stakes), Product schema markup (FEATURES.md differentiator).

**Avoids:** Missing "request sample" CTA on product pages (PITFALLS.md UX section), duplicate AI images across product cards (Pitfall 6).

**No research needed:** Patterns established in Phase 1–2; dynamic routing and JSON-LD schema are well-documented.

### Phase 4: Inquiry Form and API

**Rationale:** The form is the commercial mechanism — without it the site cannot function as a business. It is placed in Phase 4 because all three of its dependencies must exist first: Supabase schema (Phase 1), Zod validation schemas, and Resend configuration. The entire notification pipeline (form submit → DB insert → email delivery) must be tested end-to-end in the Vercel production environment before this phase is complete. Local testing is insufficient.

**Delivers:** Inquiry form page (`/inquiry`) with TanStack Form, Zod client validation, honeypot spam protection, mobile-optimised inputs (≥44px tap targets, correct input types), success/error feedback via Sonner toast. Server Route at `/api/inquiry`: Zod server-side validation, Drizzle insert, React Email template rendered to HTML, Resend notification to operator. Supabase RLS enabled (anon INSERT only, no SELECT). End-to-end production test confirmed.

**Addresses:** Inquiry form with Supabase persistence and Resend notification (FEATURES.md P1, primary conversion mechanism).

**Avoids:** Inquiry form friction and notification failures (Pitfall 8), no RLS on Supabase table (PITFALLS.md security), form spam without honeypot (PITFALLS.md), Resend unawaited promise on serverless (PITFALLS.md integration gotchas).

**Research flag:** The server route vs server function distinction for Resend email sending is based on a single community report from August 2025 (AnswerOverflow thread). Validate this during implementation — if server functions work reliably with React Email rendering by the time this phase is built, the server route approach remains valid but the constraint may be looser than documented.

### Phase 5: SEO, GEO, and Launch Polish

**Rationale:** Structured data and metadata require all page content to exist before they can be written correctly — schema markup annotates real content, not placeholder text. This is the phase where the site becomes discoverable in traditional search and AI-generated answers. It is also the phase for performance audit (Core Web Vitals, image optimization) and the pre-launch checklist from PITFALLS.md.

**Delivers:** Complete per-route `head()` metadata (title, description, canonical, Open Graph) on all pages, FAQPage JSON-LD schema on FAQ section, Product JSON-LD schema on all product detail routes, Organization JSON-LD schema populated with real company data, image compression (WebP, width/height attributes), Core Web Vitals baseline measurement, and full pre-launch checklist review (factory name audit, env var scope check, RLS confirmation, mobile form test on real device).

**Addresses:** FAQ with FAQPage schema (FEATURES.md P1), Open Graph tags (FEATURES.md P1), Organization schema (FEATURES.md P1), page load performance (FEATURES.md table stakes).

**Avoids:** GEO/SEO entity inconsistency (Pitfall 9), missing structured data (PITFALLS.md "looks done but isn't" checklist), unoptimised images degrading LCP (PITFALLS.md performance traps), factory name exposure in metadata (PITFALLS.md security).

**No research needed:** JSON-LD schema for Organization, FAQPage, and Product are well-documented W3C/schema.org specifications with Google Rich Results Test for validation.

### Phase Ordering Rationale

- **Foundation first:** The Supabase pooler connection, i18n route structure, and env var security boundary cannot be retrofitted without HIGH recovery cost. These decisions precede all feature work.
- **Content before chrome:** The inquiry form and structured data depend on real content. Building UI components before copy is locked in leads to copy-driven rework of layout and component sizing.
- **Form last among core features:** The inquiry form depends on Supabase schema, Zod validation, and Resend configuration all being operational. Building it early creates a period where the business-critical path is broken. Phase 4 keeps it atomic.
- **SEO as a finishing layer:** Per-route metadata is most accurate after all content is final. JSON-LD schema cannot be populated with placeholder values — it must reflect real company data.

### Research Flags

Phases needing validation during planning or implementation:
- **Phase 4 (Inquiry Form):** Validate server route vs server function choice for Resend + React Email at implementation time. Community source (MEDIUM confidence) — official guidance may have been updated.
- **Phase 4 (Inquiry Form):** Confirm `drizzle-zod` Zod v4 compatibility status (GitHub issue #4406) before deciding whether to use it or write standalone Zod schemas. Research recommends standalone as the safe default.
- **All phases:** TanStack Start is RC — pin exact versions in `package.json` and check for breaking changes between patch versions during active development.

Phases with well-established patterns (skip `/gsd:research-phase`):
- **Phase 1 (Foundation):** TanStack Start scaffold, Drizzle + Supabase setup, and Vercel deployment are fully documented in official sources with HIGH confidence.
- **Phase 3 (Product Detail):** Dynamic routing and shadcn Dialog lightbox are standard patterns.
- **Phase 5 (SEO/GEO):** JSON-LD schema types (Organization, FAQPage, Product) are W3C specifications; Google Rich Results Test provides direct validation.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Core stack is fixed by project constraints. Integration patterns confirmed against official docs (HIGH). Three open items: drizzle-zod Zod v4 status, Resend/React Email in server functions, TanStack Start RC patch stability. |
| Features | MEDIUM-HIGH | Table stakes derived from multiple industry sources and competitor analysis. B2B UX research (Demand Gen Report, Content Marketing Institute) cited with high cross-source agreement. GEO/structured data guidance based on current 2026 sources. |
| Architecture | HIGH | Patterns derived directly from official TanStack Start, TanStack Router, and Drizzle ORM documentation. File structure and data flow diagrams confirmed against official "build from scratch" guide. Two community sources (MEDIUM) for Resend and i18n patterns. |
| Pitfalls | MEDIUM-HIGH | Technical pitfalls (VITE_PUBLIC_, pooler connection, RLS) HIGH — confirmed against official docs and documented real-world incidents. Business/positioning pitfalls MEDIUM — sourced from B2B UX research and copywriting analysis, multiple sources agree on core findings. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **drizzle-zod + Zod v4 compatibility:** GitHub issue #4406 was open at research time. Check before Phase 4 implementation. If resolved, drizzle-zod can be used to keep schema definitions DRY; if still broken, use standalone Zod schemas (already documented in STACK.md).
- **Real product photography:** Research strongly recommends replacing AI-generated images with real supplier photos for at least 2–3 hero products before buyer outreach. This is a business/client dependency, not a technical one. Flag in project brief.
- **Company registration and address:** The About page trust signal checklist requires the Chinese company registration number (统一社会信用代码) and a registered business address. These are client-provided data, not developer decisions. Collect before Phase 2 content work begins.
- **Resend domain verification:** Sending from `inquiries@wischosgift.com` requires SPF/DKIM/DMARC DNS records to be configured in Resend before Phase 4 production testing. This requires access to the domain's DNS provider — a client dependency.
- **Supabase free tier inactivity pause:** Free tier projects pause after 7 days of inactivity. Set a calendar reminder or upgrade to Pro ($25/mo) before public launch to avoid the site's DB going offline.

---

## Sources

### Primary (HIGH confidence)
- [TanStack Start Docs](https://tanstack.com/start/latest/docs/framework/react/overview) — framework features, server routes, server functions, SEO head management
- [TanStack Router Docs](https://tanstack.com/router/latest/docs/routing/file-naming-conventions) — file naming conventions, i18n, dynamic params
- [Vercel TanStack Start Docs](https://vercel.com/docs/frameworks/full-stack/tanstack-start) — Nitro adapter, Fluid Compute, deployment
- [Drizzle ORM Supabase Guide](https://orm.drizzle.team/docs/get-started/supabase-new) — connection setup, `prepare: false` requirement
- [shadcn/ui Tailwind v4 Docs](https://ui.shadcn.com/docs/tailwind-v4) — v4 compatibility confirmation
- [Supabase Supavisor FAQ](https://supabase.com/docs/guides/troubleshooting/supavisor-faq-YyP5tI) — pooler modes, prepared statement restrictions
- [Vite Secret Exposure Incident — Sprocket Security](https://www.sprocketsecurity.com/blog/hunting-secrets-in-javascript-at-scale-how-a-vite-misconfiguration-lead-to-full-ci-cd-compromise) — VITE_PUBLIC_ risk documented with real incident
- [drizzle-orm issue #4406](https://github.com/drizzle-team/drizzle-orm/issues/4406) — drizzle-zod Zod v4 incompatibility

### Secondary (MEDIUM confidence)
- [B2B Website Best Practices 2026 — Websmitherz](https://websmitherz.com/business-solutions-performance/b2b-website-best-practices-2026/) — table stakes features
- [GEO Complete Guide 2026 — Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026) — structured data for AI search
- [Mastering GEO in 2026 — Search Engine Land](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142) — FAQ schema, entity consistency
- [B2B Trust Deficit 2026 — Search Engine Journal](https://www.searchenginejournal.com/addressing-the-b2b-trust-deficit-how-to-win-buyers-in-2026/559267/) — trust signal research
- [B2B Lead Forms — Brixon Group](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate) — form field count vs conversion data
- [82% AI Image Recognition — Column Five Media](https://www.columnfivemedia.com/new-study-82-1-of-americans-can-spot-ai-generated-content/) — AI image credibility risk statistic
- [Paraglide JS TanStack Start — inlang](https://eugeneistrach.com/blog/paraglide-tanstack-start/) — i18n integration, January 2026 support
- [AnswerOverflow — Resend in TanStack Start](https://www.answeroverflow.com/m/1405648247657336852) — server route vs server function for email (single community source, August 2025)
- [Vercel Serverless DB Connection Problem — Vercel Blog](https://vercel.com/blog/the-real-serverless-compute-to-database-connection-problem-solved) — pooler requirement on serverless

### Tertiary (LOW confidence — validate during implementation)
- AnswerOverflow Resend/TanStack Start thread (August 2025) — React Email rendering failure in server functions. Single community report. Use server route approach as safe default; validate that this limitation persists before treating as hard constraint.

---

*Research completed: 2026-03-11*
*Ready for roadmap: yes*
