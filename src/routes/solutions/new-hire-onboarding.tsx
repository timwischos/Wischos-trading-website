import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/solutions/new-hire-onboarding')({
  head: () => ({
    meta: [
      { title: 'New Employee Welcome Kits in Solid Metal | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal onboarding kits your new hires will use from day one. Logo-engraved, gift-boxed, from 100 sets. Samples in 7–10 business days.',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Employee Onboarding Gift Sets',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            description:
              'Custom metal onboarding kits your new hires will use from day one. Logo-engraved, gift-boxed, from 100 sets.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "What's the minimum order?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our standard minimum is 100 sets. For smaller quantities or single products, get in touch and we'll advise.",
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
                name: 'Can we mix sets for different hire levels?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. Each set has its own minimum order quantity, which varies depending on the product combination. Tell us your planned split when you send your brief and we'll confirm what's workable.",
                },
              },
              {
                '@type': 'Question',
                name: 'How do you check quality?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We inspect goods at the factory before packing and send you photos and video of randomly selected sets for approval before shipment.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which countries do you deliver to?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We regularly ship to Australia, New Zealand, Singapore and the UAE, and can deliver worldwide.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: NewHireOnboardingPage,
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

function NewHireOnboardingPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Hero */}
      <section>
        <style>{`
          .ob-sol-hero { display: grid; grid-template-columns: 1fr; }
          .ob-sol-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .ob-sol-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .ob-sol-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ob-sol-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ob-sol-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; }
            .ob-sol-text { order: 1; padding: 4rem 2rem 3rem; }
            .ob-sol-cta { display: inline-block; }
          }
        `}</style>
        <div className="ob-sol-hero">
          <div className="ob-sol-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Corporate Gifting · New Hire Onboarding
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '20ch' }}>
              Welcome kits that are still on the desk a year later
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>
              Most onboarding swag is gone within a week. Solid metal tools engraved with your logo stay in pockets, on desks and in bags — and keep reminding people that they joined somewhere that pays attention to detail.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a
                href="#inquiry-form"
                className="ob-sol-cta"
                style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}
              >
                Request an Onboarding Quote →
              </a>
              <a
                href="#sets"
                className="ob-sol-cta"
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
            className="ob-sol-img"
            src={cloudinaryUrl('/products/WGS-006-3-The-First-Day/The-First-Day-cover', { w: 800 })}
            alt="The First Day — Custom Employee Onboarding Gift Set"
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
            The first week sets the tone
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Used, not stored',
                body: 'Every item is something people reach for daily: a pen, a card holder, a desk tool. Nothing decorative.',
              },
              {
                title: 'Built to last',
                body: 'Aluminium, brass, stainless steel and titanium — not plastic with a metal finish. The material is stated accurately in every spec.',
              },
              {
                title: 'Your brand, done quietly',
                body: 'Laser engraving is permanent and understated, so people are happy to use it outside the office too.',
              },
              {
                title: 'One box, one story',
                body: 'Each set is designed as a whole, with packaging that matches the contents and carries your logo consistently.',
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
          Onboarding Sets
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.75rem' }}>
          Ready-made starting points
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>
          Any set can be adjusted or built from scratch from our product range.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            {
              image: '/products/WGS-006-3-The-First-Day/The-First-Day-cover',
              sku: 'WGS-006',
              name: 'The First Day',
              tagline: 'RFID badge holder, 6-in-1 tool pen, aluminium pen holder. Our core onboarding kit.',
              bestFor: 'Company-wide onboarding programmes, tech teams, co-working memberships',
              href: '/gift-sets/wgs-006-3-the-first-day',
            },
            {
              image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover',
              sku: 'WGS-009',
              name: 'The Meeting Kit',
              tagline: 'Anodised aluminium notebook, brass rollerball, stainless steel business card case.',
              bestFor: 'Sales, BD and consulting hires who\'ll be in front of clients in week one',
              href: '/gift-sets/wgs-009-3-the-meeting-kit',
            },
            {
              image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
              sku: 'WGS-005',
              name: 'The Morning Ritual',
              tagline: 'Brass pen, titanium bottle, titanium carabiner. Premium tier in brass and titanium.',
              bestFor: 'Leadership hires and high-value onboarding programmes',
              href: '/gift-sets/wgs-005-3-the-morning-ritual',
            },
            {
              image: '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-cover',
              sku: 'WGS-003',
              name: 'The Pocket Three',
              tagline: 'Brass key organiser, stainless steel money clip, titanium comb. For teams always on the move.',
              bestFor: 'Field-based roles, finance and insurance teams, HR wellness kits',
              href: '/gift-sets/wgs-003-3-the-pocket-three',
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
            Personalised for your company
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                label: 'Logo on every piece',
                body: 'Laser engraving (permanent, monochrome) or UV colour printing, depending on material and surface.',
              },
              {
                label: 'Branded box',
                body: 'Hot foil stamping or blind debossing on the lid. Rigid gift boxes, drawer boxes, and custom inserts available.',
              },
              {
                label: 'Welcome message',
                body: 'Optional printed lid liner with a note from the CEO, or a QR code linking to your onboarding portal or a welcome video.',
              },
              {
                label: 'Sample first',
                body: 'Placement, size and method are all confirmed on a physical sample before production starts.',
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
          Plan around your hiring calendar
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2rem' }}>
          Onboarding happens all year, so the easiest approach is to order one batch for the next 6–12 months of hires and keep it in stock.
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
          For a graduate intake or a large hiring wave, get in touch 10–12 weeks before the start date.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions
        </h2>
        {[
          {
            question: "What's the minimum order?",
            answer: "Our standard minimum is 100 sets. For smaller quantities or single products, get in touch and we'll advise.",
          },
          {
            question: 'Can I see a sample before ordering?',
            answer: "Yes. We can send up to 5 reference sets (you cover shipping). Custom samples with your logo are quoted per project, and the fee is credited against your bulk order.",
          },
          {
            question: 'Can we mix sets for different hire levels?',
            answer: "Yes. Each set has its own minimum order quantity, which varies depending on the product combination. Tell us your planned split when you send your brief and we'll confirm what's workable.",
          },
          {
            question: 'How do you check quality?',
            answer: 'We inspect goods at the factory before packing and send you photos and video of randomly selected sets for approval before shipment.',
          },
          {
            question: 'Which countries do you deliver to?',
            answer: 'We regularly ship to Australia, New Zealand, Singapore and the UAE, and can deliver worldwide. See our duty and shipping page for details.',
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
            Tell us about your next intake
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Share how many hires you're planning for, your timing and your logo. We'll recommend a set and send a quotation within 1–2 business days.
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
