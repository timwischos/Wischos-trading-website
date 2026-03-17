import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import type { DbProduct } from '@/server/schema'

type RouterTo = LinkProps['to']

interface ProductCardProps {
  product: DbProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const coverSrc = product.images[0] ?? ''
  const hoverSrc = product.images[1] ?? ''
  const hasHoverImage = Boolean(hoverSrc && hoverSrc !== coverSrc)

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
          alt={product.name}
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
        <p style={{ fontSize: '0.75rem', color: '#6b6b6b', letterSpacing: '0.04em' }}>
          MOQ {product.moq} sets
        </p>
      </div>
    </Link>
  )
}

export function ProductGridSection({ products }: { products: DbProduct[] }) {
  return (
    <section style={{ borderTop: '1px solid var(--grid-color)' }}>
      {/* Header */}
      <div style={{ padding: '2.5rem 1.5rem 2rem', borderBottom: '1px solid var(--grid-color)' }}>
        <div className="page-wrap" style={{ width: '100%', margin: 0, maxWidth: 'none' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
            Our Products
          </p>
          <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Premium Metal Gift Sets
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666', maxWidth: '40rem', lineHeight: 1.65 }}>
            Each series is available from MOQ 50 sets with full custom logo and packaging design.
            Sample before you commit.
          </p>
        </div>
      </div>

      {/* Grid — border lines between cells */}
      {products.length === 0 ? (
        <p style={{ padding: '3rem 1.5rem', color: '#767676', fontSize: '0.9rem' }}>No products found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          borderLeft: '1px solid var(--grid-color)',
        }}
          className="lg:grid-cols-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
