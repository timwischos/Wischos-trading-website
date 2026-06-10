# Capability Sheet — Distributor Edition (Design Spec)

**Date:** 2026-05-04
**Audience:** Promotional products distributors and gifting agencies
**Purpose:** LinkedIn cold outreach attachment and email attachment
**Primary CTA:** Reply to message / start a conversation
**Format:** A4 HTML file → Chrome print to PDF

---

## Goal

A single-page document a distributor can read in 30 seconds and understand: what Wischos does, why they can trust us with client relationships, what materials and price tiers are available, and how to respond.

---

## Visual Style

- Background: `#0a0a0a`
- Primary text: `#ffffff`
- Secondary text: `#aaa` / `#666`
- Accent: `#B87333` (copper) — used for section labels, border accents, links
- Font: system-ui / Helvetica Neue (no web font dependency, prints reliably)
- No Wischos logo image needed — wordmark in text is sufficient for PDF

---

## Layout

Two-column grid inside a fixed A4 container (`210mm × 297mm`).

```
┌─────────────────────────────────────────────────────┐
│  WISCHOS GIFT                    FOR DISTRIBUTORS   │  ← top bar
├──────────────────┬──────────────────────────────────┤
│                  │                                  │
│  Headline        │  ┌─ Callout box ──────────────┐  │
│  + subline       │  │  Bring any brief.           │  │
│                  │  │  Keep every client.         │  │
│  ─ Materials     │  └─────────────────────────────┘  │
│  ─ White-Label   │                                  │
│  ─ Lead Time     │  Example Sets (3 images)         │
│  ─ Your Client   │  [img] [img] [img]               │
│                  │  Name  Name  Name                │
│                  │  Mat.  Mat.  Mat.                │
│  ─────────────── │                                  │
│  Contact info    │  Full catalog: wischosgift.com/… │
└──────────────────┴──────────────────────────────────┘
```

**Left column** (narrower, ~38% width):
- Top bar with WISCHOS GIFT wordmark + "For Distributors & Gifting Agencies"
- H1-equivalent headline: "Custom metal gift sets, built around your brief"
- One-line subtext positioning Wischos as China-based sourcing partner
- 4 spec items with copper top-border rule:
  - Materials: Brass · Titanium · Stainless Steel · Aluminium
  - White-Label: Standard. Wischos branding does not appear on product or packaging.
  - Lead Time: Normally 25–35 days after sample approval. Confirmed per project.
  - Your Client: Stays yours. All communication goes through you. Quotes are yours to use in proposals.
- Bottom: contact block (email, website, LinkedIn)

**Right column** (wider, ~62% width):
- Callout box with copper left border: "Bring any brief. Keep every client." + 2-sentence explanation that each brief is handled separately, no cross-selling to end clients, no competing distributors introduced
- Three example sets in a 3-column grid, each with: square product image, set name, material/tier descriptor
  - The Field EDC (WGS-004): Stainless steel carry set
  - The Morning Ritual (WGS-005): Titanium + brass, executive tier
  - The Quartet (WGS-008): 4-piece in magnetic rigid box
- Footer line: "Full catalog: wischosgift.com/gift-sets"

---

## Content Rules

- **No fixed MOQ numbers** — consistent with site strategy (soft MOQ)
- **No fixed pricing** — "FOB pricing quoted per project" at most
- **No Wischos logo image** — wordmark in text only (avoids image path dependency in HTML→PDF)
- **No sample CTA** — consistent with feedback_no_sample_cta.md
- **LinkedIn link** uses the existing profile URL: `linkedin.com/in/john-lui-4529a3102/`
- All copy follows B2B tone rules (feedback_b2b_copy_tone.md): no fluff, specific claims, no vague adjectives

---

## Technical Approach

- Single standalone HTML file: `capability-sheet-distributor.html` in project root
- All styles inline or in a `<style>` block — no external CSS
- Images: Cloudinary URLs with `w=400` transform (loads fast, prints at adequate resolution)
- A4 print CSS: `@page { size: A4; margin: 0; }` + `@media print { body { ... } }`
- No JavaScript needed
- To generate PDF: open in Chrome → Ctrl+P → Destination: Save as PDF → Paper: A4 → Margins: None

---

## File

| Action | File |
|--------|------|
| Create | `capability-sheet-distributor.html` (project root) |

No routes, no commits to src/, no Vercel deploy needed. This is a standalone offline document.

---

## Success Criteria

- Fits on one A4 page when printed from Chrome (no overflow, no clipping)
- All three set images render correctly from Cloudinary
- PDF file is under 2MB (suitable for email attachment)
- Content readable without zooming in Chrome at 100% zoom
- No Wischos branding visible on the product/packaging description
