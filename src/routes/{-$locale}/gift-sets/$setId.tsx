import { useState } from 'react'
import { createFileRoute, Link, notFound, type LinkProps } from '@tanstack/react-router'
import { giftSets, getGiftSetById } from '@/content/giftSets'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { cloudinaryUrl } from '@/lib/cloudinary'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/gift-sets/$setId')({
  loader: ({ params }) => {
    const set = getGiftSetById(params.setId)
    if (!set) throw notFound()
    return { set }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.set) return {}
    const { set } = loaderData
    const title = `${set.name} | Wischos Gift Sets`
    const description = set.heroCopy.slice(0, 155)
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        ...buildOgMeta({
          title,
          description,
          image: set.coverImage || siteMeta.defaultOgImage,
          type: 'product',
          url: `/gift-sets/${set.id}`,
        }),
      ],
      links: [buildCanonical(`/gift-sets/${set.id}`)],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: set.name,
            description: set.heroCopy.slice(0, 200),
            sku: set.sku,
            image: set.coverImage
              ? [`https://wischosgift.com${set.coverImage}`]
              : [],
            brand: { '@type': 'Brand', name: 'Wischos Gift' },
            offers: {
              '@type': 'Offer',
              url: `https://wischosgift.com/gift-sets/${set.id}`,
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                description: `Price on request. MOQ 100 sets. FOB: ${set.fob}`,
              },
              seller: { '@type': 'Organization', name: 'Wischos Gift' },
            },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wischosgift.com/' },
              { '@type': 'ListItem', position: 2, name: 'Gift Sets', item: 'https://wischosgift.com/gift-sets' },
              { '@type': 'ListItem', position: 3, name: set.name, item: `https://wischosgift.com/gift-sets/${set.id}` },
            ],
          }),
        },
      ],
    }
  },
  component: GiftSetDetailPage,
})

