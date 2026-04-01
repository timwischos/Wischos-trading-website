# Phase 6: Go-to-Market — Research

**Researched:** 2026-04-01
**Domain:** B2B customer acquisition — ICP definition, Google prospecting, SEO/SIO/GEO audit, LinkedIn launch
**Confidence:** MEDIUM-HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GTM-01 | Written ICP document naming exact buyer roles, company sizes, industries, geographies, and pain points | ICP framework section; buyer persona deep-dive; corporate gifting buyer research |
| GTM-02 | Google search operator playbook with 10+ ready-to-use search strings for SMB prospects (Office Managers, EAs, HR Managers at 50–500 person companies) | Search operator patterns section; verified operator syntax from Amplemarket; Australia/EU/SG/KR/JP targeting strings |
| GTM-03 | Full SEO/SIO/GEO audit of the live site with all gaps fixed in code | Complete gap inventory from codebase audit; GEO checklist from genrank.io; structured data gap analysis |
| GTM-04 | LinkedIn launch kit: personal profile copy, company page copy, 4-week content calendar with post copy and image direction | LinkedIn strategy section; 4-week calendar framework; solopreneur tactics; B2B corporate gifting content pillars |
</phase_requirements>

---

## Summary

Phase 6 is entirely a content and outreach deliverables phase — it produces documents and code fixes, not new application features. The four requirements span two separate work domains: (1) GTM-01 and GTM-02 are pure copywriting/research deliverables (ICP document and Google playbook), and (2) GTM-03 is a code audit with targeted fixes to the live site, and (3) GTM-04 is a LinkedIn launch kit of copy and calendar content.

The site is already live at wischosgift.com with a well-structured codebase. The SEO/GEO gap inventory from reading every route shows specific, fixable gaps: `privacy.tsx` has no canonical or OG tags; `about.tsx` has no BreadcrumbList or Article schema for blog posts; gift-set detail pages have no Product JSON-LD; the `robots.txt` does not explicitly allow AI crawlers (GPTBot, ClaudeBot); and there is no standalone FAQ page with FAQPage JSON-LD. The blog article routes have no Article/BlogPosting JSON-LD schema. These gaps are all small and mechanical — each is a targeted edit to an existing route file.

For the customer acquisition work (ICP + Google playbook + LinkedIn), the research is clear: the target buyer is not the C-suite — it is the operational layer of SMBs: Office Managers, Executive Assistants, HR Managers, and Marketing Coordinators at companies with 50–500 employees. These are the people who run gift programs without a dedicated procurement department. They Google solutions, compare vendors on LinkedIn, and make decisions quickly when the budget is approved. Google search operators combined with LinkedIn prospecting are the two channels with the highest signal-to-noise ratio for reaching them without paid advertising.

**Primary recommendation:** Write the ICP and Google playbook as plain text documents in `.planning/phases/06-go-to-market/`; fix all SEO/GEO code gaps in-place in the codebase; produce the LinkedIn kit as a structured document the operator can copy-paste directly into their profiles.

---

## Standard Stack

No new libraries are needed for this phase. All SEO/GEO fixes are pure JSON-LD additions to existing TanStack Start `head()` calls. The LinkedIn kit and ICP are document deliverables, not code.

### Supporting — Audit and Validation Tools

| Tool | Purpose | How to Use |
|------|---------|------------|
| Google Rich Results Test | Validate JSON-LD schema correctness | https://search.google.com/test/rich-results |
| Schema.org validator | Validate structured data against spec | https://validator.schema.org/ |
| Google Search Console | Check coverage, crawl errors, indexed pages | Already installed (G-859CPYDHVK) |
| PageSpeed Insights | Core Web Vitals baseline | https://pagespeed.web.dev/ |
| ChatGPT / Perplexity / Gemini | GEO baseline — query "custom metal corporate gifts" and variants | Manual testing |

---

## Architecture Patterns

### Pattern 1: TanStack Start head() for JSON-LD

The existing pattern in `$productId.tsx` is the correct model for all structured data additions. All new schema blocks go in the `scripts` array of the route's `head()` return.

