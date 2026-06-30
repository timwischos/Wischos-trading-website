import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import type { ProductSummary } from '@/server/schema'
import { cloudinaryUrl } from '@/lib/cloudinary'

type RouterTo = LinkProps['to']

interface ProductCardProps {
  product: ProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const coverImage = product.images[0] ?? ''
  const hoverImage = product.images[1] ?? ''
  const coverSrc = cloudinaryUrl(coverImage, { w: 400 })
  const hoverSrc = cloudinaryUrl(hoverImage, { w: 400 })
  const hasHoverImage = Boolean(hoverSrc && hoverSrc !== coverSrc)
  const cardSizes = '(max-width: 767px) 50vw, 25vw'
  const coverSrcSet = [240, 320, 400, 520]
    .map(width => `${cloudinaryUrl(coverImage, { w: width })} ${width}w`)
    .join(', ')
  const hoverSrcSet = [240, 320, 400, 520]
    .map(width => `${cloudinaryUrl(hoverImage, { w: width })} ${width}w`)
    .join(', ')

  const altText = `${product.name} — ${product.category}`

  return (
    <Link
      to={`/products/${product.id}` as RouterTo}
      aria-label={product.name}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', background: '#f7f7f7', position: 'relative', aspectRatio: '1/1' }}>
        <img
          src={coverSrc}
          srcSet={coverSrcSet}
          sizes={cardSizes}
          alt={altText}
          loading="lazy"
          width={520}
          height={520}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }}
        />
        {hasHoverImage && hovered && (
          <img
            src={hoverSrc}
            srcSet={hoverSrcSet}
            sizes={cardSizes}
            alt=""
            aria-hidden="true"
            width={520}
            height={520}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '0.875rem 1rem 1.25rem', borderTop: '1px solid var(--grid-color)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.35rem' }}>
          {product.category}
        </p>
        <p className="display-title" style={{ fontSize: '1.05rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.25, marginBottom: '0.4rem' }}>
          {product.name}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#6b6b6b', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          {product.tagline}
        </p>
      </div>
    </Link>
  )
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Writing Instruments': 'Corporate pens and writing tools built for daily use. Our selection covers precision ballpoints, rollerball pens, and mechanical pencils in solid brass, stainless steel, and aluminium — materials that communicate substance without saying a word. Unlike promotional giveaways, these are objects recipients keep on their desks and reach for by choice. Each piece supports laser engraving with a company name, logo, or recipient\'s initials, turning a functional tool into a personalised keepsake. Suitable for new client onboarding kits, employee milestones, conference gifts, and long-service awards.',
  'Desk Accessories': 'Precision-made desk objects for corporate gifting. This category includes aluminium mouse pads, pen holders, desk organisers, spinning tops, custom bookmarks, and other functional pieces built for professional environments. The weight and finish quality are immediately apparent when handled — these are not catalogue fillers. All pieces support laser engraving or surface printing for corporate branding. Ideal for executive welcome kits, team gifts, client appreciation sets, and trade show presentations.',
  'Drinkware': 'Premium metal drinkware for corporate gifting programs. Our range covers pure titanium bottles, vacuum-insulated stainless steel tumblers, and bamboo-groove mugs — functional gifts that accompany recipients through their workday and beyond. Titanium is a standout choice: lighter than steel, corrosion-resistant, and free of metallic taste. All pieces support laser engraving on the body or lid. Suitable for team gifts, client appreciation packages, wellness-focused onboarding kits, and executive welcome sets.',
  'EDC Accessories': 'Everyday carry accessories made for professionals who value functional precision. This category includes titanium multi-tools, stainless steel key organisers, EDC pry bars, letter openers, and pocket tools designed for daily use and long-term durability. Each piece is compact, purposeful, and built to a standard that holds up over years of use. Suitable for high-value client gifts, executive welcome kits, and recognition awards where the recipient is expected to actually use what they receive. All pieces support laser engraving for personalisation.',
}

