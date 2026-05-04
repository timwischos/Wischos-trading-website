# Design Spec: /for-distributors Landing Page

Date: 2026-05-04
Status: Approved by user

## Goal

Build a page at `/for-distributors` that speaks directly to promotional products distributors and gifting agencies. The page is not a product catalog — it communicates what Wischos can do as a sourcing partner for distributors who bring client briefs.

Primary conversion action: submit inquiry form.
Secondary: email contact.

## Route & Visibility

- Route: `/for-distributors` (TanStack file-based routing: `src/routes/for-distributors.tsx`)
- Visible on site: yes (not noindex)
- SEO meta: title = `Metal Gift Sets for Distributors & Gifting Agencies | Wischos Gift`
- Not in main navigation
- Entry point: low-key link at the bottom of the About page
- Primary use: LinkedIn cold outreach — send link directly to distributor prospects

## Visual Style

Matches existing landing pages (`executive-gift-set.tsx`):
- White background
- Copper accent (`#B87333`)
- Minimal header (logo only, no nav)
- Minimal footer (copyright + email)
- No sticky mobile CTA (not needed for this page type)

## Page Sections

### 1. Minimal Header
Logo only, links to `/`. Identical to existing landing pages.

### 2. Hero
- **Kicker**: `For Promotional Products Distributors & Gifting Agencies`
- **H1**: `Custom metal gift sets, built around your brief`
- **Subtitle**: Wischos is a China-based metal gift sourcing partner. Tell us what your client needs — recipient profile, budget range, quantity, branding — and we'll recommend set direction, materials, and packaging.
- **Primary CTA**: `Send Us a Brief →` (anchor to inquiry form)
- **Hero image**: WGS-008 The Quartet cover image (right side, desktop grid layout)
- Layout: 2-column grid on desktop (text left, image right), stacked on mobile

### 3. Distributor Trust Points
Four points that address distributor-specific concerns — not repeated from the main site:

| Title | Body |
|-------|------|
| Your client relationship stays yours | We don't contact your end clients directly. All communication goes through you. Quotes and spec sheets are yours to use in your own proposals. |
| Bring any brief | You can work with us across multiple client briefs. We treat each project separately and recommend the right direction per brief. |
| White-label as standard | Wischos branding does not appear on products or packaging unless you request it. Every set leaves with your client's identity, not ours. |
| Sales materials included | Each quote comes with clear material specs, product dimensions, and imagery your team can use directly in client presentations. |

Layout: 2×2 grid on desktop, single column on mobile.

### 4. Customization Range
Section title: `What you can offer your clients`

Four capability dimensions, written from the distributor's perspective ("what you can commit to your client"):

- **Materials**: Brass, titanium, stainless steel, aluminium — stated specs, not marketing language
- **Price tiers**: Entry programs for volume gifting, mid-tier for client retention, premium for executive recipients. FOB pricing quoted per project.
- **Customization**: Logo method (laser engraving or screen print), packaging configuration, set composition
- **Lead time**: Normally 25–35 days after sample approval — confirmed per project at inquiry stage

### 5. Example Sets — "What's possible"
Section title: `What's possible — three directions`
Subtitle: `These sets illustrate the range of materials and price points we work across. Your client's program may look different — that's expected.`

Three sets shown as capability proof, not as fixed products to order:

| Set | SKU | One-line positioning |
|-----|-----|----------------------|
| The Field EDC | WGS-004 | Stainless steel EDC carry set — for field teams, active professionals, and outdoor-adjacent gifting programs |
| The Morning Ritual | WGS-005 | Titanium and brass — the highest material tier in our lineup, for executive and client gifting |
| The Quartet | WGS-008 | Four-piece precision set in a magnetic rigid box — for executive programs that need a complete story |

Each set: one cover image + set name + one-line positioning + link to full set page.
Footer of section: `View full catalog →` linking to `/gift-sets`.

### 6. Inquiry Form
- Reuse existing `InquiryFormSection` component
- Section ID: `inquiry-form` (for anchor links from CTAs above)
- Left column: form
- Right column: brief blurb about Wischos + email link (`inquiries@wischosgift.com`) + LinkedIn link as fallback contact

### 7. Minimal Footer
Same as existing landing pages: copyright + `wischosgift.com` link.

## About Page Entry Point

Add a low-key text link at the bottom of the About page:

> Working as a distributor or gifting agency? [See how we work with distribution partners →](/for-distributors)

## What This Page Does NOT Do

- Does not show all 8 gift sets (catalog is a separate page)
- Does not show FOB prices or hard MOQ numbers
- Does not claim to know what the distributor's clients want
- Does not use Wischos branding on packaging examples
- Does not promise free samples or fixed lead times without qualification

## Implementation Notes

- Follow the same file structure as `src/routes/landing/executive-gift-set.tsx`
- Inline styles (no new CSS classes unless necessary)
- `InquiryFormSection` loaded via `lazy` + `Suspense` (same pattern as existing landing pages)
- WGS-004, WGS-005, WGS-008 images via `cloudinaryUrl()` helper
- Image paths (no extension — cloudinaryUrl handles format):
  - WGS-004: `/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover`
  - WGS-005: `/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover`
  - WGS-008: `/products/WGS-008-4-The-Quartet/The-Quartet-cover`
