import { useState } from 'react'
import { createFileRoute, Link, type LinkProps } from '@tanstack/react-router'
import { giftSets, type GiftSet } from '@/content/giftSets'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/featured')({
  head: () => ({
    meta: [
      { title: 'Featured Gift Sets | Wischos Gift' },
      { name: 'description', content: 'Curated premium metal gift sets for corporate buyers. Each set is fully custom-branded with your logo. MOQ 100 sets. Explore writing, desk, EDC and drinkware combinations.' },
      ...buildOgMeta({
        title: 'Featured Gift Sets | Wischos Gift',
        description: 'Curated premium metal gift sets for corporate buyers. Each set is fully custom-branded with your logo. MOQ 100 sets. Explore writing, desk, EDC and drinkware combinations.',
        image: siteMeta.defaultOgImage,
        url: '/featured',
      }),
    ],
    links: [buildCanonical('/featured')],
  }),
  component: FeaturedPage,
})

function GiftSetCard({ set }: { set: GiftSet }) {
  const [hovered, setHovered] = useState(false)
  const hasHover = Boolean(set.hoverImage)

  return (
    <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <Link
        to={`/gift-sets/${set.id}` as RouterTo}
        style={{ display: 'block', aspectRatio: '4/3', overflow: 'hidden', background: '#f7f7f7', textDecoration: 'none', position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={set.coverImage}
          alt={set.name}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'opacity 0.4s ease',
            opacity: hasHover && hovered ? 0 : 1,
          }}
        />
        {hasHover && (
          <img
            src={set.hoverImage}
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
      </Link>

      {/* Content */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, borderTop: '1px solid var(--grid-color)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb' }}>{set.sku}</span>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.06em', color: '#0a0a0a', fontWeight: 500 }}>{set.fob} FOB</span>
        </div>

        <Link to={`/gift-sets/${set.id}` as RouterTo} style={{ textDecoration: 'none' }}>
          <p className="display-title" style={{ fontSize: '1.2rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.2 }}>
            {set.name}
          </p>
        </Link>
        <p style={{ fontSize: '0.78rem', color: '#6b6b6b', lineHeight: 1.6, fontStyle: 'italic' }}>
          "{set.tagline}"
        </p>

        {/* Items */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {set.components.map((item) => (
            <li key={item.sku} style={{ fontSize: '0.75rem', color: '#555', display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
              <span style={{ color: '#bbb', fontSize: '0.6rem', flexShrink: 0, fontFamily: 'monospace' }}>{item.sku}</span>
              {item.name}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#767676' }}>
            Packaging: <span style={{ fontWeight: 500, color: '#444', textTransform: 'none', letterSpacing: 0 }}>{set.packaging}</span>
          </p>
          <p style={{ fontSize: '0.68rem', color: '#999', lineHeight: 1.5 }}>{set.targetBuyer}</p>
          <Link
            to={`/gift-sets/${set.id}` as RouterTo}
            style={{
              marginTop: '0.5rem',
              fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#0a0a0a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              transition: 'gap 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '0.65rem' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '0.4rem' }}
          >
            View Set Details <span style={{ fontSize: '0.8rem' }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturedPage() {
  return (
    <>
      {/* Page header */}
      <section style={{ borderBottom: '1px solid var(--grid-color)' }}>
        <div style={{ display: 'grid' }} className="grid-cols-1 lg:grid-cols-2">
          <div style={{ padding: '4rem 2rem 3rem', borderBottom: '1px solid var(--grid-color)' }} className="lg:border-b-0 lg:border-r border-[var(--grid-color)]">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#767676', marginBottom: '1rem' }}>
              Curated Collections
            </p>
            <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 300, lineHeight: 1.05, color: '#0a0a0a', marginBottom: '1rem' }}>
              Gift Sets
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#767676', lineHeight: 1.7, maxWidth: '36ch' }}>
              Defined by utility and material substance. Custom branding available from 100 units. Samples provided upon request.
            </p>
          </div>
          <div style={{ padding: '4rem 2rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#444', maxWidth: '40ch' }}>
              Six pre-designed sets combining our most-ordered metal pieces. Each set ships from MOQ 100, fully custom-branded with your logo and packaging colour.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.25rem' }}>MOQ</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a' }}>100 sets</p>
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.25rem' }}>Lead Time</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a' }}>25–35 days</p>
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', marginBottom: '0.25rem' }}>Price Range</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a' }}>$12–50 FOB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift set grid */}
      <section>
        <div
          style={{ display: 'grid', borderLeft: '1px solid var(--grid-color)' }}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {giftSets.map((set) => (
            <GiftSetCard key={set.sku} set={set} />
          ))}
          {/* More coming card */}
          <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', display: 'flex', flexDirection: 'column' }}>
            {/* Image placeholder */}
            <div style={{ aspectRatio: '4/3', background: '#f2f0ed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2px', background: '#ccc' }} />
              <div style={{ width: '2px', height: '2rem', background: '#ccc', marginTop: '-1.5rem' }} />
            </div>
            {/* Content */}
            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, borderTop: '1px solid var(--grid-color)' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb' }}>
                Expanding Collection
              </span>
              <p className="display-title" style={{ fontSize: '1.2rem', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.2 }}>
                More Sets Coming
              </p>
              <p style={{ fontSize: '0.78rem', color: '#6b6b6b', lineHeight: 1.6 }}>
                New sets are added as we source and qualify new product combinations. Have a theme or occasion in mind? We can build a set around your brief.
              </p>
            </div>
          </div>

          {/* CTA card */}
          <div style={{ borderRight: '1px solid var(--grid-color)', borderBottom: '1px solid var(--grid-color)', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              Custom Brief
            </p>
            <p className="display-title" style={{ fontSize: '1.5rem', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
              Need a bespoke set?
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Tell us your budget, headcount, and theme — we'll propose a set built around your brief.
            </p>
            <Link
              to={'/contact' as RouterTo}
              style={{
                marginTop: '0.5rem',
                fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#0a0a0a', background: '#fff',
                padding: '0.75rem 2rem', textDecoration: 'none',
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Start a Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom note */}
      <section style={{ padding: '2.5rem 2rem', borderTop: '1px solid var(--grid-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '0.8rem', color: '#767676', lineHeight: 1.6, maxWidth: '44ch' }}>
          All sets are samples-before-order. Request physical samples of any set at cost before committing to a bulk run.
        </p>
        <Link
          to={'/how-it-works' as RouterTo}
          style={{
            fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0a0a0a', border: '1px solid #0a0a0a',
            padding: '0.6rem 1.5rem', textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
        >
          How It Works
        </Link>
      </section>
    </>
  )
}
