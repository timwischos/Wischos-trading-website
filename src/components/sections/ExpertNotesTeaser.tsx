import { Link, type LinkProps } from '@tanstack/react-router'
import { useFadeIn } from './useFadeIn'

type RouterTo = LinkProps['to']

export function ExpertNotesTeaser() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--grid-color)', background: '#fafafa' }}>
      <div
        style={{ display: 'grid' }}
        className="grid-cols-1 lg:grid-cols-[1fr_1fr]"
      >
        {/* Left: label + heading */}
        <div style={{ padding: '3rem 1.5rem', borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
            Material Intelligence
          </p>
          <h2
            className="display-title"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '1rem' }}
          >
            Every product selected for its material integrity.
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#555', marginBottom: '1.75rem' }}>
            Brass, titanium, aluminium, stainless steel — each product page includes an expert note on why the material was chosen, what to specify, and what to watch for in production.
          </p>
          <Link
            to={'/products' as RouterTo}
            style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#0a0a0a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
          >
            Browse products with expert notes →
          </Link>
        </div>

        {/* Right: material list */}
        <div style={{ borderBottom: '1px solid var(--grid-color)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {[
            { material: 'Brass', note: 'Weight, warmth, and precision machining. The standard for premium writing instruments.' },
            { material: 'Titanium', note: 'Exceptional strength-to-weight ratio. Corrosion-resistant and biocompatible.' },
            { material: 'Aluminium', note: 'Lightweight with a clean anodised finish. Ideal for desk accessories.' },
            { material: 'Stainless Steel', note: 'Durable and hygienic. Consistent finish across high-volume production runs.' },
          ].map((item, i) => (
            <div
              key={item.material}
              style={{
                padding: '1.75rem 1.5rem',
                borderRight: i % 2 === 0 ? '1px solid var(--grid-color)' : undefined,
                borderBottom: i < 2 ? '1px solid var(--grid-color)' : undefined,
              }}
            >
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '0.5rem' }}>
                {item.material}
              </p>
              <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.65 }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
