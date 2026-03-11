# Pitfalls Research

**Domain:** B2B premium gift showcase website — small trading company targeting EU/US/AU corporate buyers
**Researched:** 2026-03-11
**Confidence:** MEDIUM-HIGH (technical pitfalls HIGH from official docs; business/trust pitfalls MEDIUM from multiple industry sources)

---

## Critical Pitfalls

### Pitfall 1: Exposing Server Secrets via VITE_ Prefix

**What goes wrong:**
A developer prefixes a sensitive credential (Supabase service role key, Resend API key, database URL) with `VITE_PUBLIC_` to make it accessible in a component, not realising this bakes the secret into the client-side JavaScript bundle that every visitor can read.

**Why it happens:**
TanStack Start runs on Vite. The `VITE_PUBLIC_` prefix is the only mechanism for exposing env vars to client code — developers assume `import.meta.env` is the way to access any env var, not understanding the security boundary. Documented real-world incident: a Vite misconfiguration exposed live AWS credentials and CI/CD API keys in a public JS bundle.

**How to avoid:**
- Server-only vars (DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY): no prefix, access only in server functions/loaders
- Public vars (Supabase anon key, public site URL): use `VITE_PUBLIC_` prefix
- Audit with a build-time check: inspect the generated `.output/public/` assets for any secret-shaped strings before deploying
- Use TanStack Start's `createServerFn` for all database/email operations — never call Supabase or Resend from client-side code

**Warning signs:**
- Any `VITE_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` or `VITE_PUBLIC_RESEND_API_KEY` in the codebase
- Server function logic being imported into route components without a server boundary
- Resend or Drizzle imports appearing in files that are not `*.server.ts` or inside `createServerFn`

**Phase to address:** Foundation / infrastructure phase (project setup). Establish the env var convention before writing any feature code.

---

### Pitfall 2: Supabase Connection Exhaustion on Vercel Serverless

**What goes wrong:**
Each Vercel serverless invocation opens a new database connection. Without Supabase's transaction-mode pooler and correct Drizzle configuration, the Supabase free-tier instance (90 direct connections) exhausts under moderate traffic, causing `FATAL: remaining connection slots are reserved` errors.

**Why it happens:**
Developers connect using the direct Supabase connection string (port 5432) as shown in most tutorial quickstarts. This is fine for local development but catastrophic on serverless because each cold function start creates a new connection that is not reused.

**How to avoid:**
- Use the Supabase **transaction-mode pooler** connection string (port 6543, from Supabase dashboard > Connect > Transaction mode)
- Set `prepare: false` in the Drizzle/postgres.js client — prepared statements are not supported in transaction pool mode
- Set `max: 1` in the postgres.js pool config for serverless (each function instance serves one request)
- Example: `const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 })`
- Never use `pgBouncer=true` session mode on serverless

**Warning signs:**
- DATABASE_URL pointing to port 5432 (direct) instead of 6543 (pooler)
- Missing `prepare: false` in database client config
- Drizzle client instantiated at module scope without pool limits
- `FATAL: too many connections` errors in Vercel function logs

**Phase to address:** Foundation / database setup phase. Fix before any feature that writes to Supabase.

---

### Pitfall 3: i18n Routing Added as an Afterthought

**What goes wrong:**
The site ships English-only with flat routes (`/about`, `/products`). When Chinese or French is added for v2, every route must be restructured to `/en/about`, `/zh/about` — breaking all existing URLs, inbound links, and SEO equity built up over months.

**Why it happens:**
"English only for now" feels like permission to skip i18n structure. It is not. URL structure is architectural, not cosmetic.

**How to avoid:**
- Use TanStack Router's optional `{-$locale}` path parameter from day one so `/about` and `/en/about` both resolve to the same route
- Use `deLocalizeUrl`/`localizeUrl` helpers in route config
- Store all UI strings in a translation object (even if only `en` key exists in v1) — use `use-intl` or Paraglide.js with TanStack Start support
- Keep the default locale (English) unprefixed — `/about` rather than `/en/about` — for clean URLs and SEO
- Paraglide.js now has official TanStack Start support (January 2026) and is the preferred choice for compile-time safety

**Warning signs:**
- Hardcoded English strings directly in JSX with no translation abstraction
- No locale parameter in route file tree
- `t()` or `useTranslations()` not wired up (even if only returning English strings)

**Phase to address:** Foundation / routing setup phase. The route tree structure must be correct before any pages are built.

