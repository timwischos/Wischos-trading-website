# Phase 2: Core Pages — Research

**Researched:** 2026-03-12
**Domain:** Static content pages — React/TSX component authoring, Tailwind v4 utility patterns, TanStack Start head() API, content module architecture, GDPR-compliant privacy policy, B2B copywriting
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAND-01 | Hero section: single compelling headline + subheadline for corporate gift buyers (AIDA — Attention). Copywriting delivered. | Content module pattern; `homepage.ts` already scaffolded with placeholder keys |
| LAND-02 | Value proposition section: premium metal, custom packaging, MOQ 50 sets (AIDA — Interest). Copywriting delivered. | Section component pattern; content module |
| LAND-03 | "How we're different" comparison against commodity suppliers (AIDA — Desire). Copywriting delivered. | Section component pattern; content module |
| LAND-04 | Social proof / credibility signal section (AIDA — Action). Copywriting delivered. | Stat/callout component; content module |
| LAND-05 | Primary CTA section drives to /inquiry (AIDA — Action). Copywriting delivered. | CTA section component; Button from shadcn/ui |
| LAND-06 | Product preview section on homepage linking to full products page | Card grid from shadcn/ui; links to /products |
| ABOUT-01 | Professional trading company framing; no single-person language; E-E-A-T copy. Copywriting delivered. | `about.ts` content module already scaffolded |
| ABOUT-02 | Market expertise section (EU/US/AU buyer expectations). Copywriting delivered. | Section component; content module |
| ABOUT-03 | "Why Wischos Gift" differentiation section. Copywriting delivered. | Section component; content module |
| ABOUT-04 | Trust signals: branded email placeholder, company registration PLACEHOLDER, quality statement. Copywriting delivered. | PLACEHOLDER pattern documented below |
| ABOUT-05 | No factory names, certifications, or disintermediation risk anywhere on page | Content authoring constraint — documented in pitfalls |
| PROC-01 | How It Works page: full end-to-end process copy delivered | New content module `howItWorks.ts` needed |
| PROC-02 | Sample policy: reference free (client pays shipping); custom paid | Copy must be explicit; content module |
| PROC-03 | Lead times: 7–10 days samples, ~30 days bulk | Copy must be explicit; content module |
| PROC-04 | Payment terms: T/T (bank transfer) | Copy must be explicit; content module |
| PROC-05 | Step-by-step process flow min 4 steps with written descriptions | Numbered/icon step component |
| LEGAL-01 | Privacy Policy page: GDPR-covering data collection, use, retention, user rights, contact | `privacy.tsx` route stub exists; content module needed |
| LEGAL-02 | Privacy Policy linked in footer on every page | SiteFooter already has `/privacy` anchor — confirm it uses `<Link>` not `<a>` |
</phase_requirements>

---

## Summary

Phase 2 is a content-authoring phase. The technical scaffolding (routes, layout shell, content module stubs) is already in place from Phase 1. Every route stub renders a `<PageShell>` placeholder. The work is: write all page copy into `src/content/` TypeScript modules, build the React section components that display it, and ensure the result is responsive and accessible at 375/768/1280px.

No new libraries are required for this phase. All needed UI primitives (Button, Card, Separator, Badge from shadcn/ui) are already installed. The `@tailwindcss/typography` plugin is installed and available for the Privacy Policy prose block.

Two structural decisions drive planning for this phase. First, all user-visible strings live in `src/content/` TypeScript modules — this is the i18n seam and must be respected for every section built. Second, the About page has a known blocker: the company's 统一社会信用代码 and registered address have not been provided. The plan must use a PLACEHOLDER pattern that compiles cleanly and is clearly labelled for the operator to fill in before launch.

**Primary recommendation:** Author content modules first (each page gets its own typed `src/content/*.ts` module), then build section components that import from them. Keep components colocated with their page route or under `src/components/sections/` for shared pieces. The homepage is the most complex — break it into five named section components. Privacy Policy is the simplest — one prose block using `@tailwindcss/typography`.

