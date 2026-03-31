import { useState } from 'react'
import { homepage } from '@/content/homepage'
import { useFadeIn } from './useFadeIn'
import { cloudinaryUrl } from '@/lib/cloudinary'

export function WhySection() {
  const ref = useFadeIn<HTMLElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--grid-color)', marginTop: '4rem' }}>
      <div style={{ display: 'grid', minHeight: '600px' }} className="grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* Left col: all text content */}
        <div style={{ borderRight: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
              {homepage.differentiators.kicker}
            </p>
            <h2
              className="display-title"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem' }}
            >
              {homepage.differentiators.heading}
            </h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#555' }}>
              {homepage.differentiators.intro}
            </p>
          </div>

          {/* Claims — accordion */}
          {homepage.differentiators.items.map((item, i) => (
            <div key={item.claim} style={{ borderBottom: '1px solid var(--grid-color)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem',
                  padding: '1.75rem 1.5rem', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: '#bbb', minWidth: '1.5rem', flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4, flex: 1 }}>
                  {item.claim}
                </p>
                <span style={{ fontSize: '1.1rem', color: '#aaa', fontWeight: 300, flexShrink: 0 }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 1.5rem 1.5rem', paddingLeft: 'calc(1.5rem + 1.5rem + 1.5rem)' }}>
                  <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.7 }}>
                    {item.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right col: image full height */}
        <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--grid-color)' }}>
          <img
            src={cloudinaryUrl('/images/why-us-section')}
            alt="Corporate gift set on office desk"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </div>

      </div>
    </section>
  )
}
