import type { CSSProperties, ReactNode } from 'react'

// Prose style tokens — mirrors $slug.tsx prose object
const s = {
  h2: {
    fontFamily: '"Cormorant", Georgia, serif',
    fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: '#0a0a0a',
    marginTop: '2.25rem',
    marginBottom: '0.65rem',
    lineHeight: 1.25,
  } as CSSProperties,
  p: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#3a3a3a',
    marginBottom: '1.15rem',
  } as CSSProperties,
  ul: { paddingLeft: '1.4rem', marginBottom: '1.15rem' } as CSSProperties,
  li: {
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#3a3a3a',
    marginBottom: '0.35rem',
  } as CSSProperties,
  strong: { fontWeight: 600, color: '#1a1a1a' } as CSSProperties,
  a: {
    color: 'var(--accent-brand)',
    textDecoration: 'underline',
    textDecorationColor: 'var(--accent-brand-light)',
    textUnderlineOffset: '3px',
  } as CSSProperties,
  blockquote: {
    borderLeft: '3px solid var(--accent-brand)',
    paddingLeft: '1.25rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    color: '#3a3a3a',
    fontStyle: 'italic',
    fontSize: '1rem',
    lineHeight: 1.75,
  } as CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    overflowX: 'auto' as const,
    display: 'block',
  } as CSSProperties,
  th: {
    textAlign: 'left' as const,
    padding: '0.6rem 0.75rem',
    fontWeight: 600,
    color: '#1a1a1a',
    borderBottom: '2px solid #e0e0e0',
  } as CSSProperties,
  td: {
    padding: '0.55rem 0.75rem',
    color: '#3a3a3a',
    borderBottom: '1px solid #f0f0f0',
  } as CSSProperties,
}

// Custom Callout component — use in MDX as <Callout>...</Callout>
export function Callout({ children }: { children: ReactNode }) {
  return <div style={s.blockquote}>{children}</div>
}

// Custom ArticleImage — use in MDX as <ArticleImage src="..." alt="..." caption="..." />
export function ArticleImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure style={{ margin: '1.25rem 0 1.75rem' }}>
      <div style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {caption && (
        <figcaption style={{ marginTop: '0.55rem', color: '#666', fontSize: '0.86rem', lineHeight: 1.55 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Standard element map passed as `components` prop to MDX content
export const mdxComponents: Record<string, any> = {
  wrapper: ({ children }: { children: ReactNode }) => (
    <div style={{ maxWidth: '72ch', margin: '0 auto' }}>{children}</div>
  ),
  h2: ({ children }: { children: ReactNode }) => <h2 style={s.h2}>{children}</h2>,
  h3: ({ children }: { children: ReactNode }) => (
    <h3 style={{ ...s.h2, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', marginTop: '1.75rem' }}>{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => <p style={s.p}>{children}</p>,
  ul: ({ children }: { children: ReactNode }) => <ul style={s.ul}>{children}</ul>,
  ol: ({ children }: { children: ReactNode }) => <ol style={{ ...s.ul, listStyleType: 'decimal' }}>{children}</ol>,
  li: ({ children }: { children: ReactNode }) => <li style={s.li}>{children}</li>,
  strong: ({ children }: { children: ReactNode }) => <strong style={s.strong}>{children}</strong>,
  em: ({ children }: { children: ReactNode }) => <em>{children}</em>,
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a href={href} style={s.a}>{children}</a>
  ),
  blockquote: ({ children }: { children: ReactNode }) => <div style={s.blockquote}>{children}</div>,
  table: ({ children }: { children: ReactNode }) => <table style={s.table}>{children}</table>,
  thead: ({ children }: { children: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => <tr style={{ borderBottom: '1px solid #f0f0f0' }}>{children}</tr>,
  th: ({ children }: { children: ReactNode }) => <th style={s.th}>{children}</th>,
  td: ({ children }: { children: ReactNode }) => <td style={s.td}>{children}</td>,
  // Custom components available in MDX without import
  Callout,
  ArticleImage,
}