---

## Standard Stack

### Core (all already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@tanstack/react-router` | 1.166.7 | Route file convention, `head()` for per-page meta | Already in use; pinned |
| `tailwindcss` v4 | ^4.1.18 | Utility classes | Already configured |
| `shadcn/ui` (radix-ui) | ^1.4.3 | Card, Button, Badge, Separator UI primitives | Already installed |
| `lucide-react` | ^0.545.0 | Icons for process steps and feature callouts | Already installed |
| `@tailwindcss/typography` | ^0.5.16 | `prose` classes for Privacy Policy long-form text | Already installed as devDependency, active via `@plugin` in styles.css |
| `tw-animate-css` | ^1.4.0 | Entry animations (`rise-in` defined in styles.css) | Already in styles.css |

### Custom CSS Classes Available (from styles.css — use these, do not recreate)

| Class | Purpose |
|-------|---------|
| `.display-title` | Fraunces serif font for hero headlines |
| `.island-shell` | Glassmorphism card style (border + gradient + shadow + backdrop-blur) |
| `.feature-card` | Elevated feature tile with hover lift |
| `.island-kicker` | Uppercase small label above section headings |
| `.rise-in` | 700ms entry animation (opacity + translateY) |
| `.page-wrap` | `min(1080px, calc(100% - 2rem))` centred container |
| `.nav-link` | Animated underline nav link style |

**CSS custom properties available:** `--sea-ink`, `--lagoon`, `--lagoon-deep`, `--palm`, `--sand`, `--foam`, `--surface`, `--kicker`, `--line`. Use these for brand-consistent colour in inline styles or arbitrary Tailwind values: `text-[var(--sea-ink)]`.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom CSS classes in styles.css | Pure Tailwind utilities | Existing classes encode brand design — use them, don't fight them |
| `prose` from Typography plugin | Manual spacing styles | Typography plugin already installed; use `prose` for long-form GDPR text |

---

## Architecture Patterns

### Recommended Project Structure for Phase 2

```
src/
├── content/
│   ├── homepage.ts       # Expand from stub (hero, valueProps, comparison, credibility, cta, productPreview)
│   ├── about.ts          # Expand from stub (hero, expertise, whyUs, trust, registration PLACEHOLDER)
│   ├── howItWorks.ts     # NEW — steps[], samplePolicy, leadTimes, paymentTerms
│   ├── privacy.ts        # NEW — effectiveDate, sections[], contact
│   ├── meta.ts           # Add privacy route entry
│   ├── navigation.ts     # No change needed
│   └── products.ts       # Phase 2 only needs product preview — add 3 stub preview items
├── components/
│   ├── layout/           # No change (PageShell, SiteHeader, SiteFooter)
│   └── sections/         # NEW directory for page section components
│       ├── HeroSection.tsx
│       ├── ValuePropSection.tsx
│       ├── DifferentiatorSection.tsx
│       ├── CredibilitySection.tsx
│       ├── CtaSection.tsx
│       ├── ProductPreviewSection.tsx
│       ├── ProcessStepsSection.tsx
│       └── AboutSection.tsx
└── routes/
    ├── index.tsx           # Replace stub with full HomePage composition
    ├── {-$locale}/
    │   ├── about.tsx       # Replace stub with AboutPage composition
    │   └── how-it-works.tsx # Replace stub with HowItWorksPage composition
    └── privacy.tsx         # Replace stub with PrivacyPage prose
```

### Pattern 1: Content Module — Typed Export Object

All copy lives in `src/content/`. Components import from there. No string literals in JSX.

