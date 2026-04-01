# Roadmap: Wischos Gift

## Overview

Five phases take the site from an empty repository to a live, inquiry-generating B2B showcase. Phase 1 locks in the infrastructure decisions that are expensive to retrofit later (DB pooler, i18n routing, env var security). Phase 2 delivers the persuasive content layer — the pages a buyer judges the company by. Phase 3 completes the product research journey with detail pages and a lightbox. Phase 4 wires the commercial mechanism: inquiry form, Supabase persistence, and Resend notification. Phase 5 adds structured data and SEO metadata so the site becomes discoverable in traditional search and AI-generated answers, and runs the pre-launch checklist before going live.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Scaffold, DB, i18n routing, env security, layout shell — working Vercel deploy
- [ ] **Phase 2: Core Pages** - Landing, About, How It Works, Privacy Policy — persuasive content layer
- [ ] **Phase 3: Products** - Product grid, detail pages, lightbox, Product JSON-LD
- [ ] **Phase 4: Inquiry** - Inquiry form, API route, Supabase persistence, Resend notification
- [ ] **Phase 5: SEO and Launch** - FAQ page, per-route metadata, structured data, sitemap, pre-launch audit
- [ ] **Phase 6: Go-to-Market** - ICP definition, Google prospect playbook, SEO/SIO/GEO gap fixes, LinkedIn launch kit

## Phase Details

### Phase 1: Foundation
**Goal**: The project scaffold is live on Vercel with Supabase connected, the inquiries schema migrated, i18n-ready routing in place, and all security conventions enforced — nothing works yet for end users but every high-cost decision is locked in correctly
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. The site deploys from the main branch to Vercel with no build errors and serves a visible page
  2. The Supabase `inquiries` table exists with the correct schema and is reachable from the deployed app via the transaction-mode pooler (port 6543)
  3. No secret or credential is visible in the client JavaScript bundle (no `VITE_PUBLIC_` prefix on DB or email keys)
  4. Every page renders inside the root layout with a consistent header and footer shell
  5. The route tree uses the optional locale prefix pattern so `/en/about` and `/about` both resolve without a future rewrite
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold TanStack Start + Tailwind v4 + shadcn/ui, env security convention, src/content/ stubs, Vercel deploy
- [x] 01-02-PLAN.md — Supabase connection (transaction pooler), Drizzle schema, inquiries table migration
- [ ] 01-03-PLAN.md — i18n-ready route tree, root layout, SiteHeader + SiteFooter + PageShell, route stubs for all pages

### Phase 2: Core Pages
**Goal**: A visiting buyer can read the landing page, learn about the company and process, understand what Wischos Gift offers versus commodity suppliers, and find contact information — the site reads as a professional trading company at every point
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LAND-06, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABOUT-05, PROC-01, PROC-02, PROC-03, PROC-04, PROC-05, LEGAL-01, LEGAL-02
**Success Criteria** (what must be TRUE):
  1. A buyer landing on the homepage reads a specific headline and value proposition that could not come from an Alibaba store — MOQ 50 sets, custom packaging design, and single counterpart are present above the fold
  2. The About Us page presents Wischos Gift as a professional trading company with market expertise signals; no language reveals a single-person operation; no factory names appear anywhere on the page
  3. The How It Works page states the end-to-end process in at least 4 steps, with sample policy (reference free / custom paid), lead times (7–10 days samples, ~30 days bulk), and T/T payment terms all visible without clicking through
  4. The Privacy Policy page is live and linked in the footer — a GDPR-conscious EU buyer can find it from any page
  5. All pages render correctly on a 375px mobile viewport, 768px tablet viewport, and 1280px desktop viewport — no horizontal scroll, no broken layouts at any breakpoint
**Plans**: 4 plans

Plans:
- [ ] 02-01-PLAN.md — Vitest config, test scaffold (5 test files), all content modules (homepage, about, howItWorks, privacy), meta.ts privacy entry, SiteFooter Link fix
- [ ] 02-02-PLAN.md — Homepage section components (HeroSection, ValuePropSection, DifferentiatorSection, CredibilitySection, ProductPreviewSection, CtaSection) + route assembly
- [ ] 02-03-PLAN.md — About page section components (AboutHeroSection, ExpertiseSection, WhyUsSection, TrustSection) + route assembly
- [ ] 02-04-PLAN.md — How It Works page (ProcessStepsSection, ProcessPolicySection) + Privacy Policy page + human verification checkpoint

### Phase 3: Products
**Goal**: A buyer can browse the full product catalog, click into individual product detail pages to read specifications and customization options, open a full-size image in a lightbox, and reach the inquiry form directly from any product page
**Depends on**: Phase 2
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06
**Success Criteria** (what must be TRUE):
  1. The products grid displays 4–5 product series cards with a name, one-line description, placeholder image, and MOQ 50 sets label on every card — no lorem ipsum text
  2. Clicking a product card opens a detail page with full description, customization options (logo placement, packaging), lead time indication, and an inquiry CTA
  3. Clicking a product image opens a full-size overlay (lightbox) that can be dismissed with a keyboard Escape key or click outside; lightbox works on mobile touch and tablet
  4. Each product detail page has Product JSON-LD structured data with `priceSpecification: "On Request"` visible in the page source
**Plans**: 4 plans

Plans:
- [ ] 03-01-PLAN.md — Test scaffold (3 test files) + populate products.ts with 4 real product objects
- [ ] 03-02-PLAN.md — Products grid page (ProductGridSection + ProductCard) + wire products/index.tsx
- [ ] 03-03-PLAN.md — Product detail page ($productId.tsx route + ProductDetailSection + lightbox + JSON-LD)
- [ ] 03-04-PLAN.md — Human verification checkpoint for full product catalog flow