export function ProductGridSection({ products, category, searchQuery }: { products: ProductSummary[]; category?: string; searchQuery?: string }) {
  const heading = searchQuery
    ? `Search: "${searchQuery}"`
    : category ?? 'Selected Metal Objects'
  const subheading = searchQuery
    ? `${products.length} product${products.length !== 1 ? 's' : ''} found`
    : category
      ? `Showing all products in ${category}`
      : "We don't just find products; we curate objects that matter. Each piece is hand-selected based on our principles of utility and substance, ready to be marked with your legacy."
  const categoryDescription = !searchQuery && category ? CATEGORY_DESCRIPTIONS[category] : undefined

  return (
    <section style={{ borderTop: '1px solid var(--grid-color)' }}>
      {/* Header */}
      <div style={{ padding: '2.5rem 1.5rem 2rem', borderBottom: '1px solid var(--grid-color)' }}>
        <div className="page-wrap" style={{ width: '100%', margin: 0, maxWidth: 'none' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
            {searchQuery ? 'Search Results' : category ? 'Product Category' : 'Our Products'}
          </p>
          <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '0.75rem' }}>
            {heading}
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666', maxWidth: '40rem', lineHeight: 1.65 }}>
            {subheading}
          </p>
          {categoryDescription && (
            <p style={{ fontSize: '0.875rem', color: '#555', maxWidth: '48rem', lineHeight: 1.75, marginTop: '0.75rem' }}>
              {categoryDescription}
            </p>
          )}

          {/* Category filter tabs */}
          {!searchQuery && (
            <div style={{ display: 'flex', gap: 0, marginTop: '1.75rem', overflowX: 'auto' }}>
              {[
                { label: 'All', href: '/products' },
                { label: 'Writing Instruments', href: '/products?category=Writing+Instruments' },
                { label: 'Desk Accessories', href: '/products?category=Desk+Accessories' },
                { label: 'EDC Accessories', href: '/products?category=EDC+Accessories' },
                { label: 'Drinkware', href: '/products?category=Drinkware' },
              ].map(tab => {
                const isActive = tab.label === 'All' ? !category : category === tab.label
                return (
                  <a
                    key={tab.label}
                    href={tab.href}
                    style={{
                      padding: '0.55rem 1rem',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      color: isActive ? '#0a0a0a' : '#999',
                      borderBottom: isActive ? '2px solid var(--accent-brand)' : '2px solid transparent',
                      transition: 'color 150ms ease, border-color 150ms ease',
                    }}
                  >
                    {tab.label}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#767676', fontSize: '0.9rem', marginBottom: '1rem' }}>No products found.</p>
          {searchQuery && (
            <p style={{ color: '#999', fontSize: '0.8rem' }}>
              Try a different search term, or <a href="/products" style={{ color: '#0a0a0a', textDecoration: 'underline' }}>browse all products</a>.
            </p>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          borderLeft: '1px solid var(--grid-color)',
        }}
          className="grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* More coming card */}
          {!searchQuery && (
            <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}>
              {/* Image area */}
              <div style={{
                aspectRatio: '1/1',
                background: '#0d0d0d',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img
                  src={cloudinaryUrl('/images/more-coming-products', { w: 400 })}
                  alt="More products coming soon"
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.5,
                  }}
                />
                {/* Overlay content */}
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  zIndex: 1,
                }}>
                  {/* Copper rule */}
                  <div style={{ width: '2rem', height: '1px', background: 'var(--accent-brand)', opacity: 0.7 }} />
                  {/* Label */}
                  <p style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center',
                    lineHeight: 1.8,
                  }}>
                    New Object<br />In Progress
                  </p>
                  {/* Copper rule */}
                  <div style={{ width: '2rem', height: '1px', background: 'var(--accent-brand)', opacity: 0.7 }} />
                </div>
                {/* Corner marks */}
                {[
                  { top: '1rem', left: '1rem', borderTop: '1px solid', borderLeft: '1px solid' },
                  { top: '1rem', right: '1rem', borderTop: '1px solid', borderRight: '1px solid' },
                  { bottom: '1rem', left: '1rem', borderBottom: '1px solid', borderLeft: '1px solid' },
                  { bottom: '1rem', right: '1rem', borderBottom: '1px solid', borderRight: '1px solid' },
                ].map((style, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: '0.875rem', height: '0.875rem',
                    borderColor: 'rgba(184,115,51,0.4)',
                    zIndex: 1,
                    ...style,
                  }} />
                ))}
              </div>
              {/* Info */}
              <div style={{ padding: '0.875rem 1rem 1.25rem', borderTop: '1px solid var(--grid-color)' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.35rem' }}>
                  Expanding Range
                </p>
                <p className="display-title" style={{ fontSize: '1.05rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.25, marginBottom: '0.4rem' }}>
                  More Products Coming
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b6b6b', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                  New pieces are added regularly. Reach out if you have a specific product in mind.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom sourcing strip */}
      <div style={{
        borderTop: '1px solid var(--grid-color)',
        padding: '1.1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        background: '#fafafa',
      }}>
        <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.55 }}>
          <strong style={{ color: '#0a0a0a', fontWeight: 600 }}>Don't see what you need?</strong>
          {' '}We source beyond this catalogue — send us a brief and we'll find the right product.
        </p>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: 'var(--accent-brand)',
            border: '1px solid var(--accent-brand)',
            borderRadius: '1px',
            whiteSpace: 'nowrap',
            transition: 'background 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--accent-brand)'
            el.style.color = 'white'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.color = 'var(--accent-brand)'
          }}
        >
          Send a Brief
        </a>
      </div>
    </section>
  )
}
