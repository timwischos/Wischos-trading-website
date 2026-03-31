import { about } from '@/content/about'
import { useFadeIn } from './useFadeIn'
import { cloudinaryUrl } from '@/lib/cloudinary'

export function WhyUsSection() {
  const ref = useFadeIn<HTMLElement>()

  return (
    <section ref={ref} style={{ borderBottom: '1px solid var(--grid-color)' }}>
      {/* Full-width heading row */}
      <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
          {about.whyUs.kicker}
        </p>
        <h2
          className="display-title"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 300, color: '#0a0a0a' }}
        >
          {about.whyUs.heading}
        </h2>
      </div>

      <div style={{ display: 'grid' }} className="grid-cols-1 lg:grid-cols-2">

        {/* Left: image */}
        <div
          style={{ minHeight: '320px' }}
          className="lg:border-r border-[var(--grid-color)] border-b lg:border-b-0"
        >
          <img
            src={cloudinaryUrl('/images/about-why-us')}
            alt="Custom gift set handover"
            style={{ display: 'block', width: '100%', height: '100%', minHeight: '320px', objectFit: 'cover' }}
          />
        </div>

        {/* Right: points list */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 2rem', gap: '2rem' }}>
          {about.whyUs.points.map((point) => (
            <div key={point.title}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                {point.title}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.75 }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