### Phase 4: Inquiry
**Goal**: A buyer can submit an inquiry from any inquiry entry point, the submission is saved to Supabase, the operator receives an email notification with all details, and the buyer sees a clear success confirmation — the commercial pipeline works end-to-end in the production environment
**Depends on**: Phase 3
**Requirements**: INQ-01, INQ-02, INQ-03, INQ-04, INQ-05, INQ-06, INQ-07, INQ-08
**Success Criteria** (what must be TRUE):
  1. The contact page displays professional contact details and contains the embedded inquiry form with all required fields (Full Name, Company Name, Job Title, Email, Phone optional, Product Interest, Estimated Quantity, Target Timeline, Message)
  2. Submitting the form with invalid data shows inline error messages without a page refresh; submitting with valid data shows a success confirmation message in place (not a redirect)
  3. A submitted inquiry appears as a row in the Supabase `inquiries` table within 5 seconds of submission — confirmed via Supabase dashboard in the production project
  4. The operator receives a Resend email notification with all inquiry field values within 60 seconds of a successful submission — confirmed with a real submission to the production environment
  5. Supabase RLS allows anonymous INSERT but prevents anonymous SELECT — a direct API call cannot read the inquiries table without operator credentials
**Plans**: 5 plans

Plans:
- [ ] 04-01-PLAN.md — Zod schema (src/lib/schemas/inquiry.ts) + 4 Wave 0 test scaffolds
- [ ] 04-02-PLAN.md — POST /api/inquiry server route + InquiryEmail React Email template
- [ ] 04-03-PLAN.md — ContactSection + InquiryFormSection components + contact content module
- [ ] 04-04-PLAN.md — Wire /contact route + /inquiry redirect + human UI verification checkpoint
- [ ] 04-05-PLAN.md — Supabase RLS + drizzle-kit push + Vercel deploy + production e2e checkpoint

### Phase 5: SEO and Launch
**Goal**: Every page has correct metadata and structured data so the site is discoverable in traditional search and AI-generated answers, a FAQ page addresses common buyer objections, and the pre-launch checklist confirms no factory names, credential leaks, or security gaps before the domain goes live
**Depends on**: Phase 4
**Requirements**: FAQ-01, FAQ-02, FAQ-03, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07
**Success Criteria** (what must be TRUE):
  1. The FAQ page answers at least 8 corporate buyer questions written in answer-first format (primary answer in the first sentence); the page source contains FAQPage JSON-LD structured data that passes Google Rich Results Test
  2. Every page has a unique `<title>`, `<meta description>`, and canonical URL visible in the page source; Open Graph tags (`og:title`, `og:description`, `og:image`) are present on all pages
  3. The Organization JSON-LD schema on the homepage and About page contains real company data (not placeholders) and passes Google Rich Results Test
  4. `/sitemap.xml` and `/robots.txt` are accessible and return valid content at the production URL
  5. A pre-launch audit confirms: no factory names in any page content or metadata, no secrets in the client bundle, RLS is enabled on the inquiries table, and the inquiry form submits and displays correctly on mobile (375px) and tablet (768px) devices
**Plans**: TBD

### Phase 6: Go-to-Market
**Goal**: The operator has a concrete, actionable acquisition system in place — a precise ICP document, a Google search operator playbook for finding SMB prospects, a fully optimized website (SEO/SIO/GEO gaps closed), and a complete LinkedIn launch strategy with copy and visual direction for both the personal profile and company page
**Depends on**: Phase 5
**Requirements**: GTM-01, GTM-02, GTM-03, GTM-04
**Success Criteria** (what must be TRUE):
  1. A written ICP (Ideal Customer Profile) document names the exact buyer roles, company sizes, industries, geographies, and pain points that match Wischos Gift's offer — precise enough to evaluate any prospect against
  2. A Google search operator playbook delivers at least 10 ready-to-use search strings that surface SMB prospects (Office Managers, Executive Assistants, HR Managers at 50–500 person companies) with company name, contact role, and LinkedIn/website hints
  3. A full SEO/SIO/GEO audit of the live site is completed and all identified gaps are fixed in code — on-page metadata, structured data, AI-answer optimization, and content completeness
  4. A LinkedIn launch kit is ready for immediate use: personal profile copy (headline, about, experience), company page copy (tagline, about, specialties), and a 4-week content calendar with post copy and image direction for each post
**Plans**: 3 plans

Plans:
- [ ] 06-01-PLAN.md — ICP document (4 personas, firmographic table, qualification checklist) + Google search operator playbook (12+ strings)
- [ ] 06-02-PLAN.md — SEO/GEO code fixes: robots.txt AI bots, privacy.tsx OG/canonical, blog JSON-LD, gift-set JSON-LD + BreadcrumbList, /faq route with FAQPage JSON-LD, Organization schema improvements
- [ ] 06-03-PLAN.md — LinkedIn launch kit (personal profile copy, company page copy, 4-week content calendar) + sameAs Organization JSON-LD update

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/3 | In Progress |  |
| 2. Core Pages | 3/4 | In Progress|  |
| 3. Products | 3/4 | In Progress|  |
| 4. Inquiry | 4/5 | In Progress|  |
| 5. SEO and Launch | 0/TBD | Not started | - |
| 6. Go-to-Market | 1/3 | In Progress|  |
