# Phase 3: Products - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the product catalog experience: a grid page showing 4 product series, individual detail pages for each, an image lightbox on detail pages, and Product JSON-LD structured data. No pricing, no cart, no checkout — inquiry-only. The inquiry CTA links to the existing /inquiry route.

</domain>

<decisions>
## Implementation Decisions

### Product Catalog (4 series — Craighill-inspired placeholders)

All product content is placeholder copy aligned with "Useful, Interesting, Refined" positioning. Real product details to be provided by client before launch.

1. **Architect Desk Set** — Brake-formed aluminum desk accessories (in/out tray, document holder, catchall). Category: Desk Accessories. Materials: aluminium alloy.
2. **Signature Pen Collection** — Precision-machined brass writing instrument set in custom gift box. Category: Writing Instruments. Materials: brass, stainless steel.
3. **Castro Catchall Tray** — Stamped brass desk catchall dish with custom logo engraving. Category: Desk Accessories. Materials: brass.
4. **Executive EDC Set** — Coordinated brass keyring + carabiner clip + card case in gift packaging. Category: EDC / Travel. Materials: brass, stainless steel.

All series: MOQ 50 sets, customizationOptions include logo engraving and custom packaging, leadTimeSample 7–10 business days, leadTimeBulk ~30 days.

### Product Grid Card Layout (Craighill-style)

- Full-bleed top image (aspect-ratio fixed, object-cover)
- Product name as bold heading beneath image
- One-line tagline as muted subtext
- MOQ badge ("MOQ 50 Sets") using shadcn Badge component
- "Custom Logo Available" icon callout (Lucide Stamp or Paintbrush icon + short label)
- Card is clickable → navigates to product detail page
- No price shown anywhere

### Product Detail Page Layout (Craighill-style)

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

### Inquiry CTA from Detail Page

- Primary CTA button: "Request a Quote" → links to `/inquiry?product=[product-name]`
- Pre-filling the product field in the inquiry form is Phase 4 work — for now, just pass the query param and note it for Phase 4

### Logo Customization Callout (PROD-05)

- On product cards: small icon + text label "Custom Logo Available" (Lucide `Stamp` icon)
- On detail pages: a dedicated "Customization" section in the info column listing logo placement options and packaging design service
- No visual mockup images needed — text + icon is sufficient for v1

### Lightbox (PROD-04)

- Use existing `Dialog` component (Radix UI, already installed)
- Clicking product image opens Dialog with image at larger size (max-w-4xl or similar)
- Close via: × button, click outside backdrop, ESC key (all provided by Radix Dialog out of the box)
- No image carousel — single image per product in v1
- Mobile: Dialog overlays full screen, image scales to fit

### Product JSON-LD (PROD-06)

- `Product` schema with: name, description, brand (Wischos Gift), offers.priceSpecification "On Request"
- Injected via `<Head>` in each product detail page route
- One JSON-LD block per product detail page

### Image Placeholders

- Use `https://picsum.photos/seed/{product-id}/800/600` as placeholder images during development
- Each product uses a consistent seed so the same placeholder image always renders
- Will be replaced with AI-generated concept images before launch

### Claude's Discretion

- Exact Tailwind spacing and color tokens (follow existing `--sea-ink`, `page-wrap`, `island-kicker` patterns)
- Product route structure (`/products` for grid, `/products/$productId` for detail)
- TypeScript type approach for product data (extend existing `Product` interface in products.ts)
- Loading/error states for routes

</decisions>

<specifics>
## Specific Ideas

- Design reference: craighill.co — minimal, editorial, premium. Card and detail page layout closely follows their visual approach.
- Cards should feel clean with good whitespace, not cluttered with specs
- The "Useful. Interesting. Refined." product philosophy from PROJECT.md should be reflected in the copy tone: confident, specific, never salesy

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Card`, `CardHeader`, `CardContent` (src/components/ui/card.tsx): Already used in ProductPreviewSection on homepage. Has `has-[>img:first-child]:pt-0` CSS support — image-first card layout works without custom styling.
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose` (src/components/ui/dialog.tsx): Installed Radix UI Dialog — use directly for lightbox.
- `Badge` (src/components/ui/badge.tsx): Use for MOQ label on cards.
- `Button` (src/components/ui/button.tsx): Already used for CTAs everywhere.
- `ProductPreviewSection.tsx`: Homepage teaser uses the same Card pattern. Product grid extends this, adds images.

### Established Patterns
- Content modules in `src/content/` — add product data into existing `src/content/products.ts` (interface already defined, array is empty)
- `page-wrap` CSS class for consistent horizontal padding
- `island-kicker` + `--sea-ink` color tokens for section headers
- Routes under `src/routes/{-$locale}/` — add `products/$productId.tsx` for detail pages
- `RouterTo` cast pattern for typed links (from Phase 2 decisions in STATE.md)
- No `PageShell` on pages that self-manage padding (About, How It Works precedent)

### Integration Points
- `src/content/products.ts` — populate the empty `products[]` array with 4 product objects
- `src/routes/{-$locale}/products/index.tsx` — stub exists, wire up the grid
- `src/routes/{-$locale}/products/$productId.tsx` — create this new route for detail pages
- `src/content/meta.ts` — add meta entries for products index and each product detail page (or generate dynamically)
- `/inquiry` route (already exists as stub) — CTA destination

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-products*
*Context gathered: 2026-03-12*
