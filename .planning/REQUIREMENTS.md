# Requirements: Wischos Gift

**Defined:** 2026-03-11
**Core Value:** A corporate buyer can order premium, fully-branded metal gift sets at small-batch quantities — with packaging designed to their brand standards — without the complexity of dealing directly with overseas factories.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Project scaffolded with TanStack Start, Tailwind v4, and shadcn/ui with Vercel deployment configured and working
- [ ] **FOUND-02**: i18n-ready route structure in place (optional locale prefix pattern) with all user-visible strings in `src/content/` TypeScript modules
- [ ] **FOUND-03**: Environment variable security conventions enforced — no secrets with `VITE_PUBLIC_` prefix; Supabase and Resend keys server-side only
- [ ] **FOUND-04**: Supabase PostgreSQL connected via Drizzle ORM using transaction pooler (port 6543) with `prepare: false`
- [ ] **FOUND-05**: `inquiries` table schema defined and migrated with fields: id, company_name, contact_name, role, email, phone, product_interest, quantity, timeline, message, created_at
- [ ] **FOUND-06**: Global layout component with Header (logo, nav links) and Footer (contact placeholder, privacy policy link) applied to all pages
- [ ] **FOUND-07**: Site deploys successfully to Vercel from main branch with no build errors

### Landing Page

- [ ] **LAND-01**: Hero section captures attention with a single compelling headline and subheadline targeting corporate gift buyers (AIDA — Attention) — **copywriting delivered as part of this requirement**
- [ ] **LAND-02**: Value proposition section communicates the three differentiators: premium metal materials, custom packaging design, small-batch MOQ 50 sets (AIDA — Interest) — **copywriting delivered**
- [ ] **LAND-03**: "How we're different" section with concrete comparison against commodity suppliers — specific, not generic (AIDA — Desire) — **copywriting delivered**
- [ ] **LAND-04**: Social proof or credibility signal section (market experience callout, even without testimonials) — **copywriting delivered**
- [ ] **LAND-05**: Primary CTA section drives to inquiry form with clear action language (AIDA — Action) — **copywriting delivered**
- [ ] **LAND-06**: Product preview section on homepage linking to full products page

### Products Page

- [ ] **PROD-01**: Products grid displaying 4–5 product series cards with placeholder names, AI-generated concept image, one-line description, and MOQ 50 sets label on each card — **product names and one-line descriptions are written text placeholders (not lorem ipsum)**
- [ ] **PROD-02**: Each product card links to individual product detail page
- [ ] **PROD-03**: Product detail page shows expanded description, customization options (logo placement, packaging), lead time indication, and inquiry CTA — **full product description is written placeholder copy aligned with "Useful, Interesting, Refined" positioning**
- [ ] **PROD-04**: Lightbox — clicking product image opens full-size view overlay
- [ ] **PROD-05**: Logo customization illustration or callout on each product (visual mockup or icon indicating "Custom Logo Available")
- [ ] **PROD-06**: Product JSON-LD structured data (`Product` schema with `priceSpecification: "On Request"`) on each product detail page

### How It Works / Customization Process

- [ ] **PROC-01**: Standalone page explaining the end-to-end process from first inquiry to delivery — **full page copywriting delivered**
- [ ] **PROC-02**: Sample policy clearly stated: reference samples (client pays shipping, samples free); custom samples (client pays sample fee)
- [ ] **PROC-03**: Lead times stated: samples 7–10 business days, bulk orders approx. 30 days (with note that timelines vary by product and are confirmed during inquiry)
- [ ] **PROC-04**: Payment terms stated: T/T (bank transfer)
- [ ] **PROC-05**: Step-by-step process flow (minimum 4 steps: Inquiry → Sample → Confirm → Delivery) — **each step has written description copy**

### About Us

- [ ] **ABOUT-01**: Company presented as a professional trading company with a manufacturing partner network — no language that reveals single-person operation — **full page copywriting delivered following E-E-A-T principles**
- [ ] **ABOUT-02**: Market expertise section covering EU/US/AU buyer expectations — E-E-A-T Experience and Expertise signals — **copywriting delivered**
- [ ] **ABOUT-03**: "Why Wischos Gift" section differentiating from factory-direct and commodity suppliers — E-E-A-T Authoritativeness — **copywriting delivered**
- [ ] **ABOUT-04**: Trust signals: professional contact details (branded domain email placeholder), company registration acknowledgment without exposing SOHO nature, quality commitment statement — E-E-A-T Trustworthiness — **copywriting delivered**
- [ ] **ABOUT-05**: No factory names, certifications, or any information that could enable client disintermediation

### Inquiry Form & Contact

- [ ] **INQ-01**: Contact page with company contact information (branded email placeholder, LinkedIn placeholder) and embedded inquiry form
- [ ] **INQ-02**: Inquiry form fields: Full Name, Company Name, Job Title, Email (required), Phone (optional), Product Interest (dropdown or text), Estimated Quantity, Target Timeline, Message/Requirements
- [ ] **INQ-03**: Form validation with Zod — required fields enforced, email format validated, helpful error messages
- [ ] **INQ-04**: Successful form submission saves record to Supabase `inquiries` table via `/api/inquiry` Server Route
- [ ] **INQ-05**: Successful form submission triggers Resend email notification to operator with all inquiry details
- [ ] **INQ-06**: Honeypot field to filter spam submissions without requiring CAPTCHA
- [ ] **INQ-07**: Success state shown to user after submission (confirmation message, not a page redirect)
- [ ] **INQ-08**: Row-level security (RLS) enabled on Supabase `inquiries` table — public can insert, cannot read