```typescript
// src/content/howItWorks.ts
export const howItWorks = {
  hero: {
    heading: 'From Inquiry to Delivery',
    subheading: 'A transparent, four-step process — no surprises.',
  },
  steps: [
    {
      number: '01',
      title: 'Submit Your Inquiry',
      body: 'Tell us about your gifting programme — product interest, quantity, and timeline. We respond within 1 business day.',
    },
    {
      number: '02',
      title: 'Sample & Review',
      body: 'Reference samples are provided free of charge; you cover shipping. Custom samples carry a sample fee confirmed during inquiry. Sample lead time: 7–10 business days.',
    },
    {
      number: '03',
      title: 'Confirm & Pay',
      body: 'Once samples are approved, we issue a proforma invoice. Payment by T/T (bank transfer). Bulk production begins on receipt of deposit.',
    },
    {
      number: '04',
      title: 'Production & Delivery',
      body: 'Bulk orders are typically ready within 30 days of production start. Exact timelines are confirmed per order and vary by product and quantity.',
    },
  ],
  samplePolicy: {
    heading: 'Sample Policy',
    reference: 'Reference samples: Free. Client covers international shipping cost.',
    custom: 'Custom samples: Sample fee applies. Fee amount confirmed at inquiry stage.',
  },
  leadTimes: {
    heading: 'Lead Times',
    samples: '7–10 business days',
    bulk: 'Approximately 30 days from production start',
    note: 'Timelines are indicative and confirmed per order.',
  },
  paymentTerms: {
    heading: 'Payment Terms',
    method: 'T/T (Telegraphic Transfer / Bank Transfer)',
    structure: 'Deposit on order confirmation; balance before shipment. Full terms confirmed at order stage.',
  },
} as const
```

### Pattern 2: PLACEHOLDER Convention for Blocked Content (About page)

Since company registration details are not yet provided, use a clearly labelled placeholder that compiles and renders, but is visually obvious in development.

```typescript
// src/content/about.ts
export const about = {
  // ... other sections ...
  trust: {
    registrationLabel: 'Company Registration',
    // PLACEHOLDER: Replace with actual 统一社会信用代码 before launch
    registrationNumber: '[PLACEHOLDER — awaiting company registration details]',
    registrationNote: 'Registered trading company. Full details available on request.',
    email: 'inquiries@wischosgift.com',
    qualityStatement: 'Every order is quality-checked against a written specification before shipment.',
  },
} as const
```

In the component, wrap the PLACEHOLDER value in a conditional development warning:

```tsx
// In AboutPage or AboutSection component
const isDev = import.meta.env.DEV
// ...
{isDev && about.trust.registrationNumber.includes('PLACEHOLDER') && (
  <p className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
    DEV: Registration number placeholder — fill in before launch
  </p>
)}
<p>{about.trust.registrationNumber}</p>
```

### Pattern 3: Section Component Structure

Each page is a composition of named section components. The route file is the assembly point.

```tsx
// src/routes/index.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ValuePropSection } from '@/components/sections/ValuePropSection'
import { DifferentiatorSection } from '@/components/sections/DifferentiatorSection'
import { CredibilitySection } from '@/components/sections/CredibilitySection'
import { CtaSection } from '@/components/sections/CtaSection'
import { ProductPreviewSection } from '@/components/sections/ProductPreviewSection'

function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropSection />
      <DifferentiatorSection />
      <CredibilitySection />
      <ProductPreviewSection />
      <CtaSection />
    </>
  )
}
```

Do NOT wrap the full page in `<PageShell>` — `PageShell` adds container padding that will break full-width hero sections. Full-bleed sections manage their own layout. Use `.page-wrap` or `container mx-auto px-4` inside each section where content needs constraining.

### Pattern 4: TanStack Start head() API for Per-Page Meta

Already demonstrated in existing stubs — no change to pattern needed.

```tsx
export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.privacy.title },
      { name: 'description', content: siteMeta.routes.privacy.description },
    ],
  }),
  component: PrivacyPage,
})
```

`siteMeta.routes.privacy` must be added to `src/content/meta.ts`.

### Pattern 5: Privacy Policy — prose block with Typography plugin

