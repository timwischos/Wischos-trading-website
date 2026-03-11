# Feature Research

**Domain:** B2B premium gift/product showcase — inquiry-driven (no cart), international corporate buyers (EU/US/AU)
**Researched:** 2026-03-11
**Confidence:** MEDIUM-HIGH (primary sources: industry research, competitor analysis, B2B UX studies)

---

## Feature Landscape

### Table Stakes (Buyers Expect These)

Features a corporate buyer assumes exist. Missing any of these = the site reads as amateur, and the buyer leaves without inquiring.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Product gallery with categories | Buyers need to scan range before committing to inquiry; product pages are primary entry point | LOW | Categories: desk sets, writing instruments, card holders, travel/outdoor sets. One image reuse per card is acceptable at launch |
| High-resolution product image with lightbox | Premium products demand close-up inspection; buyers scrutinise material quality visually before investing | LOW | Lightbox modal on click; shadcn Dialog component. AI-generated placeholder images for v1 |
| Product specification details | Corporate buyers need specs to assess fit: dimensions, materials, finishes, MOQ | LOW | Each product card/page: material, finish options, MOQ (50 sets), customization options available |
| Clear MOQ communication | Prevents low-quality leads; signals "we are not a mass supplier" positioning | LOW | 50 sets minimum must appear on every product entry point, not buried in FAQ |
| Inquiry/contact form | Primary conversion mechanism — the entire site exists to drive this action | MEDIUM | Multi-field form saved to Supabase + Resend email notification. Fields: name, company, role, email, phone (optional), product interest, quantity, timeline, message |
| Company "About" page | Buyers spend company money — they verify who they are dealing with; absence = red flag | LOW | E-E-A-T principles: trading company framing, market expertise, professional language. No factory exposure |
| Contact details (email, optionally phone) | 55% of buyers say missing contact info reduces vendor credibility (Content Marketing Institute) | LOW | Professional email on branded domain (placeholder until domain registered). Physical address not required but strengthens credibility |
| SSL / HTTPS | Security baseline; browser warnings destroy trust instantly | LOW | Handled by Vercel automatically |
| Mobile-responsive design | Corporate buyers research on mobile before desktop follow-up; non-responsive = unprofessional | LOW | Tailwind CSS responsive utilities; test on iOS Safari and Android Chrome |
| Privacy policy page | GDPR compliance for EU buyers; expected by all international buyers; inquiry form cannot exist without it | LOW | Simple policy page; required for legal compliance before launch |
| Lead time transparency | EU/US/AU buyers need to plan procurement cycles; vague timelines create friction | LOW | Sample: 7–10 days. Bulk: ~30 days. State clearly on product pages or FAQ |
| Sample policy clarity | Corporate buyers routinely request samples before bulk orders; policy must be findable | LOW | Reference samples: client pays shipping, samples free. Custom samples: client pays fee. State clearly on About or a dedicated How It Works section |
| Payment terms mention | T/T (wire transfer) is non-obvious to buyers unfamiliar with China trade; state it | LOW | "T/T (bank transfer)" as accepted method. Can add PayPal on request. State on inquiry page or FAQ |
| Professional visual design | Premium positioning requires visual alignment — a budget template signals budget products | MEDIUM | craighill.co as reference: minimal, dark/neutral palette, editorial typography, generous whitespace |
| Page load performance | Slow sites erode trust; Google's Core Web Vitals are a ranking factor | LOW | Vercel CDN + Next.js/TanStack SSR handles this well; avoid unoptimised large images |

---

### Differentiators (Competitive Advantage)

