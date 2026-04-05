import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import type { DbProduct } from '@/server/schema'
import { cloudinaryUrl } from '@/lib/cloudinary'

type RouterTo = LinkProps['to']

interface ProductCardProps {
  product: DbProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const coverSrc = cloudinaryUrl(product.images[0] ?? '', { w: 800 })
  const hoverSrc = cloudinaryUrl(product.images[1] ?? '', { w: 800 })
  const hasHoverImage = Boolean(hoverSrc && hoverSrc !== coverSrc)

  const altText = `Wischos Gift - ${product.name} - ${product.category} Corporate Gift`

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
          alt={altText}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'opacity 0.4s ease',
            opacity: hasHoverImage && hovered ? 0 : 1,
          }}
        />
        {hasHoverImage && (
          <img
            src={hoverSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'opacity 0.4s ease',
              opacity: hovered ? 1 : 0,
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
        <p style={{ fontSize: '0.68rem', color: '#bbb', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          MOQ 100 pcs
        </p>
      </div>
    </Link>
  )
}

export function ProductGridSection({ products, category, searchQuery }: { products: DbProduct[]; category?: string; searchQuery?: string }) {
  const heading = searchQuery
    ? `Search: "${searchQuery}"`
    : category ?? 'Selected Metal Objects'
  const subheading = searchQuery
    ? `${products.length} product${products.length !== 1 ? 's' : ''} found`
    : category
      ? `Showing all products in ${category}`
      : "We don't just find products; we curate objects that matter. Each piece is hand-selected based on our principles of utility and substance, ready to be marked with your legacy."

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
              {/* Image placeholder */}
              <div style={{ aspectRatio: '1/1', background: '#f2f0ed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2px', background: '#ccc' }} />
                <div style={{ width: '2px', height: '2rem', background: '#ccc', marginTop: '-1.5rem' }} />
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
          href="/inquiry"
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