```tsx
// src/routes/privacy.tsx
function PrivacyPage() {
  return (
    <div className="page-wrap py-16">
      <article className="prose prose-neutral max-w-prose mx-auto">
        <h1>{privacy.title}</h1>
        <p className="text-sm text-muted-foreground">Effective: {privacy.effectiveDate}</p>
        {privacy.sections.map((section) => (
          <section key={section.id}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>
    </div>
  )
}
```

### Pattern 6: SiteFooter — fix `<a>` to `<Link>`

Current SiteFooter uses a plain `<a href="/privacy">` anchor. This causes a full page reload on navigation. Phase 2 must update it to use TanStack Router `<Link to="/privacy">`.

```tsx
// SiteFooter.tsx fix
import { Link } from '@tanstack/react-router'
// ...
<Link to="/privacy" className="hover:text-foreground transition-colors">
  Privacy Policy
</Link>
```

This satisfies LEGAL-02 (footer link to privacy) and also resolves the SPA navigation regression.

### Anti-Patterns to Avoid

- **Full page in `<PageShell>`:** `PageShell` adds `container + py-12`. Hero sections must be full-width to the viewport edge. Do not wrap the homepage in `PageShell`.
- **Inline copy strings in JSX:** Every user-visible string must come from `src/content/`. Inline strings block future i18n.
- **Factory names anywhere:** Content authoring rule — ABOUT-05 explicitly prohibits factory names. No exceptions.
- **Writing testimonials or fake reviews:** ABOUT-04 does not include social proof quotes — use market stats and commitment statements only.
- **`<a href>` for internal navigation:** Always use TanStack Router `<Link to>` for internal routes. Plain anchors cause full reloads in SPAs.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Process step icons | Custom SVG icon set | `lucide-react` icons (CheckCircle, ArrowRight, Package, Truck, ClipboardList) | Already installed; consistent weight |
| Feature card layout | Custom CSS grid | shadcn/ui `<Card>` inside CSS grid | Cards handle border, shadow, padding consistently |
| Long-form prose styling | Manual `p { margin... }` rules | `@tailwindcss/typography` `prose` class | Plugin already installed; handles heading hierarchy, list styles, spacing |
| Product preview cards | Custom card component | shadcn/ui `<Card>` | Phase 3 will build full product cards — Phase 2 preview just needs a placeholder grid |
| Section entry animations | Custom `@keyframes` | `.rise-in` class already in styles.css | Reuse existing animation |

**Key insight:** This phase is content-heavy, not component-heavy. Most visual polish comes from correct use of existing custom CSS classes (`.display-title`, `.island-shell`, `.feature-card`, `.island-kicker`) combined with shadcn/ui primitives.

---

## Common Pitfalls

### Pitfall 1: Wrapping Full Pages in PageShell

**What goes wrong:** `PageShell` adds `container mx-auto px-4 py-12`. If the homepage is wrapped in it, the hero section cannot reach viewport edges. The gradient backgrounds defined in styles.css will be clipped.
**Why it happens:** The About and How It Works pages do use `PageShell` (they are document-style), but the Homepage has a full-bleed hero.
**How to avoid:** Remove `<PageShell>` from `index.tsx` stub. Homepage sections manage their own layout. About and HowItWorks can use `<PageShell>` or the `.page-wrap` class.
**Warning signs:** Hero background gradient looks narrow or clipped.

### Pitfall 2: SiteFooter Privacy Link as Plain `<a>`

**What goes wrong:** Current `SiteFooter` uses `<a href="/privacy">` which causes a full page reload — the SPA loses its state and triggers a network request.
**Why it happens:** The stub was written simply. This is a regression that matters when combined with LEGAL-02.
**How to avoid:** Update SiteFooter to import and use `<Link to="/privacy">` from `@tanstack/react-router`.
**Warning signs:** Browser address bar shows a full reload on clicking Privacy Policy link.