Features that set Wischos Gift apart from generic Alibaba suppliers and commodity gifting sites. These justify the premium and convert skeptical buyers.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "How It Works" process section | Demystifies China-sourced B2B for EU/US/AU buyers; reduces anxiety about dealing internationally | LOW | 3–4 step visual: Browse → Inquire → Approve Sample → Receive Order. Reduces drop-off from uncertainty |
| Custom packaging showcase | Packaging IS the differentiator — competitors sell products, Wischos sells a branded experience | MEDIUM | Mockup section showing gift set in custom-branded box. Visual proof that packaging is bespoke, not generic |
| Logo customization illustration | Corporate buyers need to visualise their brand on the product; visual proof beats descriptive text | MEDIUM | Illustration or annotated image showing logo placement zones, print methods available |
| Small-batch positioning ("50 sets minimum") | Most premium suppliers demand 500+ sets; 50-set MOQ enables gifting programs mass suppliers won't serve | LOW | Reinforce across hero, product pages, and FAQ. This is a headline claim, not a footnote |
| "Single point of contact" messaging | Buyers dealing with overseas factories face communication chaos; Wischos eliminates this | LOW | One sentence in About/hero: "one professional counterpart, from selection to delivery." No factory names |
| Curated product philosophy section | Positions selection as intentional, not catalogue-dumping; reinforces "premium, not mass" | LOW | Short editorial section: "Useful. Interesting. Refined." — product selection criteria visible to buyer |
| FAQ addressing international trade concerns | EU/US/AU buyers have specific anxieties: customs, quality control, communication lag, refund policy | LOW | FAQ page or expandable section covering: customs duties, quality inspection, what happens if order is wrong, lead times by region |
| Structured data / FAQ schema (GEO/SIO) | AI search engines (ChatGPT, Perplexity, Google AI Overviews) cite pages with FAQPage + Organization schema; GEO visibility drives zero-click discovery from corporate procurement queries | MEDIUM | Implement FAQPage schema, Organization schema, Product schema. First 200 words of each page must answer primary query directly. High-intent FAQ content like "corporate gift sets with custom packaging MOQ 50" |
| Open Graph / social meta tags | Buyers share supplier links internally via Slack/email; unfurled preview with product image signals professionalism | LOW | og:title, og:description, og:image on all pages. TanStack Start handles meta via server-rendered head |
| Testimonial or client reference section | 71% of B2B buyers review case studies/testimonials during purchase path (Demand Gen Report); even one quote converts | LOW | Single testimonial with company type (not name if confidential). Or "brands we've worked with" logos if available. Defer to v1.x if no social proof exists at launch |
| Inquiry confirmation email to buyer | Signals professionalism; confirms the inquiry was received; keeps Wischos top of mind | LOW | Resend can send confirmation email to buyer on submission. Simple branded template |
| WhatsApp / WeChat contact option | EU/AU buyers increasingly use WhatsApp; Chinese suppliers routinely offer WeChat. Reduces friction for buyers who prefer async messaging over forms | LOW | Floating WhatsApp button or contact page link. Not a dependency — add if business uses it |

---

### Anti-Features (Deliberately NOT Building)