---

### Pitfall 4: Website Reads as a One-Person Operation

**What goes wrong:**
Language slips — "I will get back to you," "my products," "we are a small team" — or design signals (single phone number with WhatsApp icon, Gmail address, no company registration mention) immediately signal SOHO to a seasoned EU/US procurement manager, who then either doesn't inquire or negotiates aggressively on price assuming low overheads.

**Why it happens:**
The operator writes copy in a personal voice because they are personally handling everything. Small-business website templates use "I/me" language. The gap between "how it feels to run the business" and "how it must read to a corporate buyer" is invisible to the owner.

**How to avoid:**
- All copy uses "we/our/the team" — never "I/me/my"
- Use a professional domain email (orders@wischosgift.com) — never Gmail, Yahoo, or QQ
- About page references "our manufacturing partner network" and "our procurement specialists" — not "me and my suppliers"
- No WhatsApp-only contact — include a contact form and professional email as primary channels
- No phrases: "small batch," "SOHO," "home-based," "one-stop," "we are growing"
- About page should feel like a 5–15 person specialist firm, not an individual trader

**Warning signs:**
- First-person singular anywhere in public-facing copy
- Personal phone number used as primary contact
- Free email provider address
- "Family business" or "passionate individual" framing

**Phase to address:** Copywriting phase (About, Landing, Contact pages). Review all copy for person-of-voice before launch.

---

### Pitfall 5: Missing or Fake-Looking Trust Signals

**What goes wrong:**
EU and US procurement buyers routinely vet new suppliers before making contact. A website with no company registration reference, no physical address, no verifiable social presence, and no sample policy documentation triggers the same mental checklist as a scam. The visitor leaves without inquiring.

**Why it happens:**
Founders focus on product and design, not on "proof of legitimacy." Trust signals feel awkward to write and seem unnecessary until you've lost a buyer because of their absence.

**How to avoid:**
- Display Chinese company registration number (统一社会信用代码) on the About or Contact page — legitimate trading companies do this, and EU buyers who research China suppliers look for it
- Reference the registered company name in footer or legal copy
- Include a physical business address (registered office, not home)
- Maintain a consistent LinkedIn company page that matches the website's name, description, and value proposition exactly (entity consistency for due diligence and GEO)
- Sample policy should be explicitly stated on the Products or FAQ page: reference samples (shipping paid by client), custom samples (sample fee + shipping)
- Lead time commitments: samples 7–10 days, bulk ~30 days — stated explicitly, not "contact us"
- Payment terms (T/T) stated — buyer needs to know before they invest time in an inquiry
- MOQ (50 sets) stated prominently — this is a trust signal, not a deterrent for the target buyer

**Warning signs:**
- No company name in footer
- No address anywhere on site
- No mention of MOQ, lead times, or payment terms
- LinkedIn company page absent or mismatched with website positioning
- "Contact us for pricing" with no other commitment signals

**Phase to address:** About page and Contact page phases, plus footer component in foundation phase.

---

### Pitfall 6: AI-Generated Product Images Without Risk Mitigation

**What goes wrong:**
82% of consumers can identify AI-generated images, including B2B buyers aged 45–65 who are the most common corporate procurement decision-makers. Obvious AI imagery — impossible lighting, perfect-but-wrong textures, uncanny-valley reflections on metal — reduces product credibility and raises questions about whether the products actually exist.

**Why it happens:**
No real product photography is available at launch. AI images are used as placeholders but treated as finished assets.

**How to avoid:**
- Use AI images only for general category illustration, never for claims about specific product finishes, dimensions, or materials
- Choose AI images that are plausibly real — avoid obviously impossible compositions
- Add explicit copy near product images: "Concept imagery — final product photography available upon sample request" or similar
- Prioritise getting real product photos from factory partners for at least 2–3 hero products before launch, even low-quality supplier photos are more credible than polished AI renders
- Do not use identical images across multiple product cards — this signals placeholder content immediately

**Warning signs:**
- Same AI image used for multiple products
- Images with impossible reflections, floating objects, or clearly wrong material textures
- No copy caveat near imagery

**Phase to address:** Products page phase. Set expectation in project brief that real images should replace AI placeholders before first real buyer outreach.

---

### Pitfall 7: Vague Value Proposition That Sounds Like Every Alibaba Seller

