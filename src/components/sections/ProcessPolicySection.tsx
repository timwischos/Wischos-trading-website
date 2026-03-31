import { howItWorks } from '@/content/howItWorks'
import { useFadeIn } from './useFadeIn'

export function ProcessPolicySection() {
  const ref = useFadeIn<HTMLElement>()
  return (
    <section ref={ref}>
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, color: '#0a0a0a' }}
        >
          Policies &amp; Terms at a Glance
        </h2>
      </div>
      <div
        style={{ display: 'grid', borderLeft: '1px solid var(--grid-color)' }}
        className="grid-cols-1 lg:grid-cols-3"
      >
        {/* Sample Policy */}
        <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', padding: '2.25rem 1.75rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1.25rem' }}>
            {howItWorks.samplePolicy.heading}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            {howItWorks.samplePolicy.reference}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.7 }}>
            {howItWorks.samplePolicy.custom}
          </p>
        </div>

        {/* Lead Times */}
        <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', padding: '2.25rem 1.75rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1.25rem' }}>
            {howItWorks.leadTimes.heading}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            {howItWorks.leadTimes.samples}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            {howItWorks.leadTimes.bulk}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.65 }}>
            {howItWorks.leadTimes.note}
          </p>
        </div>

        {/* Payment Terms */}
        <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', padding: '2.25rem 1.75rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1.25rem' }}>
            {howItWorks.paymentTerms.heading}
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', marginBottom: '0.75rem' }}>
            {howItWorks.paymentTerms.method}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.7 }}>
            {howItWorks.paymentTerms.structure}
          </p>
        </div>
      </div>
    </section>
  )
}