Features that seem reasonable but create harm: scope creep, positioning damage, or operational overhead that doesn't pay off at this stage.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Shopping cart / checkout | "Make it easy to buy" | This is B2B custom manufacturing — orders require human negotiation. Cart implies standardised pricing which doesn't exist. Destroys premium positioning. Attracts wrong buyer type (retail impulse buyers). | Inquiry form with quantity/budget field. Human follow-up closes the deal. |
| Live price list | Transparency in pricing seems trustworthy | Custom packaging + small-batch = every order is quoted. Published prices will be wrong for most orders and will anchor negotiations badly. Will attract price-shoppers, not quality buyers. | "Request a quote" CTA. Mention price range only if competitive research shows it converts (validate post-launch). |
| Customer account / login portal | "Let buyers track their orders" | Adds auth complexity, Supabase RLS overhead, and v1 has no orders to track. Zero buyers at launch means zero ROI on this feature. | Handle via email. Supabase admin view covers operational needs. Add in v2 once repeat buyers exist. |
| Factory certifications page | "Show compliance documentation" | Exposing factory certifications risks identifying the factories. Client disintermediation is a business-ending risk. Certifications without factory context are also meaningless to most buyers. | State "all manufacturing partners meet [standard] requirements" in About page. Offer to provide documentation on request during inquiry. |
| Blog / content marketing | "SEO traffic" | Requires ongoing editorial operation. SOHO operator cannot sustain publishing cadence. Poor content damages E-E-A-T more than no content. | Invest in GEO-optimised static FAQ and product descriptions. One excellent FAQ page beats ten thin blog posts for AI search citation. |
| Product configurator / 3D customizer | "Let buyers design their own set online" | Massively complex to build correctly. Custom packaging is a collaborative, iterative design process — no tool replaces human design approval workflow. Fakes "instant" capability that doesn't exist. | Show customization examples. State "submit inquiry with your branding brief." Human handles configuration via email. |
| Live chat (staffed) | "Instant responses build trust" | SOHO operator cannot staff live chat across EU/US/AU timezones. Offline live chat badge (or unanswered messages) destroys trust faster than no chat. | Inquiry form with explicit response time promise: "We respond within 1 business day." WhatsApp as async alternative if operator can manage it. |
| Multi-language v1 | "Reach more buyers" | Target market is English-speaking. Chinese version requires full content localisation, not just translation. Thin translated content damages SEO. | Build i18n-ready architecture (routing, content structure) now. Launch Chinese site as a separate validated effort in v2. |
| Reviews / ratings widget | "Social proof" | No reviews exist at launch. Empty stars or a reviews section with zero entries signals failure. Third-party review widgets add load overhead. | Use a single curated testimonial if one exists. Or omit until post-launch. Add after first 3–5 clients. |
| PayPal integration (proactive) | "International buyers expect PayPal" | T/T is the standard for this trade size and origin. PayPal adds seller risk for high-value orders. Adds integration complexity for zero confirmed demand. | Mention T/T as primary. Add "PayPal available on request" in payment terms. Set up only when a buyer requests it. |
| CMS / admin panel | "Easy content updates" | Adds architectural complexity. Supabase dashboard covers inquiry management. Static content changes are infrequent enough to edit via code at v1 scale. | Manage via Supabase dashboard for data. Deploy code changes for content. Revisit in v2 if client needs self-service editing. |

---

## Feature Dependencies

```
Inquiry Form
    └──requires──> Supabase (database storage)
    └──requires──> Resend (email notification to operator)
    └──requires──> Zod (form validation)
    └──enhances──> Inquiry Confirmation Email (to buyer)

Product Gallery
    └──requires──> Product data (static or Supabase table)
    └──enhances──> Lightbox (full-size image on click)
    └──enhances──> Product Specification Details

GEO / Structured Data
    └──requires──> Static page content (FAQ, About, Product descriptions)
    └──enhances──> FAQ Section (FAQPage schema)
    └──enhances──> Organization schema (About page)
    └──enhances──> Open Graph tags

Trust Stack
    └──requires──> About Page (E-E-A-T)
    └──requires──> Contact Details (email, optional phone)
    └──requires──> SSL (Vercel automatic)
    └──requires──> Privacy Policy
    └──enhances──> Testimonial/Social Proof
    └──enhances──> "How It Works" process section

i18n Architecture
    └──requires──> Route structure supporting /[lang]/ prefix
    └──enhances──> English content (wraps it in translation-ready structure)
    └──conflicts──> Hard-coded string literals in components (prevents future translation)
```

### Dependency Notes

- **Inquiry Form requires Supabase:** Form submissions must persist to database and trigger email. Both must be wired before the form is "live" — a form that silently fails is worse than no form.
- **GEO/structured data requires static content:** Schema markup has no value without the FAQ and About content to annotate. Write content first, add schema second.
- **i18n architecture conflicts with hard-coded strings:** All user-facing text must pass through a translation-key layer from day one. Retrofitting i18n into hard-coded strings requires touching every component — prevents clean v2 Chinese expansion.
- **Trust Stack requires About + Contact as baseline:** Testimonials and "How It Works" amplify a trust foundation that does not exist without the basic credibility markers first.