### Pitfall 3: About Page PLACEHOLDER Remaining at Launch

**What goes wrong:** The company registration number placeholder ships to production.
**Why it happens:** Operator hasn't provided the 统一社会信用代码 yet.
**How to avoid:** The PLACEHOLDER pattern with a `DEV`-only visual warning (described above) makes it impossible to miss during development. Add a comment near the field in the content module.
**Warning signs:** Rendered About page shows `[PLACEHOLDER — awaiting company registration details]` text.

### Pitfall 4: Tailwind v4 Arbitrary Value Syntax

**What goes wrong:** Tailwind v3 syntax like `text-[#173a40]` still works, but the brand colours are already defined as CSS custom properties. Using `text-[var(--sea-ink)]` or the CSS variable name directly avoids magic hex values proliferating through JSX.
**Why it happens:** Developers reach for hex codes by habit.
**How to avoid:** Use `text-[var(--sea-ink)]`, `bg-[var(--surface)]`, `border-[var(--line)]` for all brand colour applications. Never hardcode hex in JSX.
**Warning signs:** Hex codes appearing in className props that aren't coming from the design tokens.

### Pitfall 5: Missing `privacy` Entry in siteMeta

**What goes wrong:** `src/content/meta.ts` has entries for home, products, about, contact, inquiry, howItWorks but NOT privacy. The privacy route stub uses inline strings for title/description.
**Why it happens:** The stub pre-dates the content module convention.
**How to avoid:** Add `privacy:` entry to `siteMeta.routes` in `meta.ts` and update `privacy.tsx` to import it.
**Warning signs:** TypeScript will not error — the stub works fine with inline strings, so this is easy to miss without a code review.

### Pitfall 6: Product Preview Section (LAND-06) vs Products Page (Phase 3)

**What goes wrong:** Over-engineering the Phase 2 product preview by building the full Phase 3 product card component early, then having to refactor it.
**Why it happens:** LAND-06 says "product preview section linking to full products page" — easy to conflate with PROD-01.
**How to avoid:** Phase 2 product preview is 3 teaser cards with placeholder names, one-line descriptions, and a "View All Products" link. The full product grid (PROD-01) is Phase 3. Use a simplified `<Card>` — not the full product card component.
**Warning signs:** Building image lightboxes or custom option selectors in Phase 2.

---

## Code Examples

Verified patterns from existing project code and official TanStack/Tailwind documentation:

### Hero Section Skeleton (uses existing CSS classes)

```tsx
// src/components/sections/HeroSection.tsx
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { homepage } from '@/content/homepage'

export function HeroSection() {
  return (
    <section className="page-wrap pt-24 pb-20 text-center rise-in">
      <p className="island-kicker mb-4">{homepage.hero.kicker}</p>
      <h1 className="display-title text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--sea-ink)] mb-6">
        {homepage.hero.headline}
      </h1>
      <p className="text-xl text-[var(--sea-ink-soft)] max-w-2xl mx-auto mb-10">
        {homepage.hero.subheadline}
      </p>
      <Button asChild size="lg">
        <Link to="/inquiry">{homepage.hero.cta}</Link>
      </Button>
    </section>
  )
}
```

### Feature Card Grid (uses existing CSS classes)

```tsx
// Inside ValuePropSection or DifferentiatorSection
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
  {items.map((item) => (
    <div key={item.title} className="feature-card island-shell rounded-xl p-6">
      <item.Icon className="h-6 w-6 text-[var(--lagoon-deep)] mb-4" />
      <h3 className="font-semibold text-[var(--sea-ink)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--sea-ink-soft)]">{item.description}</p>
    </div>
  ))}
</div>
```

### Process Step Component

```tsx
// Inside ProcessStepsSection
{steps.map((step) => (
  <div key={step.number} className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--lagoon)] flex items-center justify-center text-white font-bold">
      {step.number}
    </div>
    <div>
      <h3 className="font-semibold text-[var(--sea-ink)] mb-1">{step.title}</h3>
      <p className="text-[var(--sea-ink-soft)]">{step.body}</p>
    </div>
  </div>
))}
```

