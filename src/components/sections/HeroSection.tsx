import { Link, type LinkProps } from '@tanstack/react-router'

type RouterTo = LinkProps['to']

export function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '90vh', minHeight: '540px', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/products/Titanium-water-bottle-01/Titanium-water-bottle-01-lifestyle.avif"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlay for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)' }} />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '3rem 2.5rem',
        }}
      >
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
          Premium Metal Corporate Gifts
        </p>
        <h1
          className="display-title"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.0, marginBottom: '1.5rem', maxWidth: '14ch' }}
        >
          Objects Built to Outlast the Occasion
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', maxWidth: '36ch', lineHeight: 1.6, marginBottom: '2rem' }}>
          Custom metal gift sets for corporate clients. MOQ 50. Fully brandable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to={'/products' as RouterTo}
            style={{
              fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', border: '1px solid rgba(255,255,255,0.8)',
              padding: '0.75rem 2rem', textDecoration: 'none',
              transition: 'background 150ms ease, color 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          >
            View Products
          </Link>
          <Link
            to={'/contact' as RouterTo}
            style={{
              fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#0a0a0a', background: '#fff', border: '1px solid #fff',
              padding: '0.75rem 2rem', textDecoration: 'none',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
