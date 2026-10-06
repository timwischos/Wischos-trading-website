import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/uk')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for UK Distributors | BPMA | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for UK promotional merchandise distributors and corporate buyers. Brass, titanium, stainless steel, aluminium. 25–35 day production, sea freight to Felixstowe and Southampton. White-label production, BPMA-compatible.',
      },
      {
        property: 'og:title',
        content: 'Custom Metal Gift Sets for UK Distributors | Wischos Gift',
      },
      {
        property: 'og:description',
        content:
          'Metal gift sets sourced from China for UK distributors and corporate buyers. White-label, BPMA-compatible, sea freight to Felixstowe and Southampton.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/uk' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for the United Kingdom',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            areaServed: { '@type': 'Country', name: 'United Kingdom' },
            description:
              'Custom metal gift sets for UK distributors and corporate buyers. White-label production, sea freight to Felixstowe and Southampton, BPMA-compatible.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the import duties on metal gifts from China to the UK?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Since Brexit, the UK operates its own Global Tariff (UKGT) schedule independent of the EU. For most finished metal gift and promotional merchandise categories — writing instruments, desk accessories, EDC tools, drinkware — UKGT rates on Chinese-origin goods are typically 0–4%. We provide the HS codes on every commercial invoice so your customs broker can confirm the applicable rate for your specific program.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does sea freight from China to the UK take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'LCL sea freight from Shanghai or Ningbo to Felixstowe or Southampton typically takes 25–28 days. Inland delivery via your nominated freight forwarder adds 1–3 days. Air express via DHL or FedEx reaches any UK address in 4–6 days for urgent programs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you work with BPMA-affiliated UK distributors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We work with promotional merchandise distributors across the UK, including those affiliated with BPMA (British Promotional Merchandise Association). We white-label all production — Wischos branding does not appear on products, packaging, or shipping documents. Your client relationship and margins remain yours.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you quote in GBP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We quote FOB in USD as standard since production costs are USD-denominated. For landed cost estimates into UK ports we can express the total in GBP at the prevailing spot rate. Payment is typically USD via T/T or Wise.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: UKMarketPage,
})

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1rem 0',
          textAlign: 'left',
          gap: '1rem',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>
          {question}
        </span>
        <span style={{ fontSize: '1.2rem', color: '#B87333', flexShrink: 0, lineHeight: 1 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, paddingBottom: '1rem', margin: 0 }}>
          {answer}
        </p>
      )}
    </div>
  )
}

function UKMarketPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      {/* Minimal header */}
      <header
        style={{
          borderBottom: '1px solid #e5e5e5',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
          .uk-hero { display: grid; grid-template-columns: 1fr; }
          .uk-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .uk-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .uk-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .uk-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .uk-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .uk-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .uk-cta { display: inline-block; }
          }
        `}</style>
        <div className="uk-hero">
          <div className="uk-hero-text">
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '1rem',
              }}
            >
              For UK Distributors &amp; Corporate Buyers
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                maxWidth: '22ch',
              }}
            >
              Custom metal gift sets for the UK market.
            </h1>
            <p
              style={{
                fontSize: '1.05rem',
                color: '#4a4a4a',
                lineHeight: 1.7,
                maxWidth: '52ch',
                marginBottom: '2rem',
              }}
            >
              Wischos is a China-based metal gift sourcing partner working with UK
              promotional merchandise distributors and corporate procurement teams. Brass,
              titanium, stainless steel, and aluminium — white-label production,
              sea freight to Felixstowe and Southampton, and full documentation
              support for UK customs clearance.
            </p>
            <a
              href="#inquiry-form"
              className="uk-cta"
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
              Request a UK-Priced Quote →
            </a>
          </div>
          <img
            className="uk-hero-img"
            src={cloudinaryUrl('/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover', { w: 800 })}
            alt="The Thinking Desk — Custom metal gift set for UK distributors"
          />
        </div>
      </section>

      {/* Trust points */}
      <section
        style={{
          borderTop: '1px solid #e5e5e5',
          borderBottom: '1px solid #e5e5e5',
          background: '#fafafa',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '3rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            {
              title: 'BPMA-compatible white-label production',
              body: 'Wischos branding does not appear on products, packaging, or shipping documents. Your client sees only their brand. We work with BPMA-affiliated distributors and independent UK merchandise houses.',
            },
            {
              title: '25–28 day sea freight to Felixstowe',
              body: 'LCL sea freight from Shanghai or Ningbo to Felixstowe or Southampton is reliable and well-served. Inland delivery to any UK address via your nominated forwarder or arranged by us.',
            },
            {
              title: 'Full UK customs documentation included',
              body: 'Commercial invoice, packing list, and HS code declaration structured to support smooth UK customs clearance. We work with your customs broker to ensure documentation is complete and correct.',
            },
            {
              title: 'Overlapping business hours',
              body: 'China is 7–8 hours ahead of UK time (GMT/BST). Inquiries sent by midday UK time typically receive a same-day or next-morning response.',
            },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>
                {item.title}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Import duties */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '1rem',
          }}
        >
          UK Import Duties in Plain Language
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            maxWidth: '36ch',
          }}
        >
          What post-Brexit UK tariffs mean for your landed cost.
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          Since leaving the EU, the UK operates its own Global Tariff (UKGT) schedule.
          For most finished metal gift and promotional merchandise categories — writing
          instruments, desk accessories, EDC tools, and drinkware — UKGT rates on
          Chinese-origin goods are typically 0–4%. The UK does not have a preferential
          FTA with China.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          We provide the HS codes used on our commercial invoices for every product
          category so your customs broker can confirm the applicable UKGT rate before
          you commit to a program. Landed cost calculations including freight, duty,
          and UK VAT are available in formal quotations.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>
          UK VAT (currently 20%) applies at import and is recoverable by
          VAT-registered importers via their VAT return. We structure commercial
          invoices and packing lists to support accurate customs valuation and
          smooth VAT reclaim.
        </p>

        {/* Landed cost example */}
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #e5e5e5',
            padding: '1.75rem',
            marginBottom: '2rem',
          }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: '0.75rem',
            }}
          >
            Indicative Landed Cost — 200 Executive Brass Sets to London
          </p>
          <table style={{ width: '100%', fontSize: '0.88rem', color: '#333', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>FOB Shanghai (200 × $44)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $8,800</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Felixstowe</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $420</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>UK import duty (UKGT — confirm with broker)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~0–4%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>UK VAT 20% (recoverable by VAT-registered importers)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>recoverable</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Illustrative figures only. Duty rate depends on HS classification and product composition.
            Confirm applicable UKGT rate with your customs broker. We provide all HS codes on
            commercial invoices.
          </p>
        </div>
      </section>

      {/* Recommended sets */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: '1rem',
            }}
          >
            Popular With UK Buyers
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Sets that fit the UK gifting context.
          </h2>
          <p
            style={{
              fontSize: '0.88rem',
              color: '#666',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              maxWidth: '56ch',
            }}
          >
            UK distributors run programs across financial services, professional services,
            technology, legal, and management consulting. These sets fit common briefs — but
            every program can be customised to your client's specific quantity, budget, and branding.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                image: '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover',
                name: 'The Thinking Desk',
                sku: 'WGS-007',
                tagline:
                  'Three-piece desk set — brass spinning top, brass place card holder, brass inkless pen. A considered desk gift for finance, law, and consulting clients who value craftsmanship over novelty.',
                href: '/gift-sets/wgs-007-3-the-thinking-desk',
              },
              {
                image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover',
                name: 'The Quartet',
                sku: 'WGS-008',
                tagline:
                  'Four-piece executive set — brass pen, steel card case, aluminium device stand, titanium tea infuser cup. The highest-tier option in the lineup, suited to partner gifts and board-level recognition programs.',
                href: '/gift-sets/wgs-008-4-the-quartet',
              },
              {
                image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover',
                name: 'The Meeting Kit',
                sku: 'WGS-009',
                tagline:
                  'Three-piece meeting set — aluminium ring binder notebook, brass rollerball, steel card case. Built for client-facing roles in professional services, management consulting, and London financial services.',
                href: '/gift-sets/wgs-009-3-the-meeting-kit',
              },
            ].map((set) => (
              <div key={set.sku}>
                <img
                  src={cloudinaryUrl(set.image, { w: 600 })}
                  alt={set.name}
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    display: 'block',
                    background: '#f0f0f0',
                    marginBottom: '1rem',
                  }}
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

      {/* Shipping & timing */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Shipping &amp; Timing to the UK
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '32ch' }}>
          How a typical UK program runs.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            {
              label: 'Stage 1 — Sample',
              body: 'After brief confirmation, custom samples take 7–10 working days. Couriered to the UK via DHL/FedEx in 3–5 days.',
            },
            {
              label: 'Stage 2 — Production',
              body: '25–35 days from sample approval and deposit receipt. Includes logo application, packaging assembly, and pre-shipment QC.',
            },
            {
              label: 'Stage 3 — Sea Freight',
              body: '25–28 days LCL from Shanghai/Ningbo to Felixstowe or Southampton. UK customs clearance with full UKGT documentation.',
            },
            {
              label: 'Stage 4 — Delivery',
              body: 'Inland delivery via your nominated freight forwarder. Typical total: 9–11 weeks from order confirmation to your door.',
            },
          ].map((item) => (
            <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.label}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions from UK distributors
        </h2>
        {[
          {
            question: 'What import duties apply to metal gifts from China to the UK?',
            answer:
              'The UK operates its own Global Tariff (UKGT) since Brexit. For most finished metal gift and promotional merchandise categories — writing instruments, desk accessories, EDC tools, and drinkware — UKGT rates on Chinese-origin goods are typically 0–4%. We provide HS codes on every invoice so your customs broker can confirm the applicable rate.',
          },
          {
            question: 'How long does sea freight from China to the UK take?',
            answer:
              'LCL sea freight from Shanghai or Ningbo to Felixstowe or Southampton typically takes 25–28 days. Inland delivery to any UK address via your nominated forwarder adds 1–3 days. Air express via DHL/FedEx reaches any UK address in 3–5 days for urgent programs.',
          },
          {
            question: 'Do you work with BPMA-affiliated distributors?',
            answer:
              'Yes. We work with promotional merchandise distributors across the UK, including those affiliated with BPMA. We white-label all production — Wischos branding does not appear on products, packaging, or shipping documents.',
          },
          {
            question: 'Can you quote in GBP?',
            answer:
              'We quote FOB in USD as standard. For landed cost estimates into UK ports we can express the total in GBP at the prevailing spot rate. Payment is typically USD via T/T or Wise.',
          },
          {
            question: 'How is UK VAT handled on imports from China?',
            answer:
              'UK VAT (currently 20%) applies at import and is recoverable by VAT-registered importers via their VAT return. We provide commercial invoices and packing lists structured to support accurate customs valuation and smooth VAT reclaim.',
          },
          {
            question: 'Do you ship to the Republic of Ireland as well?',
            answer:
              'Yes. Ireland is a separate customs territory (EU member). Shipments to Ireland import under EU tariff schedules, with Ireland-specific documentation. If you are serving Irish clients, let us know and we will quote and document accordingly.',
          },
        ].map((item) => (
          <Accordion key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>

      {/* Inquiry form */}
      <section
        id="inquiry-form"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '3rem 2rem 5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>
            Request a UK-priced quote
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Tell us the recipient profile, quantity range, target budget, branding
            requirements, and delivery timeline. We respond within 1–2 business days with a
            set direction, sample path, and indicative landed cost into Felixstowe or Southampton.
          </p>
          <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.65, marginBottom: '0.5rem' }}>
            Prefer email?
          </p>
          <a
            href="mailto:johnlui@wischosgift.com"
            style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}
          >
            johnlui@wischosgift.com
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

      <footer
        style={{
          borderTop: '1px solid #e5e5e5',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <p style={{ fontSize: '0.72rem', color: '#888' }}>
          © {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp;
          johnlui@wischosgift.com
        </p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>
          wischosgift.com
        </a>
      </footer>
    </div>
  )
}
