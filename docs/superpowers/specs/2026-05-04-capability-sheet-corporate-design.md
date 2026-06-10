# Capability Sheet — Corporate Edition (Design Spec)

**Date:** 2026-05-04
**Audience:** HR managers, procurement officers, executive assistants, marketing managers
**Purpose:** Email attachment for corporate gifting outreach
**Primary CTA:** Reply to email / send inquiry
**Format:** A4 HTML file → Chrome print to PDF

---

## Goal

A single-page document a corporate buyer can read in 30 seconds and understand: what Wischos makes, why the gifts are worth giving, how easy the process is, and how to start.

---

## Visual Style

- Background: `#ffffff`
- Primary text: `#111111`
- Secondary text: `#555555` / `#888888`
- Accent: `#B87333` (copper) — section labels, border accents, headline highlight
- Dividers: `#e5e5e5`
- Font: system-ui / Helvetica Neue
- No Wischos logo image — wordmark in text

Rationale: Light background is easier to read in office environments, prints cleanly without background graphics setting, and visually distinguishes this from the dark distributor edition.

---

## Layout

Two-column grid inside a fixed A4 container (`210mm × 297mm`).

```
┌─────────────────────────────────────────────────────┐
│  WISCHOS GIFT                  FOR CORPORATE GIFTING │  ← top bar
├──────────────────┬──────────────────────────────────┤
│                  │                                  │
│  Headline        │  ┌─ Callout box ──────────────┐  │
│  + subline       │  │  One brief. One contact.    │  │
│                  │  │  Delivered.                 │  │
│  ─ Materials     │  └─────────────────────────────┘  │
│  ─ Customisation │                                  │
│  ─ Lead Time     │  Example Sets (3 images)         │
│  ─ Process       │  [img] [img] [img]               │
│                  │  Name  Name  Name                │
│                  │  Occasion descriptor             │
│  ─────────────── │                                  │
│  Contact info    │  Full catalog: wischosgift.com/… │
└──────────────────┴──────────────────────────────────┘
```

**Left column** (~38% width):
- Headline: "Custom metal gift sets, end to end"
- Subline: "China-based sourcing partner. We recommend set direction, handle production, and arrange delivery — you brief us once."
- 4 spec items with copper top-border rule:
  - **Materials** — Brass · Titanium · Stainless Steel · Aluminium. Stated accurately in every spec sheet — no vague "premium metal" language.
  - **Customisation** — Laser engraving on products. Debossed or foil-stamped logo on packaging. Colour-matched ribbon and tissue available.
  - **Lead Time** — Normally 25–35 days after artwork approval. Confirmed per project at inquiry stage.
  - **Process** — One contact from brief to delivery. We coordinate suppliers, QC, and export documentation. You receive tracking and a packing report.
- Contact block: email, website

**Right column** (~62% width):
- Callout box with copper left border:
  - Heading: "One brief. One contact. Delivered."
  - Body: "Tell us the occasion, your recipient profile, and a budget direction. We'll recommend a set, handle production coordination, and ship directly to your office or event venue. No supplier management on your end."
- Three example sets in 3-column grid, each with square image, set name, occasion descriptor:
  - WGS-005 The Morning Ritual — Executive & VIP gifting
  - WGS-006 The Onboarding Set — New hire welcome
  - WGS-008 The Quartet — Client appreciation & milestones
- Footer line: "Full catalog: wischosgift.com/gift-sets"

---

## Content Rules

- **No fixed MOQ numbers** — consistent with site soft-MOQ strategy
- **No fixed pricing** — "FOB pricing quoted per project" at most; prefer not even that
- **No sample CTA** — consistent with feedback_no_sample_cta.md
- **No Wischos logo image** — wordmark only
- **No distributor language** — no mention of white-label, resale, or agency relationships
- All copy follows B2B tone rules: no fluff, specific claims, no vague adjectives

---

## Technical Approach

- Single standalone HTML file: `capability-sheet-corporate.html` in project root
- All styles inline or in `<style>` block — no external CSS
- Images: Cloudinary URLs with `w=400` transform
- A4 print CSS: `@page { size: A4; margin: 0; }`
- No JavaScript needed
- To generate PDF: open in Chrome → Ctrl+P → Save as PDF → A4 → Margins: None → Background graphics: OFF (white background, not needed)

---

## Cloudinary Image URLs

| Set | Path |
|-----|------|
| WGS-005 The Morning Ritual | `products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover` |
| WGS-006 The Onboarding Set | `products/WGS-006-3-The-Onboarding-Set/The-Onboarding-Set-cover` |
| WGS-008 The Quartet | `products/WGS-008-4-The-Quartet/The-Quartet-cover` |

Full URL pattern: `https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_400/{path}`

---

## File

| Action | File |
|--------|------|
| Create | `capability-sheet-corporate.html` (project root) |

No routes, no src/ changes, no Vercel deploy needed.

---

## Success Criteria

- Fits on one A4 page when printed from Chrome
- All three set images render from Cloudinary
- PDF under 2MB
- Visually distinct from distributor edition (light vs dark)
- No overflow or clipping at page edges
