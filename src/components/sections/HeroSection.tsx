import { Link, type LinkProps } from '@tanstack/react-router'
import { homepage } from '@/content/homepage'
import { cloudinaryUrl } from '@/lib/cloudinary'

type RouterTo = LinkProps['to']

export function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '90vh', minHeight: '540px', overflow: 'hidden' }}>
      {/* Banner image */}
      <img
        src={cloudinaryUrl('/images/banner')}
        alt="Wischos Gift — Custom Metal Corporate Gift Sets"
        loading="eager"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

      {/* Content */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '3rem 2.5rem',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>
          {homepage.hero.kicker}
        </p>
        <h1
          className="display-title"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '22ch' }}
        >
          {homepage.hero.headline}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.88)', maxWidth: '42ch', lineHeight: 1.6, marginBottom: '2rem' }}>
          {homepage.hero.subheadline}
        </p>
        {/* CTA buttons — stack on mobile */}
        <div style={{ display: 'flex', gap: '1rem' }} className="flex-col sm:flex-row">
          <Link
            to={'/products' as RouterTo}
            style={{
              fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', border: '1px solid rgba(255,255,255,0.8)',
              padding: '0.75rem 2rem', textDecoration: 'none', textAlign: 'center',
              transition: 'background 150ms ease, color 150ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          >
            View Products
          </Link>
          <Link
            to={'/contact' as RouterTo}
            style={{
              fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: 'var(--accent-brand)', border: '1px solid var(--accent-brand)',
              padding: '0.75rem 2rem', textDecoration: 'none', textAlign: 'center',
              transition: 'background 150ms ease, border-color 150ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand-light)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-brand-light)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-brand)' }}
          >
            Send an Inquiry
          </Link>
        </div>
      </div>
    </section>
  )
}
