import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/australia')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for Australian Distributors | ChAFTA Duty-Free | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for Australian promotional products distributors and corporate buyers. ChAFTA Certificate of Origin included — duty-free entry on qualifying goods. Brass, titanium, stainless steel, aluminium. 25–35 day production, 18–25 day sea freight to Sydney and Melbourne.',
      },
      {
        property: 'og:title',
        content: 'Custom Metal Gift Sets for Australian Distributors | Wischos Gift',
      },
      {
        property: 'og:description',
        content:
          'ChAFTA duty-free metal gift sets sourced from China for Australian distributors and corporate buyers.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/australia' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for Australia',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            areaServed: { '@type': 'Country', name: 'Australia' },
            description:
              'Custom metal gift sets for Australian distributors and corporate buyers. ChAFTA Certificate of Origin included for duty-free entry on qualifying goods.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you provide ChAFTA Certificates of Origin for Australian shipments?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We arrange the ChAFTA Certificate of Origin through CCPIT or Chinese Customs for every qualifying shipment to Australia. This is what enables your goods to enter Australia duty-free on tariff lines covered by the agreement. The certificate is included in your standard shipping documents at no additional charge.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does sea freight from China to Sydney or Melbourne take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Standard LCL (less-than-container-load) sea freight from Shanghai or Ningbo to Sydney and Melbourne takes 18–25 days door-to-port. Add 5–7 days for inland delivery and customs clearance. For urgent shipments, air express via DHL/FedEx takes 4–6 days but costs significantly more.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the typical MOQ for Australian distributors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Minimum order quantity is 100 pieces per SKU for most metal gift items. Branded gift sets typically start at 50–100 sets depending on the configuration. We work with both volume programs and smaller premium gifting briefs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you work with Promodata-listed Australian distributors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We work with promotional products distributors across Australia, including those listed on Promodata, Brandengine, and APPA-affiliated networks. We white-label all production so your client relationships and brand remain yours.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: AustraliaMarketPage,
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

function AustraliaMarketPage() {
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
          .au-hero { display: grid; grid-template-columns: 1fr; }
          .au-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .au-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .au-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .au-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .au-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .au-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .au-cta { display: inline-block; }
          }
        `}</style>
        <div className="au-hero">
          <div className="au-hero-text">
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '1rem',
              }}
            >
              For Australian Distributors &amp; Corporate Buyers
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
              Custom metal gift sets, shipped duty-free under ChAFTA.
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
              Wischos is a China-based metal gift sourcing partner working with Australian
              promotional products distributors and corporate procurement teams. Across
              the metal family — brass, titanium, stainless steel, aluminium, and
              beyond — produced in China, cleared duty-free into Australia under the
              China-Australia Free Trade Agreement on qualifying tariff lines.
            </p>
            <a
              href="#inquiry-form"
              className="au-cta"
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
              Request an Australia-Priced Quote →
            </a>
          </div>
          <img
            className="au-hero-img"
            src={cloudinaryUrl('/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover', { w: 800 })}
            alt="The Field EDC — Custom stainless steel gift set for Australian distributors"
          />
        </div>
      </section>

      {/* Trust points — Australia-specific advantages */}
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
              title: 'ChAFTA Certificate of Origin included',
              body: 'Every qualifying shipment to Australia ships with a ChAFTA Certificate of Origin so your goods enter duty-free on covered tariff lines. We handle the documentation through CCPIT or Chinese Customs.',
            },
            {
              title: '18–25 day sea freight to Sydney & Melbourne',
              body: 'LCL sea freight from Shanghai or Ningbo to Sydney, Melbourne, Brisbane, and Fremantle is reliable and predictable. Air express available for urgent programs.',
            },
            {
              title: 'White-label, your brand only',
              body: 'Wischos branding does not appear on products or packaging. Your client receives the goods with their identity — no third-party supplier visibility.',
            },
            {
              title: 'AU-friendly working hours',
              body: 'China is 2–3 hours behind Sydney. Inquiries received during your business day are typically answered the same day or next morning your time.',
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

      {/* ChAFTA explained */}
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
          ChAFTA in Plain Language
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            maxWidth: '32ch',
          }}
        >
          What the China-Australia FTA means for your landed cost.
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          The China-Australia Free Trade Agreement (ChAFTA) entered into force in December
          2015. As of 1 January 2019, Australia eliminated tariffs on essentially all
          Chinese manufactured goods, including metal gift products and finished gift sets.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          For Australian distributors and corporate buyers, this means that on qualifying
          tariff lines, your landed cost contains <strong>zero import duty</strong> —
          provided the shipment is accompanied by a valid ChAFTA Certificate of Origin
          issued in China.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>
          We arrange this certificate as standard on every Australian shipment. The cost is
          included; the process adds 1–3 working days to outbound documentation. We do not
          surcharge for ChAFTA paperwork.
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
            Indicative Landed Cost — 500 Brass Daily Carry Sets
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
                <td style={{ padding: '0.5rem 0' }}>FOB Shanghai (500 × $24)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $12,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Sydney</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $480</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0' }}>Australian GST (10%, recoverable)</td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~AUD $1,940</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={{ padding: '0.5rem 0', color: '#B87333', fontWeight: 600 }}>
                  Import duty (ChAFTA covered)
                </td>
                <td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#B87333', fontWeight: 600 }}>
                  AUD $0
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Illustrative figures only. Final landed cost depends on HS classification,
            quantity, exact destination port, and current freight rates. We provide
            line-by-line landed cost in formal quotations.
          </p>
        </div>
      </section>

      {/* Recommended sets for Australian programs */}
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
            Popular With Australian Buyers
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Sets that fit the Australian gifting context.
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
            Australian distributors run programs across mining, finance, agriculture,
            technology, and professional services. These sets fit common briefs — but every
            program can be customised to your client's specific quantity, budget, and
            branding.
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
                image: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover',
                name: 'The Field EDC',
                sku: 'WGS-004',
                tagline:
                  'Stainless steel EDC carry set. Suited to mining, resources, field services, and outdoor-adjacent corporate programs common in WA and QLD.',
                href: '/gift-sets/wgs-004-3-the-field-edc',
              },
              {
                image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
                name: 'The Morning Ritual',
                sku: 'WGS-005',
                tagline:
                  'Titanium bottle, titanium keychain, and brass pen. The highest material tier in our lineup — for executive gifting in finance, law, and professional services.',
                href: '/gift-sets/wgs-005-3-the-morning-ritual',
              },
              {
                image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover',
                name: 'The Meeting Kit',
                sku: 'WGS-009',
                tagline:
                  'Three-piece meeting set — aluminium ring binder notebook, brass rollerball, steel card case. Built for sales and BD teams, consulting and law firms, and client-facing roles common to Sydney and Melbourne professional services.',
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
          Shipping &amp; Timing to Australia
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
          How a typical Australian program runs.
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
              body: 'After brief confirmation, custom samples take 7–10 working days. Couriered to Australia via DHL/FedEx in 4–6 days.',
            },
            {
              label: 'Stage 2 — Production',
              body: '25–35 days from sample approval and deposit receipt. Includes logo application (laser engraving or screen print), packaging assembly, and pre-shipment QC.',
            },
            {
              label: 'Stage 3 — Sea Freight',
              body: '18–25 days LCL from Shanghai/Ningbo to Sydney, Melbourne, Brisbane, or Fremantle. Customs clearance with ChAFTA Certificate of Origin.',
            },
            {
              label: 'Stage 4 — Delivery',
              body: 'Inland delivery via your nominated freight forwarder, or arranged by us. Typical total: 8–10 weeks from order confirmation.',
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
          Common questions from Australian distributors
        </h2>
        {[
          {
            question: 'Do you provide ChAFTA Certificates of Origin?',
            answer:
              'Yes. We arrange the ChAFTA Certificate of Origin through CCPIT or Chinese Customs for every qualifying shipment to Australia. This is what enables your goods to enter Australia duty-free on tariff lines covered by the agreement. The certificate is included in your standard shipping documents at no additional charge.',
          },
          {
            question: 'How long does sea freight from China to Sydney or Melbourne take?',
            answer:
              'Standard LCL (less-than-container-load) sea freight from Shanghai or Ningbo to Sydney and Melbourne takes 18–25 days door-to-port. Add 5–7 days for inland delivery and customs clearance. For urgent shipments, air express via DHL/FedEx takes 4–6 days but costs significantly more.',
          },
          {
            question: 'What is the typical MOQ for Australian distributors?',
            answer:
              'Minimum order quantity is 100 pieces per SKU for most metal gift items. Branded gift sets typically start at 50–100 sets depending on the configuration. We work with both volume programs and smaller premium gifting briefs.',
          },
          {
            question: 'Do you work with Promodata-listed Australian distributors?',
            answer:
              'Yes. We work with promotional products distributors across Australia, including those listed on Promodata, Brandengine, and APPA-affiliated networks. We white-label all production so your client relationships and brand remain yours.',
          },
          {
            question: 'Can you quote in AUD, or only USD?',
            answer:
              'We quote FOB in USD as standard since production costs are USD-denominated. For DDP (delivered duty paid) quotations to Australian ports we can express the total in AUD at the prevailing spot rate, or hold a quoted AUD rate for a defined acceptance window. Payment is typically received in USD via T/T or Wise; AUD payments can be accepted on request.',
          },
          {
            question: 'How are GST and other Australian taxes handled?',
            answer:
              'ChAFTA covers import duty, not GST. Australian GST (10%) applies on the customs value at the point of entry and is generally recoverable by GST-registered importers. We provide commercial invoices and packing lists structured to support smooth customs valuation and GST recovery by your nominated importer of record.',
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
            Request an Australia-priced quote
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Tell us the recipient profile, quantity range, target budget, branding
            requirements, and delivery timeline. We respond within 1–2 business days with a
            set direction, sample path, and indicative landed cost into your nominated
            Australian port.
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
