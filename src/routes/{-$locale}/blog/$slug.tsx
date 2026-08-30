import type { CSSProperties } from 'react'
import { createFileRoute, notFound, Link, type LinkProps } from '@tanstack/react-router'
import { buildOgMeta, buildCanonical } from '@/content/meta'
import { blogPosts } from '@/content/blog'
import { mdxComponents } from '@/components/blog/MdxComponents'

const mdxArticles = import.meta.glob('../../../content/articles/*.mdx', { eager: true }) as Record<string, { default: React.FC<{ components?: Record<string, any> }> }>

type RouterTo = LinkProps['to']

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/{-$locale}/blog/$slug')({
  loader: ({ params }) => {
    const post = blogPosts.find(p => p.slug === params.slug)
    if (!post) throw notFound()
    const others = blogPosts
      .filter(p => p.slug !== params.slug)
      .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
      .slice(0, 2)
    return { post, others }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return {}
    const { post } = loaderData
    return {
      meta: [
        { title: post.metaTitle },
        { name: 'description', content: post.metaDescription },
        ...buildOgMeta({
          title: post.metaTitle,
          description: post.metaDescription,
          image: post.heroImage,
          url: `/blog/${post.slug}`,
        }),
      ],
      links: [buildCanonical(`/blog/${post.slug}`)],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDescription,
            image: post.heroImage,
            inLanguage: 'en',
            datePublished: post.isoDate,
            dateModified: post.isoDate,
            author: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Wischos Gift',
              url: 'https://wischosgift.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://wischosgift.com/blog/${post.slug}`,
            },
          }),
        },
        // HowTo schema for the "How to Order" guide article
        ...(post.slug === 'how-to-order-custom-corporate-gifts-from-china'
          ? [{
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'How to Order Custom Metal Corporate Gifts from China',
                description: 'Step-by-step guide for procurement teams, distributors, and corporate buyers to source custom-branded metal gift sets from China.',
                inLanguage: 'en',
                totalTime: 'P60D',
                estimatedCost: {
                  '@type': 'MonetaryAmount',
                  currency: 'USD',
                  value: '14-58',
                },
                supply: [
                  { '@type': 'HowToSupply', name: 'Recipient profile and target quantity' },
                  { '@type': 'HowToSupply', name: 'Logo files (vector preferred)' },
                  { '@type': 'HowToSupply', name: 'Target budget and timeline' },
                  { '@type': 'HowToSupply', name: 'Destination country and Incoterm preference' },
                ],
                step: [
                  {
                    '@type': 'HowToStep',
                    name: 'Submit an inquiry with your brief',
                    text: 'Send recipient profile, quantity range, target budget, branding requirements, destination country, and delivery timeline through the inquiry form or email. We respond within 1–2 business days.',
                    url: 'https://wischosgift.com/contact',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Receive set recommendation and indicative quotation',
                    text: 'We recommend a set direction (existing catalog or custom), confirm material and packaging configuration, and provide indicative FOB pricing or CIF/DDP landed cost depending on your Incoterm preference.',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Approve samples',
                    text: 'Custom samples with your logo applied take 7–10 working days and are couriered to your destination in 4–7 days via DHL/FedEx. We do not start bulk production without your written sample approval.',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Pay deposit and start production',
                    text: 'Pay 30% deposit via T/T or Wise (USD, CNY, HKD, SGD accepted). Bulk production runs 25–35 days including logo application, packaging assembly, and pre-shipment QC.',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Receive pre-shipment QC photos and FTA documentation',
                    text: 'We send pre-shipment QC photos and video for your approval, arrange the relevant FTA Certificate of Origin (ChAFTA, NZ–China FTA, CSFTA, China–Switzerland FTA, CEPA where applicable), and prepare commercial invoice and packing list.',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Pay balance and ship',
                    text: 'Pay 70% balance before shipment. Goods ship via sea freight (5–28 days depending on destination) or air express (2–7 days). We coordinate with your freight forwarder or arrange shipment on DDP terms.',
                  },
                ],
              }),
            }]
          : []),
        // FAQPage + HowTo schema for the quality checklist article
        ...(post.slug === 'metal-corporate-gift-quality-checklist'
          ? [
              {
                type: 'application/ld+json',
                children: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'What is the most important quality check for metal corporate gifts?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The first check is material honesty. Buyers should know whether the item is solid brass, stainless steel, aluminium, titanium, zinc alloy, plated metal, or coated plastic. Once the real material is clear, weight, finish, logo method, and packaging can be judged properly.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does heavier always mean better for metal gifts?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'No. Weight should match the use case. A desk pen or letter opener may benefit from a substantial feel, but a key organizer, card case, or travel item can become inconvenient if it is too heavy. Good metal gift quality is about balance, not maximum weight.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is laser engraving always the best logo method for metal gifts?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Laser engraving is often strong for metal because it creates a durable mark without an added ink layer. It is not always best for exact brand colours, gradients, very small text, or high-visibility event branding. Buyers should approve the real mark on the real surface.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What surface finish is safest for daily-use metal gifts?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'For daily handling, brushed, matte, and bead-blasted finishes are usually more forgiving than mirror polish because they hide fingerprints and micro-scratches better. The right finish depends on material, product shape, logo method, and whether the item is used on a desk, in a pocket, or with drinkware.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'When should a metal corporate gift be tested?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Testing should be considered when the product touches food or drink, may appeal to children, contains coatings or inks, includes electronics, makes sustainability or material claims, or ships to a market with specific safety and substance rules. Visual inspection alone is not enough for those cases.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What should I ask a supplier before ordering custom metal gifts?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Ask for the material, finish, logo method, sample weight, MOQ, packaging route, production time, destination assumptions, and any testing or documentation needed. Also ask whether the sample you approve will match the mass-production process.',
                      },
                    },
                  ],
                }),
              },
              {
                type: 'application/ld+json',
                children: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'HowTo',
                  name: 'How to Check Metal Corporate Gift Quality Before Ordering',
                  description: 'The Wischos Pre-Production Review: a 7-point quality framework for buyers reviewing custom metal corporate gifts before approving production.',
                  inLanguage: 'en',
                  totalTime: 'PT30M',
                  tool: [
                    { '@type': 'HowToTool', name: 'Physical sample' },
                    { '@type': 'HowToTool', name: 'Scale or weight measurement' },
                    { '@type': 'HowToTool', name: 'Sample approval worksheet' },
                  ],
                  step: [
                    {
                      '@type': 'HowToStep',
                      position: 1,
                      name: 'Confirm what metal the product actually uses',
                      text: 'Ask the supplier to state the material plainly in the quote: is the main body solid metal or plated? If plated, what is the base material? If stainless steel, what grade? If aluminium, is the colour anodised, painted, or coated? If titanium, which component and how is that verified?',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 2,
                      name: 'Check whether the weight fits the use case',
                      text: 'Handle the sample and ask whether the weight suits the intended use. Record the sample weight in grams. A desk pen can carry real weight; a daily-carry key organizer or card case should be light enough that recipients keep it on them.',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 3,
                      name: 'Run your fingers along every edge',
                      text: 'Run a fingertip around the full perimeter of the sample. Check edges on card cases, clip ends, hinge lines, seams on bottles, corners, logo edges after engraving, and holes or ring slots. Look for anything that feels unfinished or uncomfortable.',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 4,
                      name: 'Match the surface finish to real use',
                      text: 'Handle the sample for a few minutes and check for fingerprints, coating consistency at edges and recesses, and whether the finish suits the use case. Mirror polish shows wear quickly under pocket carry; brushed and matte finishes are more forgiving.',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 5,
                      name: 'Approve the real logo on the real surface',
                      text: 'Confirm logo size in millimetres and exact placement. Request a pre-production sample or engraving test on the actual surface and material. If the project is a gift set, check every item in the set separately.',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 6,
                      name: 'Test every moving part repeatedly',
                      text: 'Click, fold, slide, or thread the mechanism repeatedly — not just once. Check pens for click or twist action, bottles for thread smoothness, hinges for consistent resistance, card cases for spring return, and clips for appropriate tension.',
                    },
                    {
                      '@type': 'HowToStep',
                      position: 7,
                      name: 'Verify packaging prevents metal-on-metal damage',
                      text: 'Pack the sample in its intended packaging, shake it for ten seconds, and open it. If anything has shifted or you can hear parts moving, the packaging is not finished. Check that each item has its own recess, sleeve, or separator.',
                    },
                  ],
                }),
              },
            ]
          : []),
      ],
    }
  },
  component: ArticlePage,
})

