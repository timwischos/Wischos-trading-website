import { useState } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { Link, type LinkProps } from '@tanstack/react-router'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DbProduct } from '@/server/schema'
import { cloudinaryUrl } from '@/lib/cloudinary'

type Product = DbProduct

type RouterTo = LinkProps['to']

interface ProductDetailSectionProps {
  product: Product
  relatedProducts?: Product[]
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = title.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`accordion-${id}`}
        id={`accordion-trigger-${id}`}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.875rem 0', borderTop: '1px solid #e5e5e5',
        }}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b' }}>
          {title}
        </span>
        <span style={{ fontSize: '1.25rem', lineHeight: 1, color: '#4a4a4a', fontWeight: 300 }}>
          {open ? '\u2212' : '+'}
        </span>
      </button>
      <div
        id={`accordion-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        style={{
          overflow: 'hidden',
          maxHeight: open ? '600px' : '0',
          transition: 'max-height 250ms ease',
        }}
      >
        <div style={{ paddingBottom: '1.25rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function productAlt(product: Product, suffix?: string): string {
  const material = product.materials?.[0] ?? ''
  const parts = ['Wischos Gift', product.name]
  if (material) parts.push(material)
  parts.push('Custom Corporate Gift')
  if (suffix) parts.push(suffix)
  return parts.join(' - ')
}

export function ProductLightbox({ product, initialIdx = 0 }: { product: Product; initialIdx?: number }) {
  const [idx, setIdx] = useState(initialIdx)
  const [zoomed, setZoomed] = useState(false)
  const total = product.images.length

  function prev(e: React.MouseEvent) {
    e.stopPropagation()
    setZoomed(false)
    setIdx((i) => (i - 1 + total) % total)
  }
  function next(e: React.MouseEvent) {
    e.stopPropagation()
    setZoomed(false)
    setIdx((i) => (i + 1) % total)
  }

  return (
    <DialogPrimitive.Root onOpenChange={() => { setIdx(initialIdx); setZoomed(false) }}>
      <DialogPrimitive.Trigger asChild>
        <button
          className="w-full"
          style={{ cursor: 'zoom-in', border: 'none', padding: 0, background: 'none', display: 'block' }}
          aria-label={`View ${product.name} full size`}
        >
          <img
            src={cloudinaryUrl(product.images[initialIdx])}
            alt={productAlt(product)}
            className="w-full object-cover"
            style={{ aspectRatio: '1/1' }}
          />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(250,250,250,0.97)' }}
        />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', outline: 'none' }}
        >
          <DialogPrimitive.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            {product.name}
          </DialogPrimitive.Title>

          {/* Close */}
          <DialogPrimitive.Close
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}
            aria-label="Close"
          >
            <X size={22} />
          </DialogPrimitive.Close>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button onClick={prev} aria-label="Previous image"
                style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}>
                <ChevronLeft size={28} />
              </button>
              <button onClick={next} aria-label="Next image"
                style={{ position: 'absolute', right: '3.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 10, lineHeight: 0 }}>
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Image area */}
          <div
            onClick={() => setZoomed((z) => !z)}
            style={{
              flex: 1,
              overflow: zoomed ? 'auto' : 'hidden',
              display: 'flex',
              alignItems: zoomed ? 'flex-start' : 'center',
              justifyContent: zoomed ? 'flex-start' : 'center',
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
            }}
          >
            <img
              src={cloudinaryUrl(product.images[idx])}
              alt={productAlt(product, `image ${idx + 1}`)}
              style={{
                maxHeight: zoomed ? 'none' : '88vh',
                maxWidth: zoomed ? 'none' : '72vw',
                width: zoomed ? '160%' : 'auto',
                objectFit: 'contain',
                userSelect: 'none',
              }}
            />
          </div>

          {/* Thumbnail strip */}
          {total > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', flexShrink: 0 }}>
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setZoomed(false); setIdx(i) }}
                  style={{
                    width: 48, height: 48, padding: 0, border: i === idx ? '2px solid #060606' : '2px solid transparent',
                    cursor: 'pointer', background: 'none', overflow: 'hidden', borderRadius: 2,
                  }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export function ProductDetailSection({ product, relatedProducts }: ProductDetailSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="page-wrap">

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2.5rem', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #888)' }}>
          <Link to={'/products' as RouterTo} style={{ color: 'inherit', textDecoration: 'none' }}>
            Products
          </Link>
          <span style={{ margin: '0 0.5rem' }}>&mdash;</span>
          <span>{product.category}</span>
        </nav>

        {/* 2-column grid */}
        <div style={{ display: 'grid', gap: '4rem', alignItems: 'start' }}
          className="grid-cols-1 lg:grid-cols-[55%_1fr]">

          {/* Left: image gallery */}
          <div>
            {/* Main image — click opens lightbox */}
            <ProductLightbox product={product} initialIdx={selectedIdx} />

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    style={{
                      flex: '1 1 0', aspectRatio: '1', padding: 0, border: 'none',
                      outline: selectedIdx === i ? '2px solid #060606' : '2px solid transparent',
                      outlineOffset: 2, cursor: 'pointer', background: 'none', overflow: 'hidden',
                    }}
                  >
                    <img src={cloudinaryUrl(src)} alt={`${product.name} - view ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: product info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Category + Name + Highlights */}
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.75rem' }}>
                {product.category}
              </p>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
                {product.name}
              </h1>
              {product.highlights && product.highlights.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {product.highlights.map((item, i) => {
                    const colonIdx = item.indexOf(': ')
                    const label = colonIdx !== -1 ? item.slice(0, colonIdx) : null
                    const body = colonIdx !== -1 ? item.slice(colonIdx + 2) : item
                    return (
                      <li key={i} style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#444', paddingLeft: '1.1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.58em', width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-brand)', display: 'inline-block', flexShrink: 0 }} />
                        {label ? <><strong style={{ fontWeight: 600, color: '#1a1a1a' }}>{label}:</strong>{' '}{body}</> : body}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#444' }}>
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: 0 }} />

            {/* Description */}
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.75rem' }}>
                About This Product
              </p>
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#333', marginBottom: i < product.description.split('\n\n').length - 1 ? '1rem' : 0 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Specifications — accordion */}
            {product.specifications && product.specifications.length > 0 && (
              <AccordionSection title="Specifications">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', fontSize: '0.8rem', color: '#6b6b6b', width: '45%', verticalAlign: 'top' }}>
                          {spec.label}
                        </td>
                        <td style={{ padding: '0.5rem 0', fontSize: '0.85rem', color: '#333', verticalAlign: 'top' }}>
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionSection>
            )}

            {/* FAQ — accordion */}
            {product.faqs && product.faqs.length > 0 && (
              <AccordionSection title="Frequently Asked Questions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {product.faqs.map((faq, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                        {faq.q}
                      </p>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555', margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            )}

            {/* Expert Notes — accordion */}
            {product.expertNotes && product.expertNotes.length > 0 && (
              <AccordionSection title="Expert Notes">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {product.expertNotes.map((note, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                        {note.title}
                      </p>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#555', margin: 0 }}>
                        {note.body}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            )}

            {/* CTA */}
            <div>
              <Link
                to={`/inquiry?product=${encodeURIComponent(product.name)}` as RouterTo}
                style={{
                  display: 'inline-block', background: 'var(--accent-brand)', color: '#fff',
                  padding: '0.875rem 2rem', fontSize: '0.8rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', textDecoration: 'none', width: '100%',
                  textAlign: 'center', boxSizing: 'border-box', cursor: 'pointer',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand-light)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)' }}
              >
                Send an Inquiry
              </Link>
              <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#6b6b6b', textAlign: 'center' }}>
                Tell us your branding and quantity requirements.
              </p>
            </div>

          </div>
        </div>

        {/* Related Products / Complete the Set */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--grid-color)', paddingTop: '3rem' }}>
            <h2
              className="display-title"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 300, marginBottom: '2rem' }}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 0, borderLeft: '1px solid var(--grid-color)' }}>
              {relatedProducts.slice(0, 4).map(rp => (
                <div key={rp.id} style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}>
                  <Link
                    to={`/products/${rp.id}` as RouterTo}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div style={{ overflow: 'hidden', background: '#f7f7f7', aspectRatio: '1/1' }}>
                      <img
                        src={cloudinaryUrl(rp.images[0])}
                        alt={`Wischos Gift - ${rp.name} - ${rp.category} Corporate Gift`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ padding: '0.875rem 1rem 1.25rem', borderTop: '1px solid var(--grid-color)' }}>
                      <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.35rem' }}>
                        {rp.category}
                      </p>
                      <p className="display-title" style={{ fontSize: '1.05rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.25 }}>
                        {rp.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
