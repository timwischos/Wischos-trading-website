import { useState } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { Link, type LinkProps } from '@tanstack/react-router'
import { X, ChevronLeft, ChevronRight, Stamp } from 'lucide-react'
import type { Product } from '@/content/products'

type RouterTo = LinkProps['to']

interface ProductDetailSectionProps {
  product: Product
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
          className="w-full focus-visible:outline-none"
          style={{ cursor: 'zoom-in' }}
          aria-label={`View ${product.name} full size`}
        >
          <img
            src={product.images[initialIdx]}
            alt={product.name}
            className="w-full object-cover"
            style={{ aspectRatio: '4/5' }}
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
              src={product.images[idx]}
              alt={product.name}
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

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="page-wrap">

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2.5rem', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #888)' }}>
          <Link to={'/products' as RouterTo} style={{ color: 'inherit', textDecoration: 'none' }}>
            Products
          </Link>
          <span style={{ margin: '0 0.5rem' }}>—</span>
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
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: product info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Category + Name + Tagline */}
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
                {product.category}
              </p>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#444' }}>
                {product.tagline}
              </p>
            </div>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5' }} />

            {/* Description */}
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
                About This Series
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#333' }}>
                {product.description}
              </p>
            </div>

            {/* Materials */}
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
                Materials
              </p>
              <p style={{ fontSize: '0.9rem', color: '#333' }}>
                {product.materials.join(' · ')}
              </p>
            </div>

            {/* Customization */}
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Stamp size={12} aria-hidden="true" />
                Customization
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {product.customizationOptions.map((opt) => (
                  <li key={opt} style={{ fontSize: '0.85rem', color: '#333', paddingLeft: '1rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: '0.45em', width: 4, height: 4, borderRadius: '50%', background: '#bbb', display: 'inline-block' }} />
                    {opt}
                  </li>
                ))}
              </ul>
            </div>

            {/* MOQ / Lead time */}
            <div style={{ background: '#f5f5f5', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                ['Minimum Order Quantity', `${product.moq} sets`],
                ['Sample Lead Time', product.leadTimeSample],
                ['Bulk Lead Time', product.leadTimeBulk],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#888' }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link
                to={`/inquiry?product=${encodeURIComponent(product.name)}` as RouterTo}
                style={{
                  display: 'inline-block', background: '#060606', color: '#fff',
                  padding: '0.875rem 2rem', fontSize: '0.8rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', textDecoration: 'none', width: '100%',
                  textAlign: 'center', boxSizing: 'border-box',
                }}
              >
                Request a Quote
              </Link>
              <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#aaa', textAlign: 'center' }}>
                We respond to all inquiries within 1 business day.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
