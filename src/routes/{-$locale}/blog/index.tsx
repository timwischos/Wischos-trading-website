import { createFileRoute, Link, type LinkProps } from '@tanstack/react-router'
import { buildOgMeta, buildCanonical, siteMeta } from '@/content/meta'
import { blogPosts } from '@/content/blog'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/blog/')({
  head: () => ({
    meta: [
      { title: 'Blog | Wischos Gift' },
      {
        name: 'description',
        content:
          'Practical guides on metal corporate gifting: material selection, logo customisation, sourcing from China, and how to plan around real lead times.',
      },
      ...buildOgMeta({
        title: 'Blog | Wischos Gift',
        description:
          'Practical guides on metal corporate gifting: material selection, logo customisation, sourcing from China, and how to plan around real lead times.',
        image: siteMeta.defaultOgImage,
        url: '/blog',
      }),
    ],
    links: [buildCanonical('/blog')],
  }),
  component: BlogPage,
})

function ArticleCard({ post, index }: { post: (typeof blogPosts)[number]; index: number }) {
  return (
    <Link
      to={`/blog/${post.slug}` as RouterTo}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #e8e8e8',
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        background: 'white',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Hero image */}
      <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          loading={index < 2 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem 1.35rem 1.5rem' }}>
        <p style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-brand)',
          marginBottom: '0.55rem',
        }}>
          {post.category}
        </p>
        <h2 style={{
          fontFamily: '"Cormorant", Georgia, serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontWeight: 600,
          lineHeight: 1.3,
          color: '#0a0a0a',
          marginBottom: '0.65rem',
          letterSpacing: '-0.01em',
        }}>
          {post.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.65, marginBottom: '1rem' }}>
          {post.excerpt}
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.75rem', color: '#999' }}>
          <span>{post.readTime}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', flexShrink: 0 }} />
          <span>{post.publishedAt}</span>
        </div>
      </div>
    </Link>
  )
}

function BlogPage() {
  return (
    <main>
      {/* Page hero */}
      <section style={{
        padding: 'clamp(3.5rem, 8vw, 6rem) 1.5rem clamp(2.5rem, 5vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-brand)',
          marginBottom: '1rem',
        }}>
          The Wischos Blog
        </p>
        <h1 style={{
          fontFamily: '"Cormorant", Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: '#0a0a0a',
          marginBottom: '1rem',
          lineHeight: 1.15,
        }}>
          Practical Guides for Corporate Gift Buyers
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          maxWidth: '38rem',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Material selection, logo customisation, sourcing from China, and how to plan
          around real lead times — written for procurement managers and brand teams placing
          B2B orders.
        </p>
      </section>

      {/* Article cards */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        background: '#0a0a0a',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-brand)',
          marginBottom: '1rem',
        }}>
          Ready to order?
        </p>
        <h2 style={{
          fontFamily: '"Cormorant", Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 600,
          color: 'white',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          Browse the Catalogue or Send a Brief
        </h2>
        <p style={{ fontSize: '1rem', color: '#aaa', maxWidth: '32rem', margin: '0 auto 2rem', lineHeight: 1.65 }}>
          24 products across 4 categories. MOQ 100 units. Custom branding, packaging, and
          gift set assembly available.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to={'/products' as RouterTo}
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent-brand)', color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '1px' }}
          >
            View Products
          </Link>
          <Link
            to={'/inquiry' as RouterTo}
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'transparent', color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '1px' }}
          >
            Send an Inquiry
          </Link>
        </div>
      </section>
    </main>
  )
}
