import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/landing/executive-gift-set')({
  head: () => ({
    meta: [
      { title: 'Custom Executive Gift Sets in Titanium & Brass | Wischos Gift' },
      { name: 'description', content: 'Premium metal gift sets for executive gifting and high-value client retention. Pure titanium and brass. Laser engraving included. FOB from $38.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ExecutiveLandingPage,
})

const WGS005_IMAGES = [
  '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
  '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-1',
  '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-2',
  '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-3',
]

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const total = images.length

  return (
    <DialogPrimitive.Root onOpenChange={() => setZoomed(false)}>
      <DialogPrimitive.Trigger asChild>
        <button
          onClick={() => setLightboxIdx(selectedIdx)}
          style={{ cursor: 'zoom-in', border: 'none', padding: 0, background: 'none', display: 'block', width: '100%' }}
          aria-label="View full size"
        >
          <img
            src={cloudinaryUrl(images[selectedIdx], { w: 700, h: 700, fill: 'pad' })}
            alt="The Morning Ritual — Custom Executive Gift Set"
            style={{ width: '100%', display: 'block', background: '#f7f7f7', aspectRatio: '1/1', objectFit: 'contain' }}
          />
        </button>
      </DialogPrimitive.Trigger>

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

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(250,250,250,0.97)' }} />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', outline: 'none' }}
        >
          <DialogPrimitive.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            The Morning Ritual Set
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
              alt={`The Morning Ritual set — image ${lightboxIdx + 1}`}
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

function ExecutiveLandingPage() {
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
      <section style={{
        padding: '4rem 2rem 3rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Premium Corporate Gifting · Executive & Client Gifts
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '20ch' }}>
          Custom Executive Gift Sets in Titanium and Brass
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '55ch', marginBottom: '2rem' }}>
          A gift that holds its own in any boardroom or briefcase. Pure titanium capsule bottle, titanium carabiner, and bolt-action brass pen — all three laser-engraved with your logo. The set for clients and executives who notice material quality.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {['Pure Titanium · No Coating', 'Laser Engraving Included', '25–35 Day Lead Time'].map((badge) => (
            <span key={badge} style={{
              fontSize: '0.78rem', letterSpacing: '0.06em',
              border: '1px solid #d4956a', color: '#B87333',
              padding: '0.3rem 0.75rem',
            }}>
              {badge}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', color: '#6b6b6b', lineHeight: 1.65, marginTop: '0.75rem' }}>
          Minimum quantities are flexible — reach out and we'll advise based on your brief.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a
            href="#inquiry-form"
            style={{
              display: 'inline-block',
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
              label: 'Pure Titanium — Stated, Not Implied',
              body: 'The bottle and carabiner are solid titanium — no inner lining, no coating, no metallic taste. The material difference is apparent the moment you pick them up. We state the spec clearly so your procurement brief can too.',
            },
            {
              label: 'One Contact, Full Coverage',
              body: 'We handle supplier selection, customization, and quality inspection — sourcing from metal manufacturers across Guangdong and Zhejiang. You deal with one person from first inquiry to delivered sets.',
            },
            {
              label: '24-Hour Reply',
              body: 'Every inquiry gets a response within one business day with product availability and indicative pricing. No waiting a week for a quote.',
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
        padding: '4rem 2rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* Left — product details */}
        <div>
          <ImageGallery images={WGS005_IMAGES} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            The Morning Ritual Set — WGS-005
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#4a4a4a', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Brass bolt-action pen, pure titanium capsule bottle, and titanium carabiner with bottle opener. Two metals, three functions, one material story. All three laser-engraved with your logo and shipped in premium packaging.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#6b6b6b', marginBottom: '2rem', lineHeight: 1.6 }}>
            Looking for steel or aluminium options? We carry a full range — mention your preference in the inquiry form.
          </p>

          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '1.5rem' }}>
            {[
              {
                title: 'Two Titanium, One Brass',
                body: 'Pure titanium for the bottle and carabiner — the material used in aerospace and medical instruments, applied to two daily carry objects. Solid brass for the pen, which develops a patina with handling. Two metals, one set, nothing that wears out.',
              },
              {
                title: 'Every Piece Has a Second Function',
                body: 'The bottle carries liquid. The carabiner clips to keys and opens bottles. The bolt-action pen writes and clicks. None of the three justifies itself with appearance alone — each earns its place with something it does.',
              },
              {
                title: 'The Highest-Tier Set in the Lineup',
                body: 'Most drinkware in this category is stainless steel with a coating. The titanium pieces in this set are solid through. The material difference is apparent the moment you pick them up — and apparent to the recipients who receive them.',
              },
            ].map((pt, i) => (
              <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{pt.title}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>{pt.body}</p>
              </div>
            ))}
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
