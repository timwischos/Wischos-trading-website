import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/landing/metal-gifts-wholesale')({
  head: () => ({
    meta: [
      { title: 'Custom Brass Pens & Titanium Gifts — Bulk Orders for Distributors | Wischos Gift' },
      {
        name: 'description',
        content:
          'Bulk custom brass pens, titanium bottles, and metal gifts for promotional distributors and gifting agencies. Laser engraving, white-label, 25–35 day lead time. China-based sourcing.',
      },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: MetalGiftsWholesalePage,
})

const FEATURED_PRODUCTS = [
  {
    sku: 'WP-101',
    name: 'Brass Crown Bolt-Action Pen',
    image: '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-cover',
    material: 'Solid Brass',
    href: '/products/wp-101',
    description:
      'Solid brass body with bolt-action mechanism. Develops a natural patina with handling. Laser-engraved with your logo — suitable for executive gifting, client retention, and conference programs.',
  },
  {
    sku: 'WP-401',
    name: 'Pure Titanium Vacuum Insulated Bottle',
    image: '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-cover',
    material: 'Pure Titanium',
    href: '/products/wp-401',
    description:
      'Solid titanium — no inner coating, no metallic taste. The same material used in aerospace and medical instruments. A premium drinkware choice for programs where material quality is the message.',
  },
  {
    sku: 'WP-103',
    name: 'Tactical Stainless Steel Pen',
    image: '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-cover',
    material: 'Stainless Steel',
    href: '/products/wp-103',
    description:
      'Machined stainless steel with glass-breaker tip. Suited for field teams, safety-adjacent gifting programs, and clients who want a pen with a secondary function. Available in bulk with logo engraving.',
  },
]

function MetalGiftsWholesalePage() {
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
          .mgw-hero { display: grid; grid-template-columns: 1fr; }
          .mgw-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .mgw-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .mgw-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .mgw-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .mgw-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .mgw-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .mgw-cta { display: inline-block; }
          }
        `}</style>
        <div className="mgw-hero">
          <div className="mgw-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              For Promotional Distributors &amp; Gifting Agencies
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '22ch' }}>
              Custom brass pens and titanium gifts — bulk orders, logo engraved
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '1.75rem' }}>
              Wischos is a China-based metal gift sourcing partner. We supply individual metal items — brass pens, titanium bottles, stainless steel EDC — for promotional programs and client gifting. Minimum quantities are flexible; reach out and we'll advise.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['Solid Brass & Titanium', 'Laser Engraving Included', '25–35 Day Lead Time', 'White-Label'].map((badge) => (
                <span key={badge} style={{
                  fontSize: '0.78rem', letterSpacing: '0.06em',
                  border: '1px solid #d4956a', color: '#B87333',
                  padding: '0.3rem 0.75rem',
                }}>
                  {badge}
                </span>
              ))}
            </div>
            <a
              href="#inquiry-form"
              className="mgw-cta"
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
              Request a Quote →
            </a>
          </div>
          <img
            className="mgw-hero-img"
            src={cloudinaryUrl('/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-lifestyle', { w: 800 })}
            alt="Brass Crown Bolt-Action Pen — custom engraved bulk order"
          />
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem',
        }}>
          {[
            {
              title: 'Material specs you can quote directly',
              body: 'Brass is solid brass. Titanium is solid titanium. No vague "premium metal" language. Our specs are written accurately so your procurement brief or client proposal can reference them as-is.',
            },
            {
              title: 'One contact from quote to shipment',
              body: 'No coordinating across multiple suppliers. One Wischos contact handles item selection, engraving specs, production updates, QC, and shipment confirmation.',
            },
            {
              title: '24-hour reply',
              body: 'Every inquiry gets a response within one business day — product availability, indicative pricing, and lead time. No waiting a week for a quote.',
            },
            {
              title: 'White-label as standard',
              body: 'Wischos branding does not appear on products or packaging. Items ship with your client\'s identity — or unbranded, if preferred.',
            },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Popular Items
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.75rem', maxWidth: '32ch' }}>
          Brass, titanium, and steel — stated accurately, sourced directly
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>
          These are three of the most requested items. If you need a different material, size, or mechanism — tell us in your inquiry and we'll advise on what's available.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.sku}>
              <img
                src={cloudinaryUrl(product.image, { w: 600 })}
                alt={product.name}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0', marginBottom: '1rem' }}
              />
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>
                {product.sku} · {product.material}
              </p>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{product.name}</p>
              <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>{product.description}</p>
              <a href={product.href} style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
                View product details →
              </a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
          <a href="/products" style={{ fontSize: '0.85rem', color: '#0a0a0a', textDecoration: 'none', fontWeight: 500 }}>
            View all 30+ individual items →
          </a>
        </div>
      </section>

      {/* Gift set upsell */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Also Available
            </p>
            <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem', maxWidth: '28ch' }}>
              Need a complete gift set instead?
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '48ch' }}>
              If your client brief calls for a curated multi-piece set — pen, bottle, keychain, and packaging in one box — we build those too. Six set configurations in the current lineup, or we can source to your specification.
            </p>
            <a
              href="/gift-sets"
              style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}
            >
              Browse gift sets →
            </a>
          </div>
          <img
            src={cloudinaryUrl('/products/WGS-008-4-The-Quartet/The-Quartet-cover', { w: 600 })}
            alt="The Quartet — Four-piece executive metal gift set"
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0' }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions
        </h2>
        {[
          {
            q: 'What is the minimum order quantity?',
            a: 'Our standard minimum is 100 units per item. For specific products or smaller quantities, reach out and we\'ll advise based on your brief.',
          },
          {
            q: 'Can you engrave our client\'s logo?',
            a: 'Yes. Laser engraving is standard on all brass, titanium, and stainless steel items. We can engrave a logo, text, or both — send the artwork with your inquiry.',
          },
          {
            q: 'How long does production take?',
            a: 'Normally 25–35 days after sample approval. We confirm the exact timeline at inquiry stage based on current factory capacity.',
          },
          {
            q: 'Do you handle multiple client programs?',
            a: 'Yes. We work with distributors running multiple client programs simultaneously. Each is handled separately with its own pricing and production timeline.',
          },
          {
            q: 'Can I order individual items instead of a set?',
            a: 'Yes — that\'s the primary purpose of this page. Individual pens, bottles, and other metal items are available for bulk orders through the same process as sets.',
          },
        ].map((item) => (
          <div key={item.q} style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 0' }}>
            <p style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0a0a0a', marginBottom: '0.5rem' }}>{item.q}</p>
            <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65, margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* Inquiry form */}
      <section
        id="inquiry-form"
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}
      >
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>
            Request a quote
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Tell us the item (or brief), quantity, logo requirements, and delivery timeline. We'll respond within 1–2 business days with availability and indicative pricing.
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

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#888' }}>
          © {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp; johnlui@wischosgift.com
        </p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>
          wischosgift.com
        </a>
      </footer>

    </div>
  )
}
