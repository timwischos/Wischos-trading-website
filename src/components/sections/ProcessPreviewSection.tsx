import { Link, type LinkProps } from '@tanstack/react-router'
import { useFadeIn } from './useFadeIn'

type RouterTo = LinkProps['to']

const steps = [
  {
    number: '01',
    title: 'Share the Buyer Brief',
    body: 'Start with a set reference or send the recipient profile, quantity, budget range, logo needs, and deadline. We respond with a recommended direction within 1–2 business days.',
    time: '1–2 days',
  },
  {
    number: '02',
    title: 'Review Samples and Claims',
    body: 'Confirm product feel, material claims, logo method, packaging direction, and any client-facing details before committing to bulk production.',
    time: '~15 days',
  },
  {
    number: '03',
    title: 'Produce, Check, and Ship',
    body: 'Bulk production begins after approval and deposit. Progress updates, packaging checks, pre-shipment photos, and shipping confirmation are included as standard.',
    time: 'normally 25–35 days',
  },
]

export function ProcessPreviewSection() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--grid-color)' }}>

      {/* Header */}
      <div style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
          How It Works
        </p>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, lineHeight: 1.1 }}
        >
          From buyer brief to shipment — clear steps, controlled claims.
        </h2>
      </div>

      {/* 3 steps */}
      <div
        style={{ display: 'grid', borderBottom: '1px solid var(--grid-color)' }}
        className="grid-cols-1 lg:grid-cols-3"
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            style={{
              padding: '2.5rem 1.5rem',
              borderRight: i < 2 ? '1px solid var(--grid-color)' : undefined,
              borderBottom: '1px solid var(--grid-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: '#bbb' }}>
                {step.number}
              </span>
              {step.time && (
                <span style={{
                  fontSize: '0.7rem', letterSpacing: '0.06em',
                  color: 'var(--accent-brand)', border: '1px solid var(--accent-brand)',
                  padding: '0.2rem 0.6rem',
                }}>
                  {step.time}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0a0a0a' }}>
              {step.title}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.7 }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* Footer: sample policy + link */}
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <p style={{ fontSize: '0.78rem', color: '#888' }}>
          Samples and logo details are reviewed before bulk order commitment.
        </p>
        <Link
          to={'/about' as RouterTo}
          hash="how-it-works"
          style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#0a0a0a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
        >
          See full process details →
        </Link>
      </div>

    </section>
  )
}
