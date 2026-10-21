import { trackCtaClick } from '@/lib/analytics'

/**
 * Homepage entry band for /custom-projects.
 * One line, one link — keeps the homepage focused on sets and products.
 */
export function CustomProjectsBand() {
  const b = '1px solid var(--grid-color)'
  return (
    <section style={{ borderTop: b }}>
      <div style={{ padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '60ch' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '0.5rem' }}>
            Custom Projects
          </p>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 300, lineHeight: 1.4, margin: 0 }}>
            Have your own design? We coordinate specialist factories to produce bespoke metal gifts and objects from your drawing or reference — usually from 100 pieces.
          </p>
        </div>
        <a
          href="/custom-projects"
          onClick={() => trackCtaClick({ location: 'home_custom_band', label: 'custom_projects' })}
          style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-brand)', border: '1px solid var(--accent-brand)', padding: '0.65rem 1.75rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Start a custom project →
        </a>
      </div>
    </section>
  )
}
