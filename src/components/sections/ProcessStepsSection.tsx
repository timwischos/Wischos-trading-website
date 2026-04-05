import { howItWorks } from '@/content/howItWorks'

export function ProcessStepsSection() {
  return (
    <section>
      {/* Page header */}
      <div style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
          Process
        </p>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, lineHeight: 1.05, color: '#0a0a0a', marginBottom: '1rem' }}
        >
          {howItWorks.hero.heading}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.75, maxWidth: '42ch' }}>
          {howItWorks.hero.subheading}
        </p>
      </div>

      {/* Steps */}
      {howItWorks.steps.map((step) => (
        <div
          key={step.number}
          style={{ display: 'grid', borderBottom: '1px solid var(--grid-color)' }}
          className="grid-cols-1 lg:grid-cols-[5rem_1fr_2fr]"
        >
          {/* Step number — hidden on mobile to avoid orphaned row */}
          <div
            style={{ padding: '2rem 1.5rem', alignItems: 'flex-start', justifyContent: 'center' }}
            className="hidden lg:flex lg:border-r border-[var(--grid-color)]"
          >
            <span
              className="display-title"
              style={{ fontSize: '1.35rem', fontWeight: 300, color: '#ccc', lineHeight: 1 }}
            >
              {step.number}
            </span>
          </div>
          {/* Step title */}
          <div
            style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}
            className="lg:border-b-0 lg:border-r border-[var(--grid-color)]"
          >
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>
              {step.title}
            </p>
          </div>
          {/* Step body */}
          <div style={{ padding: '2rem 1.5rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.8 }}>
              {step.body}
            </p>
          </div>
        </div>
      ))}


    </section>
  )
}
