# Phase 3: Products - Research

**Researched:** 2026-03-12
**Domain:** Static product catalog with TanStack Router file-based routing, Radix UI Dialog lightbox, Product JSON-LD structured data
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Product Catalog (4 series — Craighill-inspired placeholders)**

All product content is placeholder copy aligned with "Useful, Interesting, Refined" positioning. Real product details to be provided by client before launch.

1. **Architect Desk Set** — Brake-formed aluminum desk accessories (in/out tray, document holder, catchall). Category: Desk Accessories. Materials: aluminium alloy.
2. **Signature Pen Collection** — Precision-machined brass writing instrument set in custom gift box. Category: Writing Instruments. Materials: brass, stainless steel.
3. **Castro Catchall Tray** — Stamped brass desk catchall dish with custom logo engraving. Category: Desk Accessories. Materials: brass.
4. **Executive EDC Set** — Coordinated brass keyring + carabiner clip + card case in gift packaging. Category: EDC / Travel. Materials: brass, stainless steel.

All series: MOQ 50 sets, customizationOptions include logo engraving and custom packaging, leadTimeSample 7–10 business days, leadTimeBulk ~30 days.

**Product Grid Card Layout (Craighill-style)**
- Full-bleed top image (aspect-ratio fixed, object-cover)
- Product name as bold heading beneath image
- One-line tagline as muted subtext
- MOQ badge ("MOQ 50 Sets") using shadcn Badge component
- "Custom Logo Available" icon callout (Lucide Stamp or Paintbrush icon + short label)
- Card is clickable → navigates to product detail page
- No price shown anywhere

**Product Detail Page Layout (Craighill-style)**
- Desktop: 2-column layout — large image left (with click-to-lightbox), product info right
- Mobile: stacked, image on top
- Info column sections (top to bottom):
  1. Product name (h1) + tagline
  2. Description paragraph(s)
  3. Materials list (e.g. "Brass · Stainless Steel")
  4. Customization options block (logo placement, packaging design)
  5. Lead time + MOQ callout
  6. Inquiry CTA button → links to /inquiry (product name pre-filled via URL query param if possible)
- No price, no add-to-cart

**Inquiry CTA from Detail Page**
- Primary CTA button: "Request a Quote" → links to `/inquiry?product=[product-name]`
- Pre-filling the product field in the inquiry form is Phase 4 work — for now, just pass the query param and note it for Phase 4

**Logo Customization Callout (PROD-05)**
- On product cards: small icon + text label "Custom Logo Available" (Lucide `Stamp` icon)
- On detail pages: a dedicated "Customization" section in the info column listing logo placement options and packaging design service
- No visual mockup images needed — text + icon is sufficient for v1

**Lightbox (PROD-04)**
- Use existing `Dialog` component (Radix UI, already installed)
- Clicking product image opens Dialog with image at larger size (max-w-4xl or similar)
- Close via: × button, click outside backdrop, ESC key (all provided by Radix Dialog out of the box)
- No image carousel — single image per product in v1
- Mobile: Dialog overlays full screen, image scales to fit

**Product JSON-LD (PROD-06)**
- `Product` schema with: name, description, brand (Wischos Gift), offers.priceSpecification "On Request"
- Injected via `<Head>` in each product detail page route
- One JSON-LD block per product detail page

**Image Placeholders**
- Use `https://picsum.photos/seed/{product-id}/800/600` as placeholder images during development
- Each product uses a consistent seed so the same placeholder image always renders
- Will be replaced with AI-generated concept images before launch

### Claude's Discretion

- Exact Tailwind spacing and color tokens (follow existing `--sea-ink`, `page-wrap`, `island-kicker` patterns)
- Product route structure (`/products` for grid, `/products/$productId` for detail)
- TypeScript type approach for product data (extend existing `Product` interface in products.ts)
- Loading/error states for routes

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROD-01 | Products grid displaying 4 product series cards with placeholder names, image, one-line description, and MOQ 50 sets label | `src/content/products.ts` already has `Product` interface; populate array with 4 objects; use existing `Card` + `Badge` components |
| PROD-02 | Each product card links to individual product detail page | TanStack Router `createFileRoute` for `/{-$locale}/products/$productId`; use `Link` component with `RouterTo` cast pattern |
| PROD-03 | Product detail page shows expanded description, customization options, lead time, and inquiry CTA | New route file `products/$productId.tsx`; read `productId` from `Route.useParams()`; lookup from products array |
| PROD-04 | Lightbox — clicking product image opens full-size view overlay | Use existing `Dialog`/`DialogContent`/`DialogTrigger` from `src/components/ui/dialog.tsx`; ESC + click-outside already handled by Radix |
| PROD-05 | Logo customization callout on each product | Lucide `Stamp` icon on card; "Customization" section in detail page info column |
| PROD-06 | Product JSON-LD `Product` schema with `priceSpecification: "On Request"` on each detail page | Inject via `head()` in `createFileRoute` using `script` tag with `type: "application/ld+json"` |
</phase_requirements>