```typescript
// Source: src/routes/{-$locale}/products/$productId.tsx (existing pattern)
head: ({ loaderData }) => ({
  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        // ...
      }),
    },
  ],
})
```

### Pattern 2: Static route head() for standalone pages

For routes without loader data (like a future FAQ page or privacy page fixes), use the static head pattern:

```typescript
// Source: src/routes/index.tsx (existing pattern)
head: () => ({
  meta: [...],
  links: [buildCanonical('/faq')],
  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', ... }),
    },
  ],
}),
```

### Pattern 3: BreadcrumbList JSON-LD for deep pages

Product and gift-set detail pages benefit from BreadcrumbList schema. The pattern is a second `scripts` entry alongside the Product schema:

```typescript
// Schema.org BreadcrumbList pattern — add to existing head() scripts array
{
  type: 'application/ld+json',
  children: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wischosgift.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://wischosgift.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://wischosgift.com/products/${product.id}` },
    ],
  }),
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ page structured data | Custom schema builder | Hardcode JSON-LD in head() | One-time static content; no need for abstraction |
| SEO audit tooling | Custom crawler | Google Rich Results Test + GSC | Official validators cover all needed checks |
| LinkedIn post scheduling | Code or automation | Manual + native LinkedIn scheduler | Solo operator; complexity not justified |
| Prospect contact discovery | Web scraper | Google search operators (manual) | Operator-run outreach; legal and practical |

---

## SEO/GEO Gap Inventory

This is the most important section for GTM-03. Every gap was identified by reading the live codebase.

### Critical Gaps (affect indexing or rich results eligibility)

| Route File | Gap | Fix Required |
|------------|-----|-------------|
| `src/routes/privacy.tsx` | No canonical link, no OG tags | Add `buildCanonical('/privacy')` + `buildOgMeta(...)` to `head()` |
| `src/routes/{-$locale}/blog/$slug.tsx` | No Article/BlogPosting JSON-LD | Add `Article` schema with `headline`, `datePublished`, `author`, `image` from `post` fields |
| `src/routes/{-$locale}/gift-sets/$setId.tsx` | No Product JSON-LD, no BreadcrumbList | Add `Product` schema (parallel to `$productId.tsx`) and `BreadcrumbList` |
| `public/robots.txt` | No explicit AI bot directives | Add `User-agent: GPTBot`, `User-agent: ClaudeBot`, `User-agent: PerplexityBot` — all `Allow: /` |
| No FAQ page exists | Missing FAQPage JSON-LD | Create `/faq` route with static FAQ content + `FAQPage` schema (required by GTM-03 which says "all gaps fixed") |

### Medium Gaps (affect GEO/AI citation quality)

| Location | Gap | Fix Required |
|----------|-----|-------------|
| `__root.tsx` Organization schema | No `sameAs` array linking LinkedIn/GSC | Add `sameAs: ['https://www.linkedin.com/company/wischos-gift/']` once LinkedIn page exists |
| Blog article pages | No `author` entity with URL | Add `author: { '@type': 'Person', name: 'Wischos Gift', url: siteMeta.siteUrl }` to Article schema |
| All pages | No `dateModified` on root Organization | Add `foundingDate: '2024'` to Organization JSON-LD in `__root.tsx` |
| `sitemap.xml` | Missing `<lastmod>` dates | Add `<lastmod>` to static pages and product URLs to help crawlers prioritize |
| Blog article slugs | No `BlogPosting` schema on individual article pages | Part of Article schema fix above |

### Low Gaps (cosmetic/completeness)

| Location | Gap | Note |
|----------|-----|------|
| `about.tsx` | No `areaServed` specifics | Organization in `__root.tsx` says "Worldwide" — acceptable |
| Product images | `alt` attributes are descriptive but not keyword-rich | Current alts are acceptable; over-optimization is a risk |
| `privacy.tsx` | Missing canonical could create duplicate content risk with HTTPS redirect | Fix in Critical Gaps above handles this |

### What is Already Done (do NOT re-implement)

