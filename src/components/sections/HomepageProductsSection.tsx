import { Link, type LinkProps } from '@tanstack/react-router'
import { ProductCard } from '@/components/sections/ProductGridSection'
import type { DbProduct } from '@/server/schema'

type RouterTo = LinkProps['to']

export function HomepageProductsSection({ products }: { products: DbProduct[] }) {
  if (products.length === 0) return null

  return (
    <section style={{ borderTop: '1px solid var(--grid-color)' }}>
      {/* Header */}
      <div style={{ padding: '2.5rem 1.5rem 2rem', borderBottom: '1px solid var(--grid-color)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
            Featured Products
          </p>
          <h2 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 300, lineHeight: 1.05 }}>
            Premium Metal Gift Sets
          </h2>
        </div>
        <Link
          to={'/products' as RouterTo}
          style={{
            fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0a0a0a', border: '1px solid #0a0a0a',
            padding: '0.65rem 1.75rem', textDecoration: 'none',
            transition: 'background 150ms ease, color 150ms ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
        >
          View All Products
        </Link>
      </div>

      {/* Grid */}
      <div
        style={{
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
    </section>
  )
}
