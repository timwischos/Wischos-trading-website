import { createFileRoute } from '@tanstack/react-router'
import { InquiryFormSection } from '@/components/sections/InquiryFormSection'
import { cloudinaryUrl } from '@/lib/cloudinary'

export const Route = createFileRoute('/landing/onboarding-gift-set')({
  head: () => ({
    meta: [
      { title: 'Custom Employee Onboarding Gift Sets | Wischos Gift' },
      { name: 'description', content: 'Branded metal gift sets for new hire welcome kits. MOQ 100 sets. Laser engraving included. Sample available.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: OnboardingLandingPage,
})

function OnboardingLandingPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Minimal header — logo only */}
      <header style={{
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          src={cloudinaryUrl('/wischos-logo')}
          alt="Wischos Gift"
          style={{ height: '2rem', width: 'auto' }}
        />
      </header>

      {/* Hero */}
      <section style={{
        padding: '4rem 2rem 3rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Corporate Gifting · New Hire Welcome Kits
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '18ch' }}>
          Custom Metal Gift Sets for Employee Onboarding
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '55ch', marginBottom: '2rem' }}>
          Turn day one into a brand moment. Laser-engraved metal tools, premium packaging, MOQ 100 sets. We handle sourcing, customization, and quality control — you ship a gift worth remembering.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {['MOQ 100 Sets', 'Laser Engraving Included', 'Sample Available', '25–35 Day Lead Time'].map((badge) => (
            <span key={badge} style={{
              fontSize: '0.78rem', letterSpacing: '0.06em',
              border: '1px solid #d4956a', color: '#B87333',
              padding: '0.3rem 0.75rem',
            }}>
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Product + Form */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* Left — product details */}
        <div>
          <img
            src={cloudinaryUrl('/products/WGS-006-3-The-First-Day/The-First-Day-cover', { w: 700, h: 700, fill: 'pad' })}
            alt="The First Day — Custom Employee Onboarding Gift Set"
            style={{ width: '100%', display: 'block', marginBottom: '2rem', background: '#f7f7f7' }}
          />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The First Day Set — WGS-006
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#4a4a4a', marginBottom: '2rem', lineHeight: 1.6 }}>
            RFID aluminum badge holder, 6-in-1 tool pen, and aluminum pen holder. All three laser-engraved with your logo. Arrives in branded packaging — ready to hand to every new hire on arrival.
          </p>

          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1.5rem' }}>
            {[
              { title: 'Badge Holder as First Touchpoint', body: 'RFID-blocking aluminum badge holder — the first branded object a new hire touches, used every day they swipe in.' },
              { title: '6-in-1 Tool Pen', body: 'Ballpoint, LED, stylus, ruler, screwdriver, spirit level in a single metal body. A gift that keeps revealing new utility.' },
              { title: 'Aluminum Identity System', body: 'All three pieces share anodized aluminum construction. They photograph as a set — the coherence signals your company gets the details right.' },
            ].map((pt, i) => (
              <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{pt.title}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>{pt.body}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.78rem', color: '#888', marginTop: '1rem' }}>
            FOB Price: $25–38 / set &nbsp;·&nbsp; Packaging design consultation included
          </p>
        </div>

        {/* Right — inquiry form */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
            <InquiryFormSection />
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer style={{
        borderTop: '1px solid #e5e5e5',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
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
