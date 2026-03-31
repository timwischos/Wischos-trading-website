import { about } from '@/content/about'
import { useFadeIn } from './useFadeIn'

export function TrustSection() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref}>
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, color: '#0a0a0a' }}
        >
          Trust &amp; Transparency
        </h2>
      </div>
      <div style={{ display: 'grid' }} className="grid-cols-1 lg:grid-cols-2">
        {/* Contact + Quality statement */}
        <div
          style={{ padding: '2.5rem 1.75rem', borderBottom: '1px solid var(--grid-color)' }}
          className="lg:border-r border-[var(--grid-color)]"
        >
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1rem' }}>
            Contact
          </p>
          <a
            href={`mailto:${about.trust.email}`}
            style={{ fontSize: '0.95rem', color: '#0a0a0a', textDecoration: 'none', display: 'block', marginBottom: '1.5rem', fontWeight: 500 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
          >
            {about.trust.email}
          </a>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.75 }}>
            {about.trust.qualityStatement}
          </p>
        </div>

        {/* Registration */}
        <div style={{ padding: '2.5rem 1.75rem', borderBottom: '1px solid var(--grid-color)' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1rem' }}>
            {about.trust.registrationLabel}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#0a0a0a', marginBottom: '0.5rem', fontWeight: 500 }}>
            {about.trust.registrationNumber}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#767676', lineHeight: 1.6 }}>
            {about.trust.registrationNote}
          </p>
        </div>
      </div>
    </section>
  )
}
