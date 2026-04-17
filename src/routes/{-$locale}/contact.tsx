import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { ContactSection } from '@/components/sections/ContactSection'
import { cloudinaryUrl } from '@/lib/cloudinary'

const HERO = '/site/contact-hero.avif'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/{-$locale}/contact')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.contact.title },
      { name: 'description', content: siteMeta.routes.contact.description },
      ...buildOgMeta({
        title: siteMeta.routes.contact.title,
        description: siteMeta.routes.contact.description,
        image: siteMeta.defaultOgImage,
        url: '/contact',
      }),
    ],
    links: [buildCanonical('/contact')],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div>
      {/* Mobile: image top banner */}
      <div className="md:hidden" style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={cloudinaryUrl(HERO, { w: 800 })}
          alt=""
          fetchPriority="high"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))' }} />
      </div>

      {/* Desktop: split panel | Mobile: stacked */}
      <div style={{ display: 'grid', minHeight: 'auto' }} className="md:grid-cols-2">

        {/* Left panel */}
        <div style={{ position: 'relative' }}>
          {/* Desktop background image */}
          <img
            className="hidden md:block"
            src={cloudinaryUrl(HERO, { w: 1400 })}
            srcSet={`${cloudinaryUrl(HERO, { w: 900 })} 900w, ${cloudinaryUrl(HERO, { w: 1400 })} 1400w`}
            sizes="50vw"
            alt=""
            fetchPriority="high"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          {/* Desktop overlay */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(160deg, rgba(6,6,6,0.52) 0%, rgba(6,6,6,0.80) 100%)',
            }}
          />
          {/* Content — mobile uses dark text, desktop uses white */}
          <div style={{ position: 'relative', padding: '2.5rem 1.5rem' }} className="md:px-12 md:py-14">
            <div className="md:hidden">
              <ContactSection dark={false} headingAs="p" />
            </div>
            <div className="hidden md:block">
              <ContactSection dark={true} />
            </div>
          </div>
        </div>

        {/* Right panel: form */}
        <div style={{ padding: '2.5rem 1.5rem', background: '#fff' }} className="md:px-12 md:py-14">
          <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
            <InquiryFormSection />
          </Suspense>
        </div>

      </div>
    </div>
  )
}
