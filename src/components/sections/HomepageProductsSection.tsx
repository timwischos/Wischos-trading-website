import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { giftSets } from '@/content/giftSets'
import { cloudinaryUrl } from '@/lib/cloudinary'

type RouterTo = LinkProps['to']

const featured = [
  giftSets.find(s => s.sku === 'WGS-002-3')!,
  giftSets.find(s => s.sku === 'WGS-004-3')!,
  giftSets.find(s => s.sku === 'WGS-006-3')!,
]

const b = '1px solid var(--grid-color)'

export function HomepageProductsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  function CardImage({ set, large = false }: { set: typeof giftSets[0]; large?: boolean }) {
    const hovered = hoveredId === set.id
    const hasHover = Boolean(set.hoverImage)
    return (
      <Link
        to={`/gift-sets/${set.id}` as RouterTo}
        style={{ display: 'block', overflow: 'hidden', background: '#f0eeeb', textDecoration: 'none', position: 'relative' }}
        className={large ? 'aspect-[3/4] md:aspect-auto md:h-full' : 'aspect-[4/3]'}
        onMouseEnter={() => setHoveredId(set.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <img
          src={cloudinaryUrl(set.coverImage)}
          alt={set.name}
          loading={large ? 'eager' : 'lazy'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s ease', opacity: hasHover && hovered ? 0 : 1 }}
        />
        {hasHover && (
          <img
            src={cloudinaryUrl(set.hoverImage!)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease', opacity: hovered ? 1 : 0 }}
          />
        )}
      </Link>
    )
  }

  function CardInfo({ set, large = false }: { set: typeof giftSets[0]; large?: boolean }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: large ? '1.5rem' : '1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb' }}>
            {set.sku}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#888', whiteSpace: 'nowrap' }}>
            {set.fob} FOB
          </span>
        </div>
        <Link to={`/gift-sets/${set.id}` as RouterTo} style={{ textDecoration: 'none' }}>
          <p className="display-title" style={{ fontSize: large ? '1.3rem' : '1rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.2 }}>
            {set.name}
          </p>
        </Link>
        <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.6 }}>
          {set.tagline}
        </p>
      </div>
    )
  }

  return (
    <section style={{ borderTop: b }}>
      {/* Header */}
      <div style={{ padding: '5rem 1.5rem', borderBottom: b, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.75rem' }}>
            Featured Sets
          </p>
          <h2 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 300, lineHeight: 1.05 }}>
            Curated Gift Sets
          </h2>
          <p style={{ fontSize: '0.76rem', color: '#666', lineHeight: 1.65, marginTop: '0.75rem', maxWidth: '52ch', borderLeft: '2px solid var(--accent-brand)', paddingLeft: '0.75rem' }}>
            Branding shown is illustrative. Every piece leaves the factory marked with your logo — engraved to your specification, not ours.
          </p>
        </div>
        <Link
          to={'/featured' as RouterTo}
          style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-brand)', border: `1px solid var(--accent-brand)`, padding: '0.65rem 1.75rem', textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
        >
          View All Sets
        </Link>
      </div>

      {/*
        Craighill-style 4-row grid (desktop):
          Row 1: [large img ──┐] [small img 1      ]
          Row 2: [            │] [small info 1      ]
          Row 3: [large img ──┘] [small img 2      ]
          Row 4: [large info   ] [small info 2     ]
        Mobile: items flow in DOM order (large card first, then small cards)
      */}
      <div style={{ display: 'grid', borderLeft: b }} className="grid-cols-1 md:grid-cols-2">

        {/* Large image — col 1, rows 1-3 */}
        <div style={{ borderRight: b }} className="md:col-start-1 md:row-start-1 md:row-span-3">
          <CardImage set={featured[0]} large />
        </div>

        {/* Large info — col 1, row 4 */}
        <div style={{ borderRight: b, borderBottom: b }} className="md:col-start-1 md:row-start-4">
          <CardInfo set={featured[0]} large />
        </div>

        {/* Small img 1 — col 2, row 1 */}
        <div style={{ borderRight: b, borderBottom: b }} className="md:col-start-2 md:row-start-1">
          <CardImage set={featured[1]} />
        </div>

        {/* Small info 1 — col 2, row 2 */}
        <div style={{ borderRight: b, borderBottom: b }} className="md:col-start-2 md:row-start-2">
          <CardInfo set={featured[1]} />
        </div>

        {/* Small img 2 — col 2, row 3 */}
        <div style={{ borderRight: b, borderBottom: b }} className="md:col-start-2 md:row-start-3">
          <CardImage set={featured[2]} />
        </div>

        {/* Small info 2 — col 2, row 4 */}
        <div style={{ borderRight: b, borderBottom: b }} className="md:col-start-2 md:row-start-4">
          <CardInfo set={featured[2]} />
        </div>
      </div>
    </section>
  )
}
