# /for-distributors Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/for-distributors` page that speaks directly to promotional products distributors and gifting agencies, driving inquiry form submissions via LinkedIn cold outreach.

**Architecture:** Single new route file at `src/routes/for-distributors.tsx` following the existing landing page pattern (`executive-gift-set.tsx`). Reuses `InquiryFormSection` via lazy + Suspense. All styles are inline. A minor edit to `about.tsx` adds the entry point link.

**Tech Stack:** TanStack Start (file-based routing), React, Cloudinary image helper, existing `InquiryFormSection` component.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/routes/for-distributors.tsx` | New distributor landing page — all sections inline |
| Modify | `src/routes/{-$locale}/about.tsx` | Add low-key entry point link before `<CtaSection />` |

---

### Task 1: Create the route file with head metadata and skeleton

**Files:**
- Create: `src/routes/for-distributors.tsx`

- [ ] **Step 1: Create the file with route definition and SEO head**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/for-distributors')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for Distributors | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets built around your client brief. White-label, clear material specs, sales materials included. China-based sourcing, 25–35 day lead time.',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            areaServed: ['AU', 'GB', 'CA', 'EU'],
            description:
              'Custom metal gift sets built around your client brief. White-label, clear material specs, sales materials included. China-based sourcing, 25–35 day lead time.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you white-label?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Wischos branding does not appear on products or packaging as standard. Every set ships with your client\'s identity — or unbranded, if preferred.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I bring briefs from multiple clients?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We work with distributors across multiple client programs. Each brief is handled separately with its own recommendation, pricing, and production timeline.',
                },
              },
              {
                '@type': 'Question',
                name: 'What materials do you work with?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our current range covers brass, titanium, stainless steel, and aluminium. Each material is stated accurately in our specs — no coating described as solid metal, no plating described as pure.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: DistributorPage,
})

function DistributorPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      {/* placeholder — sections added in subsequent tasks */}
    </div>
  )
}
```

- [ ] **Step 2: Verify the route resolves**

```bash
npm run build
```

Expected: build passes, no type errors. The page is accessible at `/for-distributors` (returns 200).

- [ ] **Step 3: Commit**

```bash
git add src/routes/for-distributors.tsx
git commit -m "Add /for-distributors route with SEO head and JSON-LD schema"
```

---

### Task 2: Add header and hero section

**Files:**
- Modify: `src/routes/for-distributors.tsx`

- [ ] **Step 1: Replace the placeholder `DistributorPage` body with header + hero**

Replace the `DistributorPage` function body:

```tsx
function DistributorPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Minimal header */}
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <a href="/" aria-label="Wischos Gift — Home">
          <img
            src={cloudinaryUrl('/wischos-logo')}
            alt="Wischos Gift"
            style={{ height: '2rem', width: 'auto' }}
          />
        </a>
      </header>

      {/* Hero */}
      <section>
        <style>{`
          .dist-hero { display: grid; grid-template-columns: 1fr; }
          .dist-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .dist-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .dist-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .dist-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .dist-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .dist-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .dist-cta { display: inline-block; }
          }
        `}</style>
        <div className="dist-hero">
          <div className="dist-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              For Promotional Products Distributors &amp; Gifting Agencies
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '22ch' }}>
              Custom metal gift sets, built around your brief
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>
              Wischos is a China-based metal gift sourcing partner. Tell us what your client needs — recipient profile, budget range, quantity, branding — and we'll recommend set direction, materials, and packaging.
            </p>
            <a
              href="#inquiry-form"
              className="dist-cta"
              style={{
                background: '#B87333',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
              }}
            >
              Send Us a Brief →
            </a>
          </div>
          <img
            className="dist-hero-img"
            src={cloudinaryUrl('/products/WGS-008-4-The-Quartet/The-Quartet-cover', { w: 800 })}
            alt="The Quartet — Four-piece executive metal gift set"
          />
        </div>
      </section>

      {/* remaining sections added in subsequent tasks */}
      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#888' }}>
          © {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp; inquiries@wischosgift.com
        </p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>
          wischosgift.com
        </a>
      </footer>

    </div>
  )
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 3: Commit**

```bash
git add src/routes/for-distributors.tsx
git commit -m "Add header and hero to /for-distributors"
```

---

### Task 3: Add distributor trust points section

**Files:**
- Modify: `src/routes/for-distributors.tsx`

- [ ] **Step 1: Insert trust points section between hero and footer**

Add this block after the closing `</section>` of the hero and before the `<footer>`:

```tsx
      {/* Trust points */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '3rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              title: 'Your client relationship stays yours',
              body: "We don't contact your end clients directly. All communication goes through you. Quotes and spec sheets are yours to use in your own proposals.",
            },
            {
              title: 'Bring any brief',
              body: 'You can work with us across multiple client briefs. We treat each project separately and recommend the right direction per brief.',
            },
            {
              title: 'White-label as standard',
              body: "Wischos branding does not appear on products or packaging unless you request it. Every set leaves with your client's identity, not ours.",
            },
            {
              title: 'Sales materials included',
              body: 'Each quote comes with clear material specs, product dimensions, and imagery your team can use directly in client presentations.',
            },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>
                {item.title}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/for-distributors.tsx
