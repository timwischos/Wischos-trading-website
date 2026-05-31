import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { about } from '@/content/about'

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

      {/* Why Metal-Only — specialist positioning */}
      <section style={{ borderTop: '1px solid var(--grid-color)', background: '#fff', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B87333', fontWeight: 600, marginBottom: '1.25rem' }}>
            {about.metalOnly.kicker}
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem', color: '#0a0a0a', maxWidth: '24ch' }}>
            {about.metalOnly.heading}
          </h2>
          {about.metalOnly.paragraphs.map((para, i) => (
            <p key={i} style={{ fontSize: '1rem', color: '#3a3a3a', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      <ExpertiseSection />

      <div style={{ background: '#0a0a0a', padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--grid-color)' }}>
        <p className="display-title" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
          A custom gift set is only as strong as the sourcing behind it.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '42ch' }}>
          The visible gift is only the final layer. Before that come product selection, material checks, logo method decisions, sample review, packaging coordination, production timing, and export documentation. Wischos exists to manage those details so buyers receive a set that can be approved, produced, and delivered with fewer surprises.
        </p>
      </div>

      <div id="how-it-works">
        <ProcessStepsSection />
        <div style={{ borderTop: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', background: '#0a0a0a' }}>
          <video
            controls
            playsInline
            preload="none"
            poster="https://res.cloudinary.com/dcivh8ovs/video/upload/f_jpg,so_1/v1774942569/how-it-works_rnzm15.jpg"
            style={{ display: 'block', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
          >
            <source src="https://res.cloudinary.com/dcivh8ovs/video/upload/f_webm,q_auto,vc_vp9,w_1200/v1774942569/how-it-works_rnzm15.webm" type="video/webm" />
            <source src="https://res.cloudinary.com/dcivh8ovs/video/upload/f_mp4,q_auto,vc_h264,w_1200/v1774942569/how-it-works_rnzm15.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--grid-color)', padding: '2rem', textAlign: 'center', background: '#fff' }}>
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7 }}>
          Working as a distributor or gifting agency?{' '}
          <a href="/for-distributors" style={{ color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
            See how we work with distribution partners →
          </a>
        </p>
      </div>
      <CtaSection />
    </>
  )
}
