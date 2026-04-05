import { Link, type LinkProps } from '@tanstack/react-router'
import { ProductCard } from '@/components/sections/ProductGridSection'
import type { DbProduct } from '@/server/schema'

type RouterTo = LinkProps['to']

const b = '1px solid var(--grid-color)'

export function HomepageFeaturedProductsSection({ products }: { products: DbProduct[] }) {
  return (
    <section style={{ borderTop: b }}>
      {/* Header */}
      <div style={{ padding: '5rem 1.5rem', borderBottom: b, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem' }}>
            Individual Products
          </p>
          <h2 className="display-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.1 }}>
            From the Catalog
          </h2>
        </div>
        <Link
          to={'/products' as RouterTo}
          style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-brand)', border: b.replace('var(--grid-color)', 'var(--accent-brand)'), padding: '0.65rem 1.75rem', textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
        >
          View All Products
        </Link>
      </div>

      {/* 4-column grid */}
      <div style={{ display: 'grid', borderLeft: b }} className="grid-cols-2 md:grid-cols-4">
        {products.map(product => (
          <div key={product.id} style={{ borderRight: b, borderBottom: b }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
