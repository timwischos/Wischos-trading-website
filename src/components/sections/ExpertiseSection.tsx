import { about } from '@/content/about'
import { useFadeIn } from './useFadeIn'

export function ExpertiseSection() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref} style={{ borderBottom: '1px solid var(--grid-color)' }}>
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
          {about.expertise.kicker}
        </p>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, color: '#0a0a0a', maxWidth: '40rem' }}
        >
          {about.expertise.heading}
        </h2>
      </div>
      <div
        style={{ display: 'grid', borderLeft: '1px solid var(--grid-color)' }}
        className="grid-cols-1 lg:grid-cols-3"
      >
        {about.expertise.markets.map((market, i) => (
          <div
            key={market.region}
            style={{
              borderRight: '1px solid var(--grid-color)',
              borderBottom: '1px solid var(--grid-color)',
              padding: '2.5rem 1.75rem',
            }}
          >
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: '#ccc', display: 'block', marginBottom: '1.25rem' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.35 }}>
              {market.region}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.75 }}>
              {market.insight}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