---

## MVP Definition

### Launch With (v1)

Minimum viable product to generate first qualified inquiries from EU/US/AU corporate buyers.

- [ ] Landing page (AIDA hero, differentiator section, CTA to inquiry) — first impression and primary SEO landing target
- [ ] Products page with categories, product cards, image lightbox, MOQ and spec details — primary buyer research destination
- [ ] Inquiry form with Supabase persistence and Resend notification — the conversion mechanism; without this the site cannot function as a business
- [ ] About Us page (E-E-A-T, trading company framing, team/expertise signals, market knowledge) — eliminates "who are these people?" buyer anxiety
- [ ] Contact page (professional email, response time commitment, optional WhatsApp) — validates the business is reachable
- [ ] Privacy policy page — legally required for GDPR/EU buyers; required for inquiry form data handling
- [ ] "How It Works" process section (can be on landing page or standalone) — removes cross-border anxiety
- [ ] FAQ section with structured data schema — GEO/SIO visibility; addresses top buyer objections; supports AI search citation
- [ ] Open Graph / social meta tags across all pages — internal link sharing by buyers to colleagues
- [ ] Organization schema markup — supports AI engine citation of Wischos Gift as a supplier
- [ ] Mobile-responsive design throughout — non-negotiable for professional presentation
- [ ] i18n-ready routing and content architecture — prevents costly v2 rewrite

### Add After Validation (v1.x)

Add once the site is live and first inquiries are being received.

- [ ] Inquiry confirmation email to buyer (Resend template) — trigger: first inquiry received; immediate professionalism upgrade
- [ ] Testimonial section — trigger: first 1–3 clients complete orders; adds social proof that currently doesn't exist
- [ ] WhatsApp contact option — trigger: if buyers request it during inquiry process
- [ ] Custom packaging showcase / mockup section — trigger: when real product photography or quality mockups are available; stronger than AI placeholders

### Future Consideration (v2+)

Defer until product-market fit is established and English site is generating consistent inquiries.

- [ ] Chinese language version — requires full localisation effort, separate SEO strategy, distinct buyer journey
- [ ] Client portal / order tracking — requires repeat buyer base to justify complexity
- [ ] Blog / content marketing — requires editorial capacity; not a SOHO-manageable effort at v1
- [ ] CMS / admin panel — requires identified content update patterns and business case
- [ ] Product configurator — requires established buyer relationships to validate what configuration options matter

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Inquiry form (Supabase + Resend) | HIGH | MEDIUM | P1 |
| Product gallery with lightbox | HIGH | LOW | P1 |
| Product specs (MOQ, material, customization) | HIGH | LOW | P1 |
| About Us (E-E-A-T) | HIGH | LOW | P1 |
| Landing page (AIDA hero + differentiators) | HIGH | MEDIUM | P1 |
| Mobile responsive design | HIGH | LOW | P1 |
| Privacy policy | HIGH | LOW | P1 |
| "How It Works" process section | MEDIUM | LOW | P1 |
| FAQ with FAQPage schema | MEDIUM | LOW | P1 |
| Open Graph / meta tags | MEDIUM | LOW | P1 |
| i18n-ready architecture | LOW (now) / HIGH (v2) | LOW | P1 |
| Organization schema markup | MEDIUM | LOW | P1 |
| Contact page | MEDIUM | LOW | P1 |
| Inquiry confirmation email to buyer | MEDIUM | LOW | P2 |
| Custom packaging showcase | HIGH | MEDIUM | P2 |
| Testimonial section | MEDIUM | LOW | P2 |
| WhatsApp contact option | LOW | LOW | P2 |
| Logo customization illustration | MEDIUM | MEDIUM | P2 |
| Chinese language version | HIGH (v2 market) | HIGH | P3 |
| Blog / content section | LOW | HIGH | P3 |
| Client portal | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible (v1.x)
- P3: Future consideration (v2+)

