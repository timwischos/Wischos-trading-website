import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { CtaSection } from '@/components/sections/CtaSection'

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


      <div style={{ background: '#0a0a0a', padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--grid-color)' }}>
        <p className="display-title" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
          Metal communicates in a way that marketing copy cannot.
        </p>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '42ch' }}>
          The weight of a CNC-machined pen or the tactile resistance of a titanium tool creates an immediate, unspoken understanding of value. These are objects built to outlast the event that prompted the gift.
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
      <CtaSection />
    </>
  )
}
