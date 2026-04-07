import { homepage } from '@/content/homepage'
import { useFadeIn } from './useFadeIn'

export function SelectionStandardSection() {
  const ref = useFadeIn<HTMLElement>()
  const { kicker, heading, intro, items } = homepage.selectionStandard
  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--grid-color)', marginTop: '4rem' }}>
      {/* Header row */}
      <div
        style={{
          padding: '3.5rem 1.5rem',
          borderBottom: '1px solid var(--grid-color)',
          maxWidth: '640px',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#767676',
            marginBottom: '0.75rem',
          }}
        >
          {kicker}
        </p>
        <h2
          className="display-title"
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          {heading}
        </h2>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#555' }}>{intro}</p>
      </div>

      {/* Principles grid */}
      <div
        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ display: 'grid' }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: '2.5rem 1.5rem',
              borderRight: i < items.length - 1 ? '1px solid var(--grid-color)' : undefined,
              borderBottom: '1px solid var(--grid-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Big label */}
            <span
              className="display-title"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: 'var(--accent-brand)',
                letterSpacing: '-0.02em',
              }}
            >
              {item.label}
            </span>

            {/* Title + subtitle */}
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0a0a0a', marginBottom: '0.2rem' }}>
                {item.title}
              </p>
              <p
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#999',
                }}
              >
                {item.subtitle}
              </p>
            </div>

            {/* Body */}
            <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.75 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