---

## Competitor Feature Analysis

| Feature | Alibaba supplier pages | Generic gift catalog sites (e.g. noissue, 4imprint) | Wischos Gift approach |
|---------|------------------------|------------------------------------------------------|----------------------|
| Product presentation | Spec-heavy, utilitarian, price-anchored | Volume-oriented, category browsing, self-serve | Editorial, minimal, premium — product as designed object |
| MOQ communication | Often hidden or negotiable | Usually 1–24 (self-serve retail volumes) | 50 sets, front and centre — premium positioning signal |
| Customization | Factory-level complexity, overwhelming options | Template-based, limited | Curated options + human design collaboration |
| Trust signals | Star ratings, transaction counts, "Gold Supplier" badge | Brand logos, guarantee badges | E-E-A-T About page, process transparency, professional contact |
| Inquiry / contact | Direct message, RFQ system, complex procurement flow | Add to cart, checkout | Clean inquiry form, 1-business-day response commitment |
| International trade info | Incoterms, Alibaba Trade Assurance | Domestic shipping only mostly | Lead times, sample policy, T/T payment — stated simply for non-trade buyers |
| GEO / AI search visibility | Minimal structured data | Basic e-commerce schema | FAQPage + Organization + Product schema, answer-first content structure |
| Design quality | Generic templates, low visual standard | Clean but utilitarian | craighill.co-inspired: minimal, premium, editorial |

---

## Sources

- [B2B Website Best Practices 2026 — Websmitherz](https://websmitherz.com/business-solutions-performance/b2b-website-best-practices-2026/)
- [Corporate Gifting Pages That Convert — Send to Many](https://sendtomany.com/blog/corporate-gifting-pages-that-convert-a-guide-for-shopify-merchants)
- [B2B Website Trust Signals — Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals)
- [Addressing The B2B Trust Deficit 2026 — Search Engine Journal](https://www.searchenginejournal.com/addressing-the-b2b-trust-deficit-how-to-win-buyers-in-2026/559267/)
- [Lead Forms in B2B: Data Depth vs Conversion Rate — Brixon Group](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate)
- [GEO Complete 2026 Guide — Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)
- [Mastering GEO in 2026 — Search Engine Land](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)
- [GEO and AEO: How AI Is Changing B2B SEO — BOL Agency](https://www.bol-agency.com/blog/what-is-geo-and-aeo-how-ai-is-changing-b2b-seo)
- [FAQ Schema for AI Search / GEO — Frase.io](https://www.frase.io/blog/faq-schema-ai-search-geo-aeo)
- [Structured Data for GEO SEO — Digidop](https://www.digidop.com/blog/structured-data-secret-weapon-seo)
- [E-E-A-T for B2B — Reachlane](https://www.reachlane.com/e-e-a-t-in-b2b-seo/)
- [7 Trust Signals to Boost B2B Conversions — ProVisors](https://www.provisorsthoughtleadership.com/2025/05/7-trust-signals-to-boost-b2b-conversions/)
- [B2B Buyer Behavior 2025: Verifiable Trust — Vendict](https://vendict.com/blog/b2b-buyer-behavior-why-verifiable-trust-digital-transparency-are-the-real-dealbreakers)
- [B2B Web Design Trends 2026 — Windmill Strategy](https://www.windmillstrategy.com/top-9-b2b-web-design-trends/)
- [Craighill website — Siiimple design gallery](https://siiimple.com/craighill/)
- [6 B2B Trust Signal Use Cases — Oktopost](https://www.oktopost.com/blog/trust-signals/)

---

*Feature research for: B2B premium metal gift set customization showcase (Wischos Gift)*
*Researched: 2026-03-11*