- Organization + WebSite JSON-LD in `__root.tsx` — present
- Product JSON-LD on `$productId.tsx` — present and correct
- FAQPage JSON-LD conditionally on `$productId.tsx` when `product.faqs` exists — present
- OG tags on all major routes (home, about, products, contact, blog index, blog slug, gift-set) — present
- Canonical URLs on all major routes — present
- sitemap.xml with all 23 products + 6 gift sets + 8 static pages — present
- robots.txt with Sitemap reference — present (but missing AI bot directives)
- Google Analytics G-859CPYDHVK — installed
- Google Search Console — verified + sitemap submitted
- Security headers (HSTS, XSS, clickjack, MIME) — present in `vercel.json`

### GEO-Specific Checklist (from genrank.io and 201creative.com research)

| GEO Requirement | Status | Action |
|-----------------|--------|--------|
| AI crawlers allowed in robots.txt | MISSING | Add GPTBot, ClaudeBot, PerplexityBot directives |
| Attribute-rich schema (not generic) | PARTIAL | Product schema is good; gift-set and blog missing |
| FAQ schema on FAQ page | MISSING | Create FAQ page |
| Content answers in first sentence (answer-first) | PRESENT | Blog articles use this pattern |
| Consistent entity name across all pages | PRESENT | "Wischos Gift" used consistently |
| Organization `sameAs` to LinkedIn | MISSING | Add after LinkedIn page created |
| Brand entity info on external directories | NOT DONE | Low priority — Crunchbase, Google Business Profile |

---

## ICP Document Framework

### Locked Buyer Personas for GTM-01

Research confirms three primary buyer roles that execute corporate gifting at SMBs without a dedicated procurement department:

**Persona 1: The Office Manager**
- Company size: 50–300 employees
- Job titles: "Office Manager", "Operations Manager", "Facilities Coordinator", "Office Administrator"
- Pain points: No gifting supplier relationship, always Googling ad-hoc, worried about cheap-looking items embarrassing the company, constrained by informal budgets ($15–$50/unit), need something that "looks expensive"
- Decision speed: Fast (days, not weeks) — owns the budget line
- Discovery: Google search, LinkedIn posts from peers, supplier DMs
- Geographies to target: Australia (Melbourne, Sydney), UK, Netherlands, Germany, Singapore

**Persona 2: The Executive Assistant / EA**
- Company size: 100–500 employees
- Job titles: "Executive Assistant", "EA to CEO", "Personal Assistant", "Chief of Staff"
- Pain points: Gifts on behalf of executives — failure is visible, success is invisible; time pressure (requests come with 2-week deadlines); needs physical proof (samples) to show the executive before committing
- Decision speed: Medium (1–2 weeks, requires exec sign-off on concept)
- Discovery: LinkedIn personal message from vendor, referral from other EAs
- Geographies: All target markets; AU and UK strongest

**Persona 3: The HR Manager / People Ops**
- Company size: 100–500 employees
- Job titles: "HR Manager", "Head of People", "People Operations Manager", "Culture & Engagement Lead"
- Pain points: Onboarding gift programs that need to scale (100+ new hires), retention gifting budgets being cut, need branded items that feel premium not promotional, MOQ pressure (want 50 but min is 100)
- Decision speed: Slow (budget cycles, approval chains) — but higher order value
- Discovery: LinkedIn thought leadership, HR community forums, peer recommendations
- Geographies: Singapore, South Korea, Australia most receptive

**Persona 4: The Marketing Coordinator (Secondary)**
- Company size: 50–200 employees
- Job titles: "Marketing Coordinator", "Brand Manager", "Events Coordinator"
- Pain points: Event giveaways that look professional, conference booth items, client appreciation gifts tied to campaigns
- Decision speed: Fast when event-driven
- Geographies: EU, Australia

### ICP Firmographic Parameters

