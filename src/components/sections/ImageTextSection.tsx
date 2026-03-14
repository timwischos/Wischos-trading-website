interface ImageTextSectionProps {
  image: string
  imageAlt?: string
  kicker?: string
  heading: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  imageRight?: boolean
}

export function ImageTextSection({
  image,
  imageAlt = '',
  kicker,
  heading,
  body,
  ctaLabel,
  ctaHref,
  imageRight = false,
}: ImageTextSectionProps) {
  const imageCol = (
    <div style={{ overflow: 'hidden', background: '#f5f5f5' }}>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )

  const textCol = (
    <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}>
      {kicker && (
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888' }}>
          {kicker}
        </p>
      )}
      <h2 className="display-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, lineHeight: 1.05, color: '#0a0a0a' }}>
        {heading}
      </h2>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: '#555', maxWidth: '38ch' }}>
        {body}
      </p>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          style={{
            display: 'inline-block', marginTop: '0.5rem',
            fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0a0a0a', border: '1px solid #0a0a0a',
            padding: '0.65rem 1.5rem', textDecoration: 'none', width: 'fit-content',
            transition: 'background 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
        >
          {ctaLabel}
        </a>
      )}
    </div>
  )

  return (
    <section style={{ borderTop: '1px solid var(--grid-color)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
        className="lg:grid-cols-2"
      >
        {imageRight ? (
          <>
            {/* Mobile: image first, text second */}
            <div className="lg:hidden">{imageCol}</div>
            <div style={{ borderTop: '1px solid var(--grid-color)' }} className="lg:hidden">{textCol}</div>
            {/* Desktop: text left, image right */}
            <div className="hidden lg:block">{textCol}</div>
            <div style={{ borderLeft: '1px solid var(--grid-color)' }} className="hidden lg:block">{imageCol}</div>
          </>
        ) : (
          <>
            {imageCol}
            <div style={{ borderTop: '1px solid var(--grid-color)' }} className="lg:hidden">{textCol}</div>
            <div style={{ borderLeft: '1px solid var(--grid-color)' }} className="hidden lg:block">{textCol}</div>
          </>
        )}
      </div>
    </section>
  )
}
