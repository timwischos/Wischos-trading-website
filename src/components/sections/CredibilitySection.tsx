import { homepage } from '@/content/homepage'
import { useFadeIn } from './useFadeIn'

export function CredibilitySection() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--grid-color)', background: '#fafafa' }}>
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.5rem' }}>
          {homepage.credibility.kicker}
        </p>
        <h2 className="display-title" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, color: '#0a0a0a' }}>
          {homepage.credibility.heading}
        </h2>
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderLeft: '1px solid var(--grid-color)' }}
        className="lg:grid-cols-4"
      >
        {homepage.credibility.stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              borderRight: '1px solid var(--grid-color)',
              borderBottom: '1px solid var(--grid-color)',
              padding: '2.25rem 1.5rem',
            }}
          >
            <p
              className="display-title"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.1, marginBottom: '0.5rem' }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em', color: '#767676', lineHeight: 1.5 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