function GiftSetDetailPage() {
  const { set } = Route.useLoaderData()
  const [activeImg, setActiveImg] = useState(0)
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null)

  // Adjacent sets for navigation
  const currentIdx = giftSets.findIndex((s) => s.id === set.id)
  const prevSet = giftSets[currentIdx - 1]
  const nextSet = giftSets[currentIdx + 1]

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--grid-color)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link to={"/{-$locale}/featured" as RouterTo} style={{ fontSize: '0.72rem', color: '#6b6b6b', textDecoration: 'none', letterSpacing: '0.06em' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b6b6b' }}
        >
          Gift Sets
        </Link>
        <span style={{ fontSize: '0.7rem', color: '#ccc' }}>›</span>
        <span style={{ fontSize: '0.72rem', color: '#0a0a0a', letterSpacing: '0.06em' }}>{set.name}</span>
      </div>

      {/* Main layout: image gallery + details */}
      <div style={{ display: 'grid' }} className="grid-cols-1 lg:grid-cols-2">

        {/* Left: Image gallery */}
        <div style={{ borderRight: '1px solid var(--grid-color)' }}>
          {/* Main image */}
          <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#f7f7f7', borderBottom: '1px solid var(--grid-color)' }}>
            <img
              src={cloudinaryUrl(set.images[activeImg])}
              alt={`${set.name} — image ${activeImg + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Thumbnails */}
          {set.images.length > 1 && (
            <div style={{ display: 'flex', borderBottom: '1px solid var(--grid-color)' }}>
              {set.images.map((img, i) => {
                const component = i > 0 ? (set.components.find(c => c.imageIndex === i) ?? null) : null
                const isHovered = hoveredThumb === i
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1, aspectRatio: '1/1', position: 'relative',
                      borderRight: i < set.images.length - 1 ? '1px solid var(--grid-color)' : 'none',
                    }}
                    onMouseEnter={() => component && setHoveredThumb(i)}
                    onMouseLeave={() => setHoveredThumb(null)}
                  >
                    <button
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: '100%', height: '100%', padding: 0, border: 'none', cursor: 'pointer',
                        background: 'none', outline: 'none', display: 'block',
                        opacity: activeImg === i ? 1 : 0.5,
                        transition: 'opacity 150ms ease',
                      }}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={cloudinaryUrl(img)}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </button>
                    {component && (
                      <Link
                        to={`/products/${component.productId}` as RouterTo}
                        style={{
                          position: 'absolute', bottom: '0.5rem', left: '50%', transform: `translateX(-50%) translateY(${isHovered ? '0' : '4px'})`,
                          fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                          background: 'rgba(10,10,10,0.85)', color: '#fff',
                          padding: '0.35rem 0.75rem', textDecoration: 'none', whiteSpace: 'nowrap',
                          opacity: isHovered ? 1 : 0,
                          transition: 'opacity 180ms ease, transform 180ms ease',
                          pointerEvents: isHovered ? 'auto' : 'none',
                        }}
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* SKU + FOB */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', fontFamily: 'monospace' }}>
              {set.sku}
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0a0a0a' }}>{set.fob} FOB</span>
          </div>

          {/* Name + Tagline */}
          <div>
            <h1 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, lineHeight: 1.05, color: '#0a0a0a', marginBottom: '0.75rem' }}>
              {set.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6b6b6b', fontStyle: 'italic', lineHeight: 1.6 }}>
              "{set.tagline}"
            </p>
          </div>

          {/* Hero Copy */}
          <p style={{ fontSize: '0.875rem', color: '#444', lineHeight: 1.8 }}>
            {set.heroCopy}
          </p>

          {/* Logo disclaimer */}
          <p style={{ fontSize: '0.72rem', color: '#aaa', lineHeight: 1.6, fontStyle: 'italic' }}>
            Branding shown is illustrative. Every piece leaves the factory marked with your logo — engraved to your specification, not ours.
          </p>

          {/* Components */}
          <div style={{ borderTop: '1px solid var(--grid-color)', paddingTop: '1.25rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.875rem' }}>
              Set Components
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {set.components.map((item) => (
                <li key={item.sku} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#aaa', flexShrink: 0, minWidth: '4.5rem' }}>{item.sku}</span>
                  <span style={{ fontSize: '0.82rem', color: '#0a0a0a' }}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Packaging + MOQ */}
          <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--grid-color)', paddingTop: '1.25rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.3rem' }}>Default Package</p>
              <p style={{ fontSize: '0.85rem', color: '#0a0a0a', marginBottom: '0.25rem' }}>{set.packaging}</p>
              <p style={{ fontSize: '0.7rem', color: '#999', lineHeight: 1.5 }}>Custom packaging available on request</p>
            </div>
            <div>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.3rem' }}>MOQ</p>
              <p style={{ fontSize: '0.85rem', color: '#0a0a0a' }}>100 sets</p>
            </div>
            <div>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.3rem' }}>Lead Time</p>
              <p style={{ fontSize: '0.85rem', color: '#0a0a0a' }}>25–35 days</p>
              <p style={{ fontSize: '0.7rem', color: '#999', lineHeight: 1.5, marginTop: '0.25rem' }}>Subject to customization details</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ borderTop: '1px solid var(--grid-color)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6 }}>
              {set.cta} Request a quote for{' '}
              <span style={{ fontWeight: 500 }}>{set.sku}</span>.
            </p>
            <Link
              to={'/contact' as RouterTo}
              style={{
                display: 'inline-block',
                fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                background: '#0a0a0a', color: '#fff',
                padding: '0.875rem 2.5rem', textDecoration: 'none',
                transition: 'opacity 150ms ease', alignSelf: 'flex-start',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.82' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Request a Quote
            </Link>
          </div>

          {/* Target buyer */}
          <p style={{ fontSize: '0.72rem', color: '#999', lineHeight: 1.6, borderTop: '1px solid var(--grid-color)', paddingTop: '1rem' }}>
            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.62rem' }}>Ideal for: </span>
            {set.targetBuyer}
          </p>
        </div>
      </div>

      {/* Expert Notes */}
      {set.expertNotes && set.expertNotes.length > 0 && (
        <section style={{ borderTop: '1px solid var(--grid-color)', padding: '3rem 2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1.5rem' }}>
            Expert Notes — Packaging & Customization
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {set.expertNotes.map((note, i) => (
              <div key={i}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                  {note.title}
                </p>
                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.75, margin: 0 }}>
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selling Points */}
      <section style={{ borderTop: '1px solid var(--grid-color)' }}>
        <div style={{ display: 'grid', borderLeft: '1px solid var(--grid-color)' }} className="grid-cols-1 md:grid-cols-3">
          {set.sellingPoints.map((sp, i) => (
            <div key={i} style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.875rem' }}>
                0{i + 1}
              </p>
              <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {sp.title}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.75 }}>
                {sp.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section style={{ borderTop: '1px solid var(--grid-color)', display: 'grid' }} className="grid-cols-1 md:grid-cols-2">
        <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)' }}>
          {prevSet ? (
            <Link
              to={`/gift-sets/${prevSet.id}` as RouterTo}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '1.75rem 2rem', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fafafa' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span style={{ fontSize: '0.62rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>← Previous</span>
              <span className="display-title" style={{ fontSize: '1rem', color: '#0a0a0a', fontWeight: 300 }}>{prevSet.name}</span>
              <span style={{ fontSize: '0.7rem', color: '#999', fontFamily: 'monospace' }}>{prevSet.sku}</span>
            </Link>
          ) : (
            <div style={{ padding: '1.75rem 2rem' }} />
          )}
        </div>
        <div style={{ borderBottom: '1px solid var(--grid-color)', textAlign: 'right' }}>
          {nextSet ? (
            <Link
              to={`/gift-sets/${nextSet.id}` as RouterTo}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '1.75rem 2rem', textDecoration: 'none', alignItems: 'flex-end' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fafafa' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span style={{ fontSize: '0.62rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next →</span>
              <span className="display-title" style={{ fontSize: '1rem', color: '#0a0a0a', fontWeight: 300 }}>{nextSet.name}</span>
              <span style={{ fontSize: '0.7rem', color: '#999', fontFamily: 'monospace' }}>{nextSet.sku}</span>
            </Link>
          ) : (
            <div style={{ padding: '1.75rem 2rem' }} />
          )}
        </div>
      </section>

      {/* Back to all sets */}
      <section style={{ padding: '2rem', borderTop: '1px solid var(--grid-color)', display: 'flex', justifyContent: 'center' }}>
        <Link
          to={"/{-$locale}/featured" as RouterTo}
          style={{
            fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0a0a0a', border: '1px solid #0a0a0a',
            padding: '0.6rem 1.75rem', textDecoration: 'none',
            transition: 'background 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
        >
          ← All Gift Sets
        </Link>
      </section>
    </>
  )
}