### Privacy Policy Prose Block

```tsx
// src/routes/privacy.tsx
import { privacy } from '@/content/privacy'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.privacy.title },
      { name: 'description', content: siteMeta.routes.privacy.description },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="page-wrap py-16">
      <article className="prose prose-neutral max-w-prose mx-auto">
        <h1>{privacy.title}</h1>
        <p><em>Effective date: {privacy.effectiveDate}</em></p>
        {privacy.sections.map((s) => (
          <section key={s.id}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>
    </div>
  )
}
```

### SiteFooter Fixed Navigation Link

```tsx
// src/components/layout/SiteFooter.tsx — partial
import { Link } from '@tanstack/react-router'

<Link to="/privacy" className="hover:text-foreground transition-colors">
  Privacy Policy
</Link>
```

---

## Content Module Specifications

This section is critical for the planner — each content module must be written before the corresponding component can be built.

### `src/content/homepage.ts` — Expand existing stub

Required keys to add:

```typescript
{
  hero: {
    kicker: string,          // e.g. "Premium Corporate Gifting"
    headline: string,        // LAND-01 — the attention-capturing headline
    subheadline: string,     // LAND-01 — supporting subheadline
    cta: string,             // "Request an Inquiry"
  },
  valueProps: {
    kicker: string,
    heading: string,
    items: Array<{ title: string; description: string; icon: string }>, // LAND-02 — 3 items
  },
  differentiators: {
    kicker: string,
    heading: string,
    intro: string,
    items: Array<{ claim: string; detail: string }>,  // LAND-03
  },
  credibility: {
    kicker: string,
    heading: string,
    stats: Array<{ value: string; label: string }>,  // LAND-04 — market experience callouts
  },
  productPreview: {
    kicker: string,
    heading: string,
    viewAllCta: string,      // LAND-06
    items: Array<{ name: string; tagline: string }>, // 3 stub items
  },
  cta: {
    heading: string,
    body: string,
    buttonLabel: string,     // LAND-05
  },
}
```

### `src/content/about.ts` — Expand existing stub

```typescript
{
  hero: { heading: string; subheading: string },              // ABOUT-01
  expertise: {                                                 // ABOUT-02
    kicker: string; heading: string;
    markets: Array<{ region: string; insight: string }>,
  },
  whyUs: {                                                     // ABOUT-03
    kicker: string; heading: string;
    points: Array<{ title: string; body: string }>,
  },
  trust: {                                                     // ABOUT-04
    registrationLabel: string,
    registrationNumber: string,     // PLACEHOLDER until operator provides
    email: string,
    qualityStatement: string,
  },
  mission: { heading: string; body: string },
}
```

### `src/content/howItWorks.ts` — New file (PROC-01 through PROC-05)

Keys documented in Pattern 1 code example above.

### `src/content/privacy.ts` — New file (LEGAL-01)

```typescript
{
  title: string,
  effectiveDate: string,
  sections: Array<{
    id: string,
    heading: string,
    body: string,       // or body: string[] for multi-paragraph sections
  }>,
  contactEmail: string,
}
```

**GDPR sections required (LEGAL-01):**
1. What data we collect (inquiry form fields)
2. How we use it (responding to inquiries, internal record-keeping)
3. Data retention (how long records are kept)
4. Your rights under GDPR (access, correction, deletion, portability)
5. How to exercise your rights (contact email)
6. Cookies / tracking (none beyond standard analytics if applicable)

---

## Responsive Design Constraints

Phase 2 success criteria explicitly require no horizontal scroll at 375/768/1280px. The existing styles.css already handles `overflow-x: hidden` on body. Key layout rules to enforce:

| Viewport | Key Layout Behaviour |
|----------|---------------------|
| 375px (mobile) | Single column. Hero text font-size must scale — use `text-4xl md:text-6xl` pattern. Feature grids stack vertically. |
| 768px (tablet) | 2-column grids for feature items; process steps still stacked or 2-col. |
| 1280px (desktop) | 3-column grids for value props and differentiators. Generous whitespace. |

Use Tailwind responsive prefixes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.

The `.page-wrap` class (`min(1080px, calc(100% - 2rem))`) already handles safe horizontal margins. Use it as the outer container for all sections rather than rolling a custom max-width.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| `tailwindcss-animate` plugin | `tw-animate-css` (already installed) | Tailwind v4 deprecated the old plugin; project already uses correct approach |
| `prose` from `@tailwindcss/typography` v0.5 with Tailwind v4 | Plugin registered via `@plugin` directive in CSS file (not in tailwind.config.js) | Already correctly configured in styles.css line 8 |
| TanStack Router `meta` array with objects | Same — no change in 1.166.7 | Consistent with existing stubs |

**No deprecated patterns in scope for this phase.**

---

## Open Questions

1. **Company registration PLACEHOLDER timing**
   - What we know: Company registration details (统一社会信用代码 + address) are required for ABOUT-04 trust signals
   - What's unclear: When the operator will provide them
   - Recommendation: Implement with PLACEHOLDER string and DEV-mode warning. Document clearly in plan task that operator must fill in before Phase 5 (SEO/launch). Do not block Phase 2 on this.

2. **Credibility stats content (LAND-04)**
   - What we know: "Social proof or credibility signal section" — but the business has no testimonials or published client list yet
   - What's unclear: What specific stats/claims are permissible
   - Recommendation: Use market experience indicators (years of export experience, markets served: EU/US/AU, types of industries served). Avoid fabricating client counts. Use factual language: "Specialists in EU/US/AU corporate gifting markets" not "50+ satisfied clients."

3. **Product preview items for LAND-06**
   - What we know: `src/content/products.ts` has a `Product` interface but the array is empty
   - What's unclear: Whether Phase 2 should define 3 product teaser objects in `homepage.ts` or in `products.ts`
   - Recommendation: Define 3 teaser objects in `src/content/homepage.ts` under `productPreview.items` (name + tagline only). Full product data belongs in `products.ts` in Phase 3. This avoids premature commitment to the Phase 3 product data shape.

---

## Validation Architecture

`nyquist_validation: true` in `.planning/config.json`. Validation is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.0.5 + @testing-library/react 16.3.0 + jsdom 28.1.0 |
| Config file | None — vitest reads from `package.json` `"test": "vitest run"` |
| Quick run command | `npx vitest run --reporter=dot` |
| Full suite command | `npx vitest run` |