| Parameter | Target Range | Exclude |
|-----------|-------------|---------|
| Company size | 50–500 employees | <50 (no gifting budget), >500 (procurement dept, tender process) |
| Industries | Professional Services, Tech/SaaS, Finance, Legal, Real Estate, Healthcare (private) | Manufacturing, Retail, Government |
| Geographies (priority order) | Australia, EU (Netherlands, Germany, UK), Singapore, South Korea, Japan | USA (tariff complexity), China (competitor), India (price competition) |
| Annual revenue | $5M–$100M USD equivalent | <$2M (gifting is personal, not corporate), >$500M (enterprise) |
| Gift budget signal | Has organized any corporate event in past 12 months | None visible |
| Decision-making | 1–2 person decision (Office Manager + CFO sign-off) | Full procurement committee (wrong segment) |

---

## Google Search Operator Playbook Framework

### Verified Operator Syntax (HIGH confidence)

These operators work in Google as of 2026. Syntax confirmed via Amplemarket research and Google Search documentation.

| Operator | Function |
|----------|----------|
| `site:linkedin.com/in/` | Search LinkedIn profiles only |
| `intitle:"..."` | Page title contains exact phrase |
| `inurl:...` | URL contains string |
| `"..."` | Exact phrase match |
| `-` | Exclude term |
| `OR` | Boolean OR between terms |

### 10+ Ready-to-Use Search Strings for GTM-02

The planner should write these as the literal deliverable. Research provides the structural patterns:

```
# Australia — Office Managers at professional services SMBs
site:linkedin.com/in/ "office manager" "sydney" OR "melbourne" OR "brisbane" "professional services" OR "consulting" OR "tech"

# Australia — Executive Assistants at 50–300 person companies
site:linkedin.com/in/ "executive assistant" "sydney" OR "melbourne" "financial services" OR "law" OR "real estate"

# Australia — HR Managers (onboarding gift programs)
site:linkedin.com/in/ "HR manager" OR "head of people" "sydney" OR "melbourne" "-50 employees" OR "startup" OR "scale-up"

# EU — Netherlands/Germany Office Operations
site:linkedin.com/in/ "office manager" "amsterdam" OR "rotterdam" OR "berlin" OR "hamburg"

# EU — EA / PA roles at professional firms
site:linkedin.com/in/ "executive assistant" OR "personal assistant" "london" OR "amsterdam" "consulting" OR "finance"

# Singapore — HR and People roles
site:linkedin.com/in/ "hr manager" OR "people operations" "singapore" "technology" OR "fintech" OR "professional services"

# South Korea — Office Manager equivalents
site:linkedin.com/in/ "office manager" OR "operations manager" "seoul" "technology" OR "startup"

# Japan — EA roles at international firms
site:linkedin.com/in/ "executive assistant" "tokyo" "international" OR "global"

# Company-level: finding SMB companies with likely gifting budgets (AU)
site:linkedin.com/company/ "professional services" "sydney" "51-200 employees"

# Company-level: Singapore tech SMBs
site:linkedin.com/company/ "technology" "singapore" "51-200 employees" OR "201-500 employees"

# Direct company site search for EA/OM contacts
intitle:"team" OR intitle:"about us" "office manager" OR "executive assistant" site:.com.au OR site:.co.uk

# Conference attendee list discovery
intitle:"attendees" OR intitle:"speakers" "corporate gifting" OR "HR conference" filetype:pdf 2025 OR 2026
```

Note: Google search operator strings targeting LinkedIn profiles yield public profile results — these are for research/discovery only, not automated scraping. The planner should frame the deliverable as a manual research playbook.

---

## LinkedIn Launch Kit Framework

### Personal Profile Architecture

Based on 2026 LinkedIn algorithm priorities: completeness, keyword relevance, recent activity, and visual appeal. Personal profiles generate 8x more engagement than company pages — the operator's personal profile is the primary acquisition channel.

**Profile sections in priority order:**

1. **Profile photo** — Professional, not casual. Plain/simple background. Face takes up 60% of frame.
2. **Banner/cover image** — Use a product flat-lay or branded visual. 1584×396px.
3. **Headline (220 chars max)** — Formula: Role + Who you help + Specific outcome
   - Example direction: `Founder @ Wischos Gift | Custom Metal Gift Sets for Corporate Buyers | MOQ 100 Sets, Full Packaging Design, Ships to AU / EU / SG`