---

## Summary

Phase 3 builds a static product catalog — no database reads needed. All product data lives in `src/content/products.ts` as a TypeScript array. The existing `Product` interface already defines all required fields. The planner only needs to populate the array with 4 product objects and wire up two routes: the existing stub at `/{-$locale}/products/index.tsx` (to be replaced with a proper grid) and a new dynamic route at `/{-$locale}/products/$productId.tsx` for detail pages.

The lightbox requirement is fully met by the existing Radix UI Dialog component already installed in `src/components/ui/dialog.tsx`. Keyboard ESC dismissal, click-outside, and mobile touch support are provided by Radix Dialog out of the box — no custom event handling needed. The JSON-LD injection uses TanStack Router's `head()` function with a `script` tag (same mechanism used for `<title>` and `<meta>` already in every route).

The key design challenge is the Craighill-inspired card layout: full-bleed image on top of the Card with the shadcn Card component's `has-[>img:first-child]:pt-0` and `*:[img:first-child]:rounded-t-xl` CSS already supported by the existing card styles.

**Primary recommendation:** Keep all product data static in `src/content/products.ts`. Use the existing Dialog for lightbox. Inject JSON-LD via `head()` `scripts` array in the detail route. No new libraries required.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TanStack Router | 1.166.7 (pinned) | File-based routing, `$productId` param, `head()` for meta/JSON-LD | Already installed, project convention |
| Radix UI (via `radix-ui`) | ^1.4.3 | Dialog for lightbox — ESC, click-outside, focus trap, aria | Already installed via shadcn |
| lucide-react | ^0.545.0 | `Stamp` icon for customization callout | Already installed |
| shadcn Card, Badge, Button | — | Grid card layout, MOQ badge, CTA button | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind v4 | (project) | Spacing, aspect-ratio, object-cover, 2-col grid | All layout |
| `class-variance-authority` | (via shadcn) | Already used in Badge | If custom variant needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Radix Dialog (lightbox) | yet-another-react-lightbox | Dialog is already installed; no new dependency; meets all requirements |
| Static products array | DB query | No DB needed for static catalog; reduces complexity; Phase 3 scope says no DB |
| picsum.photos seed URLs | next/image or custom | Next/Image not applicable (TanStack Start); picsum is good enough for placeholder phase |

**Installation:** No new packages required for Phase 3.

---

## Architecture Patterns

### Recommended Project Structure

New files to create:
```
src/
├── content/
│   └── products.ts              # Extend: populate products[] array (already exists)
├── routes/
│   └── {-$locale}/
│       └── products/
│           ├── index.tsx        # Replace stub: ProductsPage with grid
│           └── $productId.tsx   # New: ProductDetailPage
└── components/
    └── sections/
        ├── ProductGridSection.tsx   # New: grid of cards
        └── ProductDetailSection.tsx # New: 2-col detail layout
```

### Pattern 1: Static Product Lookup in Dynamic Route

**What:** Dynamic segment `$productId` matched against static products array. 404 redirect via `notFound()` if no match.
**When to use:** All product detail pages.

```typescript
// src/routes/{-$locale}/products/$productId.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { products } from '@/content/products'

export const Route = createFileRoute('/{-$locale}/products/$productId')({
  head: ({ params }) => {
    const product = products.find(p => p.id === params.productId)
    if (!product) return {}
    return {
      meta: [
        { title: `${product.name} | Wischos Gift` },
        { name: 'description', content: product.tagline },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: { '@type': 'Brand', name: 'Wischos Gift' },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: 'On Request',
              },
            },
          }),
        },
      ],
    }
  },
  loader: ({ params }) => {
    const product = products.find(p => p.id === params.productId)
    if (!product) throw notFound()
    return { product }
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { product } = Route.useLoaderData()
  // ...
}
```

### Pattern 2: Radix Dialog as Lightbox

**What:** Wrap product image in `DialogTrigger`. `DialogContent` renders enlarged image. No custom event listeners needed.
**When to use:** Image click on product detail page.