git commit -m "Add distributor trust points to /for-distributors"
```

---

### Task 4: Add customization range and example sets sections

**Files:**
- Modify: `src/routes/for-distributors.tsx`

- [ ] **Step 1: Insert customization range section after trust points**

```tsx
      {/* Customization range */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Capability
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2.5rem', maxWidth: '28ch' }}>
          What you can offer your clients
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            {
              label: 'Materials',
              body: "Brass, titanium, stainless steel, aluminium — each stated clearly, no vague 'premium metal' language. Your client's procurement brief can quote the spec directly.",
            },
            {
              label: 'Price tiers',
              body: 'Entry programs for volume gifting, mid-tier for client retention, premium for executive recipients. FOB pricing is quoted per project based on quantity, configuration, and packaging.',
            },
            {
              label: 'Customization',
              body: 'Logo applied by laser engraving or screen print depending on material and surface. Packaging configuration, set composition, and component substitutions are all discussable.',
            },
            {
              label: 'Lead time',
              body: 'Normally 25–35 days after sample approval. Confirmed per project at inquiry stage — we don\'t publish lead times we can\'t commit to.',
            },
          ].map((item) => (
            <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 2: Insert example sets section after customization range**

```tsx
      {/* Example sets */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
            Examples
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.75rem' }}>
            What's possible — three directions
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>
            These sets illustrate the range of materials and price points we work across. Your client's program may look different — that's expected.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                image: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover',
                name: 'The Field EDC',
                sku: 'WGS-004',
                tagline: 'Stainless steel EDC carry set — for field teams, active professionals, and outdoor-adjacent gifting programs',
                href: '/gift-sets/wgs-004-3-the-field-edc',
              },
              {
                image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
                name: 'The Morning Ritual',
                sku: 'WGS-005',
                tagline: 'Titanium and brass — the highest material tier in our lineup, for executive and client gifting',
                href: '/gift-sets/wgs-005-3-the-morning-ritual',
              },
              {
                image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover',
                name: 'The Quartet',
                sku: 'WGS-008',
                tagline: 'Four-piece precision set in a magnetic rigid box — for executive programs that need a complete story',
                href: '/gift-sets/wgs-008-4-the-quartet',
              },
            ].map((set) => (
              <div key={set.sku}>
                <img
                  src={cloudinaryUrl(set.image, { w: 600 })}
                  alt={set.name}
                  style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0', marginBottom: '1rem' }}
                />
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>
                  {set.sku}
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{set.name}</p>
                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>{set.tagline}</p>
                <a href={set.href} style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
                  View set details →
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
            <a href="/gift-sets" style={{ fontSize: '0.85rem', color: '#0a0a0a', textDecoration: 'none', fontWeight: 500 }}>
              View full catalog →
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/routes/for-distributors.tsx
git commit -m "Add customization range and example sets to /for-distributors"
```

---

### Task 5: Add FAQ section and inquiry form

**Files:**
- Modify: `src/routes/for-distributors.tsx`

- [ ] **Step 1: Add the local Accordion component at the top of the file (before `DistributorPage`)**

Insert this function before `DistributorPage`:

```tsx
function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '1rem 0', textAlign: 'left', gap: '1rem',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{question}</span>
        <span style={{ fontSize: '1.2rem', color: '#B87333', flexShrink: 0, lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, paddingBottom: '1rem', margin: 0 }}>
          {answer}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Insert FAQ section before the inquiry form (after example sets section)**

```tsx
      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions
        </h2>
        {[
          {
            question: 'Do you white-label?',
            answer: "Yes. Wischos branding does not appear on products or packaging as standard. Every set ships with your client's identity — or unbranded, if preferred.",
          },
          {
            question: 'Can I bring briefs from multiple clients?',
            answer: 'Yes. We work with distributors across multiple client programs. Each brief is handled separately with its own recommendation, pricing, and production timeline.',
          },
          {
            question: 'What materials do you work with?',
            answer: 'Our current range covers brass, titanium, stainless steel, and aluminium. Each material is stated accurately in our specs — no coating described as solid metal, no plating described as pure.',
          },
        ].map((item) => (
          <Accordion key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
```

- [ ] **Step 3: Insert inquiry form section after FAQ**

```tsx
      {/* Inquiry form */}
      <section
        id="inquiry-form"
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}
      >
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>
            Send us a brief
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Tell us the recipient profile, quantity range, target budget, branding requirements, and delivery timeline. We'll recommend a set direction and advise on next steps within 1–2 business days.
          </p>
          <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.65, marginBottom: '0.5rem' }}>
            Prefer email?
          </p>
          <a
            href="mailto:inquiries@wischosgift.com"
            style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}
          >
            inquiries@wischosgift.com
          </a>
          <a
            href="https://www.linkedin.com/in/john-lui-4529a3102/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}
          >
            Connect on LinkedIn →
          </a>
        </div>
        <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <InquiryFormSection />
          </Suspense>
        </div>
      </section>
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: build passes, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/for-distributors.tsx
git commit -m "Add FAQ section and inquiry form to /for-distributors"
```

---

### Task 6: Add About page entry point

**Files:**
- Modify: `src/routes/{-$locale}/about.tsx`

- [ ] **Step 1: Insert distributor link before `<CtaSection />`**

In `src/routes/{-$locale}/about.tsx`, find this line:

```tsx
      <CtaSection />
```

Replace with:

```tsx
      <div style={{ borderTop: '1px solid var(--grid-color)', padding: '2rem', textAlign: 'center', background: '#fff' }}>
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7 }}>
          Working as a distributor or gifting agency?{' '}
          <a href="/for-distributors" style={{ color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
            See how we work with distribution partners →
          </a>
        </p>
      </div>
      <CtaSection />
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add "src/routes/{-\$locale}/about.tsx"
git commit -m "Add distributor page entry point to About page"
```

---

### Task 7: Final verification and deploy

**Files:** none

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: exits 0, no errors or warnings beyond known third-party `"use client"` notices.

- [ ] **Step 2: Verify gift set href slugs are correct**

Check that the three set hrefs used in Task 4 match the actual routes. Run:

```bash
grep -r "wgs-004\|wgs-005\|wgs-008" src/routes --include="*.tsx" -l
```

Confirm `$setId.tsx` matches those slugs by checking the gift set IDs in `src/content/giftSets.ts`:
- WGS-004 id should be `wgs-004-3-the-field-edc`
- WGS-005 id should be `wgs-005-3-the-morning-ritual`
- WGS-008 id should be `wgs-008-4-the-quartet`

If IDs differ, update the `href` values in the example sets array accordingly.

- [ ] **Step 3: Push and verify Vercel deployment**

```bash
git push
```

Expected: Vercel production deployment completes successfully. Visit `https://wischosgift.com/for-distributors` and verify:
- Page loads without errors
- Hero image (WGS-008) renders
- Three example set images render
- FAQ accordion opens and closes
- Inquiry form renders
- About page shows distributor link before CTA section