4. **About section (2,600 chars max)** — Five-beat structure: (1) who you help, (2) the specific problem, (3) what makes you different from Alibaba/generic, (4) proof points (24 products, 6 manufacturing regions, MOQ 100), (5) soft CTA (DM or wischosgift.com)
5. **Experience section** — Wischos Gift role: headline as achievement, not duty. "Helping 50–500-person companies give gifts that feel considered, not corporate" — with specific facts: product count, material categories, geographies served
6. **Featured section** — Pin link to wischosgift.com. Pin a carousel post (when created).
7. **Skills** — Corporate Gifting, B2B Sales, Import/Export, Gift Packaging, Metal Manufacturing

**Creator Mode note:** LinkedIn removed the Creator Mode toggle in 2024; features (newsletters, analytics, Follow button) are now always accessible. Select 5 hashtags relevant to niche (#CorporateGifting #B2BGifts #PremiumGifts #CustomBranding #ExecutiveGifts).

### Company Page Architecture

Company page is secondary to personal profile but required for legitimacy. Serves as a search destination and social proof signal.

**Sections:**
- **Tagline (120 chars):** "Custom metal gift sets for B2B buyers. MOQ 100 sets. Full packaging design. Shipped to AU, EU, SG."
- **About (2,000 chars):** Mirror the personal About but in third person. Include: product categories (4), number of products (24+), geographies, MOQ, and the key differentiator (custom packaging + single point of contact)
- **Website:** https://wischosgift.com
- **Company size:** 1–10 employees (honest; doesn't hurt in B2B context)
- **Industry:** Wholesale, Import/Export
- **Specialties:** Corporate Gifting, Metal Gift Sets, Custom Packaging, B2B Gifts, Premium Branded Merchandise, Executive Gifts

### 4-Week Content Calendar Structure

Based on research: post 3–4x per week. Personal profile only in launch phase (company page reposts selected personal posts after 24h delay). 15% promotional ceiling.

**Content pillars for Wischos Gift:**
1. **Material Education (40%)** — "Aluminum vs brass vs titanium" type content — positions operator as expert, attracts buyers researching materials
2. **Process/Transparency (25%)** — Behind-the-scenes: how manufacturing works, what MOQ means, how lead times really work — reduces buyer anxiety
3. **Buyer Scenarios (20%)** — "What to do when your boss wants gifts in 2 weeks" — connects directly to buyer pain points
4. **Social Proof / Product (15%)** — Product showcases, imagery, specific set callouts — kept minimal to avoid broadcast feel

**Week-by-week themes:**
- Week 1: Establish expertise (material education posts) + profile announcement
- Week 2: Process transparency (how it works, what MOQ really means)
- Week 3: Buyer problem posts (late gifting, poor quality gifts, Alibaba risk)
- Week 4: Products + CTA (gift set showcase, inquiry invitation)

**Post format split (2026 algorithm):**
- Native video: 1x per 2 weeks (short, 30–60 seconds, product or process footage)
- Carousel/document: 1x per week (best for educational content)
- Text-only with strong hook: 2–3x per week (highest volume, easiest to produce)
- Image post: 1x per week (product flat-lay or lifestyle image)

---

## Common Pitfalls

### Pitfall 1: ICP Too Broad ("Any corporate buyer")
**What goes wrong:** Outreach messages read generic, no one feels personally addressed, zero replies.
**How to avoid:** Write ICP with specific "would not fit" criteria (company >500 = wrong segment, government = wrong buyer process, USA = tariff complication). Evaluate every prospect against the ICP before reaching out.

### Pitfall 2: Google Operator Strings Return Only Inactive Profiles
**What goes wrong:** Searches surface profiles that haven't posted in 2+ years; wasted outreach.
**How to avoid:** After finding profiles via Google, filter by "Active in past 30 days" in LinkedIn Sales Navigator free tier, or manually check post dates. Prioritize profiles that have commented on or posted about "corporate gifts", "swag", "onboarding kits" in past 90 days.

### Pitfall 3: LinkedIn Profile Written for Resume Readers, Not Buyers
**What goes wrong:** Headline says "Founder at Wischos Gift" with no value proposition. About section is company history. Zero inquiries from profile views.
**How to avoid:** Write headline and About as if they answer the question "what problem do you solve for me today?" Buyer-first language throughout.

### Pitfall 4: FAQ Page Duplicate Content With Product FAQs
**What goes wrong:** A standalone FAQ page at `/faq` with the same Q&A that also appears in `product.faqs` on product detail pages creates duplicate content.
**How to avoid:** The standalone FAQ page should focus on company-level questions (MOQ, payment, shipping, sample policy, lead times). Product-specific FAQs stay on product detail pages. No overlap in content.

### Pitfall 5: GEO Misfire — Inconsistent Entity Name
**What goes wrong:** "Wischos Gift" on the website, "Wischos International Trading" on LinkedIn, "Anhui Wischos" in legal name field — AI models get confused and don't confidently cite the brand.
**How to avoid:** Consistent use of "Wischos Gift" as the brand name across all channels. Legal name in JSON-LD `legalName` field only (not in visible content). The `sameAs` array in Organization schema links all entity representations.

### Pitfall 6: LinkedIn Company Page Created Before Personal Profile Is Optimized
**What goes wrong:** Company page gets set up, personal profile stays as default resume-style profile, most content goes to company page — reaches almost no one.
**How to avoid:** Fully optimize personal profile FIRST. Company page second. All original posts go to personal profile. Company page reposts 24 hours later (or links back).

### Pitfall 7: SEO Audit "Pass" Because No Errors Show in GSC
**What goes wrong:** Google Search Console shows no crawl errors, operator concludes site is fine — but GSC only reports errors in URLs it already knows about. Missing schema and GEO gaps don't show as errors.
**How to avoid:** Use Google Rich Results Test URL-by-URL to validate schema. Query "custom metal corporate gifts" in ChatGPT and Perplexity to check if wischosgift.com appears in answers. Run PageSpeed Insights on homepage and at least one product page.

---

## Code Examples

### Article JSON-LD for Blog Posts (Gap Fix)

```typescript
// Add to src/routes/{-$locale}/blog/$slug.tsx head() scripts array
// Source: schema.org/BlogPosting
{
  type: 'application/ld+json',
  children: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.heroImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Wischos Gift',
      url: 'https://wischosgift.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wischos Gift',
      url: 'https://wischosgift.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wischosgift.com/blog/${post.slug}`,
    },
  }),
}
```

### Product JSON-LD for Gift Sets (Gap Fix)

```typescript
// Add to src/routes/{-$locale}/gift-sets/$setId.tsx head() — parallel to $productId.tsx pattern
// Source: schema.org/Product (existing $productId.tsx pattern)
{
  type: 'application/ld+json',
  children: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: set.name,
    description: set.heroCopy,
    sku: set.sku,
    image: [set.coverImage],
    brand: { '@type': 'Brand', name: 'Wischos Gift' },
    offers: {
      '@type': 'Offer',
      url: `https://wischosgift.com/gift-sets/${set.id}`,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: `Price on request. MOQ 100 sets. FOB: ${set.fob}`,
      },
      seller: { '@type': 'Organization', name: 'Wischos Gift' },
    },
  }),
}
```

### Privacy Route Head Fix (Gap Fix)

```typescript
// Replace current head() in src/routes/privacy.tsx
// Source: existing buildOgMeta / buildCanonical pattern from other routes
head: () => ({
  meta: [
    { title: siteMeta.routes.privacy.title },
    { name: 'description', content: siteMeta.routes.privacy.description },
    ...buildOgMeta({
      title: siteMeta.routes.privacy.title,
      description: siteMeta.routes.privacy.description,
      image: siteMeta.defaultOgImage,
      url: '/privacy',
    }),
  ],
  links: [buildCanonical('/privacy')],
}),
```

### robots.txt AI Crawler Additions (Gap Fix)

```
# Add to public/robots.txt — after existing User-agent: * block
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ChatGPT-User
Allow: /
```

### Organization sameAs Addition (After LinkedIn Created)

```typescript
// Update in src/routes/__root.tsx — organizationJsonLd object
// Add sameAs after LinkedIn company page is created
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteMeta.siteName,
  legalName: siteMeta.legalName,
  url: siteMeta.siteUrl,
  email: siteMeta.email,
  foundingDate: '2024',
  description: siteMeta.defaultDescription,
  areaServed: ['AU', 'EU', 'SG', 'KR', 'JP'],  // more specific than 'Worldwide'
  sameAs: [
    'https://www.linkedin.com/company/wischos-gift/',  // add after LinkedIn page created
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteMeta.email,
    availableLanguage: 'English',
  },
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SEO-only optimization | SEO + GEO hybrid (AI answer engines) | 2024–2025 | Must optimize for ChatGPT/Perplexity citations, not just Google ranking |
| LinkedIn company page as primary channel | Personal profile-first strategy | 2023–2024 | Personal posts get 8x more reach; operator's profile is the primary asset |
| Cold email as primary outreach | LinkedIn DM + Google operator discovery | 2025 | LinkedIn context (shared connections, visible profile) lifts reply rates |
| LinkedIn Creator Mode toggle | Creator features are always-on | LinkedIn, 2024 | No toggle needed; select topic hashtags in profile settings |
| Generic FAQPage schema | Attribute-rich, answer-first schema | 2025 | Attribute-rich schema cited at 61.7% vs 41.6% for generic schema |