```typescript
// Source: existing src/components/ui/dialog.tsx (Radix UI)
import {
  Dialog, DialogTrigger, DialogContent,
} from '@/components/ui/dialog'

// Inside ProductDetailSection:
<Dialog>
  <DialogTrigger asChild>
    <button className="cursor-zoom-in w-full" aria-label={`View ${product.name} full size`}>
      <img
        src={product.heroImage}
        alt={product.name}
        className="w-full aspect-[4/3] object-cover rounded-lg"
      />
    </button>
  </DialogTrigger>
  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
    <img
      src={product.heroImage}
      alt={product.name}
      className="w-full h-auto"
    />
  </DialogContent>
</Dialog>
```

ESC key dismissal, click-outside, focus trap, and ARIA role="dialog" are all handled by Radix UI out of the box.

### Pattern 3: Full-Bleed Image Card

**What:** `<img>` as the first direct child of `<Card>` — the card's CSS class `has-[>img:first-child]:pt-0` removes top padding and `*:[img:first-child]:rounded-t-xl` rounds the top corners.
**When to use:** Product grid cards.

```typescript
// Existing card.tsx supports this natively
<Card className="cursor-pointer hover:ring-foreground/20 transition-shadow">
  <img
    src={product.heroImage}
    alt={product.name}
    className="w-full aspect-[4/3] object-cover"
  />
  <CardHeader>
    <CardTitle>{product.name}</CardTitle>
    <CardDescription>{product.tagline}</CardDescription>
  </CardHeader>
  <CardContent className="flex items-center justify-between">
    <Badge variant="secondary">MOQ 50 Sets</Badge>
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Stamp className="size-3" />
      Custom Logo Available
    </span>
  </CardContent>
</Card>
```

### Pattern 4: RouterTo Cast for Dynamic Product Links

**What:** The `RouterTo` cast pattern already established in Phase 2 avoids TypeScript errors for dynamic paths.

```typescript
// Established Phase 2 pattern — use same approach
type RouterTo = LinkProps['to']

<Link to={`/products/${product.id}` as RouterTo}>
  {/* card contents */}
</Link>
```

Alternatively, use `params` prop with typed route:
```typescript
<Link to="/{-$locale}/products/$productId" params={{ productId: product.id }}>
```

The `as RouterTo` cast is simpler and consistent with existing codebase convention.

### Pattern 5: JSON-LD via head() scripts

**What:** TanStack Router's `head()` function accepts a `scripts` array in addition to `meta` and `links`. Each entry with `type: 'application/ld+json'` renders as a `<script type="application/ld+json">` tag in `<HeadContent />`.
**Confidence:** HIGH — verified against TanStack Router source and existing usage in `__root.tsx`.

```typescript
head: ({ params }) => ({
  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({ /* schema */ }),
    },
  ],
})
```

### Pattern 6: Products Data Shape

Extend the existing `Product` interface in `src/content/products.ts`. The current interface already has all needed fields. Populate the empty array with 4 objects.

```typescript
// Existing interface — no changes needed
export interface Product {
  id: string           // slug, e.g. 'architect-desk-set'
  name: string
  tagline: string
  description: string
  category: string
  materials: string[]
  heroImage: string    // picsum URL with seed
  moq: number          // 50
  customizationOptions: string[]
  leadTimeSample: string
  leadTimeBulk: string
}
```

### Anti-Patterns to Avoid

- **Wrapping the entire Card in an `<a>` tag:** Causes invalid HTML (interactive element inside interactive element when card has buttons). Use a single `<Link>` on the card's clickable wrapper, or make the card a `<Link>` via `asChild`.
- **Custom lightbox from scratch:** The Radix Dialog already handles ESC, click-outside, ARIA, focus trap, and animation. No hand-rolling needed.
- **Fetching product data from the server:** Product catalog is static in v1. A server loader that reads from DB is unnecessary overhead and introduces latency for no benefit.
- **`useEffect` for JSON-LD injection:** Always use TanStack Router's `head()` — never inject `<script>` tags via `useEffect` or `dangerouslySetInnerHTML` in component bodies (bypasses SSR hydration).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox | Custom modal with portal, ESC listener, focus trap, ARIA | Radix Dialog (already installed) | Dialog handles all edge cases: keyboard, mobile touch, scroll lock, ARIA, animation |
| JSON-LD injection | `useEffect` + `document.createElement('script')` | `head()` scripts array in `createFileRoute` | SSR-safe; hydrates correctly; consistent with all other head management in project |
| 404 for unknown product ID | `if (!product) return <NotFound>` | `throw notFound()` in loader | TanStack Router's built-in not-found handling, works with error boundaries |