**What goes wrong:**
Copy defaults to generic B2B supplier language: "high quality products," "competitive prices," "professional team," "one-stop solution," "trusted partner." This is identical to what 40,000 Alibaba stores say. The corporate buyer reads it and cannot distinguish Wischos Gift from any commodity supplier.

**Why it happens:**
This language feels safe and professional. It is copied from industry norms without questioning whether it communicates anything.

**How to avoid:**
- Lead with the specific differentiator: "We design the full gift set presentation — packaging, product, branding — at 50-set minimums that most suppliers won't accept"
- Name the buyer's problem explicitly: "Corporate gifting programs fail when the supplier treats your brand as an afterthought. We don't."
- Use numbers wherever possible: MOQ 50 sets, 7–10 day sample lead time, 30-day bulk lead time, T/T payment
- Never use: "high quality," "competitive price," "trusted partner," "one-stop," "best in class," "solutions"
- Differentiation vs Alibaba should be explicit, not implied — EU/US buyers make this comparison themselves, so answer it proactively

**Warning signs:**
- Value proposition contains three or more of the forbidden generic phrases
- Homepage hero section talks about the company ("we have been in business...") instead of the buyer's outcome
- No specific numbers on the landing page

**Phase to address:** Landing page / copywriting phase. All copy must pass a "could an Alibaba store say this?" test.

---

### Pitfall 8: Inquiry Form Friction That Loses Qualified Buyers

**What goes wrong:**
A corporate buyer who has done their due diligence and wants to inquire hits a form asking for 15 fields including "annual gifting budget," "preferred payment terms," and "how did you hear about us." They abandon. Or the form has no confirmation feedback, and they don't know if it submitted. Or the email notification fires into spam and the inquiry sits unanswered for three days — 100x worse conversion rate than responding within 5 minutes.

**Why it happens:**
Forms are often designed for the seller's data needs, not the buyer's effort tolerance. Email notifications are not tested end-to-end.

**How to avoid:**
- Keep form fields to essential minimum: name, company, email, country, what they need (open text), quantity estimate
- Open text field for requirements slightly reduces conversion (-5%) but dramatically improves lead quality (+28% sales acceptance rate) — include one open field, not five structured ones
- Show a clear success state after submission: "We'll reply within 1 business day"
- Test the full notification pipeline (form submit → Supabase insert → Resend email → inbox) before launch
- Set Vercel environment variable for RESEND_API_KEY in production, not just preview
- Add honeypot field (not CAPTCHA) for bot filtering — CAPTCHA adds friction for real buyers; honeypot is invisible to them
- Mobile: test form on actual mobile device — 22% higher abandonment on mobile vs desktop for B2B forms

**Warning signs:**
- Form has more than 8 fields
- No success/error state in UI after submission
- Notification email only tested in local dev, not in production Vercel environment
- No spam protection at all (bots will fill the form within days of launch)

**Phase to address:** Inquiry form phase. Full end-to-end notification test is a launch gate requirement.

---

### Pitfall 9: GEO/SEO Content That AI Systems Ignore

**What goes wrong:**
The site copies generic "corporate gifting" talking points from industry articles. AI search engines (ChatGPT, Perplexity, Claude) are trained to detect generic content and will not cite or surface the site in AI-generated answers. The site also has inconsistent entity data — company name appears differently across the website, LinkedIn, and any directory listings — so AI systems cannot reliably identify and reference the company.

**Why it happens:**
GEO is newer than SEO; most developers treat it as "write good content and it'll be fine." Entity consistency requires deliberate cross-platform coordination that feels like marketing work, not dev work.

**How to avoid:**
- Every page must contain at least one piece of information that generic content does not contain: specific MOQ, specific lead times, specific material standards, specific market experience
- Use consistent entity language everywhere: same company name, same description, same value proposition on the website, LinkedIn, and any directory listing
- Implement JSON-LD schema markup: Organization schema on every page (name, url, logo, address, contactPoint), Product schema on product pages
- Use clear header hierarchy (H1 → H2 → H3) with short paragraphs (under 120 words) for AI extractability
- Do not switch terminology: "metal gift sets" on one page, "premium gift products" on another, "executive gifts" on a third — pick terms and be consistent
- Build FAQs with direct Q&A format — AI systems extract these verbatim

**Warning signs:**
- No JSON-LD schema in page head
- Company description on LinkedIn does not match the website tagline
- No page-level FAQ sections
- Product descriptions use synonymous terms for the same concept across pages