**Deprecated/outdated:**
- Disallowing AI bots in robots.txt: Was common in 2023–2024 as sites feared scraping. Current best practice is to allow all AI crawlers to improve GEO citation rates.
- "Worldwide" in areaServed: More specific country codes improve entity disambiguation for AI models.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest (already installed) |
| Config file | check package.json test script |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated? | Notes |
|--------|----------|-----------|------------|-------|
| GTM-01 | ICP document exists and has all 5 required fields | manual | No | Document review; no code to test |
| GTM-02 | Google playbook has 10+ search strings | manual | No | Document review; count strings |
| GTM-03 | SEO/GEO gaps fixed in code | manual-smoke | Partial | Validate with Google Rich Results Test; robots.txt curl check |
| GTM-04 | LinkedIn kit complete with profile copy + 4-week calendar | manual | No | Content review |

### GTM-03 Validation Commands

```bash
# Check robots.txt serves AI bot directives
curl https://wischosgift.com/robots.txt

# Validate Product schema on a product page (manual — paste URL)
# https://search.google.com/test/rich-results?url=https://wischosgift.com/products/WP-401-pure-titanium-vacuum-insulated-bottle

# Validate BlogPosting schema on a blog post (manual — paste URL)
# https://search.google.com/test/rich-results?url=https://wischosgift.com/blog/aluminum-brass-steel-titanium-corporate-gifts

# GEO baseline test (manual — run in ChatGPT and Perplexity)
# Query: "custom metal corporate gift sets small batch"
# Query: "corporate gifting supplier Australia MOQ 100"
# Expected: wischosgift.com does not appear yet (baseline); should appear after fixes
```

