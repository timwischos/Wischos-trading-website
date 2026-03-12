---
status: complete
phase: 02-core-pages
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md, 02-04-SUMMARY.md]
started: 2026-03-12T09:00:00Z
updated: 2026-03-12T09:30:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Homepage Hero — above-the-fold content
expected: |
  Open http://localhost:3000 — the hero section should be the first thing visible.
  It must show a headline (h1) and a subheadline with these specifics visible without scrolling:
  MOQ 50 sets, custom packaging design, and a single counterpart (you are not dealing directly with factories).
  There should also be a clear CTA button leading to /inquiry or /contact.
result: pass

### 2. Homepage Value Props, Differentiators, Credibility
expected: |
  Scroll down the homepage. You should see (in this order):
  1. A value proposition section with 3 feature cards showing icons (Gem, Package, CheckCircle or similar)
  2. A differentiator section with 4 claims showing checkmark icons
  3. A credibility section with 4 numeric stats (displayed prominently, e.g. "500+ Orders" style)
  All copy is real B2B content — no lorem ipsum anywhere.
result: pass

### 3. Homepage Product Preview + CTA
expected: |
  Continuing to scroll: you should see 3 product teaser cards (shadcn Card style), each with a product name and brief description.
  There should be a "View All Products" link visible that points to /products.
  Below that, a lagoon-colored (teal/ocean) CTA banner with a heading and an inquiry button.
  No product prices, no detail links — this is Phase 2 teaser only.
result: pass

### 4. About page — company credibility
expected: |
  Open http://localhost:3000/about — you should see 4 sections:
  1. Hero with a mission pull-quote (blockquote style)
  2. Expertise section with 3 market cards: EU, US, AU
  3. Why Us section with 3 CheckCircle differentiation points
  4. Trust section with email link and quality statement on the left, registration number area on the right
  In development mode, the trust section should show a yellow warning banner indicating the registration number is a PLACEHOLDER.
  No factory names anywhere on the page.
result: pass

### 5. How It Works page — process steps
expected: |
  Open http://localhost:3000/how-it-works — you should see:
  1. A 4-step numbered process: Inquiry → Sample → Confirm → Delivery (or similar), each step with a Lucide icon
  2. Below the steps: 3 info cards showing:
     - Sample policy (reference free / custom paid)
     - Lead times (7–10 days for samples, ~30 days for bulk)
     - Payment terms (T/T)
  All three policy details visible without clicking through.
result: pass

### 6. Privacy Policy page — GDPR content
expected: |
  Open http://localhost:3000/privacy — the page should render with typography prose styling (readable body text, clear heading hierarchy).
  There should be at least 6 sections covering GDPR topics (e.g. Data We Collect, How We Use Data, Your Rights, etc.).
  The content is real — not lorem ipsum.
result: pass

### 7. Footer Privacy Policy link — SPA navigation
expected: |
  From any page (e.g. the homepage), click "Privacy Policy" in the footer.
  It should navigate to /privacy as a client-side SPA navigation — no full page reload (the page does NOT flash/blank completely).
  You can verify by watching the browser tab: the favicon should not re-spin as it would on a full reload.
result: pass

### 8. Mobile responsiveness (375px)
expected: |
  Open http://localhost:3000 and resize browser to 375px wide (or use DevTools mobile emulation, e.g. iPhone SE).
  Check the homepage, /about, /how-it-works, and /privacy.
  On all 4 pages: no horizontal scrollbar, no content overflowing off-screen, text readable, sections stack vertically.
result: pass

## Summary

total: 8
passed: 8
issues: 0
pending: 0
skipped: 0

## Gaps

[none yet]