### FAQ Page

- [ ] **FAQ-01**: Standalone FAQ page answering minimum 8 common corporate buyer questions (e.g., minimum order quantity, customization options, sample process, lead times, payment terms, quality assurance, packaging options, target markets) — **all Q&A copywriting delivered; answers written in buyer language, not supplier language**
- [ ] **FAQ-02**: FAQPage JSON-LD structured data on the FAQ page for AI search engine citation
- [ ] **FAQ-03**: FAQ content written in answer-first format — primary answer in first sentence, detail follows

### SEO & GEO

- [ ] **SEO-01**: Each page has unique, keyword-targeted `<title>` and `<meta description>` tags
- [ ] **SEO-02**: Open Graph tags (`og:title`, `og:description`, `og:image`) on all pages for social sharing previews
- [ ] **SEO-03**: Organization JSON-LD schema on homepage and about page (name, url, description, contact point)
- [ ] **SEO-04**: All images have descriptive `alt` attributes (keyword-conscious, not keyword-stuffed)
- [ ] **SEO-05**: `sitemap.xml` auto-generated and accessible at `/sitemap.xml`
- [ ] **SEO-06**: `robots.txt` configured at `/robots.txt`
- [ ] **SEO-07**: Canonical URLs set on all pages

### Privacy & Legal

- [ ] **LEGAL-01**: Privacy Policy page covering: what data is collected (inquiry form), how it is used, data retention, user rights under GDPR, contact for data requests
- [ ] **LEGAL-02**: Privacy Policy linked in footer on every page

## v2 Requirements

### Multilingual Support

- **I18N-01**: Chinese language version of all pages
- **I18N-02**: Language switcher in navigation
- **I18N-03**: Per-language SEO metadata

### Enhanced Social Proof

- **TRUST-01**: Client testimonials section (after first clients provide feedback)
- **TRUST-02**: Case study pages (anonymised if needed)
- **TRUST-03**: "As Seen In" / media mentions if applicable

### Additional Features

- **FEAT-01**: PayPal payment option for sample fees (add when first client requests)
- **FEAT-02**: Blog / content marketing section for SEO authority building
- **FEAT-03**: WhatsApp contact button (only if operator commits to actively monitoring)
- **FEAT-04**: Product catalogue PDF download generation

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce cart / checkout | B2B custom manufacturing requires human negotiation; self-serve purchasing doesn't fit |
| Live chat widget | Requires active monitoring; creates trust problem if unresponsive |
| Factory certifications display | Protects factory relationships; prevents client disintermediation |
| Factory names or identities | Same reason — confidential |
| Published price list | Custom pricing per order; publishing prices commoditises the offer |
| Admin CMS panel | Not needed v1; manage via Supabase dashboard |
| Mobile app | Web-first; mobile app is a different product category |
| User accounts / login | Inquiry-only model doesn't require accounts |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| FOUND-07 | Phase 1 | Pending |
| LAND-01 | Phase 2 | Pending |
| LAND-02 | Phase 2 | Pending |
| LAND-03 | Phase 2 | Pending |
| LAND-04 | Phase 2 | Pending |
| LAND-05 | Phase 2 | Pending |
| LAND-06 | Phase 2 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| ABOUT-03 | Phase 2 | Pending |
| ABOUT-04 | Phase 2 | Pending |
| ABOUT-05 | Phase 2 | Pending |
| PROC-01 | Phase 2 | Pending |
| PROC-02 | Phase 2 | Pending |
| PROC-03 | Phase 2 | Pending |
| PROC-04 | Phase 2 | Pending |
| PROC-05 | Phase 2 | Pending |
| LEGAL-01 | Phase 2 | Pending |
| LEGAL-02 | Phase 2 | Pending |
| PROD-01 | Phase 3 | Pending |
| PROD-02 | Phase 3 | Pending |
| PROD-03 | Phase 3 | Pending |
| PROD-04 | Phase 3 | Pending |
| PROD-05 | Phase 3 | Pending |
| PROD-06 | Phase 3 | Pending |
| INQ-01 | Phase 4 | Pending |
| INQ-02 | Phase 4 | Pending |
| INQ-03 | Phase 4 | Pending |
| INQ-04 | Phase 4 | Pending |
| INQ-05 | Phase 4 | Pending |
| INQ-06 | Phase 4 | Pending |
| INQ-07 | Phase 4 | Pending |
| INQ-08 | Phase 4 | Pending |
| FAQ-01 | Phase 5 | Pending |
| FAQ-02 | Phase 5 | Pending |
| FAQ-03 | Phase 5 | Pending |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 5 | Pending |
| SEO-04 | Phase 5 | Pending |
| SEO-05 | Phase 5 | Pending |
| SEO-06 | Phase 5 | Pending |
| SEO-07 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 49 total
- Mapped to phases: 49
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 — traceability confirmed against ROADMAP.md; corrected count from 44 to 49*