### Wave 0 Gaps

None — this phase produces documents and targeted code edits. No new test files required. Existing Vitest suite covers the code areas being edited (if unit tests exist for routes — check `src/routes/__tests__/`).

---

## Open Questions

1. **FAQ Page vs. FAQ Section**
   - What we know: GTM-03 says "all identified gaps fixed in code" — a FAQ page is the most natural home for FAQPage JSON-LD
   - What's unclear: Should a new `/faq` route be created, or should FAQ content be added to an existing page (e.g., a FAQ section on the Contact page)?
   - Recommendation: Create a new `/faq` route. It creates a clean URL for the FAQPage schema, adds a sitemap entry, and gives future content a home. The planner should confirm this approach.

2. **LinkedIn Company Page URL**
   - What we know: Organization JSON-LD `sameAs` should include the LinkedIn company page URL
   - What's unclear: The LinkedIn company page does not exist yet — it is created as part of GTM-04
   - Recommendation: The `sameAs` code fix (in `__root.tsx`) is a Wave 2 task in the plan — runs after the LinkedIn page is live. The planner should sequence this correctly.

3. **Blog post `publishedAt` field format**
   - What we know: `blog.ts` stores `publishedAt` as display string (e.g., "January 14, 2026") not ISO 8601
   - What's unclear: BlogPosting JSON-LD `datePublished` should be ISO 8601 ("2026-01-14") — the current field format is not directly usable
   - Recommendation: Either add an `isoDate` field to `BlogPost` interface in `blog.ts`, or convert display string to ISO in the head() function. Add `isoDate: '2026-01-14'` to BlogPost interface (simpler, avoids string parsing).