**Phase to address:** SEO/metadata layer in foundation phase; content terms locked in copywriting phase.

---

### Pitfall 10: Positioning Against Large Suppliers Instead of Alongside Them

**What goes wrong:**
Copy says "we compete with the big suppliers" or "alternatives to large vendors." This invites comparison on dimensions where a small trading company loses: scale, brand recognition, certifications, volume discounts. Buyers begin to mentally disqualify.

**Why it happens:**
"David vs Goliath" positioning feels bold and honest. It is actually a framing trap that anchors buyers on weaknesses.

**How to avoid:**
- Position for the gap large suppliers don't serve: buyers who need 50–500 sets, not 5,000+; buyers who need packaging designed, not just products shipped; buyers who need a single accountable counterpart, not a factory floor
- Never mention competitors by name or category ("unlike big suppliers")
- The positioning is not "better than large suppliers" — it is "built for what large suppliers won't do"
- The target buyer should feel like Wischos Gift is the obvious specialist for their specific need, not a scrappy challenger

**Warning signs:**
- Any comparative language ("better than," "unlike larger," "more flexible than") in copy
- "Why choose us" section that lists generic advantages a large supplier also has (quality, reliability, service)
- No explicit mention of who the ideal client is (size of order, type of buyer)

**Phase to address:** Landing page / copywriting phase. Positioning clarity is a prerequisite for all other copy.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Direct Supabase connection string (port 5432) | Works immediately in dev | Connection exhaustion in production under load | Never — always use pooler from day one |
| Hardcoded English strings in JSX | Faster to write | Full rewrite required for v2 language expansion | Never — use translation abstraction even for English |
| Single placeholder AI image reused across products | No image sourcing required | Immediately obvious to buyers; damages credibility | Only if labelled as concept imagery; replaced pre-launch |
| No JSON-LD schema at launch | Saves dev time | GEO/SEO equity takes months to build; starting late compounds | Acceptable for MVP if added in week 2, not week 12 |
| Inline SQL queries instead of Drizzle schema types | Faster for one-off queries | Type safety lost; migration tracking breaks | Never in server functions that accept user input |
| No honeypot/spam protection on inquiry form | Saves one field | Form inbox flooded with spam within days of launch | Never — honeypot takes 15 minutes to implement |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Supabase + Drizzle | Using direct connection URL (port 5432) in production | Use transaction-mode pooler URL (port 6543) with `prepare: false, max: 1` |
| Supabase + Vercel | Forgetting to set DATABASE_URL in Vercel production environment (only set in preview) | Set env vars in all three Vercel scopes: Development, Preview, Production |
| Resend + Vercel | RESEND_API_KEY set locally but not in Vercel production env vars | Verify env vars in Vercel dashboard before first real inquiry test |
| Resend notification | Not awaiting the send promise in a serverless function | Always `await resend.emails.send(...)` before returning response — unawaited promises are killed when the function returns |
| TanStack Start env vars | Prefixing server secrets with `VITE_PUBLIC_` to access them in components | Move secret access into `createServerFn`; only anon/public keys get `VITE_PUBLIC_` prefix |
| Drizzle migrations + Supabase | Running migrations against direct connection while app uses pooler | Use direct connection for migrations (drizzle-kit push/migrate), pooler for runtime app connections |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No connection pooling | Intermittent 500 errors on form submit, slow page loads | Use Supabase transaction-mode pooler from day one | At ~20 concurrent serverless invocations |
| Unoptimised images | Slow LCP on Products page; Core Web Vitals fail | Use Vercel Image Optimization (`<Image>`) for all product images; compress AI-generated images before upload | Immediately on mobile connections |
| Resend called synchronously blocking SSR | Page load waits for email to send before rendering | Move email send to a fire-and-forget server action triggered after form insert; return success to user immediately | On every inquiry form submission |
| Supabase anon key RLS not configured | Any user can read/write all rows | Enable RLS on inquiry_submissions table; anon key only allows INSERT, not SELECT | If a curious visitor queries the Supabase REST API directly |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| VITE_PUBLIC_ prefix on Supabase service role key | Full database access exposed in browser JS bundle | Service role key must never have VITE_PUBLIC_ prefix; use only in server functions |
| No RLS on inquiry_submissions table | Any visitor can read all submitted inquiry data including competitor intelligence | Enable RLS; anon INSERT only, authenticated SELECT only |
| No rate limiting on inquiry form endpoint | Bot flood fills Supabase with junk, exhausts Resend free tier | Add honeypot field; optionally add Vercel rate limiting SDK or Cloudflare Turnstile |
| Supabase service role key used in client-side code for form submit | Service role bypasses RLS — all data exposed | Form submit must use anon key + RLS, or a server function with service role key server-side only |
| Factory supplier names in any page metadata, alt text, or JSON-LD | SEO crawlers index the text; buyers Google it | Audit all metadata, alt text, and structured data for factory names before launch |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Inquiry form with no success feedback | Buyer doesn't know if it submitted; may submit multiple times or give up | Show inline success state with "We'll reply within 1 business day" message; disable submit button after first click |
| No MOQ/lead time on product pages | Buyer spends time on inquiry only to learn the minimums don't fit — wastes both parties' time | State MOQ 50 sets and indicative lead times on every product card or product page |
| Contact page with only a form and no email address | Corporate buyers want to email directly from their company system; a form-only page feels like a black hole | Show professional email address alongside the form |
| Mobile form with small tap targets | Higher abandonment — 22% higher than desktop | Test all form inputs on actual mobile; minimum 44px tap targets; use appropriate input types (email, tel) |
| Products page with no "request sample" CTA | Buyer interested in a product has no obvious next step | Every product card needs a direct "Request sample / inquiry" action |
| No clear response time commitment | Buyer doesn't know if they'll wait 2 hours or 2 weeks | State response time SLA explicitly: "We respond to all inquiries within 1 business day" |