**Key insight:** Every custom solution in this phase has an existing project primitive. The planner should wire things together, not build new infrastructure.

---

## Common Pitfalls

### Pitfall 1: DialogContent default max-width is `sm:max-w-sm`

**What goes wrong:** The existing `DialogContent` class has `sm:max-w-sm` hardcoded. For a lightbox, the image needs to be much larger.
**Why it happens:** shadcn's default Dialog is designed for form dialogs, not image lightboxes.
**How to avoid:** Pass `className="max-w-4xl p-0 overflow-hidden"` override to `DialogContent` to expand the width and remove padding around the image.
**Warning signs:** Image appears small and cramped inside dialog.

### Pitfall 2: img as first child of Card — must be a direct child

**What goes wrong:** Wrapping the img in a `<div>` or other element before `CardHeader` breaks the `has-[>img:first-child]:pt-0` CSS selector.
**Why it happens:** The `:first-child` CSS selector is strict — the img must be the first direct child of the Card element, not nested.
**How to avoid:** Place `<img>` as the immediate first child of `<Card>`, before any CardHeader/CardContent.
**Warning signs:** Top padding appears above the image; image corners don't round correctly.

### Pitfall 3: productId slug must be URL-safe

**What goes wrong:** If product IDs contain spaces or special characters, the URL breaks or `products.find(p => p.id === params.productId)` returns undefined.
**Why it happens:** Browser URL encoding changes characters; find comparison fails.
**How to avoid:** Use kebab-case IDs (e.g., `'architect-desk-set'`). The ID in the URL and in the array must match exactly.
**Warning signs:** Detail page shows 404 for valid products.

### Pitfall 4: Link wrapping interactive elements inside Card

**What goes wrong:** Clicking the lightbox trigger inside the card also triggers the Link navigation.
**Why it happens:** The lightbox `DialogTrigger` button is nested inside a Link wrapping the whole card, creating nested interactive elements.
**How to avoid:** On the grid page, cards should be fully clickable links (no lightbox). The lightbox only appears on the detail page, where there is no wrapping Link. Keep the two pages cleanly separated.
**Warning signs:** TypeScript or linter warnings about `<a>` inside `<a>`.

### Pitfall 5: head() `scripts` property might behave differently to `meta`

**What goes wrong:** The `scripts` property in `head()` return value may not render as expected in all TanStack Start versions.
**Why it happens:** TanStack Start is still RC; `head()` API surface is evolving.
**How to avoid:** Test JSON-LD injection early in the plan (Wave 1 or early Wave 2). Check page source, not DevTools Elements panel (browser may reformat JSON). Verify with `curl` or "View Page Source".
**Warning signs:** JSON-LD script tag absent from page source; `<HeadContent />` not rendering the script.

---

## Code Examples

Verified patterns from project codebase:

### Existing Route head() Pattern
```typescript
// Source: src/routes/{-$locale}/about.tsx (confirmed pattern)
export const Route = createFileRoute('/{-$locale}/about')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.about.title },
      { name: 'description', content: siteMeta.routes.about.description },
    ],
  }),
  component: AboutPage,
})
```

### No-PageShell Route Pattern (About/How It Works precedent)
```typescript
// Source: src/routes/{-$locale}/how-it-works.tsx
function HowItWorksPage() {
  return (
    <>
      <ProcessStepsSection />
      <ProcessPolicySection />
    </>
  )
}
```
The Products pages should follow this pattern — sections self-manage padding.

### Existing RouterTo Cast
```typescript
// Source: src/components/sections/ProductPreviewSection.tsx
type RouterTo = LinkProps['to']
<Link to={'/products' as RouterTo}>...</Link>
```
Use same cast for product detail links: `to={`/products/${product.id}` as RouterTo}`.

### Product Card Image URL Convention
```typescript
// Picsum with stable seed — consistent image per product
heroImage: `https://picsum.photos/seed/architect-desk-set/800/600`
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom lightbox library | Radix Dialog (already installed) | shadcn adopted Radix | No extra dependency; ESC/touch/ARIA handled |
| JSON-LD in `useEffect` | `head()` `scripts` in route | TanStack Router meta API | SSR-safe; no hydration mismatch |
| Dynamic data for product catalog | Static TypeScript array | — | Simpler; no loader latency; easy to populate |

