import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { ProcessPolicySection } from '@/components/sections/ProcessPolicySection'
import { CtaSection } from '@/components/sections/CtaSection'

const stats = [
  { value: '25+', label: 'Products in catalogue' },
  { value: '6', label: 'Manufacturing regions' },
  { value: '4', label: 'Product categories' },
  { value: '100 pcs', label: 'Minimum order quantity' },
]

export const Route = createFileRoute('/{-$locale}/about')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.about.title },
      { name: 'description', content: siteMeta.routes.about.description },
      ...buildOgMeta({
        title: siteMeta.routes.about.title,
        description: siteMeta.routes.about.description,
        image: '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-lifestyle.avif',
        url: '/about',
      }),
    ],
    links: [buildCanonical('/about')],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <WhyUsSection />

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}>
        <div style={{ display: 'grid' }} className="grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '2rem 1.75rem',
                borderRight: i < 3 ? '1px solid var(--grid-color)' : undefined,
                borderBottom: '1px solid var(--grid-color)',
              }}
            >
              <p className="display-title" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300, color: '#0a0a0a', marginBottom: '0.4rem' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: '#888', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#0a0a0a', padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--grid-color)' }}>
        <p className="display-title" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
          Sourced close to the factory. Priced without the layers.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '42ch' }}>
          We work close to the production source so the savings reach you — no catalogue markup, no inflated middle tiers.
        </p>
      </div>

      <div id="how-it-works">
        <ProcessStepsSection />
        <div style={{ borderTop: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', background: '#0a0a0a' }}>
          <video
            src="https://res.cloudinary.com/dcivh8ovs/video/upload/v1774942569/how-it-works_rnzm15.mp4"
            controls
            playsInline
            style={{ display: 'block', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
          />
        </div>
        <ProcessPolicySection />
      </div>
      <CtaSection />
    </>
  )
}
