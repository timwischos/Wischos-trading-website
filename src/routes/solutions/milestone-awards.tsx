import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'
import { EmailLink } from '@/components/ui/EmailLink'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/QuickInquiryFormSection').then(m => ({ default: m.QuickInquiryFormSection }))
)

const WGS010_IMAGES = [
  '/products/WGS-010-5-The-Blueprint/The-Blueprint-cover',
  '/products/WGS-010-5-The-Blueprint/The-Blueprint-detail-1',
  '/products/WGS-010-5-The-Blueprint/The-Blueprint-detail-2',
]
const HERO_IMG = WGS010_IMAGES[0]

function ImageGallery({ images, setName }: { images: string[]; setName: string }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const total = images.length
  function openLightbox(idx: number) { setLightboxIdx(idx); setZoomed(false) }
  return (
    <DialogPrimitive.Root onOpenChange={() => setZoomed(false)}>
      <DialogPrimitive.Trigger asChild>
        <button onClick={() => openLightbox(selectedIdx)} style={{ cursor: 'zoom-in', border: 'none', padding: 0, background: 'none', display: 'block', width: '100%' }} aria-label="View full size">
          <img src={cloudinaryUrl(images[selectedIdx], { w: 700, h: 700, fill: 'pad' })} alt={`${setName} — gift set image`} style={{ width: '100%', display: 'block', background: '#f7f7f7', aspectRatio: '1/1', objectFit: 'contain' }} />
        </button>
      </DialogPrimitive.Trigger>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
        {images.map((src, i) => (
          <button key={i} onClick={() => setSelectedIdx(i)} style={{ flex: '1 1 0', aspectRatio: '1', padding: 0, border: 'none', outline: selectedIdx === i ? '2px solid #060606' : '2px solid transparent', outlineOffset: 2, cursor: 'pointer', background: 'none', overflow: 'hidden' }}>
            <img src={cloudinaryUrl(src, { w: 200 })} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#f7f7f7' }} />
          </button>
        ))}
      </div>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(250,250,250,0.97)' }} />
        <DialogPrimitive.Content data-slot="dialog-content" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', outline: 'none' }}>
          <DialogPrimitive.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>{setName}</DialogPrimitive.Title>
          <DialogPrimitive.Close style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }} aria-label="Close"><X size={22} /></DialogPrimitive.Close>
          {total > 1 && (<>
            <button onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx((i) => (i - 1 + total) % total) }} aria-label="Previous image" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}><ChevronLeft size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx((i) => (i + 1) % total) }} aria-label="Next image" style={{ position: 'absolute', right: '3.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}><ChevronRight size={28} /></button>
          </>)}
          <div onClick={() => setZoomed((z) => !z)} style={{ flex: 1, overflow: zoomed ? 'auto' : 'hidden', display: 'flex', alignItems: zoomed ? 'flex-start' : 'center', justifyContent: zoomed ? 'flex-start' : 'center', cursor: zoomed ? 'zoom-out' : 'zoom-in' }}>
            <img src={cloudinaryUrl(images[lightboxIdx], { w: 1600 })} alt={`${setName} — image ${lightboxIdx + 1}`} style={{ maxHeight: zoomed ? 'none' : '88vh', maxWidth: zoomed ? 'none' : '72vw', width: zoomed ? '160%' : 'auto', objectFit: 'contain', userSelect: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', flexShrink: 0 }}>
            {images.map((src, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setZoomed(false); setLightboxIdx(i) }} style={{ width: 48, height: 48, padding: 0, border: i === lightboxIdx ? '2px solid #060606' : '2px solid transparent', cursor: 'pointer', background: 'none', overflow: 'hidden', borderRadius: 2 }}>
                <img src={cloudinaryUrl(src, { w: 96 })} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export const Route = createFileRoute('/solutions/milestone-awards')({
  head: () => ({
    meta: [
      { title: 'Long Service Awards & Work Anniversary Gifts | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom solid metal long service awards, work anniversary gifts and milestone gifts. Logo and name engraved, gift-boxed, from 100 sets. Samples in 7–10 days.',
      },
    ],
    links: [
      {
        rel: 'preload',
        as: 'image',
        href: cloudinaryUrl(HERO_IMG, { w: 800 }),
        imageSrcSet: [
          `${cloudinaryUrl(HERO_IMG, { w: 640 })} 640w`,
          `${cloudinaryUrl(HERO_IMG, { w: 800 })} 800w`,
          `${cloudinaryUrl(HERO_IMG, { w: 1200 })} 1200w`,
        ].join(', '),
        imageSizes: '(min-width: 768px) 550px, 100vw',
        fetchPriority: 'high',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Long Service Award & Work Anniversary Gift Sets',
            provider: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            description:
              'Custom solid metal long service awards, work anniversary gifts and milestone gifts. Logo and name engraved, gift-boxed, from 100 sets.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can we engrave the recipient name and years of service on each piece?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Per-piece personalisation — name, tenure milestone, and a short inscription — is available on most items. We handle the engraving file per recipient. There is an additional setup cost; ask us for a quote when you send your brief.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can we order different sets for different tenure tiers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Each set has its own minimum quantity. A common approach is a standard set at 5 and 10 years, and a premium set at 15, 20 and 25 years. Tell us your planned split and quantities and we will confirm what is workable.',
                },
              },
              {
                '@type': 'Question',
                name: "Why is solid metal more appropriate for a service award than a trophy or plaque?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Trophies are displayed. Metal tools are used. A brass pen or titanium bottle that someone reaches for daily is a more persistent reminder of the recognition than something that sits on a shelf. The material itself — solid brass, titanium, stainless steel — communicates substance in a way that coated or plated items do not.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between service awards and recognition awards?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "A service award marks length of tenure, such as 5, 10 or 25 years. A recognition award marks a specific contribution or achievement at any point in someone's career. The same solid metal pieces work for both; only the engraving changes — years of service for one, the achievement or project name for the other.",
                },
              },
              {
                '@type': 'Question',
                name: "What's the minimum order?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our standard minimum is 100 sets. For smaller cohorts or single products, get in touch and we'll advise.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I see a sample before ordering?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We can send up to 5 reference sets (you cover shipping). Custom samples with your logo are quoted per project. The fee may be credited against your bulk order, depending on final quantity — confirmed in your quote.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far ahead do I need to order?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Allow 6–8 weeks from brief to delivery. For annual recognition events with a fixed date, contact us at least 10 weeks ahead to leave room for sample approval.',
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: MilestoneAwardsPage,
})

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1rem 0',
          textAlign: 'left',
          gap: '1rem',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{question}</span>
        <span style={{ fontSize: '1.2rem', color: '#B87333', flexShrink: 0, lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, paddingBottom: '1rem', margin: 0 }}>
          {answer}
        </p>
      )}
    </div>
  )
}

function MilestoneAwardsPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>

      {/* Hero */}
      <section>
        <style>{`
          .ms-sol-hero { display: grid; grid-template-columns: 1fr; }
          .ms-sol-img { order: 1; width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; background: #f7f7f7; }
          .ms-sol-text { order: 2; padding: 1.5rem 1.25rem 2rem; }
          .ms-sol-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ms-sol-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ms-sol-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; }
            .ms-sol-text { order: 1; padding: 4rem 2rem 3rem; }
            .ms-sol-cta { display: inline-block; }
          }
        `}</style>
        <div className="ms-sol-hero">
          <div className="ms-sol-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Corporate Gifting · Long Service & Milestone Awards
            </p>
            <h1 style={{ fontSize: 'clamp(1.55rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '20ch' }}>
              Long service awards 25-year veterans actually keep
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>
              A decade of service deserves something solid. Engraved solid brass and titanium tools that carry a name, a date and a logo — used daily, not stored in a drawer.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <a
                href="#inquiry-form"
                className="ms-sol-cta"
                style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}
              >
                Request a Quote →
              </a>
              <a
                href="#sets"
                className="ms-sol-cta"
                style={{ background: 'none', color: '#0a0a0a', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none', border: '1px solid #0a0a0a' }}
              >
                Browse the Sets ↓
              </a>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6 }}>
              From 100 sets · Name & logo engraved · Photo + video approval before ship
            </p>
          </div>
          <img
            className="ms-sol-img"
            src={cloudinaryUrl('/products/WGS-010-5-The-Blueprint/The-Blueprint-cover', { w: 800 })}
            srcSet={[
              `${cloudinaryUrl('/products/WGS-010-5-The-Blueprint/The-Blueprint-cover', { w: 640 })} 640w`,
              `${cloudinaryUrl('/products/WGS-010-5-The-Blueprint/The-Blueprint-cover', { w: 800 })} 800w`,
              `${cloudinaryUrl('/products/WGS-010-5-The-Blueprint/The-Blueprint-cover', { w: 1200 })} 1200w`,
            ].join(', ')}
            sizes="(min-width: 768px) 550px, 100vw"
            width={800}
            height={600}
            loading="eager"
            fetchPriority="high"
            alt="The Blueprint — Five Solid Brass Tools for Long Service Awards"
          />
        </div>
      </section>

      {/* Product gallery */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        <ImageGallery images={WGS010_IMAGES} setName="The Blueprint" />
        <a href="/gift-sets/wgs-010-5-the-blueprint" style={{ display: 'inline-block', fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, marginBottom: '2.5rem' }}>
          View full set details →
        </a>
      </section>

      {/* Why metal */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
            Why Metal
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2rem', maxWidth: '32ch' }}>
            Trophies are displayed. Metal tools are used.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Material that communicates substance',
                body: 'Solid brass, titanium and stainless steel hold their look for years without polishing or maintenance. No coating to chip, no finish to fade — the material itself is the statement.',
              },
              {
                title: 'Used every day, not stored',
                body: 'A pen, a bottle or a desk tool that someone reaches for daily is a more persistent reminder of recognition than an award that sits on a shelf after the first week.',
              },
              {
                title: 'Name and milestone, permanently engraved',
                body: 'Laser engraving cuts into the metal surface — not a label, not a sticker. The recipient\'s name and tenure milestone stay legible for the life of the piece.',
              },
              {
                title: 'Consistent across tenure tiers',
                body: 'A 5-year set and a 20-year set can share the same design language, with the premium tier using higher-grade materials — giving your programme a coherent visual identity across cohorts.',
              },
            ].map((item) => (
              <div key={item.title} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
                <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenure tiers callout */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 0' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Programme Structure
        </p>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>
          One programme, multiple tiers
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.7 }}>
          A common approach: a 3-piece set at 5 and 10 years, and a 4–5 piece set in brass and titanium at 15, 20 and 25 years. Each tier uses the same design language and packaging — the upgrade is visible in the material weight, not a different programme entirely.
        </p>
      </section>

      {/* Sets */}
      <section id="sets" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Award Sets
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '0.75rem' }}>
          Ready-made starting points
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>
          Any set can be adjusted or built from scratch from our product range.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            {
              image: '/products/WGS-010-5-The-Blueprint/The-Blueprint-cover',
              sku: 'WGS-010',
              name: 'The Blueprint',
              tagline: 'Five solid brass pieces: ruler, two set squares, protractor, inkless pen. All unplated H65/H62 brass.',
              bestFor: '15, 20 and 25-year milestones; retiring partners and directors; senior leadership recognition',
              href: '/gift-sets/wgs-010-5-the-blueprint',
            },
            {
              image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover',
              sku: 'WGS-005',
              name: 'The Morning Ritual',
              tagline: 'Brass pen, titanium water bottle, titanium carabiner. Brass and titanium in a daily-carry format.',
              bestFor: '10 and 15-year milestones; field-based and client-facing roles; premium tier in a tiered programme',
              href: '/gift-sets/wgs-005-3-the-morning-ritual',
            },
            {
              image: '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover',
              sku: 'WGS-007',
              name: 'The Thinking Desk',
              tagline: 'Solid brass pen, aluminium desk tray, stainless steel letter opener. For desk-based roles.',
              bestFor: '5 and 10-year milestones; finance, legal and operations teams',
              href: '/gift-sets/wgs-007-3-the-thinking-desk',
            },
            {
              image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover',
              sku: 'WGS-008',
              name: 'The Quartet',
              tagline: 'Four-piece set covering desk, pocket and drinkware. Broad coverage across materials.',
              bestFor: '10-year milestones; mixed-role cohorts where one set needs to work across departments',
              href: '/gift-sets/wgs-008-4-the-quartet',
            },
          ].map((set) => (
            <div key={set.sku}>
              <img
                src={cloudinaryUrl(set.image, { w: 600 })}
                alt={set.name}
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0', marginBottom: '1rem' }}
              />
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>
                {set.sku}
              </p>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{set.name}</p>
              <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.5rem' }}>{set.tagline}</p>
              <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#0a0a0a' }}>Best for:</strong> {set.bestFor}
              </p>
              <a href={set.href} style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
                View set details →
              </a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
          <a href="/gift-sets" style={{ fontSize: '0.85rem', color: '#0a0a0a', textDecoration: 'none', fontWeight: 500 }}>
            View full catalog →
          </a>
        </div>
      </section>

      {/* Customisation */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
            Make It Permanent
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2rem', maxWidth: '28ch' }}>
            Name, milestone and logo — engraved, not printed
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              {
                label: 'Per-recipient engraving',
                body: "Recipient name, years of service and a short inscription on each piece. We handle the engraving file per individual. Requires your recipient list before production starts.",
              },
              {
                label: 'Company logo on every piece',
                body: 'Laser engraving (permanent, monochrome) or UV colour printing, depending on material and surface. Confirmed on a physical sample before production.',
              },
              {
                label: 'Branded gift box',
                body: 'Hot foil stamping or blind debossing on the lid. Rigid gift boxes with custom inserts hold each piece in position for unboxing.',
              },
              {
                label: 'Certificate insert',
                body: 'Optional printed lid liner with the tenure milestone, the recipient name, and a message from leadership. Ask us to include a template when you request a quote.',
              },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.label}</p>
                <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
          Planning
        </p>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '0.75rem' }}>
          Plan around your recognition calendar
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2rem' }}>
          Per-recipient engraving requires your final recipient list before production starts. For annual recognition events with a fixed date, contact us at least 10 weeks ahead.
        </p>
        {[
          { step: 'Brief, recipient list & quotation', timing: '1–3 days' },
          { step: 'Custom sample with your logo', timing: '7–10 business days' },
          { step: 'Production after sample approval', timing: '25–35 days' },
          { step: 'Delivery', timing: '5–10 days air · 10–28 days sea' },
        ].map((row, i) => (
          <div
            key={i}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e5e5', gap: '2rem' }}
          >
            <span style={{ fontSize: '0.88rem', color: '#0a0a0a' }}>{row.step}</span>
            <span style={{ fontSize: '0.88rem', color: '#555', whiteSpace: 'nowrap' }}>{row.timing}</span>
          </div>
        ))}
        <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, marginTop: '1.25rem' }}>
          For large cohorts with per-recipient engraving, allow an additional 3–5 days for engraving file preparation.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>
          Common questions
        </h2>
        {[
          {
            question: 'Can we engrave the recipient name and years of service on each piece?',
            answer: "Yes. Per-piece personalisation — name, tenure milestone, and a short inscription — is available on most items. We handle the engraving file per recipient. There is an additional setup cost; ask us for a quote when you send your brief.",
          },
          {
            question: 'Can we order different sets for different tenure tiers?',
            answer: "Yes. A common approach is a standard set at 5 and 10 years, and a premium set at 15, 20 and 25 years. Tell us your planned split and quantities and we'll confirm what's workable.",
          },
          {
            question: 'Why is solid metal more appropriate for a service award than a trophy or plaque?',
            answer: "Trophies are displayed. Metal tools are used. A brass pen or titanium bottle that someone reaches for daily is a more persistent reminder of the recognition than something that sits on a shelf. The material itself — solid brass, titanium, stainless steel — communicates substance in a way that coated or plated items do not.",
          },
          {
            question: 'What is the difference between service awards and recognition awards?',
            answer: "A service award marks length of tenure, such as 5, 10 or 25 years. A recognition award marks a specific contribution or achievement at any point in someone's career. The same solid metal pieces work for both; only the engraving changes — years of service for one, the achievement or project name for the other.",
          },
          {
            question: "What's the minimum order?",
            answer: "Our standard minimum is 100 sets. For smaller cohorts or single products, get in touch and we'll advise.",
          },
          {
            question: 'Can I see a sample before ordering?',
            answer: 'Yes. We can send up to 5 reference sets (you cover shipping). Custom samples with your logo are quoted per project. The fee may be credited against your bulk order, depending on final quantity — confirmed in your quote.',
          },
          {
            question: 'How far ahead do I need to order?',
            answer: 'Allow 6–8 weeks from brief to delivery. For annual recognition events with a fixed date, contact us at least 10 weeks ahead to leave room for sample approval and per-recipient engraving.',
          },
        ].map((item) => (
          <Accordion key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>

      {/* Inquiry form */}
      <section
        id="inquiry-form"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '3rem 2rem 5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>
            Tell us about your programme
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Share your tenure tiers, cohort sizes, timing and logo. We will recommend a set structure and send a quotation within 1–2 business days.
          </p>
          <EmailLink
            email="johnlui@wischosgift.com"
            location="solution_milestone"
            style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}
          >
            johnlui@wischosgift.com
          </EmailLink>
          <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6, paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
            Buying on behalf of a client?{' '}
            <a href="/for-distributors" style={{ color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>
              Our distributor programme →
            </a>{' '}
            is white-label as standard.
          </p>
        </div>
        <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <InquiryFormSection />
          </Suspense>
        </div>
      </section>

    </div>
  )
}