**Deprecated/outdated:**
- `react-image-lightbox`: Unmaintained; Radix Dialog is the modern equivalent for simple use cases.
- `next/head` for JSON-LD: Not applicable (TanStack Start project); use `head()` in `createFileRoute`.

---

## Open Questions

1. **`head()` scripts API — exact property name**
   - What we know: TanStack Router's `head()` returns `{ meta, links, scripts }`. This is consistent with how `__root.tsx` uses `links` for the stylesheet.
   - What's unclear: Whether `scripts[].children` is the correct property name for inline script content (vs `innerHTML` or `dangerouslySetInnerHTML`). May need to verify against TanStack Start source or docs.
   - Recommendation: Test JSON-LD injection in the first task of the first wave. If `children` doesn't work, try `innerHTML`. This is a low-risk, quick validation.

2. **`notFound()` error boundary wiring**
   - What we know: TanStack Router exports `notFound()` — throwing it in a loader triggers the not-found handler.
   - What's unclear: Whether a `notFoundComponent` is configured in `__root.tsx` (it is not currently).
   - Recommendation: Add a simple fallback — if `notFound()` shows a blank page, the loader can instead return `null` and the component can render a "Product not found" message. Keep it simple for v1.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^3.0.5 with jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run src/content/__tests__/products.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROD-01 | `products` array has exactly 4 items; each has non-empty name, tagline, heroImage, moq=50 | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ Wave 0 |
| PROD-02 | Each product has a non-empty `id` (used as route param); id is URL-safe (no spaces) | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ Wave 0 |
| PROD-03 | Each product has non-empty `description`, `customizationOptions` (length >= 1), `leadTimeSample`, `leadTimeBulk` | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ Wave 0 |
| PROD-04 | Lightbox render: Dialog opens when trigger clicked; overlay present; close button present | unit (React Testing Library) | `npx vitest run src/components/__tests__/ProductLightbox.test.tsx` | ❌ Wave 0 |
| PROD-05 | Each product card renders "Custom Logo Available" text; detail page renders "Customization" section heading | unit (React Testing Library) | `npx vitest run src/components/__tests__/ProductCard.test.tsx` | ❌ Wave 0 |
| PROD-06 | JSON-LD: each product has valid `priceSpecification` value "On Request" in structured data | unit | `npx vitest run src/content/__tests__/products.test.ts` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/content/__tests__/products.test.ts`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/content/__tests__/products.test.ts` — covers PROD-01, PROD-02, PROD-03, PROD-06 (data shape + JSON-LD helper)
- [ ] `src/components/__tests__/ProductCard.test.tsx` — covers PROD-05 (customization callout rendering)
- [ ] `src/components/__tests__/ProductLightbox.test.tsx` — covers PROD-04 (Dialog open/close behavior)

---

## Sources

### Primary (HIGH confidence)
- Codebase read: `src/components/ui/dialog.tsx` — confirmed Radix Dialog API, `DialogContent` default max-width, `showCloseButton` prop
- Codebase read: `src/components/ui/card.tsx` — confirmed `has-[>img:first-child]:pt-0` CSS, `*:[img:first-child]:rounded-t-xl` CSS
- Codebase read: `src/components/ui/badge.tsx` — confirmed `variant` options available
- Codebase read: `src/content/products.ts` — confirmed existing `Product` interface and empty array
- Codebase read: `src/routes/__root.tsx` — confirmed `head()` usage with `meta` and `links` arrays; `HeadContent` renders all head entries
- Codebase read: `src/routes/{-$locale}/products/index.tsx` — confirmed stub exists with PageShell (to be replaced)
- Codebase read: `vitest.config.ts` — confirmed Vitest 3 + jsdom + `@/` alias
- Codebase read: `package.json` via bash — confirmed all dependency versions

### Secondary (MEDIUM confidence)
- Project STATE.md — `RouterTo` cast pattern established in Phase 2; no-PageShell precedent for About and How It Works routes

### Tertiary (LOW confidence)
- None — all findings verified from project source.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all components verified by reading actual source files
- Architecture: HIGH — patterns derived directly from existing route and component conventions
- Pitfalls: HIGH — identified from reading actual Card and Dialog source code
- JSON-LD scripts API: MEDIUM — pattern is logical given `meta`/`links` precedent; `children` property name flagged for early validation

**Research date:** 2026-03-12
**Valid until:** 2026-04-11 (TanStack Start is RC — check patch notes if > 1.166.7 available)
