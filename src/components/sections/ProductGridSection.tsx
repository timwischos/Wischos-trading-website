import { Link, type LinkProps } from '@tanstack/react-router'
import { products, type Product } from '@/content/products'

type RouterTo = LinkProps['to']

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}` as RouterTo}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={product.name}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
          className="group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div style={{ paddingTop: '0.875rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.3rem' }}>
          {product.category}
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#060606', lineHeight: 1.3 }}>
          {product.name}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem', letterSpacing: '0.04em' }}>
          MOQ 50 sets · Custom Logo Available
        </p>
      </div>
    </Link>
  )
}

export function ProductGridSection() {
  return (
    <section style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
            Our Products
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Premium Metal Gift Sets
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#666', maxWidth: '36rem', lineHeight: 1.6 }}>
            Each series is available from MOQ 50 sets with full custom logo and packaging design.
            Sample before you commit.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gap: '2rem' }} className="grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}
