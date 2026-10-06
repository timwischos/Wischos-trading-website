import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/canada')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for Canadian Distributors | PPPC | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for Canadian promotional products distributors and corporate buyers. Brass, titanium, stainless steel, aluminium. 25–35 day production, sea freight to Vancouver, Toronto, and Montreal. White-label production, no minimum fuss.',
      },
      {
        property: 'og:title',
        content: 'Custom Metal Gift Sets for Canadian Distributors | Wischos Gift',
      },
      {
        property: 'og:description',
        content:
          'Metal gift sets sourced from China for Canadian distributors and corporate buyers. White-label, PPPC-friendly, sea freight to Vancouver and Toronto.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/canada' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for Canada',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            areaServed: { '@type': 'Country', name: 'Canada' },
            description:
              'Custom metal gift sets for Canadian distributors and corporate buyers. White-label production, sea freight to Vancouver, Toronto, and Montreal.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Does Canada have a free trade agreement with China for metal gifts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Canada does not have a comprehensive FTA with China. Metal promotional products and gift sets import under Canada\'s MFN (Most Favoured Nation) tariff schedule. For most finished metal gift categories — writing instruments, desk accessories, drinkware, EDC tools — MFN rates are typically low to zero. We recommend confirming the applicable tariff line with your customs broker before committing to a program, and we can provide the HS codes we use on our commercial invoices.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does sea freight from China to Vancouver or Toronto take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'LCL sea freight from Shanghai or Ningbo to Vancouver takes 12–18 days. To Toronto or Montreal via Vancouver, add 5–10 days rail transit. Air express via DHL or FedEx reaches any Canadian city in 4–6 days but at a significantly higher cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you work with PPPC-affiliated Canadian distributors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We work with promotional products distributors across Canada, including those affiliated with PPPC (Promotional Products Professionals of Canada). We white-label all production — Wischos branding does not appear on products, packaging, or shipping documents. Your client relationship and margins remain yours.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you quote in CAD?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We quote FOB in USD as standard since production costs are USD-denominated. For landed cost estimates into Canadian ports, we can express the total in CAD at the prevailing spot rate. Payment is typically USD via T/T or Wise.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: CanadaMarketPage,
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

function CanadaMarketPage() {
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
          .ca-hero { display: grid; grid-template-columns: 1fr; }
          .ca-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .ca-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .ca-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ca-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ca-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .ca-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .ca-cta { display: inline-block; }
          }
        `}</style>
        <div className="ca-hero">
          <div className="ca-hero-text">
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '1rem',
              }}
            >
              For Canadian Distributors &amp; Corporate Buyers
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
              Custom metal gift sets for the Canadian market.
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
              Wischos is a China-based metal gift sourcing partner working with Canadian
              promotional products distributors and corporate procurement teams. Brass,
              titanium, stainless steel, and aluminium — white-label production,
              sea freight to Vancouver, Toronto, and Montreal, and full documentation
              support for Canadian customs clearance.
            </p>
            <a
              href="#inquiry-form"
              className="ca-cta"
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
              Request a Canada-Priced Quote →
            </a>
          </div>
          <img
            className="ca-hero-img"
            src={cloudinaryUrl('/products/WGS-008-4-The-Quartet/The-Quartet-cover', { w: 800 })}
            alt="The Quartet — Custom metal gift set for Canadian distributors"
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
              title: 'PPPC-compatible white-label production',
              body: 'Wischos branding does not appear on products, packaging, or shipping documents. Your client sees only their brand. We work seamlessly with PPPC-affiliated distributors.',
            },
            {
              title: '12–18 day sea freight to Vancouver',
              body: 'LCL sea freight from Shanghai or Ningbo to Vancouver is one of the shorter trans-Pacific routes. Onward rail to Toronto or Montreal adds 5–10 days.',
            },
            {
              title: 'Full customs documentation included',
              body: 'Commercial invoice, packing list, and HS code declaration structured to support smooth Canadian customs clearance. We work with your customs broker to ensure documentation is in order.',
            },
            {
              title: 'Overlapping business hours',
              body: 'China is 12–15 hours ahead of Canadian time zones. Inquiries sent by end of business day (EST) are typically answered within your next morning.',
            },
          ].map((item) => (
            <div key={item.title}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginBottom: '0.5rem',
                  color: '#0a0a0a',
                }}
              >
                {item.title}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Import duties — honest explanation */}
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
          Import Duties in Plain Language
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
          What Canadian import duties mean for your landed cost.
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          Canada does not have a comprehensive free trade agreement with China. Metal
          gift products import under Canada's MFN (Most Favoured Nation) tariff schedule.
          For most finished metal gift and promotional product categories — writing
          instruments, desk accessories, EDC tools, and drinkware — MFN rates
          on Chinese-origin goods are typically low.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          We provide the HS codes used on our commercial invoices for every product
          category so your customs broker can confirm the applicable duty rate for
          your program before you commit. Landed cost calculations including freight,
          customs duty, and Canadian GST/HST are available in formal quotations.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>
          Note: Canada introduced additional tariffs on certain Chinese goods beginning
          in 2024. These apply primarily to steel, aluminium, and electric vehicles.
          Finished promotional products and gift sets are generally not in the affected
          categories, but we recommend confirming with your customs broker on any new program.
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
            Indicative Landed Cost — 300 Brass Desk Gift Sets to Toronto
          </p>
          <table
            style={{
              width: '100%',
              fontSize: '0.88rem',
              color: '#333',
              borderCollapse: 'collapse',
            }}
          >
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>FOB Shanghai (300 × $28)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $8,400</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Vancouver + rail to Toronto</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $600</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>Canadian import duty (MFN — confirm with broker)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~0–7%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>HST (13% Ontario, recoverable by ITC-registered importers)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>recoverable</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Illustrative figures only. Duty rate depends on HS classification and product composition.
            Confirm applicable tariff line with your customs broker. We provide all HS codes on
            commercial invoices.
          </p>
        </div>
      </section>

      {/* Recommended sets */}
      <section
        style={{
          background: '#fafafa',
          borderTop: '1px solid #e5e5e5',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
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
            Popular With Canadian Buyers
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Sets that fit the Canadian gifting context.
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
            Canadian distributors run programs across finance, technology, natural resources,
            professional services, and healthcare. These sets fit common briefs — but every
            program can be customised to your client's specific quantity, budget, and branding.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover',
                name: 'The Quartet',
                sku: 'WGS-008',
                tagline:
                  'Four-piece executive set — brass pen, steel card case, aluminium device stand, titanium tea infuser cup. The highest-tier option in the lineup, suited to finance, law, and board-level gifting programs.',
                href: '/gift-sets/wgs-008-4-the-quartet',
              },
              {
                image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover',
                name: 'The Meeting Kit',
                sku: 'WGS-009',
                tagline:
                  'Three-piece meeting set — aluminium ring binder notebook, brass rollerball, steel card case. Built for sales and BD teams, consulting and law firms, and client-facing professional services roles.',
                href: '/gift-sets/wgs-009-3-the-meeting-kit',
              },
              {
                image: '/products/WGS-006-3-The-First-Day/The-First-Day-cover',
                name: 'The First Day',
                sku: 'WGS-006',
                tagline:
                  'Three-piece onboarding set — RFID badge holder, 6-in-1 tool pen, aluminium pen holder. Purpose-built for new hire welcome kits in technology, financial services, and large enterprise programs.',
                href: '/gift-sets/wgs-006-3-the-first-day',
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
                <p
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#888',
                    marginBottom: '0.25rem',
                  }}
                >
                  {set.sku}
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                  {set.name}
                </p>
                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {set.tagline}
                </p>
                <a
                  href={set.href}
                  style={{
                    fontSize: '0.8rem',
                    color: '#B87333',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  View set details →
                </a>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e5e5',
            }}
          >
            <a
              href="/gift-sets"
              style={{
                fontSize: '0.85rem',
                color: '#0a0a0a',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              View full catalog →
            </a>
          </div>
        </div>
      </section>

      {/* Shipping & timing */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '1rem',
          }}
        >
          Shipping &amp; Timing to Canada
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: '2.5rem',
            maxWidth: '32ch',
          }}
        >
          How a typical Canadian program runs.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {[
            {
              label: 'Stage 1 — Sample',
              body: 'After brief confirmation, custom samples take 7–10 working days. Couriered to Canada via DHL/FedEx in 4–6 days.',
            },
            {
              label: 'Stage 2 — Production',
              body: '25–35 days from sample approval and deposit receipt. Includes logo application, packaging assembly, and pre-shipment QC.',
            },
            {
              label: 'Stage 3 — Sea Freight',
              body: '12–18 days LCL from Shanghai/Ningbo to Vancouver. Add 5–10 days for rail transit to Toronto or Montreal, plus customs clearance.',
            },
            {
              label: 'Stage 4 — Delivery',
              body: 'Inland delivery via your nominated freight forwarder. Typical total: 7–9 weeks from order confirmation to your door.',
            },
          ].map((item) => (
            <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginBottom: '0.5rem',
                  color: '#0a0a0a',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 3rem' }}>
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 300,
            marginBottom: '2rem',
          }}
        >
          Common questions from Canadian distributors
        </h2>
        {[
          {
            question: 'Does Canada have a free trade agreement with China?',
            answer:
              'Canada does not have a comprehensive FTA with China. Metal gift products import under Canada\'s MFN tariff schedule. For most finished promotional product categories — writing instruments, desk accessories, EDC tools, and drinkware — MFN rates are typically low. We provide HS codes on every invoice so your customs broker can confirm the applicable rate.',
          },
          {
            question: 'How long does sea freight from China to Vancouver or Toronto take?',
            answer:
              'LCL sea freight from Shanghai or Ningbo to Vancouver takes 12–18 days. To Toronto or Montreal via Vancouver, add 5–10 days rail transit plus customs clearance. Air express via DHL/FedEx reaches any Canadian city in 4–6 days.',
          },
          {
            question: 'Do you work with PPPC-affiliated distributors?',
            answer:
              'Yes. We work with promotional products distributors across Canada, including those affiliated with PPPC. We white-label all production — Wischos branding does not appear on products, packaging, or shipping documents. Your client relationship and margins remain yours.',
          },
          {
            question: 'Can you quote in CAD?',
            answer:
              'We quote FOB in USD as standard. For landed cost estimates into Canadian ports we can express the total in CAD at the prevailing spot rate. Payment is typically received in USD via T/T or Wise; CAD payments can be discussed on request.',
          },
          {
            question: 'How is Canadian GST/HST handled?',
            answer:
              'Canadian GST or HST applies at the point of import and is generally recoverable via input tax credits for GST/HST-registered importers. We provide commercial invoices and packing lists structured to support smooth customs valuation. Your customs broker or tax adviser can confirm the treatment for your specific program.',
          },
          {
            question: 'Do the 2024 Canadian tariffs on Chinese goods affect metal gifts?',
            answer:
              'Canada introduced additional tariffs in 2024 targeting specific categories including steel, aluminium semi-finished products, and electric vehicles. Finished promotional products and branded gift sets — the categories we supply — are generally not in the affected tariff lines. We recommend confirming with your customs broker, and we provide HS codes on every invoice to make that check straightforward.',
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
          <h2
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            Request a Canada-priced quote
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Tell us the recipient profile, quantity range, target budget, branding
            requirements, and delivery timeline. We respond within 1–2 business days with a
            set direction, sample path, and indicative landed cost into your nominated
            Canadian port.
          </p>
          <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.65, marginBottom: '0.5rem' }}>
            Prefer email?
          </p>
          <a
            href="mailto:johnlui@wischosgift.com"
            style={{
              fontSize: '0.85rem',
              color: '#B87333',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            johnlui@wischosgift.com
          </a>
          <a
            href="https://www.linkedin.com/in/john-lui-4529a3102/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8rem',
              color: '#B87333',
              textDecoration: 'none',
              fontWeight: 500,
            }}
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
        <a
          href="https://wischosgift.com"
          style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}
        >
          wischosgift.com
        </a>
      </footer>
    </div>
  )
}
