# Capability Sheet (Corporate Edition) Implementation Plan

**Goal:** Create `capability-sheet-corporate.html` — a standalone one-page A4 PDF for corporate gifting outreach. Light background, copper accents. Open in Chrome → Ctrl+P → Save as PDF.

**Architecture:** Single self-contained HTML file. All styles in `<style>` block. Cloudinary images. No JS. No build step.

---

## File Map

| Action | File |
|--------|------|
| Create | `capability-sheet-corporate.html` |

---

### Task 1: Create HTML skeleton with A4 layout

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wischos Gift — Capability Sheet (Corporate)</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @page { size: A4; margin: 0; }

    html, body {
      width: 210mm;
      height: 297mm;
      background: #fff;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #111;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 14mm 14mm 12mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 8px;
      margin-bottom: 14px;
      flex-shrink: 0;
    }

    .wordmark {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #111;
      text-transform: uppercase;
    }

    .top-label {
      font-size: 7px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #B87333;
    }

    .body-grid {
      display: grid;
      grid-template-columns: 72mm 1fr;
      gap: 12mm;
      flex: 1;
      min-height: 0;
    }

    /* LEFT COLUMN */
    .left-col {
      display: flex;
      flex-direction: column;
    }

    .headline {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.35;
      color: #111;
      margin-bottom: 6px;
    }

    .subline {
      font-size: 7.5px;
      color: #888;
      line-height: 1.55;
      margin-bottom: 16px;
    }

    .spec-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .spec-item {
      border-top: 1px solid #e5e5e5;
      padding-top: 7px;
    }

    .spec-item:first-child { border-top-color: #B87333; }

    .spec-label {
      font-size: 6px;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: #B87333;
      margin-bottom: 3px;
    }

    .spec-body {
      font-size: 7.5px;
      color: #555;
      line-height: 1.5;
    }

    .contact-block {
      border-top: 1px solid #e5e5e5;
      padding-top: 10px;
      margin-top: 14px;
    }

    .contact-line {
      font-size: 7px;
      color: #888;
      margin-bottom: 3px;
    }

    /* RIGHT COLUMN */
    .right-col {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .callout {
      background: #faf8f5;
      border-left: 2px solid #B87333;
      padding: 10px 12px;
    }

    .callout-heading {
      font-size: 9px;
      font-weight: 600;
      color: #111;
      margin-bottom: 5px;
    }

    .callout-body {
      font-size: 7.5px;
      color: #666;
      line-height: 1.6;
    }

    .sets-section { flex: 1; }

    .sets-label {
      font-size: 6px;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: #aaa;
      margin-bottom: 8px;
    }

    .sets-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }

    .set-item img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      display: block;
      background: #f5f5f5;
      margin-bottom: 5px;
    }

    .set-name {
      font-size: 7.5px;
      font-weight: 600;
      color: #222;
      margin-bottom: 2px;
    }

    .set-desc {
      font-size: 6.5px;
      color: #aaa;
      line-height: 1.35;
    }

    .catalog-link {
      font-size: 7px;
      color: #bbb;
      margin-top: 8px;
    }

    @media print {
      html, body { width: 210mm; height: 297mm; }
      .page { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <div class="page">

    <div class="top-bar">
      <div class="wordmark">Wischos Gift</div>
      <div class="top-label">For Corporate Gifting</div>
    </div>

    <div class="body-grid">
      <div class="left-col">
        <!-- Task 2 -->
      </div>
      <div class="right-col">
        <!-- Task 3 -->
      </div>
    </div>

  </div>
</body>
</html>
```

- [ ] **Step 2: Open in Chrome, verify skeleton** — white background, top bar shows wordmark + label, two empty columns visible.

- [ ] **Step 3: Commit**
```bash
git add capability-sheet-corporate.html
git commit -m "Add corporate capability sheet skeleton with A4 layout"
```

---

### Task 2: Populate left column

- [ ] **Step 1: Replace `<!-- Task 2 -->` with:**

```html
        <div class="headline">Custom metal gift sets,<br>end to end</div>
        <div class="subline">China-based sourcing partner. We recommend set direction, handle production, and arrange delivery — you brief us once.</div>

        <div class="spec-list">
          <div class="spec-item">
            <div class="spec-label">Materials</div>
            <div class="spec-body">Brass · Titanium · Stainless Steel · Aluminium. Stated accurately in every spec sheet — no vague "premium metal" language.</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Customisation</div>
            <div class="spec-body">Laser engraving on products. Debossed or foil-stamped logo on packaging. Colour-matched ribbon and tissue available.</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Lead Time</div>
            <div class="spec-body">Normally 25–35 days after artwork approval. Confirmed per project at inquiry stage.</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Process</div>
            <div class="spec-body">One contact from brief to delivery. We coordinate suppliers, QC, and export documentation. You receive tracking and a packing report.</div>
          </div>
        </div>

        <div class="contact-block">
          <div class="contact-line">inquiries@wischosgift.com</div>
          <div class="contact-line">wischosgift.com</div>
        </div>
```

- [ ] **Step 2: Verify** — headline, four spec items, contact block. No overflow.

- [ ] **Step 3: Commit**
```bash
git add capability-sheet-corporate.html
git commit -m "Add left column content to corporate capability sheet"
```

---

### Task 3: Populate right column

- [ ] **Step 1: Replace `<!-- Task 3 -->` with:**

```html
        <div class="callout">
          <div class="callout-heading">One brief. One contact. Delivered.</div>
          <div class="callout-body">Tell us the occasion, your recipient profile, and a budget direction. We'll recommend a set, handle production coordination, and ship directly to your office or event venue. No supplier management on your end.</div>
        </div>

        <div class="sets-section">
          <div class="sets-label">Example Sets</div>
          <div class="sets-grid">
            <div class="set-item">
              <img
                src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_400/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover"
                alt="The Morning Ritual"
              />
              <div class="set-name">The Morning Ritual</div>
              <div class="set-desc">Executive &amp; VIP gifting</div>
            </div>
            <div class="set-item">
              <img
                src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_400/products/WGS-006-3-The-Onboarding-Set/The-Onboarding-Set-cover"
                alt="The Onboarding Set"
              />
              <div class="set-name">The Onboarding Set</div>
              <div class="set-desc">New hire welcome</div>
            </div>
            <div class="set-item">
              <img
                src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_400/products/WGS-008-4-The-Quartet/The-Quartet-cover"
                alt="The Quartet"
              />
              <div class="set-name">The Quartet</div>
              <div class="set-desc">Client appreciation &amp; milestones</div>
            </div>
          </div>
          <div class="catalog-link">Full catalog: wischosgift.com/gift-sets</div>
        </div>
```

- [ ] **Step 2: Verify** — callout box, three images load, set names and descriptors visible, catalog link at bottom.

- [ ] **Step 3: Commit**
```bash
git add capability-sheet-corporate.html
git commit -m "Add right column content to corporate capability sheet"
```

---

### Task 4: Verify print output and save PDF

- [ ] **Step 1: Open Chrome print preview** — Ctrl+P → A4 → Margins: None → Background graphics: OFF (white, not needed)

Expected: all content fits one page, no clipping, images render.

- [ ] **Step 2: If overflow** — reduce padding or font sizes:
```css
.page { padding: 10mm 12mm 10mm; }
.spec-list { gap: 7px; }
.sets-grid { gap: 6px; }
```

- [ ] **Step 3: Save PDF** — name: `Wischos-Capability-Sheet-Corporate.pdf`. Verify under 2MB, all images rendered.

- [ ] **Step 4: Final commit**
```bash
git add capability-sheet-corporate.html
git commit -m "Finalize corporate capability sheet — verified A4 print output"
```
