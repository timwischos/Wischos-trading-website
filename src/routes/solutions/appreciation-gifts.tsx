import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/solutions/appreciation-gifts')({
  head: () => ({
    meta: [
      { title: 'Employee & Client Appreciation Gifts in Solid Metal | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal appreciation gifts your employees and clients will actually keep. Logo-engraved, gift-boxed, from 100 sets. Samples in 7–10 business days.',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Employee & Client Appreciation Gift Sets',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            description:
              'Custom metal appreciation gifts your employees and clients will actually keep. Logo-engraved, gift-boxed, from 100 sets.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "What's the minimum order for appreciation gifts?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our standard minimum is 100 sets. For smaller programmes or single products, get in touch and we'll advise.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can we order different sets for employees and clients?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Each set has its own minimum quantity. Tell us your planned split — for example, 150 employee sets and 80 client sets — and we will confirm what is workable.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can individual names be engraved on each piece?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, per-piece personalisation is available on most items. We handle the engraving file per recipient. There is an additional setup cost; ask us for a quote when you send your brief.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I see a sample before ordering?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We can send up to 5 reference sets (you cover shipping). Custom samples with your logo are quoted per project, and the fee is credited against your bulk order.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far ahead do I need to order?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Allow 6–8 weeks from brief to delivery for standard orders. For year-end gifting programmes, we recommend placing the order by late October to avoid peak-season delays.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which countries do you deliver to?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We regularly ship to Australia, New Zealand, Singapore, the UAE, Canada and the UK, and can deliver worldwide.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: AppreciationGiftsPage,
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

function AppreciationGiftsPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Hero */}
      <section>
        <style>{`
          .ap-sol-hero { display: grid; grid-template-columns: 1fr; }
          .ap-sol-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .ap-sol-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .ap-sol-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ap-sol-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ap-sol-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; }
            .ap-sol-text { order: 1; padding: 4rem 2rem 3rem; }
            .ap-sol-cta { display: inline-block; }
          }
        `}</style>
        <div className="ap-sol-hero">
          <div className="ap-sol-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Corporate Gifting · Employee & Client Appreciation
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '20ch' }}>
              Appreciation gifts they will actually use
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>
              Recognition lands differently when the gift has weight to it. Solid metal sets — engraved with your logo — stay on desks, in bags and in pockets long after the moment has passed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a
                href="#inquiry-form"
                className="ap-sol-cta"
                style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}
              >
                Request a Quote →
              </a>
              <a
                href="#sets"
                className="ap-sol-cta"
                style={{ background: 'none', color: '#0a0a0a', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none', border: '1px solid #0a0a0a' }}
              >
                Browse the Sets ↓
              </a>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6 }}>
              From 100 sets · Logo on every piece · Samples in 7–10 business days
            </p>
          </div>
          <img
            className="ap-sol-img"
            src={cloudinaryUrl('/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', { w: 800 })}
            alt="The Morning Ritual — Custom Corporate Appreciation Gift Set"
          />
        </div>
      </section>

      {/* Why metal */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
            Why Metal
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2rem', maxWidth: '30ch' }}>
            The gift is only as good as how long it lasts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Substance over novelty',
                body: 'Aluminium, brass and titanium hold their look for years. There is no coating to chip, no hinge to break, no plastic to discolour.',
              },
              {
                title: 'Used every day',
                body: 'Every item in a Wischos set is something people reach for: a pen, a bottle, a card case. Nothing decorative that gets moved to a drawer.',
              },
              {
                title: 'Your brand, done quietly',
                body: 'Laser engraving is permanent and understated — so recipients are happy to use it in front of clients and colleagues, not just in the office.',
              },
              {
                title: 'Presented as a whole',
                body: 'Each set ships in a branded gift box. The packaging matches the quality of the contents and carries your mark consistently.',
              },
            ].map((item) => (
              <div key={item.title} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
                <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sets */}
      <section id="sets" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Appreciation Sets
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.75rem' }}>
          Ready-made starting points
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>
          Any set can be adjusted or assembled from our full product range.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            {
              image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
              sku: 'WGS-005',
              name: 'The Morning Ritual',
              tagline: 'Brass pen, titanium bottle, titanium carabiner. Premium appreciation in brass and titanium.',
              bestFor: 'Senior employees, long-service recognition, key client relationships',
              href: '/gift-sets/wgs-005-3-the-morning-ritual',
            },
            {
              image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover',
              sku: 'WGS-008',
              name: 'The Quartet',
              tagline: 'Four-piece set covering desk, pocket and drinkware. Broad coverage, clear intent.',
              bestFor: 'Year-end staff gifting programmes, client retention gifts, team milestones',
              href: '/gift-sets/wgs-008-4-the-quartet',
            },
            {
              image: '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover',
              sku: 'WGS-007',
              name: 'The Thinking Desk',
              tagline: 'Solid brass pen, aluminium desk tray, stainless steel letter opener. For desk-based roles.',
              bestFor: 'Finance, legal and operations teams; partners and advisors',
              href: '/gift-sets/wgs-007-3-the-thinking-desk',
            },
            {
              image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover',
              sku: 'WGS-009',
              name: 'The Meeting Kit',
              tagline: 'Anodised aluminium notebook, brass rollerball, stainless steel business card case.',
              bestFor: 'Client-facing teams, sales and BD roles, new business relationships',
              href: '/gift-sets/wgs-009-3-the-meeting-kit',
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
              <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.5rem' }}>{set.tagline}</p>
              <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#0a0a0a' }}>Best for:</strong> {set.bestFor}
              </p>
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
      </section>

      {/* Customisation */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
            Make It Yours
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2rem', maxWidth: '28ch' }}>
            Your mark on every piece
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                label: 'Logo on every piece',
                body: 'Laser engraving (permanent, monochrome) or UV colour printing, depending on material and surface.',
              },
              {
                label: 'Per-recipient engraving',
                body: 'Individual names or initials on each item. We handle the engraving file per recipient. Ask for a quote when you send your brief.',
              },
              {
                label: 'Branded box',
                body: 'Hot foil stamping or blind debossing on the lid. Rigid gift boxes, drawer boxes, and custom inserts available.',
              },
              {
                label: 'Sample first',
                body: 'Logo placement, size and method are confirmed on a physical sample before production starts.',
              },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.label}</p>
                <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Planning
        </p>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '0.75rem' }}>
          Plan around your gifting calendar
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2rem' }}>
          For year-end programmes, the order needs to be placed by late October. For ongoing recognition — service awards, client gifts — a standing order approach avoids last-minute lead-time pressure.
        </p>
        {[
          { step: 'Brief & quotation', timing: '1–3 days' },
          { step: 'Custom sample with your logo', timing: '7–10 business days' },
          { step: 'Production after sample approval', timing: '25–35 days' },
          { step: 'Delivery', timing: '5–10 days air · 10–28 days sea' },
        ].map((row, i) => (
          <div
            key={i}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e5e5', gap: '2rem' }}
          >
            <span style={{ fontSize: '0.88rem', color: '#0a0a0a' }}>{row.step}</span>
            <span style={{ fontSize: '0.88rem', color: '#555', whiteSpace: 'nowrap' }}>{row.timing}</span>
          </div>
        ))}
        <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, marginTop: '1.25rem' }}>
          For large year-end programmes, contact us by the end of October to confirm availability.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions
        </h2>
        {[
          {
            question: "What's the minimum order for appreciation gifts?",
            answer: "Our standard minimum is 100 sets. For smaller programmes or single products, get in touch and we'll advise.",
          },
          {
            question: 'Can we order different sets for employees and clients?',
            answer: "Yes. Each set has its own minimum quantity. Tell us your planned split — for example, 150 employee sets and 80 client sets — and we'll confirm what's workable.",
          },
          {
            question: 'Can individual names be engraved on each piece?',
            answer: 'Yes, per-piece personalisation is available on most items. We handle the engraving file per recipient. There is an additional setup cost; ask us for a quote when you send your brief.',
          },
          {
            question: 'Can I see a sample before ordering?',
            answer: 'Yes. We can send up to 5 reference sets (you cover shipping). Custom samples with your logo are quoted per project, and the fee is credited against your bulk order.',
          },
          {
            question: 'How far ahead do I need to order?',
            answer: 'Allow 6–8 weeks from brief to delivery for standard orders. For year-end gifting programmes, we recommend placing the order by late October to avoid peak-season delays.',
          },
          {
            question: 'Which countries do you deliver to?',
            answer: 'We regularly ship to Australia, New Zealand, Singapore, the UAE, Canada and the UK, and can deliver worldwide. See our duty and shipping page for details.',
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
            Tell us about your programme
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Share your quantity, timing and logo. We will recommend a set and send a quotation within 1–2 business days.
          </p>
          <a
            href="mailto:johnlui@wischosgift.com"
            style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}
          >
            johnlui@wischosgift.com
          </a>
          <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6, paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
            Buying on behalf of a client?{' '}
            <a href="/for-distributors" style={{ color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
              Our distributor programme →
            </a>{' '}
            is white-label as standard.
          </p>
        </div>
        <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <InquiryFormSection />
          </Suspense>
        </div>
      </section>

    </div>
  )
}