// ─── Prose styles ─────────────────────────────────────────────────────────────

const prose = {
  wrapper: { maxWidth: '72ch', margin: '0 auto' } as CSSProperties,
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
  inlineLink: {
    color: 'var(--accent-brand)',
    textDecoration: 'underline',
    textDecorationColor: 'var(--accent-brand-light)',
    textUnderlineOffset: '3px',
  } as CSSProperties,
  callout: {
    borderLeft: '3px solid var(--accent-brand)',
    paddingLeft: '1.25rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    color: '#3a3a3a',
    fontStyle: 'italic',
    fontSize: '1rem',
    lineHeight: 1.75,
  } as CSSProperties,
}


// ─── Page component ───────────────────────────────────────────────────────────

function ArticlePage() {
  const { post, others } = Route.useLoaderData()
  return (
    <main>
      {/* Back link */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <Link
          to={'/blog' as RouterTo}
          style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}
        >
          ← All Articles
        </Link>
      </div>

      {/* Article header */}
      <header style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 1.75rem' }}>
        <p style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-brand)',
          marginBottom: '0.75rem',
        }}>
          {post.category}
        </p>
        <h1 style={{
          fontFamily: '"Cormorant", Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: '#0a0a0a',
          lineHeight: 1.15,
          marginBottom: '1rem',
          maxWidth: '72ch',
        }}>
          {post.title}
        </h1>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: '#999',
        }}>
          <span>{post.readTime}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', flexShrink: 0 }} />
          <span>{post.publishedAt}</span>
        </div>
      </header>

      {/* Hero image */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto 2.5rem',
        padding: '0 1.5rem',
      }}>
        <div style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        {post.heroImageCredit ? (
          <p style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.4rem', textAlign: 'right' }}>
            {post.heroImageCredit}
          </p>
        ) : null}
      </div>

      {/* Quick Answer */}
      {post.quickAnswer && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 2rem' }}>
          <div style={{
            background: '#faf7f4',
            border: '1px solid #e8ddd3',
            borderLeft: '3px solid var(--accent-brand)',
            borderRadius: '2px',
            padding: '1rem 1.25rem',
          }}>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '0.4rem' }}>
              Quick Answer
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#2a2a2a', margin: 0 }}>
              {post.quickAnswer}
            </p>
          </div>
        </div>
      )}

      {/* Article body */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
        {(() => {
          const MdxContent = mdxArticles[`../../../content/articles/${post.slug}.mdx`]?.default
          if (MdxContent) return <MdxContent components={mdxComponents} />
          return <p style={prose.p}>Article content coming soon.</p>
        })()}
      </div>

      {/* More articles */}
      {others.length > 0 && (
        <section style={{
          maxWidth: '860px',
          margin: '4rem auto 0',
          padding: '3rem 1.5rem',
          borderTop: '1px solid #e8e8e8',
        }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '1.5rem',
          }}>
            More Articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map(other => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}` as RouterTo}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid #e8e8e8',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div style={{ paddingTop: '52%', position: 'relative', overflow: 'hidden', background: '#f5f5f5' }}>
                  <img
                    src={other.heroImage}
                    alt={other.heroImageAlt}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '0.4rem' }}>
                    {other.category}
                  </p>
                  <p style={{ fontFamily: '"Cormorant", Georgia, serif', fontSize: '1.1rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3 }}>
                    {other.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{
        background: '#0a0a0a',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        textAlign: 'center',
        marginTop: '4rem',
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '1rem' }}>
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
          Curated metal products and gift set concepts for B2B programs. Custom branding,
          packaging, and sourcing support available.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to={'/products' as RouterTo}
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent-brand)', color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '1px' }}
          >
            View Products
          </Link>
          <Link
            to={'/contact' as RouterTo}
            style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'transparent', color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '1px' }}
          >
            Send an Inquiry
          </Link>
        </div>
      </section>
    </main>
  )
}
