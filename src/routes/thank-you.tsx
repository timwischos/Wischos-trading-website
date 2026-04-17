import { createFileRoute, Link } from '@tanstack/react-router'
import { cloudinaryUrl } from '@/lib/cloudinary'

export const Route = createFileRoute('/thank-you')({
  head: () => ({
    meta: [
      { title: 'Thank You — Wischos Gift' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ThankYouPage,
})

function ThankYouPage() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'stretch' }}>
      {/* Image panel */}
      <div style={{
        flex: '0 0 45%',
        display: 'none',
        overflow: 'hidden',
      }}
        className="thank-you-image-panel"
      >
        <img
          src={cloudinaryUrl('/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', { w: 800, h: 900 })}
          alt="The Morning Ritual — Executive Gift Set"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Text panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(2rem, 8vw, 6rem)',
      }}>
        <div style={{ maxWidth: '36rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '1.5rem' }}>
            Inquiry received
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Thank you.
          </h1>
          <p style={{ fontSize: '1rem', color: '#6b6b6b', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            We've received your inquiry and will get back to you within 2 business days.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#6b6b6b', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            In the meantime, feel free to browse our gift sets or product catalogue.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/gift-sets"
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.4rem',
                background: 'var(--accent-brand)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.03em',
                textDecoration: 'none',
                borderRadius: '2px',
              }}
            >
              Browse Gift Sets
            </Link>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.4rem',
                border: '1px solid #d4d4d4',
                color: '#333',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.03em',
                textDecoration: 'none',
                borderRadius: '2px',
              }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .thank-you-image-panel {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
