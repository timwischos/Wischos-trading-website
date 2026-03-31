import { about } from '@/content/about'
import { cloudinaryUrl } from '@/lib/cloudinary'

export function AboutHeroSection() {
  return (
    <section style={{ borderBottom: '1px solid var(--grid-color)' }}>
      <div style={{ display: 'grid' }} className="grid-cols-1 lg:grid-cols-2">
        {/* Left: H1 */}
        <div style={{ padding: '4rem 2rem 3.5rem', borderBottom: '1px solid var(--grid-color)' }} className="lg:border-b-0 lg:border-r border-[var(--grid-color)]">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1.25rem' }}>
            About
          </p>
          <h1
            className="display-title"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 300, lineHeight: 1.1, color: '#0a0a0a' }}
          >
            {about.hero.heading}
          </h1>
        </div>

        {/* Right: subheading + claim + mission */}
        <div style={{ padding: '4rem 2rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.8, color: '#444' }}>
            {about.hero.subheading}
          </p>
<div style={{ borderLeft: '2px solid #0a0a0a', paddingLeft: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.5rem' }}>
              {about.mission.heading}
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#333' }}>
              {about.mission.body}
            </p>
          </div>
        </div>
      </div>
      {/* Hero image */}
      <div style={{ borderTop: '1px solid var(--grid-color)' }}>
        <img
          src={cloudinaryUrl('/images/about-materials-banner')}
          alt="Wischos product materials — brass, titanium, aluminium, stainless steel"
          style={{ display: 'block', width: '100%', aspectRatio: '16/5', objectFit: 'cover' }}
        />
      </div>
    </section>
  )
}