No vitest.config.ts exists; vitest auto-discovers test files matching `**/*.test.{ts,tsx}` by default.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAND-01 | Hero headline renders, contains MOQ 50 sets | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "hero"` | ❌ Wave 0 |
| LAND-02 | Value prop section renders 3 items | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "value-props"` | ❌ Wave 0 |
| LAND-03 | Differentiators section present | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "differentiators"` | ❌ Wave 0 |
| LAND-04 | Credibility section renders | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "credibility"` | ❌ Wave 0 |
| LAND-05 | CTA section has link to /inquiry | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "cta"` | ❌ Wave 0 |
| LAND-06 | Product preview section renders, has link to /products | unit (render) | `npx vitest run src/tests/homepage.test.tsx -t "product-preview"` | ❌ Wave 0 |
| ABOUT-01 | About page renders without factory name text | unit (render) | `npx vitest run src/tests/about.test.tsx` | ❌ Wave 0 |
| ABOUT-04 | Trust section contains registration placeholder text | unit (render) | `npx vitest run src/tests/about.test.tsx -t "trust"` | ❌ Wave 0 |
| PROC-02 | "reference samples free" text visible on HowItWorks | unit (render) | `npx vitest run src/tests/how-it-works.test.tsx -t "sample-policy"` | ❌ Wave 0 |
| PROC-03 | "7–10" and "30 days" text visible on HowItWorks | unit (render) | `npx vitest run src/tests/how-it-works.test.tsx -t "lead-times"` | ❌ Wave 0 |
| PROC-04 | "T/T" text visible on HowItWorks | unit (render) | `npx vitest run src/tests/how-it-works.test.tsx -t "payment"` | ❌ Wave 0 |
| PROC-05 | At least 4 process steps render | unit (render) | `npx vitest run src/tests/how-it-works.test.tsx -t "steps"` | ❌ Wave 0 |
| LEGAL-01 | Privacy page renders GDPR section headings | unit (render) | `npx vitest run src/tests/privacy.test.tsx` | ❌ Wave 0 |
| LEGAL-02 | SiteFooter contains link to /privacy | unit (render) | `npx vitest run src/tests/footer.test.tsx` | ❌ Wave 0 |

Note: ABOUT-02, ABOUT-03, ABOUT-05, LAND-06 (link presence) are covered by the unit tests above. Responsive layout testing (375/768/1280px) is manual-only — jsdom does not simulate CSS breakpoints.

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=dot`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work 2`

### Wave 0 Gaps
- [ ] `src/tests/homepage.test.tsx` — covers LAND-01 through LAND-06
- [ ] `src/tests/about.test.tsx` — covers ABOUT-01, ABOUT-04, ABOUT-05
- [ ] `src/tests/how-it-works.test.tsx` — covers PROC-02, PROC-03, PROC-04, PROC-05
- [ ] `src/tests/privacy.test.tsx` — covers LEGAL-01
- [ ] `src/tests/footer.test.tsx` — covers LEGAL-02
- [ ] `src/tests/setup.ts` — jsdom setup (`import '@testing-library/jest-dom'`)
- [ ] Vitest config inline in `vite.config.ts` (add `test: { environment: 'jsdom', setupFiles: ['./src/tests/setup.ts'] }`) or standalone `vitest.config.ts`

---

## Sources

### Primary (HIGH confidence)
- Direct inspection of project source files — `src/routes/`, `src/content/`, `src/components/layout/`, `src/styles.css`, `vite.config.ts`, `package.json`
- `.planning/REQUIREMENTS.md` — authoritative requirement definitions
- `.planning/STATE.md` — confirmed decisions and blockers

### Secondary (MEDIUM confidence)
- TanStack Router 1.x file-based routing documentation patterns — consistent with observed stub code in `{-$locale}.tsx`, `index.tsx`, `about.tsx`
- `@tailwindcss/typography` `prose` class usage — confirmed installed via `package.json` devDependencies and `@plugin "@tailwindcss/typography"` in `styles.css`
- GDPR Article 13/14 required disclosure categories — standard data protection requirement; Privacy Policy section list is based on regulatory baseline

### Tertiary (LOW confidence — validate at implementation)
- Vitest + @testing-library/react setup with TanStack Start's SSR context — TanStack Start components that use router context may require a router wrapper in tests. Verify at Wave 0.
- Whether `import.meta.env.DEV` is available in component context — standard Vite behaviour, HIGH likelihood, but verify at implementation.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries directly observed in package.json and styles.css
- Architecture (content modules + section components): HIGH — consistent with established project pattern in Phase 1
- Copywriting content shape: HIGH — requirements are specific about what must appear on each page
- PLACEHOLDER pattern: HIGH — standard development practice, compiles cleanly
- Pitfalls: HIGH — all derived from direct code inspection, not speculation
- Vitest test setup: MEDIUM — framework is installed, exact TanStack Start test config needs validation at Wave 0

**Research date:** 2026-03-12
**Valid until:** 2026-06-12 (stable stack — Tailwind v4, TanStack Router 1.166.7 pinned)