---

## "Looks Done But Isn't" Checklist

- [ ] **Inquiry form:** Verify the full pipeline end-to-end in the Vercel production environment — form submit → Supabase row inserted → Resend email received in actual inbox (not just local test)
- [ ] **Environment variables:** Confirm all three Vercel scopes (Development, Preview, Production) have correct values; check that no `VITE_PUBLIC_` prefixed var contains a secret
- [ ] **Supabase RLS:** Confirm Row Level Security is enabled on `inquiry_submissions`; test that anon key cannot SELECT data
- [ ] **Connection string:** Confirm DATABASE_URL points to Supabase pooler (port 6543) not direct (port 5432) in production
- [ ] **Copy review:** Audit all public copy for first-person singular ("I/me/my"); verify no generic B2B filler phrases
- [ ] **AI images:** Confirm no identical image appears on multiple product cards; verify concept imagery disclaimer is visible
- [ ] **Trust signals:** Company registration number, physical address, sample/payment policy, MOQ, and lead times all present and findable within 2 clicks from homepage
- [ ] **JSON-LD schema:** Organization schema present on every page; Product schema on product pages; validate with Google Rich Results Test
- [ ] **i18n architecture:** Route tree uses optional locale parameter; all strings routed through translation abstraction
- [ ] **Mobile form test:** Inquiry form tested on actual iOS and Android — not just browser devtools responsive mode
- [ ] **Spam protection:** Honeypot field present and server-side validated; not bypassed in JavaScript
- [ ] **Factory names:** Search codebase, all image alt text, and JSON-LD for any factory/supplier name before deploy

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Secrets exposed via VITE_PUBLIC_ | HIGH | Rotate all exposed keys immediately; audit what data was accessible; redeploy with corrected env var names |
| Connection exhaustion in production | MEDIUM | Switch DATABASE_URL to pooler URL; add `prepare: false`; redeploy — no data loss but downtime during incident |
| Flat routes with no i18n structure | HIGH | Restructure entire route tree; set up 301 redirects from old URLs; rebuild all internal links — weeks of work |
| Copy reads as SOHO operation | MEDIUM | Full copy audit and rewrite of About, Landing, Contact pages; 2–3 days of focused work |
| No RLS on Supabase table | HIGH if exploited | Enable RLS immediately; check logs for any unauthorised SELECT queries; notify affected parties if inquiry data was read |
| Inquiry emails going to spam | MEDIUM | Configure SPF/DKIM/DMARC records for sending domain; use Resend's verified domain setup; check Resend dashboard for delivery failures |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| VITE_PUBLIC_ secret exposure | Phase 1: Foundation / project setup | Grep codebase for `VITE_PUBLIC_` — confirm no secrets present; build and inspect output bundle |
| Supabase connection exhaustion | Phase 1: Foundation / database setup | Test Vercel deployment under simulated concurrency; verify pooler URL in env vars |
| i18n routing not future-proof | Phase 1: Foundation / routing | Confirm optional locale param in route tree; confirm translation abstraction in place even for English-only |
| Website reads as SOHO | Phase 3: About page + copy | Copy review checklist: zero first-person singular; no free email; company registration present |
| Missing trust signals | Phase 3: About / Contact pages | Buyer-perspective walkthrough: can a procurement manager find MOQ, lead times, payment terms, address in under 2 minutes? |
| AI image credibility risk | Phase 2: Products page | AI image audit; concept disclaimer copy in place; replace with real photos before buyer outreach |
| Generic value proposition | Phase 2: Landing page / copy | "Could Alibaba say this?" test applied to every claim on the landing page |
| Inquiry form friction | Phase 4: Inquiry form | Full end-to-end test in production: submit → Supabase row → Resend email → inbox; mobile device test |
| GEO/SEO entity inconsistency | Phase 1 (schema) + Phase 2 (content) | JSON-LD validator passes; LinkedIn description matches site tagline; no synonym drift across pages |
| Positioning trap against large suppliers | Phase 2: Landing page / copy | Confirm no comparative language; ICP (ideal buyer) explicitly named in copy |
| Form spam / bot flood | Phase 4: Inquiry form | Honeypot field in form; server-side validation rejects honeypot-filled submissions |
| Factory name exposure | All phases | Pre-launch grep for factory names in all text, alt attributes, metadata, JSON-LD |