4. **Sitemap `<lastmod>` values**
   - What we know: Current `sitemap.xml` has no `<lastmod>` dates
   - What's unclear: For a static file, these would need to be manually maintained — is it worth the effort?
   - Recommendation: Add `<lastmod>` for static pages only (homepage, about, contact) using the Phase 6 completion date. Skip for product URLs (24 products makes it noisy). LOW priority.

---

## Sources

### Primary (HIGH confidence)
- Live codebase audit — all route files read directly; gap inventory is based on actual code, not assumption
- `src/routes/__root.tsx` — Organization + WebSite JSON-LD confirmed present
- `src/routes/{-$locale}/products/$productId.tsx` — Product + FAQPage JSON-LD confirmed present
- `public/robots.txt` — AI bot directives confirmed missing
- `public/sitemap.xml` — lastmod dates confirmed missing
- schema.org documentation — BlogPosting, BreadcrumbList, Product schema specs

### Secondary (MEDIUM confidence)
- [Amplemarket — Google Search Operators for B2B Prospecting](https://www.amplemarket.com/blog/mastering-google-searches-for-b2b-prospecting) — operator syntax patterns
- [Genrank.io — GEO Audit Checklist](https://genrank.io/blog/geo-audit-checklist-and-priorities/) — AI bot directives, schema priorities
- [201creative.com — GEO Audit Checklist 2026](https://201creative.com/geo-audit-checklist/) — technical GEO requirements
- [Fahrenheit Marketing — Selling Corporate Gifts to Companies](https://www.fahrenheitmarketing.com/services/ecommerce/sell-corporate-gifts-to-companies/) — buyer persona (HR, Office Manager, EA)
- [blog.linkboost.co — LinkedIn Content Calendar Template 2026](https://blog.linkboost.co/linkedin-content-calendar-template-2026/) — posting frequency, pillar breakdown
- [growleads.io — LinkedIn Profile Optimization 2026](https://growleads.io/blog/linkedin-profile-optimization-guide-2026-playbook/) — headline formula, About section structure
- [lagrowthmachine.com — LinkedIn Marketing Strategy 2026](https://lagrowthmachine.com/linkedin-marketing-strategy-2026/) — personal vs company page engagement data (8x stat)
- [salesrobot.co — LinkedIn Creator Mode 2026](https://www.salesrobot.co/blogs/linkedin-creator-mode) — Creator Mode toggle removed in 2024

### Tertiary (LOW confidence — verify during planning)
- 61.7% AI citation rate for attribute-rich schema (from GEO research) — single source, not verified against official data
- "8x more engagement" for personal vs company page (from LinkedIn marketing articles) — widely cited but not sourced to LinkedIn's own data

---

## Metadata

**Confidence breakdown:**
- SEO/GEO gap inventory: HIGH — based on direct codebase audit, not inference
- Standard Stack: HIGH — no new libraries; existing patterns confirmed working
- ICP framework: MEDIUM — based on Fahrenheit Marketing buyer research + cross-referenced with existing project MEMORY.md persona decisions
- Google search operators: MEDIUM — operator syntax confirmed; specific string construction is the planner's job
- LinkedIn strategy: MEDIUM-HIGH — multiple consistent 2026 sources; 8x stat not independently verified
- FAQ page recommendation: MEDIUM — derived from GEO audit best practices; planner should confirm route vs. section decision

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (LinkedIn algorithm data stable; GEO guidelines evolve quickly)
