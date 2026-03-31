import { Link, type LinkProps } from '@tanstack/react-router'
import { homepage } from '@/content/homepage'

type RouterTo = LinkProps['to']

export function CtaSection() {
  return (
    <section style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ padding: '5rem 1.5rem', maxWidth: '44rem', margin: '0 auto', textAlign: 'center' }}>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, color: '#fff', lineHeight: 1.05, marginBottom: '1.25rem' }}
        >
          {homepage.cta.heading}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '38ch', margin: '0 auto 1.75rem' }}>
          {homepage.cta.body}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', margin: '0 auto 2.5rem', maxWidth: '44ch' }}>
          In operation since 2024. Every order managed through a single point of contact — from specification to delivery.
        </p>
        <Link
          to={'/inquiry' as RouterTo}
          style={{
            display: 'inline-block',
            fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#fff', background: 'var(--accent-brand)',
            padding: '0.9rem 2.75rem', textDecoration: 'none',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand-light)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)' }}
        >
          {homepage.cta.buttonLabel}
        </Link>
      </div>
    </section>
  )
}
