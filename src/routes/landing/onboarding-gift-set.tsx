import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const WGS006_IMAGES = [
  '/products/WGS-006-3-The-First-Day/The-First-Day-cover',
  '/products/WGS-006-3-The-First-Day/The-First-Day-detail-1',
  '/products/WGS-006-3-The-First-Day/The-First-Day-detail-2',
  '/products/WGS-006-3-The-First-Day/The-First-Day-detail-3',
]

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const total = images.length

  function openLightbox(idx: number) {
    setLightboxIdx(idx)
    setZoomed(false)
  }

  return (
    <DialogPrimitive.Root onOpenChange={() => setZoomed(false)}>
      {/* Main image */}
      <DialogPrimitive.Trigger asChild>
        <button
          onClick={() => openLightbox(selectedIdx)}
          style={{ cursor: 'zoom-in', border: 'none', padding: 0, background: 'none', display: 'block', width: '100%' }}
          aria-label="View full size"
        >
          <img
            src={cloudinaryUrl(images[selectedIdx], { w: 700, h: 700, fill: 'pad' })}
            alt="The First Day — Custom Employee Onboarding Gift Set"
            style={{ width: '100%', display: 'block', background: '#f7f7f7', aspectRatio: '1/1', objectFit: 'contain' }}
          />
        </button>
      </DialogPrimitive.Trigger>

      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            style={{
              flex: '1 1 0', aspectRatio: '1', padding: 0, border: 'none',
              outline: selectedIdx === i ? '2px solid #060606' : '2px solid transparent',
              outlineOffset: 2, cursor: 'pointer', background: 'none', overflow: 'hidden',
            }}
          >
            <img
              src={cloudinaryUrl(src, { w: 200 })}
              alt={`View ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#f7f7f7' }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(250,250,250,0.97)' }} />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', outline: 'none' }}
        >
          <DialogPrimitive.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            The First Day Set
          </DialogPrimitive.Title>
          <DialogPrimitive.Close
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}
            aria-label="Close"
          >
            <X size={22} />
          </DialogPrimitive.Close>
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx((i) => (i - 1 + total) % total) }}
                aria-label="Previous image"
                style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx((i) => (i + 1) % total) }}
                aria-label="Next image"
                style={{ position: 'absolute', right: '3.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <div
            onClick={() => setZoomed((z) => !z)}
            style={{
              flex: 1, overflow: zoomed ? 'auto' : 'hidden',
              display: 'flex', alignItems: zoomed ? 'flex-start' : 'center', justifyContent: zoomed ? 'flex-start' : 'center',
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
            }}
          >
            <img
              src={cloudinaryUrl(images[lightboxIdx], { w: 1600 })}
              alt={`The First Day set — image ${lightboxIdx + 1}`}
              style={{
                maxHeight: zoomed ? 'none' : '88vh', maxWidth: zoomed ? 'none' : '72vw',
                width: zoomed ? '160%' : 'auto', objectFit: 'contain', userSelect: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', flexShrink: 0 }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx(i) }}
                style={{
                  width: 48, height: 48, padding: 0,
                  border: i === lightboxIdx ? '2px solid #060606' : '2px solid transparent',
                  cursor: 'pointer', background: 'none', overflow: 'hidden', borderRadius: 2,
                }}
              >
                <img src={cloudinaryUrl(src, { w: 96 })} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/landing/onboarding-gift-set')({
  head: () => ({
    meta: [
      { title: 'Custom Employee Onboarding Gift Sets | Wischos Gift' },
      { name: 'description', content: 'Branded metal gift sets for new hire welcome kits. Laser engraving included. Sample available.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: OnboardingLandingPage,
})

function OnboardingLandingPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Minimal header — logo only */}
      <header style={{
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          src={cloudinaryUrl('/wischos-logo')}
          alt="Wischos Gift"
          style={{ height: '2rem', width: 'auto' }}
        />
      </header>

      {/* Hero */}
      <section>
        <style>{`
          .ob-hero { display: grid; grid-template-columns: 1fr; }
          .ob-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .ob-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .ob-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ob-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ob-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; }
            .ob-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .ob-cta { display: inline-block; }
          }
        `}</style>
        <div className="ob-hero">
          <div className="ob-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Corporate Gifting · New Hire Welcome Kits
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '18ch' }}>
              Custom Metal Gift Sets for Employee Onboarding
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '55ch', marginBottom: '2rem' }}>
              Turn day one into a brand moment. Laser-engraved metal tools, premium packaging, ready for your logo. We handle sourcing, customization, and quality control — you ship a gift worth remembering.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {['Laser Engraving Included', 'Branded Packaging Included', '25-35 Day Lead Time'].map((badge) => (
                <span key={badge} style={{
                  fontSize: '0.78rem', letterSpacing: '0.06em',
                  border: '1px solid #d4956a', color: '#B87333',
                  padding: '0.3rem 0.75rem',
                }}>
                  {badge}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#6b6b6b', lineHeight: 1.65, marginBottom: '2rem' }}>
              Our standard minimum is 100 sets — for specific products or smaller quantities, reach out and we'll advise.
            </p>
            <a
              href="#inquiry-form"
              className="ob-cta"
              style={{
                background: '#B87333',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
              }}
            >
              Request a Quote →
            </a>
          </div>
          <img
            className="ob-hero-img"
            src={cloudinaryUrl(WGS006_IMAGES[0], { w: 800 })}
            alt="The First Day — Custom Employee Onboarding Gift Set"
          />
        </div>
      </section>

      {/* Trust strip */}
      <section style={{
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        background: '#fafafa',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              label: 'One Contact, Full Coverage',
              body: 'We handle supplier selection, customization, and quality inspection — sourcing from metal manufacturers across Guangdong and Zhejiang. You deal with one person from first inquiry to delivered sets.',
            },
            {
              label: '24-Hour Reply',
              body: 'Every inquiry gets a response within one business day with product availability and indicative pricing. No waiting a week for a quote.',
            },
            {
              label: '25-35 Day Lead Time',
              body: 'Standard production timeline for laser-engraved metal sets. We confirm the schedule before you commit — no surprises at the delivery stage.',
            },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product + Form */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* Left — product details */}
        <div>
          <ImageGallery images={WGS006_IMAGES} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The First Day Set — WGS-006
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#4a4a4a', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            RFID aluminum badge holder, 6-in-1 tool pen, and aluminum pen holder. All three laser-engraved with your logo. Arrives in branded packaging — ready to hand to every new hire on arrival.
          </p>
          <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '2rem', lineHeight: 1.6, fontStyle: 'italic' }}>
            Branding shown is illustrative. Every piece leaves the factory marked with your logo — engraved to your specification, not ours.
          </p>

          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1.5rem' }}>
            {[
              { title: 'Badge Holder as First Touchpoint', body: 'RFID-blocking aluminum badge holder — the first branded object a new hire touches, used every day they swipe in.' },
              { title: '6-in-1 Tool Pen', body: 'Ballpoint, LED, stylus, ruler, screwdriver, spirit level in a single metal body. A gift that keeps revealing new utility.' },
              { title: 'Aluminum Identity System', body: 'All three pieces share anodized aluminum construction. They photograph as a set — the coherence signals your company gets the details right.' },
            ].map((pt, i) => (
              <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{pt.title}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>{pt.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
            <a
              href="#inquiry-form"
              style={{
                display: 'block',
                background: '#B87333',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Request a Quote →
            </a>
          </div>
        </div>

        {/* Right — inquiry form */}
        <div id="inquiry-form" style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
            <Suspense fallback={<div style={{ height: '400px' }} />}>
              <InquiryFormSection />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer style={{
        borderTop: '1px solid #e5e5e5',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <p style={{ fontSize: '0.72rem', color: '#888' }}>
          © {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp; inquiries@wischosgift.com
        </p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>
          wischosgift.com
        </a>
      </footer>

    </div>
  )
}
