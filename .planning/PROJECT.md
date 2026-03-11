# Wischos Gift

## What This Is

Wischos Gift is a B2B e-commerce showcase website for a premium metal gift set customization business targeting corporate buyers in Europe, the US, and Australia. The site presents Wischos Gift as a professional trading company offering small-batch (MOQ 50 sets) curated metal gift sets with full custom packaging and logo services. The website's primary goal is to generate qualified B2B inquiries from overseas buyers.

## Core Value

A corporate buyer can order premium, fully-branded metal gift sets at small-batch quantities — with packaging designed to their brand standards — without the complexity of dealing directly with overseas factories.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page with AIDA copywriting showcasing brand differentiators
- [ ] Products page displaying metal gift set categories with placeholder imagery (AI-generated), logo customization illustration, and lightbox for full-size views
- [ ] Inquiry form collecting company info, contact details, and product requirements — saved to Supabase and triggering email notification via Resend
- [ ] About Us page following E-E-A-T principles, presenting Wischos Gift as a professional trading company (not SOHO) with a manufacturing partner network
- [ ] Contact page with professional contact details (placeholder email/domain pre-launch) and direct inquiry option
- [ ] Responsive design — desktop and mobile compatible
- [ ] English-only v1 with i18n-ready architecture for future language expansion
- [ ] GEO / SIO / AI-search optimization built into content structure and metadata

### Out of Scope

- Chinese language version — deferred to v2 after English site validates
- Factory partner certifications shown on site — protect factory relationships, client must not be able to identify factories
- PayPal integration — add only if client requests it
- CMS / admin panel — not in v1, manage via Supabase dashboard
- E-commerce / cart / checkout — inquiry-only, no self-serve purchasing
- Blog / content marketing — defer to v2

## Context

- **Business model:** SOHO operator acting as a trading company. Has domestic Chinese company registration. DO NOT expose SOHO nature on the website — present as a professional trading company with a network of manufacturing partners.
- **Factory relationships:** Works with multiple factories. Factory identities are confidential — must not appear on site to prevent clients from going direct to factory.
- **Target market:** Corporate gift buyers in Europe, US, Australia. These buyers expect professional presentation, clear lead times, and transparent terms.
- **Sample policy:** Reference samples (existing stock) — client pays shipping, samples free. Custom samples (打样) — client pays sample fee. Lead times: samples 7–10 days, bulk orders ~30 days (flexible by product, to be confirmed during inquiry).
- **Payment:** T/T accepted. PayPal to be set up only if a client requests it.
- **Domain & email:** Not yet registered. Placeholder in codebase, to be configured before launch. Target: wischosgift.com or similar.
- **Product photography:** AI-generated concept images as placeholder. One image can be reused across product cards initially.
- **Brand identity:** No visual brand assets yet. Site design to be inspired by craighill.co — minimal, professional, premium, modern. Neutral/dark palette with clean typography.

## Constraints

- **Tech Stack:** TanStack Start (full-stack TypeScript) + Tailwind CSS + shadcn/ui + Supabase (PostgreSQL) + Drizzle ORM + Zod + Vercel — fixed, no substitutions
- **Company exposure:** Must present as a trading company. No language that reveals single-person operation.
- **Factory exposure:** Zero factory identification on site.
- **MOQ:** Always communicate 50 sets minimum — this is a key positioning signal (premium, not mass market)
- **i18n architecture:** English only now, but routing and content structure must support future multi-language expansion without a rewrite
- **Deployment:** Vercel — must be deployable from day one

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| English-only v1 | Target audience is EU/US/AU, SEO focus benefits from single language | — Pending |
| Inquiry-only (no cart) | B2B gift customization requires human negotiation, not self-serve checkout | — Pending |
| Resend for email notifications | Free tier sufficient for early-stage inquiry volume, easy Vercel integration | — Pending |
| No factory certifications shown | Protects factory relationships; prevents client disintermediation | — Pending |
| AI-generated product images for v1 | No real product photos available yet; allows shipping fast | — Pending |
| TanStack Start framework | User-specified; full-stack TypeScript, Vercel-native | — Pending |
| craighill.co as design reference | Minimal, premium, editorial aesthetic fits positioning | — Pending |

## Product Philosophy

**Useful. Interesting. Refined.**

All product selection and presentation should reflect these three values. Products are premium metal gift sets — desk accessories, writing instruments, business card holders, travel/outdoor sets. Packaging is custom-designed to the client's brand. This is not a commodity product; it is a curated, presented gift experience.

## Differentiation vs Alibaba

- **Packaging design service:** Wischos Gift designs the full gift set presentation, not just the product
- **Curated premium selection:** Materials are selected for quality and tactile feel, not cost
- **Small-batch flexibility:** 50-set MOQ enables gifting programs that mass suppliers won't touch
- **Market expertise:** Experience with EU/US/AU buyer expectations (compliance, packaging standards, delivery norms)
- **Single point of contact:** Buyer deals with one professional counterpart, not a factory floor

---
*Last updated: 2026-03-11 after initialization*