---

## Sources

- [TanStack Start on Vercel — Vercel Docs](https://vercel.com/docs/frameworks/full-stack/tanstack-start)
- [TanStack Start Environment Variables — TanStack Docs](https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables)
- [Vite Misconfiguration Exposes CI/CD Secrets — Sprocket Security](https://www.sprocketsecurity.com/blog/hunting-secrets-in-javascript-at-scale-how-a-vite-misconfiguration-lead-to-full-ci-cd-compromise)
- [Supabase Supavisor FAQ — Supabase Docs](https://supabase.com/docs/guides/troubleshooting/supavisor-faq-YyP5tI)
- [Drizzle ORM with Supabase — Drizzle Docs](https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase)
- [Supabase Pooler Client Connections Growing on Vercel Fluid — GitHub Discussion](https://github.com/orgs/supabase/discussions/40671)
- [Vercel Serverless Database Connection Problem — Vercel Blog](https://vercel.com/blog/the-real-serverless-compute-to-database-connection-problem-solved)
- [B2B Copywriting Mistakes — Daniel Doan](https://danieldoan.net/b2b-copywriting-mistakes/)
- [6 Copywriting Mistakes That Kill B2B E-Commerce Sales — Web Writer Spotlight](https://webwriterspotlight.com/b2b-ecommerce-sales-copywriting-blunders)
- [Building Credibility: Key Elements of a Professional B2B Website — MarketInCrew](https://www.marketincrew.com/post/building-credibility-key-elements-of-a-professional-b2b-website)
- [B2B Website Trust Signals — Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals)
- [B2B Lead Forms: Data Depth vs Conversion Rate — Brixon Group](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate)
- [82.1% of Consumers Can Spot AI-Generated Content — Column Five Media](https://www.columnfivemedia.com/new-study-82-1-of-americans-can-spot-ai-generated-content/)
- [B2B Brand Positioning Mistakes — DeSantis Breindel](https://www.desantisbreindel.com/thinking/b2b-brand-positioning-pitfalls/)
- [GEO and SEO Predictions for 2026 — Firebrand Marketing](https://www.firebrand.marketing/2025/12/geo-and-seo-predictions-2026/)
- [GEO for B2B: Complete Guide — The Smarketers](https://thesmarketers.com/blogs/generative-engine-optimization-b2b-guide/)
- [i18n with TanStack Start 2026 — Pedro Martins](https://nikuscs.com/blog/13-tanstackstart-i18n/)
- [Paraglide.js for TanStack Start — inlang](https://intlayer.org/doc/environment/tanstack-start)
- [10 B2B Form Design Best Practices — LeadBoxer](https://www.leadboxer.com/learn/10-best-practices-for-b2b-form-design)
- [How to Verify a Chinese Company — China Company Lookup](https://chinacompanylookup.com/china-official/how-to-verify-a-company-in-china/)

---
*Pitfalls research for: B2B premium gift showcase website — Wischos Gift*
*Researched: 2026-03-11*
