import type { CSSProperties } from 'react'
import { createFileRoute, notFound, Link, type LinkProps } from '@tanstack/react-router'
import { buildOgMeta, buildCanonical } from '@/content/meta'
import { blogPosts } from '@/content/blog'

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

function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure style={{ margin: '1.25rem 0 1.75rem' }}>
      <div style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      {caption ? (
        <figcaption style={{ marginTop: '0.55rem', color: '#666', fontSize: '0.86rem', lineHeight: 1.55 }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

// ─── Article content ──────────────────────────────────────────────────────────

function Article1Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        Every week, clients ask us a variation of the same question: <em>"Should we go with stainless steel, or is it worth upgrading to titanium?"</em> When you're ordering custom corporate gifts, the material is a much more consequential decision than it first appears. It isn't just a line item on a spreadsheet — it determines how the gift feels in the hand, how it ages on a desk for years, and the unspoken signal it sends before anyone even reads the enclosed card. A truly great gift needs to hit three marks: it must be useful, it must be interesting, and it must feel substantial.
      </p>
      <p style={prose.p}>
        Four metals dominate the premium corporate gift category. Here is how we guide our clients through what each actually means in practice.
      </p>

      <h2 style={prose.h2}>Aluminum: The Modern Canvas</h2>
      <p style={prose.p}>
        Often misunderstood because of its use in mass-promotional giveaways, high-grade machined aluminum is actually a staple of premium, minimalist design.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>What it offers:</strong> It is exceptionally lightweight and highly machinable. But its true superpower is how it takes a finish. Through anodizing, aluminum can achieve deep, matte colors — from stealth black to vibrant brand hues — that won't chip like paint. It is the perfect material when your brand guidelines require a specific color but you still want the crisp, premium feel of real metal.</li>
        <li style={prose.li}><strong style={prose.strong}>The trade-off:</strong> It is significantly softer than steel, meaning an aluminum everyday-carry tool will show dings and scratches if dropped repeatedly.</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Tech accessories, sleek{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Desk Accessories' } as never} style={prose.inlineLink}>desk items</Link>, and vibrant, brand-colored gifts.</li>
      </ul>

      <h2 style={prose.h2}>Brass: Warmth, Weight, and Prestige</h2>
      <p style={prose.p}>
        Brass has been used in fine instruments and hardware for centuries, and that history reads immediately. Its warm gold tone is distinctive at a glance, and the sheer density registers as <em>substantial</em> in a way cheaper materials simply cannot replicate.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>What it offers:</strong> Over time, raw brass develops a natural patina. Rather than looking worn, a brass object begins to look <em>owned</em> — evidence of handling and real work. For recipients who appreciate craft and living materials, this is precisely the appeal.</li>
        <li style={prose.li}><strong style={prose.strong}>The trade-off:</strong> It commands a price premium and tarnishes. If your recipients expect a perpetually shiny object, raw brass might lead to misunderstandings. It is a material for a specific type of recipient who appreciates character.</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Signature{' '}
          <Link to={'/products/wp-101' as RouterTo} style={prose.inlineLink}>writing instruments</Link>,{' '}
          <Link to={'/products/wp-206' as RouterTo} style={prose.inlineLink}>spinning tops</Link>, and commanding executive desk presence.</li>
      </ul>

      <h2 style={prose.h2}>Stainless Steel: The Reliable Workhorse</h2>
      <p style={prose.p}>
        Stainless steel is the most practical choice in the category — and the most versatile. It is built for absolute daily utility. A stainless steel object handed to someone who throws it in a bag every day will still look exactly the same in five years.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>What it offers:</strong> It requires zero maintenance and is highly resistant to corrosion. The finish range is incredibly wide: brushed, mirror-polished, matte, or PVD-coated in black or gunmetal. Laser engraving on a matte or PVD-coated stainless surface provides a striking, permanent contrast that looks exceptionally crisp.</li>
        <li style={prose.li}><strong style={prose.strong}>The trade-off:</strong> It lacks the emotional "wow" factor of titanium or brass. It is the technically correct material in most situations, even if it's rarely the one that prompts someone to mention the gift unprompted.</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong>{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'EDC Accessories' } as never} style={prose.inlineLink}>daily-carry tools</Link>, key organizers, and high-durability items at scale.</li>
      </ul>

      <h2 style={prose.h2}>Titanium: The Premium Tier</h2>
      <p style={prose.p}>
        Titanium occupies a completely different category. It offers the strength of premium stainless steel at roughly half the weight — a combination that feels almost implausible when you first pick up a machined titanium object.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>What it offers:</strong> Beyond the incredible strength-to-weight ratio, titanium is hypoallergenic, biocompatible, and among the most corrosion-resistant metals available. It performs flawlessly in saltwater environments and humid conditions. For premium{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Drinkware' } as never} style={prose.inlineLink}>drinkware</Link> or pocket tools, that weight difference is a noticeable detail that recipients appreciate every single time they use it.</li>
        <li style={prose.li}><strong style={prose.strong}>The trade-off:</strong> Titanium typically costs 2–3× more than comparable stainless steel. Because it is notoriously difficult to machine, titanium products often require longer lead times. Plan your executive gifting schedules accordingly.</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Lightweight luxury,{' '}
          <Link to={'/products/wp-401' as RouterTo} style={prose.inlineLink}>premium flasks</Link>, and VIP/Executive gifting.</li>
      </ul>

      <h2 style={prose.h2}>How to Choose</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>If you want…</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Material</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Best for…</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Lightweight, modern colorways', 'Aluminum', 'Tech accessories, sleek desk items'],
              ['Classic prestige & desk presence', 'Brass', 'Signature pens, paperweights'],
              ['Zero-maintenance durability at scale', 'Stainless Steel', 'Key organizers, daily-carry tools'],
              ['Executive luxury & high performance', 'Titanium', 'Premium flasks, executive pocket tools'],
            ].map(([want, mat, best], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{want}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: 'var(--accent-brand)', fontWeight: 600 }}>{mat}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        <strong style={prose.strong}>A strategy that works particularly well:</strong> Mix materials within a single gift set. An anodized aluminum desk tray holding a brass pen and a stainless steel key organizer creates a hierarchy of texture, weight, and color. It feels like a deliberately curated collection, not a random assortment.
      </p>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What is the best metal for corporate gifts?</p>
      <p style={prose.p}>The best metal depends on the use case. Stainless steel offers the widest durability for daily-carry items. Titanium delivers the highest strength-to-weight ratio for executive gifts. Brass communicates prestige and desk presence. Aluminum works best when brand colour matching is required via anodising.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Can I mix different metals in a single corporate gift set?</p>
      <p style={prose.p}>Yes — mixing metals is often a deliberate strategy. An anodised aluminum tray holding a brass pen and a stainless steel key organiser creates a layered hierarchy of texture and weight that reads as curated rather than uniform.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Which metal is most cost-effective for corporate gift programmes?</p>
      <p style={prose.p}>Brushed stainless steel offers the best balance of durability, finish quality, and unit cost for most programmes. Aluminum adds the option of permanent colour at a similar price point. Titanium and brass carry a premium — typically 2–3× the cost of equivalent steel — appropriate for VIP or executive tiers.</p>

      <div style={prose.callout}>
        If you're deciding between materials for an upcoming programme,{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>send us your brief</Link>.
        The Wischos team will recommend the right tier based on your budget, your recipient profile, and the exact message your gift needs to communicate.
      </div>
    </div>
  )
}

function Article2Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        You've chosen the product. You've approved the design. Now comes the question most B2B buyers don't think hard enough about: how should the logo actually be applied?
      </p>
      <p style={prose.p}>
        For premium metal corporate gifts, the debate usually comes down to two paths: laser engraving or color printing (like UV or pad printing). They might look equally sharp in a digital mockup or a product photograph. They behave very differently in real life. Here is what you need to know before you finalize your order.
      </p>

      <h2 style={prose.h2}>How Laser Engraving Works</h2>
      <p style={prose.p}>
        A focused laser beam removes material from the surface, physically altering the metal to create the design. The result is permanent — it is part of the object itself, not something sitting on top of it. A laser-engraved logo cannot peel, scratch off, or fade over time, simply because there is no ink to peel.
      </p>
      <p style={prose.p}>
        The precision is a massive advantage for complex brand guidelines. Fine lines, small text, and intricate logos reproduce flawlessly. On anodized aluminum, the laser strips the color to reveal crisp, silver metal beneath. On brass, it creates a warm, traditional contrast.
      </p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
        The B2B Superpowers: Personalization &amp; Small Batches
      </p>
      <p style={prose.p}>
        Because laser engraving is a 100% digital process, it requires no physical setup plates or ink mixing. This unlocks two massive advantages for corporate gifting:
      </p>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1.15rem' }}>
        <li style={{ ...prose.li, marginBottom: '0.65rem' }}>
          <strong style={prose.strong}>Effortless Personalization (Variable Data):</strong> If you want to gift 50 stainless steel tumblers, each featuring your company logo <em>plus</em> the individual recipient's name, laser engraving makes this economically viable. Traditional printing methods cannot do this without prohibitive setup costs.
        </li>
        <li style={{ ...prose.li, marginBottom: '0.65rem' }}>
          <strong style={prose.strong}>Low Minimum Order Quantities:</strong> Engraving a highly targeted batch of 30 VIP gifts is just as cost-effective per unit as engraving 3,000. It gives you the agility to execute premium, small-scale gifting programs without bloated budgets.
        </li>
      </ol>
      <p style={prose.p}>
        <strong style={prose.strong}>The limitation:</strong> Laser engraving is monochromatic. It relies on the contrast between the surface finish and the raw metal beneath. It does not reproduce specific Pantone colors.
      </p>

      <h2 style={prose.h2}>How Color Printing Works (UV &amp; Pad Printing)</h2>
      <p style={prose.p}>
        For metal hard goods, modern color application usually means UV printing or pad printing. Ink is applied directly to the product's surface, often cured instantly with UV light. It is capable of reproducing complex, full-color brand palettes and exact Pantone matches.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>The limitation:</strong> Durability and setup constraints. Because the ink sits <em>on</em> the surface, it is vulnerable. Under regular handling — a pen carried daily, a tumbler through a dishwasher, a titanium daily-carry tool in a pocket — printed logos inevitably begin to show wear. You will notice fading at the edges, chipping on raised surfaces, and dulling on areas of high contact, often within months. Furthermore, high setup costs mean it is rarely cost-effective for small batches.
      </p>

      <h2 style={prose.h2}>The Durability Gap in Practice</h2>
      <p style={prose.p}>
        In our experience, the difference in lifespan is stark. This is the difference between a gift that still proudly carries your brand in year three, and one that carries a scratched, faded approximation of it.
      </p>
      <p style={prose.p}>
        There is a reason premium retail brands — YETI and Stanley among them — rely almost exclusively on laser engraving for their metal products. It is a deliberate quality signal, not a manufacturing constraint. When a product is built to last a lifetime, the branding should be, too.
      </p>

      <h2 style={prose.h2}>Which to Choose</h2>
      <p style={prose.p}>
        <strong style={prose.strong}>Choose laser engraving</strong> when the gift is a premium metal item intended to last, when your logo works well in monochrome, and especially if you are running a small-batch program or want to add individual names to the gifts. This is the gold standard for{' '}
        <Link to={'/products' as RouterTo} search={{ category: 'Pens' } as never} style={prose.inlineLink}>pens</Link>
        , desk accessories,{' '}
        <Link to={'/products' as RouterTo} search={{ category: 'EDC Accessories' } as never} style={prose.inlineLink}>daily-carry tools</Link>
        , and premium{' '}
        <Link to={'/products' as RouterTo} search={{ category: 'Drinkware' } as never} style={prose.inlineLink}>drinkware</Link>.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>Choose color printing</strong> when your brand guidelines strictly dictate specific colors, and when the product is for a high-volume, one-time event where immediate visual impact matters more than decade-long longevity.
      </p>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Does laser engraving wear off over time?</p>
      <p style={prose.p}>No. Laser engraving physically removes material from the metal surface, making it a permanent part of the object. Unlike printed or painted logos, it cannot peel, fade, or chip — even after years of daily handling.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Can I match a specific Pantone colour with laser engraving?</p>
      <p style={prose.p}>Not directly. Laser engraving produces a monochromatic contrast between the surface finish and the raw metal beneath. For exact Pantone colour reproduction, UV or pad printing is required — though that method has significantly lower durability on daily-use items.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Is laser engraving cost-effective for small orders?</p>
      <p style={prose.p}>Yes. Because laser engraving is a fully digital process with no setup plates, the per-unit cost is essentially the same at 30 units as at 3,000. It also makes individual personalisation — adding each recipient's name — economically viable for corporate programmes.</p>

      <div style={prose.callout}>
        The Wischos catalogue focuses on substantial, high-quality metal goods built for daily utility. Because we believe a corporate gift should be as enduring as the relationship it represents, laser engraving is our default customization method.{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>Contact us</Link>{' '}
        to discuss your artwork, or to explore how we can apply your logo for maximum impact.
      </div>
    </div>
  )
}

function Article3Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        While China manufactures the vast majority of the world's corporate gifts, the quality spectrum is massive. It ranges from disposable plastic trinkets to the aerospace-grade titanium tools, precision-milled aluminum desk accessories, and solid brass instruments we source and assemble at Wischos.
      </p>
      <p style={prose.p}>
        Navigating this landscape to find gifts that are truly useful, interesting, and substantial comes down to knowing exactly what questions to ask. Here is how to navigate the premium sourcing process effectively.
      </p>

      <h2 style={prose.h2}>Know What You Need Before You Start</h2>
      <p style={prose.p}>
        The most common sourcing mistake is starting too broadly. Vague inquiries attract vague responses and a process that takes twice as long as it should. Before reaching out, defining your parameters will fast-track your project:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Product &amp; Material:</strong> Are you looking for the lightweight modern feel of anodized aluminum, or the classic weight of brass? What exact impression must the gift create?</li>
        <li style={prose.li}><strong style={prose.strong}>Quantity per SKU:</strong> This determines MOQ eligibility — per individual product, not total program units.</li>
        <li style={prose.li}><strong style={prose.strong}>Customization Scope:</strong> Do you need simple laser engraving, or fully custom packaging and custom dimensions?</li>
        <li style={prose.li}><strong style={prose.strong}>Unit Budget:</strong> Specify your budget <em>per piece</em>, not the total program budget. This immediately clarifies which material tiers are viable.</li>
        <li style={prose.li}><strong style={prose.strong}>Hard Deadline:</strong> Always work backwards from your absolute "in-hands" delivery date.</li>
      </ul>

      <h2 style={prose.h2}>MOQ: What It Means in Premium Gifting</h2>
      <p style={prose.p}>
        MOQ — Minimum Order Quantity — is the minimum number of units required for a single production run. For mass-market promotional items, MOQs often start at 5,000 units. For premium metal goods, the rules are different.
      </p>
      <p style={prose.p}>
        Because we have spent years building a network of top-tier CNC machining and metal finishing facilities, premium gifting doesn't have to mean massive volume. At Wischos, our standard MOQ is{' '}
        <strong style={prose.strong}>100 units per product</strong>, and 100 sets for{' '}
        <Link to={'/gift-sets' as RouterTo} style={prose.inlineLink}>corporate gift boxes</Link>.
        This allows you to execute highly targeted executive programs without bloated budgets.
      </p>

      <h2 style={prose.h2}>The "Factory-Direct" Myth vs. A Premium Trading Partner</h2>
      <p style={prose.p}>
        Many overseas buyers assume they must work directly with a single factory to get the best results. For complex, high-end corporate gifts, this is often a logistical mistake.
      </p>
      <p style={prose.p}>
        Top-tier manufacturing in China is highly specialized. A facility that mills flawless titanium hardware does not produce premium presentation boxes, nor do they stamp brass trays. If you attempt to build a multi-material gift set "factory-direct," you are suddenly managing three different facilities, coordinating shipping between them, and hoping the final assembly matches your vision.
      </p>
      <p style={prose.p}>
        This is exactly why premium buyers use a specialized trading and supply chain partner. At Wischos, our value lies in orchestration: strict vendor vetting across different material specialists, on-the-ground Quality Control during production, complex final assembly management, and ensuring the entire package meets global export standards. You get a cohesive, retail-ready gift — we handle the supply chain friction.
      </p>

      <h2 style={prose.h2}>The Sample Stage (Never Skip This)</h2>
      <p style={prose.p}>
        Order samples before committing to bulk production. Always. A digital render looks perfect; a physical sample tells the truth.
      </p>
      <p style={prose.p}>
        Holding the product lets you evaluate the true weight of the metal, the precision of the machined edges, the contrast of the laser engraving, and how the packaging survives transit. Sample costs typically run $30–$150 per item and are credited against your bulk order. It is the most critical quality control step available to you.
      </p>

      <h2 style={prose.h2}>What Our Process Looks Like</h2>
      <p style={prose.p}>
        We are built to remove the friction from premium corporate sourcing. The full Wischos process — from your initial brief through sample approval, mass production oversight by our QC team, and global delivery — is transparently documented on our{' '}
        <Link to={'/about' as RouterTo} hash="how-it-works" style={prose.inlineLink}>
          How It Works
        </Link>{' '}
        page, including our sample policy and typical lead times.
      </p>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What is the minimum order quantity for premium metal corporate gifts from China?</p>
      <p style={prose.p}>At Wischos, the standard MOQ is 100 units per product or 100 sets for curated gift boxes. This is significantly lower than the 5,000+ MOQs typical for mass-market promotional items, because our factory network specialises in CNC-machined precision goods.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Should I go factory-direct when ordering corporate gifts from China?</p>
      <p style={prose.p}>For complex, multi-material gift sets, factory-direct usually creates more problems than it solves. Top-tier manufacturers are highly specialised — a titanium machining facility won't produce premium packaging. A trading partner that coordinates across multiple specialists produces better results than managing multiple factories independently.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>How important are physical samples before bulk production?</p>
      <p style={prose.p}>Critical. Digital renders never capture the true weight, surface texture, or engraving contrast of physical goods. Sample orders typically cost $30–$150 per item and are credited against your bulk order. Skipping this step is the most common source of quality disappointment on first orders.</p>

      <div style={prose.callout}>
        Ready to start a conversation?{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>Send us your brief</Link>{' '}
        with your target category, quantity, and timeline. Our team will respond with product recommendations and a comprehensive quote within one business day.
      </div>
    </div>
  )
}

function Article4Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        Most corporate gift programs fail on timing — not quality. The order goes in too late, the gifts arrive after the event, or quality control corners get cut to hit an impossible deadline.
      </p>
      <p style={prose.p}>
        Understanding the <em>real</em> timeline before you start is the only reliable way to prevent a logistics disaster.
      </p>

      <h2 style={prose.h2}>The Full Timeline (It's Longer Than You Think)</h2>
      <p style={prose.p}>
        Most suppliers quote a "lead time" when asked. What they usually give you is the <em>production time only</em>. For a premium, multi-material gift set, here is the complete picture:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Stage</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap' }}>Typical Duration</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>The Wischos Difference</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Supplier Selection & Quotation', '3–7 days', 'We provide targeted options within 24 hours.'],
              ['Sample Production', '10–15 days', 'Precision metal milling takes time.'],
              ['Sample Shipping & Approval', '5–7 days', 'Shipped via Air Express.'],
              ['Bulk Production', '20–35 days', 'Machining, anodizing, or PVD coating.'],
              ['Final Assembly & QC Inspection', '5–7 days', 'We consolidate and inspect all multi-material sets.'],
              ['Export Documentation', '3–5 days', 'Clearing local customs.'],
              ['International Shipping', '5–10 days (Air) / 25–35 days (Sea)', 'Most premium metal orders (100–500 units) ship via Air.'],
            ].map(([stage, duration, diff], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 500 }}>{stage}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: 'var(--accent-brand)', fontWeight: 600, whiteSpace: 'nowrap' }}>{duration}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#666', fontSize: '0.82rem' }}>{diff}</td>
              </tr>
            ))}
            <tr style={{ borderTop: '2px solid #e0e0e0', background: '#f5f5f5' }}>
              <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: '#0a0a0a' }}>Total (realistic)</td>
              <td style={{ padding: '0.55rem 0.75rem', fontWeight: 700, color: 'var(--accent-brand)', whiteSpace: 'nowrap' }}>7–9 weeks (Air) / 11–15 weeks (Sea)</td>
              <td style={{ padding: '0.55rem 0.75rem', color: '#666', fontSize: '0.82rem' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        Work backwards from your absolute delivery date and subtract a week as a safety buffer — that is when your order needs to be <em>confirmed</em>, not just placed. See our{' '}
        <Link to={'/about' as RouterTo} hash="how-it-works" style={prose.inlineLink}>
          full process and lead times
        </Link>{' '}
        for details.
      </p>

      <h2 style={prose.h2}>Chinese New Year: The Biggest Annual Disruption</h2>
      <p style={prose.p}>
        Factories physically close for 2–3 weeks, but the effective disruption runs much longer:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>Production slows down <strong style={prose.strong}>3–4 weeks before</strong> CNY as workers begin traveling home</li>
        <li style={prose.li}>Quality factories often stop accepting new production orders <strong style={prose.strong}>4–6 weeks before</strong> the holiday</li>
        <li style={prose.li}>Post-CNY lead times are longer as massive backlogs clear</li>
      </ul>
      <p style={prose.p}>
        CNY shifts every year — February 6th in 2027, for example. If you need delivery in Q1, orders should ideally be confirmed by November of the previous year. Other closure periods, like Golden Week (Oct 1–7) and Labour Day (May 1–5), also affect turnarounds.
      </p>

      <h2 style={prose.h2}>Q4: The Season Where Everyone Starts Too Late</h2>
      <p style={prose.p}>
        Q4 is the peak season for corporate gifting globally. High-end CNC machining and custom packaging lines fill up much earlier than most buyers expect. For Christmas or year-end executive delivery, finalizing your brief and placing orders in July or August is not excessive — it is the right call.
      </p>

      <h2 style={prose.h2}>What to Do When You've Left It Too Late</h2>
      <p style={prose.p}>
        If your deadline is looming, you still have options to deliver a substantial gift without compromising on quality:
      </p>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1.15rem' }}>
        <li style={{ ...prose.li, marginBottom: '0.75rem' }}>
          <strong style={prose.strong}>Leverage Blank Inventory &amp; Laser Engraving:</strong> Ask us about our pre-staged, unbranded inventory. Because Wischos uses{' '}
          <Link to={'/blog/laser-engraving-vs-color-printing-corporate-gifts' as RouterTo} style={prose.inlineLink}>laser engraving as our default customization method</Link>
          , we can take high-quality blank metal goods and personalize them in a fraction of the time it takes for a full made-to-order run.
        </li>
        <li style={{ ...prose.li, marginBottom: '0.75rem' }}>
          <strong style={prose.strong}>Budget for Air Express:</strong> Upgrading from sea freight to DHL/FedEx shaves 3–4 weeks off the timeline. Premium metal gifts — titanium, brass, stainless steel — are dense but compact, making air freight highly viable for our standard MOQ of 100 units.
        </li>
        <li style={{ ...prose.li, marginBottom: '0.75rem' }}>
          <strong style={prose.strong}>Simplify the Customization:</strong> A crisp, laser-engraved logo on a standard PVD-coated black surface ships significantly faster than waiting for a custom-matched Pantone anodized finish.
        </li>
      </ol>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>How long do premium metal corporate gifts from China take to arrive?</p>
      <p style={prose.p}>The full timeline from order confirmation to delivery is 7–9 weeks via air freight. This covers supplier confirmation, sample production and approval (2–3 weeks), bulk production (20–35 days), final assembly and QC, and international shipping to Australia, New Zealand, Singapore, the UAE, or other primary destinations.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>When should I place my order for Q4 year-end gifting?</p>
      <p style={prose.p}>For Christmas or year-end delivery, confirm your order by July at the latest. Q4 is peak season — high-end CNC machining lines fill up early, and July orders give you a meaningful safety buffer against production delays or quality revision rounds.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>How does Chinese New Year affect corporate gift lead times?</p>
      <p style={prose.p}>Chinese New Year creates 6–8 weeks of effective disruption. Factories begin slowing production 3–4 weeks before the holiday, and many stop accepting new orders 4–6 weeks prior. For Q1 delivery, confirm your order by November of the previous year.</p>

      <div style={prose.callout}>
        Planning an executive gift program and need a realistic timeline?{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>Send us your event date and product ideas</Link>
        , and the Wischos team will give you a straight answer on what is achievable.
      </div>
    </div>
  )
}


function Article6Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        Most corporate gifts don't survive the first week. They get opened, appreciated for a moment, and quietly moved to a drawer — or a recycling bin — within days.
      </p>
      <p style={prose.p}>
        That isn't cynicism. PPAI's 2024 Consumer Study found that <strong style={prose.strong}>75.4% of people keep a branded product specifically because it is useful</strong> — by a wide margin the dominant factor. The inverse is equally true: items that don't earn daily utility are the ones that disappear.
      </p>
      <p style={prose.p}>
        The question worth asking before any programme is designed isn't "what should we give?" but a more demanding one: <em>what do people actually keep, and why?</em>
      </p>
      <p style={prose.p}>
        After sourcing custom metal gift sets for corporate programmes across Australia, New Zealand, Singapore, and the UAE, the answer is consistently the same: recipients keep things that are genuinely useful, feel good in the hand, and don't look like walking advertisements.
      </p>

      <h2 style={prose.h2}>The Desk Drawer Test</h2>
      <p style={prose.p}>
        Before you order anything, run it through this mental filter: will the recipient use this at their desk or carry it on their person within 30 days — and still be doing so in 12 months?
      </p>
      <p style={prose.p}>
        If the honest answer is no, you've already identified the problem. Most gifts fail this test not because of poor quality, but because they solve no real problem. A mug that joins eleven others in a kitchen cabinet. A tote bag that goes into a cupboard of tote bags. A notebook that stays blank because the recipient already has a preferred system.
      </p>
      <p style={prose.p}>
        Gifts that pass the desk drawer test share a common trait: they replace or improve something the recipient was already doing. A precision bolt-action pen replaces the disposable pen they kept losing. A machined metal key organiser replaces a chaotic keyring. A vacuum-insulated titanium bottle replaces the plastic one they were tolerating. The gift slots into an existing behaviour rather than creating a new obligation.
      </p>

      <h2 style={prose.h2}>Usefulness Is Not the Same as Practicality</h2>
      <p style={prose.p}>
        There is a common misreading of "useful" in corporate gifting. Procurement managers often interpret it as "practical" — something basic and broadly applicable. Practical is not wrong, but it tends to produce safe, forgettable results: USB drives, generic pens, branded notebooks.
      </p>
      <p style={prose.p}>
        Useful in the gifting context means the item has daily friction-reduction value for the <em>specific recipient</em>. That requires knowing something about who they are. A desk-based executive who travels quarterly has different daily-carry needs than a field sales rep who is airport-to-airport three weeks out of four.
      </p>
      <p style={prose.p}>
        This is why recipient profiling matters before product selection. A curated set built around a specific recipient type — their role, their work environment, their daily tools — will almost always outperform a generic premium hamper assembled from whatever was trending that quarter.
      </p>

      <h2 style={prose.h2}>Substance Is Felt Before It Is Seen</h2>
      <p style={prose.p}>
        There is a moment when someone picks up a well-made metal object — a solid brass pen, a machined steel card holder — and their hand makes a judgment before their eyes do. The weight registers. The temperature of the metal. The precision of the machined thread or the click of the mechanism.
      </p>
      <p style={prose.p}>
        Coresight Research puts the average corporate gift spend at <strong style={prose.strong}>$78 per item</strong>, with the most common range between $75 and $100. Recipients don't know the invoice figure — but they can feel the gap. A gift that feels underweight communicates something about the relationship it was meant to strengthen.
      </p>
      <p style={prose.p}>
        This is why material selection is a more consequential decision than most buyers realise. Stainless steel, aluminum, brass, and titanium each read differently in the hand. A machined stainless steel daily-carry tool at $28 FOB lands entirely differently from a plastic-and-rubber equivalent at $12. The cost difference is marginal when distributed across a programme budget. The perceived difference is substantial.
      </p>

      <h2 style={prose.h2}>Branding — Less Than You Think, More Than Nothing</h2>
      <p style={prose.p}>
        The most effective branding strategy for a gift that gets kept is restrained: a logo engraved on the clip of a pen, a small mark on the base of a desk accessory, an embossed mark on a packaging insert. Permanent, present, but not dominating the object.
      </p>
      <p style={prose.p}>
        Recipients are far more likely to carry or display an object that doesn't feel like a walking advertisement. A heavily branded item signals that it was given to serve the company's interests, not theirs. Restraint in branding signals the opposite: that the gift was chosen to be used.
      </p>
      <p style={prose.p}>
        <Link to={'/blog/laser-engraving-vs-color-printing-corporate-gifts' as RouterTo} style={prose.inlineLink}>Laser engraving on metal</Link> works best here. It becomes part of the material rather than sitting on top of it. Five years of daily use doesn't fade it. That longevity matters: PPAI research shows branded drinkware generates <strong style={prose.strong}>more than 1,400 impressions over its lifetime</strong> — a figure that only holds if the item remains in active use long enough to accumulate them.
      </p>

      <h2 style={prose.h2}>The Coherence Factor</h2>
      <p style={prose.p}>
        Individual products matter less than the overall impression of the gift. A curated set of three or four objects that share a design language — similar finishes, complementary scales, a consistent colour family — reads as considered. A collection of unrelated branded items, regardless of individual quality, reads as assembled rather than curated.
      </p>
      <p style={prose.p}>
        This is one of the underappreciated advantages of working with a specialist rather than pulling from a catalogue. Anyone can source a stainless steel pen. Fewer suppliers can source a pen, a desk tray, a key organiser, and a flask that look like they belong together — and deliver them in unified packaging that doesn't betray the budget.
      </p>
      <p style={prose.p}>
        The packaging itself extends the coherence. A rigid lid box with magnetic closure and a custom foam insert signals that the same level of care applied to the box applies to what's inside. Conversely, a premium pen shipped in a generic polybag undoes most of the impression the product itself would have made.
      </p>

      <h2 style={prose.h2}>One Premium Gift Over Five Cheap Ones</h2>
      <p style={prose.p}>
        If there is a single operational principle that guides every recommendation we give, it's this: one gift that earns its place in daily use is worth more than five that don't.
      </p>
      <p style={prose.p}>
        Corporate gifting programmes routinely spread budget across volume — more recipients, lower per-unit spend, safer choices. The result is a programme that reaches more people with less impact. Narrowing the recipient list and concentrating the per-unit spend on something genuinely worth keeping typically produces better relationship outcomes and better brand recall.
      </p>
      <p style={prose.p}>
        Sendoso's research, drawn from a dataset of over 390 million outbound emails, found that gifting increased <strong style={prose.strong}>meeting rates by 3.08× and win rates by 1.84×</strong>. The mechanism is consistent with what field experience shows: a gift that stays in someone's workspace creates brand presence at the moments when decisions are made. That is something a well-timed email cannot replicate.
      </p>

      <h2 style={prose.h2}>The Practical Checklist</h2>
      <p style={prose.p}>
        Before finalising any corporate gift order, run through these five questions:
      </p>
      <ol style={{ paddingLeft: '1.4rem', marginBottom: '1.15rem' }}>
        {[
          'Does this solve a real daily problem for this specific recipient? If not, rethink the product.',
          'Does the material communicate substance? Weight, finish, and construction are perceived before features.',
          'Is the branding restrained enough that the recipient would use it without us? If no, the logo is too prominent.',
          'Do the items in the set share a coherent design language? Curated reads differently than assembled.',
          'Does the packaging reflect the same quality as the product? First impressions set the baseline.',
        ].map((item, i) => (
          <li key={i} style={{ ...prose.li, marginBottom: '0.65rem' }}>
            {item}
          </li>
        ))}
      </ol>
      <p style={prose.p}>
        A gift that passes all five is worth keeping. That's the only metric that matters.
      </p>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What is the desk drawer test for corporate gifts?</p>
      <p style={prose.p}>The desk drawer test is a simple filter: will the recipient use this at their desk or carry it on their person within 30 days — and still be doing so in 12 months? If the honest answer is no, the gift is likely to disappear. Gifts that pass solve a problem the recipient was already experiencing.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>How prominent should branding be on a corporate gift?</p>
      <p style={prose.p}>Restrained. A small engraved logo on a pen clip, a discreet mark on a base, or an embossed element on packaging. Recipients are more likely to carry or display an object that doesn't look like a walking advertisement. Heavy branding signals the gift serves the company's interests; restraint signals it was chosen for the recipient.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Is it better to give one premium gift or several cheaper items?</p>
      <p style={prose.p}>One premium item that earns daily use consistently outperforms five that don't. Spreading budget across volume reduces per-item impact. Concentrating per-unit spend on something genuinely worth keeping typically produces better relationship outcomes and better brand recall over time.</p>

      <div style={prose.callout}>
        Wischos Gift sources and curates custom metal corporate gift sets for procurement and brand managers in Australia, New Zealand, Singapore, the UAE, and other primary destinations. If you're planning a programme and want a recommendation based on your recipient profile and timeline,{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>get in touch</Link>.
      </div>
    </div>
  )
}


function Article8Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        When buyers review a metal corporate gift, their hands register the surface finish before their eyes process the design. That immediate tactile impression — the drag of brushed grain under a thumb, the chill of mirror-polished steel, the matte grip of a sandblasted surface — is set at the factory, usually weeks before you see a sample photo.
      </p>
      <p style={prose.p}>
        Surface finish is also a downstream decision: it determines how your laser-engraved logo reads, how the product handles fingerprints after six months of daily pocketing, and whether the gift still looks considered at the eighteen-month mark. Getting it right means understanding what each finish is made of and what it can actually withstand — not just what it looks like in a product render.
      </p>
      <p style={prose.p}>
        Here is how the main finishes used in premium metal corporate gifts actually behave in practice.
      </p>

      <h2 style={prose.h2}>Brushed Finish — The Most Forgiving Default</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-brushed"
          alt="Brushed finish on stainless steel surface showing uniform directional grain texture"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        A brushed finish is created by drawing fine abrasive media across the metal surface in a single direction, leaving a uniform linear grain. It is the most commonly specified finish in premium corporate gifting — and for good reason.
      </p>
      <p style={prose.p}>
        The directional grain camouflages micro-scratches: as they accumulate from daily handling, they align with the existing texture rather than standing out against it. A brushed stainless steel pen carried in a bag every day for a year looks essentially the same as it did in month one. The same pen in a mirror-polish finish shows its first hairline scratch within weeks.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Works on:</strong> Stainless steel, aluminum, titanium, brass</li>
        <li style={prose.li}><strong style={prose.strong}>Laser engraving result:</strong> High contrast, very clean — one of the best surfaces for logo engraving</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong>{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Pens' } as never} style={prose.inlineLink}>Writing instruments</Link>,{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'EDC Accessories' } as never} style={prose.inlineLink}>daily-carry tools</Link>, key organisers — anything carried daily
        </li>
        <li style={prose.li}><strong style={prose.strong}>Limitation:</strong> The directional grain reads lighter or darker depending on lighting angle — worth noting for photography-heavy programmes</li>
      </ul>

      <h2 style={prose.h2}>Mirror Polish — High Impact, High Maintenance</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-mirror"
          alt="Mirror polished metal surface with high-gloss reflective finish"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        Mirror polish is achieved through multiple stages of progressively finer abrasives, finishing with a buffing compound. The result is a surface that reflects clearly — exceptional in photographs and commanding on a desk.
      </p>
      <p style={prose.p}>
        The trade-off is maintenance. Mirror surfaces show fingerprints immediately and accumulate micro-scratches visibly from the first week of handling. A mirror-polished pen in someone's pocket for three months will develop a noticeable surface haze that no amount of wiping fully removes.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Display pieces and desk objects with limited daily handling — decorative tops, paperweights, objects that sit rather than travel</li>
        <li style={prose.li}><strong style={prose.strong}>Not recommended for:</strong> Daily-carry items, drinkware, anything pocketed regularly</li>
        <li style={prose.li}><strong style={prose.strong}>Laser engraving result:</strong> Dramatic contrast, but the polished surround collects fingerprints around the engraved area — this can undermine the effect over time</li>
      </ul>

      <h2 style={prose.h2}>Anodising — The Aluminum Colour Specialist</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-anodising"
          alt="Anodised aluminum surface showing deep matte colour with permanent finish"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        Anodising is an electrochemical process exclusive to aluminum. The surface is converted into aluminum oxide (Al₂O₃) — not a coating applied on top of the metal, but a structural transformation of the surface itself. Dye is absorbed into the porous oxide layer before it is sealed.
      </p>
      <p style={prose.p}>
        Because the colour is embedded in the metal oxide rather than sitting on it, anodised finishes do not chip, peel, or scratch off the way painted or plated surfaces do. The colour is permanent under normal use conditions. The range is broad — matte black, space grey, champagne, midnight blue, deep red — and can be closely matched to brand palettes, though exact Pantone reproduction is not possible.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Works on:</strong> Aluminum only</li>
        <li style={prose.li}><strong style={prose.strong}>Laser engraving result:</strong> Exceptional — the laser ablates the coloured oxide layer to reveal bright silver aluminum beneath, producing very high contrast</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong>{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Desk Accessories' } as never} style={prose.inlineLink}>Desk accessories</Link>, branded pens in brand colours, tech-adjacent gifts where a modern colour palette matters
        </li>
        <li style={prose.li}><strong style={prose.strong}>Limitation:</strong> Aluminum only. Anodised surfaces can be scratched through to base metal under hard abrasion — more durable than paint, less so than PVD</li>
      </ul>

      <h2 style={prose.h2}>PVD Coating — The Premium Dark Tier</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-pvd"
          alt="PVD coated stainless steel surface in dark gunmetal finish"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        PVD (Physical Vapor Deposition) is a vacuum-chamber process in which target metals — typically titanium nitride (TiN), chromium nitride (CrN), or zirconium nitride (ZrN) — are vaporised and deposited as an ultra-thin film, typically 2–5 microns thick. The resulting surface is not a paint layer; it is a bonded metallic compound with a hardness that often exceeds the substrate beneath it.
      </p>
      <p style={prose.p}>
        In practical terms: PVD black on a stainless steel pen is significantly harder than the steel itself. Under the daily abrasion that would visibly wear conventional dark paint within months, a quality PVD coating remains essentially unchanged. The colour palette is narrower than anodising — black, gunmetal, dark grey, and warm gold are the production-viable options — but these happen to be precisely the tones driving the current preference in executive corporate gifting.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Works on:</strong> Stainless steel, titanium, most ferrous metals</li>
        <li style={prose.li}><strong style={prose.strong}>Laser engraving result:</strong> Clean contrast — the silver-grey of the exposed steel reads clearly against a dark PVD background</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Executive tier gifts, premium{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Pens' } as never} style={prose.inlineLink}>writing instruments</Link>,{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'EDC Accessories' } as never} style={prose.inlineLink}>daily-carry tools</Link> where a sophisticated dark aesthetic is the brief
        </li>
        <li style={prose.li}><strong style={prose.strong}>Limitation:</strong> Adds 15–30% to unit cost versus brushed steel. Longer production lead time. Less suitable for complex curved geometries where film adhesion can be uneven</li>
      </ul>

      <h2 style={prose.h2}>Matte / Sandblasted Finish — Clean and Contemporary</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-sandblasted"
          alt="Sandblasted metal surface with uniform non-directional matte texture"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        A sandblasted or bead-blasted finish is produced by propelling fine abrasive media — glass beads or aluminum oxide — at controlled pressure across the metal surface. Unlike brushed, the result is non-directional: the texture is uniform regardless of viewing angle.
      </p>
      <p style={prose.p}>
        Matte surfaces diffuse light rather than reflecting it, which makes them inherently fingerprint-resistant. They hold up well under daily handling and have a tactile warmth that mirror polish lacks. In consumer hardware, matte has become the dominant signal for premium tech products — and that aesthetic preference is crossing into corporate gifting briefs with increasing regularity.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Works on:</strong> Steel, aluminum, titanium, brass</li>
        <li style={prose.li}><strong style={prose.strong}>Laser engraving result:</strong> Excellent on titanium — laser oxidation creates a dark mark against the light matte surface with strong contrast; good on steel</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong> Modern, understated aesthetics;{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'Drinkware' } as never} style={prose.inlineLink}>titanium drinkware</Link>; products where tactile quality matters alongside visual restraint
        </li>
        <li style={prose.li}><strong style={prose.strong}>Limitation:</strong> Non-directional texture can read as slightly industrial in certain contexts — not the choice when the brief calls for "refined desk presence"</li>
      </ul>

      <h2 style={prose.h2}>Stone Wash — The Titanium Daily-Carry Finish</h2>
      <div style={{ margin: '1rem 0 1.5rem', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/7' }}>
        <img
          src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-006-stone-wash"
          alt="Stone washed titanium surface with worn-in low-gloss appearance"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <p style={prose.p}>
        Of the five finishes above, most apply across stainless steel, aluminum, and titanium. Titanium has one additional process worth knowing for daily-carry products: stone washing.
      </p>
      <p style={prose.p}>
        A stone washed finish is produced by tumbling the titanium piece in a drum with abrasive media — typically ceramic or stone pellets — until the surface develops a uniformly worn, low-gloss appearance. This is a deliberate ageing treatment. The result is a finish that looks and feels broken-in from the first day, and absorbs further wear invisibly: scratches from daily pocket carry blend into the existing texture rather than standing out against it. For titanium daily-carry tools where longevity under hard use is the brief, stone wash outperforms standard matte sandblasting because the surface is already pre-textured for wear.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Works on:</strong> Titanium (occasionally used on steel knives and tools)</li>
        <li style={prose.li}><strong style={prose.strong}>Best for:</strong>{' '}
          <Link to={'/products' as RouterTo} search={{ category: 'EDC Accessories' } as never} style={prose.inlineLink}>Titanium daily-carry accessories</Link>, clip tools, bottle openers — any titanium piece that will see hard daily use
        </li>
        <li style={prose.li}><strong style={prose.strong}>Note:</strong> Each piece has slight tonal variation — consistent with the process, not a defect. Acceptable for programmes where a crafted, worn-in character is part of the brief</li>
      </ul>

      <h2 style={prose.h2}>Choosing Based on Use Context</h2>
      <p style={prose.p}>
        The right finish is determined by two questions: how will this be used, and what impression needs to land at first contact?
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Use scenario</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Recommended</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Avoid</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Daily carry (pocket, bag)', 'Brushed or Matte', 'Mirror polish'],
              ['Executive desk display', 'Mirror polish or PVD', '—'],
              ['Brand colour matching required', 'Anodised (aluminum only)', 'Mirror polish'],
              ['Dark / stealth aesthetic', 'PVD black or gunmetal', 'Anodised (aluminum-only limit)'],
              ['High-volume, cost-sensitive programme', 'Brushed stainless', 'PVD (cost premium)'],
              ['Titanium products', 'Matte / sandblasted', 'Mirror polish (difficult on Ti)'],
            ].map(([scenario, recommended, avoid], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 500 }}>{scenario}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: 'var(--accent-brand)', fontWeight: 600 }}>{recommended}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#888' }}>{avoid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        One practical note: laser engraving results vary significantly across these finishes. If logo clarity matters — and it usually does — specifying the surface finish in the same conversation as the branding method avoids an unnecessary sampling round.{' '}
        <Link to={'/blog/laser-engraving-vs-color-printing-corporate-gifts' as RouterTo} style={prose.inlineLink}>
          Our guide on laser engraving vs. colour printing
        </Link>{' '}
        covers the logo side of this decision in detail.
      </p>
      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Which metal surface finish is most durable for corporate gifts?</p>
      <p style={prose.p}>For daily-carry items, brushed and matte finishes are the most forgiving — the directional or non-directional grain absorbs micro-scratches invisibly. PVD coating on steel offers the highest hardness for dark-finish applications. Mirror polish is least appropriate for any item handled or pocketed regularly.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Does anodising work on all metals?</p>
      <p style={prose.p}>No. Anodising is an electrochemical process exclusive to aluminum. It converts the surface to aluminum oxide, embedding colour permanently into the metal structure. For steel, titanium, or brass, alternative processes — PVD, brushed finish, or matte sandblasting — are used instead.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Which surface finish produces the best laser engraving results?</p>
      <p style={prose.p}>Brushed finish and anodised aluminum both produce excellent laser engraving. On brushed steel, the contrast between raw metal and directional grain is sharp and legible. On anodised aluminum, the laser ablates the colour layer to reveal bright silver beneath — very high contrast. Mirror polish produces dramatic results but the surrounding area collects fingerprints over time.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Is PVD coating worth the extra cost for corporate gifts?</p>
      <p style={prose.p}>For executive-tier items where a dark, sophisticated aesthetic is the brief, yes. PVD adds roughly 15–30% to unit cost versus brushed steel, but delivers a surface hardness that exceeds the substrate — the black or gunmetal finish holds up under daily use that would visibly wear conventional paint within months.</p>

      <div style={prose.callout}>
        When you brief us, specifying surface finish requirements upfront reduces sampling rounds. If you're unsure which finish suits the application, tell us the use context and recipient profile —{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>send a brief</Link>{' '}
        and we'll recommend the finish that holds up best for that specific programme.
      </div>
    </div>
  )
}

function Article7Content() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>We are often asked how large the logo can be.</p>
      <p style={prose.p}>
        For premium client gifts, that is usually the wrong first question. Discreet branding corporate gifts use smaller, quieter or less dominant logo placement so the product still feels useful to the recipient. The question is not whether the brand should be present. The question is whether the branding helps the gift stay in use.
      </p>
      <p style={prose.p}>
        ASI's 2026 Ad Impressions Study reports that 78% of U.S. consumers would keep a promo item because it is useful. That number should make every buyer a little more careful with artwork approval. A useful object can earn attention for years. A loud logo can shorten that life.
      </p>
      <p style={prose.p}>Some gifts should be loud.</p>
      <p style={prose.p}>A trade show tote. A staff event cap. A launch-day T-shirt. In those cases, the logo is part of the point. The item is supposed to show up in photos, on the floor, in the room.</p>
      <p style={prose.p}>A client gift is different.</p>
      <p style={prose.p}>
        A brass pen on a desk is not a billboard. Neither is a metal card holder in a meeting or a phone stand beside a laptop. These products have to earn their place in the recipient's life. If the logo makes the product harder to use, the branding has started working against the gift.
      </p>
      <p style={prose.p}>That is the trap. The buyer thinks they are buying exposure. The recipient sees an advertisement.</p>
      <p style={prose.p}>
        For premium gifts, the better question is not "How big can the logo be?" It is:
      </p>
      <div style={prose.callout}>
        How visible can the brand be before the product stops feeling like something the recipient would choose?
      </div>

      <h2 style={prose.h2}>The Trade-Off Buyers Actually Face</h2>
      <p style={prose.p}>A larger logo gives the brand more immediate visibility. That can be useful.</p>
      <p style={prose.p}>
        But visibility is not the same as retention. A smaller logo may create less instant exposure, but it can give the product a better chance of being used longer.
      </p>
      <p style={prose.p}>
        The data does not prove that small logos always beat large logos. It does support the more important point: useful, well-made products are more likely to stay with people.
      </p>
      <p style={prose.p}>
        ASI's 2026 Ad Impressions Study reports that 78% of U.S. consumers would keep a promotional item because it is useful. PPAI's Product Power 2026 research reports that roughly 65% of consumers are very likely to keep a branded product for six months or longer, with durability, design and material among the reasons. A Product Power 2026 quality/value summary lists durability, design and material as leading quality signals at 70.4%, 65.2% and 58.2%.
      </p>
      <p style={prose.p}>So the logo should not fight the product's usefulness, design or material quality. It should support them.</p>

      <h2 style={prose.h2}>Not Every Gift Needs a Quiet Logo</h2>
      <p style={prose.p}>Discreet branding is not a universal rule.</p>
      <p style={prose.p}>
        Use visible branding when the campaign needs public recognition, event photos, team identity or quick awareness. A large logo can make sense on a trade show item, a staff campaign piece or a low-cost giveaway.
      </p>
      <p style={prose.p}>Use a quieter logo when the item is supposed to live with the recipient after the campaign moment.</p>
      <p style={prose.p}>That usually includes:</p>
      <ul style={prose.ul}>
        {['client appreciation gifts', 'executive gifts', 'VIP direct mail', 'partner gifts', 'premium onboarding gifts', 'professional service gifts', 'distributor sample kits'].map(item => (
          <li key={item} style={prose.li}>{item}</li>
        ))}
      </ul>
      <p style={prose.p}>
        The mistake is using the same artwork logic for both. A logo that works on an event tote can feel too loud on a metal card case for a senior client.
      </p>

      <h2 style={prose.h2}>Why Loud Branding Gets in the Way</h2>
      <p style={prose.p}>People do not reject logos automatically. They reject products that make them feel like they are carrying someone else's advertisement.</p>
      <p style={prose.p}>
        A large logo on a bottle at a company event may feel normal. The same logo on a pen used in a client meeting may feel awkward. A bold mark on a giveaway keyring may be fine. The same treatment on an executive desk item can make the object feel cheaper than it is.
      </p>
      <p style={prose.p}>
        This is where many premium gifts lose value. The product is useful. The material is good. The packaging is considered. Then the logo is applied like the item is a poster.
      </p>
      <p style={prose.p}>
        Recipient feedback often sounds like this: the logo fades into the background, but the useful object keeps the giver in mind. Or the opposite: the gift is good, but the first thing the recipient wants to do is cover the mark.
      </p>
      <p style={prose.p}>That is not an argument against branding. It is an argument against branding that gets in the way of use.</p>
      <p style={prose.p}>
        The better gift usually feels like something the recipient might have chosen anyway: useful, well made, appropriate in public and not asking them to become a walking ad.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-007-comparison"
        alt="Comparison of a loud promotional gift beside a premium metal gift with a small subtle engraved logo"
      />

      <h2 style={prose.h2}>Visibility and Value Are Separate Decisions</h2>
      <p style={prose.p}>The buyer is not choosing between branding and no branding. The real choice is immediate visibility versus long-term use.</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Campaign type</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Logo strategy that usually fits</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Trade show giveaway', 'Clear logo, visible from a distance'],
              ['Staff event item', 'Visible logo and campaign color'],
              ['Client appreciation gift', 'Smaller logo, better material, stronger packaging'],
              ['Executive gift', 'Subtle engraving or packaging-led branding'],
              ['Onboarding kit', 'Balanced branding across box, insert and product'],
              ['VIP direct mail', 'Product-first, brand-second'],
            ].map(([type, strategy], i) => (
              <tr key={type} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 500 }}>{type}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        This is a useful way to explain the recommendation to a client. You are not removing the brand. You are putting the brand where it does the least harm to the gift.
      </p>

      <h2 style={prose.h2}>Better Ways to Brand the Gift</h2>
      <p style={prose.p}>Discreet branding does not mean the brand disappears. It means the brand stops taking over the object.</p>
      <h2 style={{ ...prose.h2, fontSize: '1.2rem', marginTop: '1.6rem' }}>1. Move the Logo Away From the Main Surface</h2>
      <p style={prose.p}>Use the clip, cap, edge, corner, underside, back panel or another secondary surface.</p>
      <p style={prose.p}>
        This works well on brass pens, metal card holders, phone stands, keyrings and bottle openers. The gift is still branded. It just does not lead with the logo.
      </p>
      <p style={prose.p}>
        For desk items, card cases, stands and small tools, the inside panel or underside can carry a logo or short message. The recipient still sees it. Other people do not have to.
      </p>
      <h2 style={{ ...prose.h2, fontSize: '1.2rem', marginTop: '1.6rem' }}>2. Lower the Contrast</h2>
      <p style={prose.p}>
        Tone-on-tone branding keeps contrast low. The mark is visible close up, but it does not dominate the product from across the room.
      </p>
      <p style={prose.p}>
        On metal, that can mean laser engraving on brushed steel, shallow etching, matte-on-gloss contrast, black-on-black marks or silver-on-silver marks.
      </p>
      <p style={prose.p}>
        This is often a useful compromise when the client needs proof of branding and the recipient needs something they will actually use.
      </p>
      <h2 style={{ ...prose.h2, fontSize: '1.2rem', marginTop: '1.6rem' }}>3. Let the Packaging Do More Work</h2>
      <p style={prose.p}>The box, sleeve, insert card, belly band or thank-you card can carry the campaign message. The product itself can stay cleaner.</p>
      <p style={prose.p}>
        This works especially well for executive gifts, holiday gifts and VIP kits. The unboxing moment still belongs to the brand. The object afterwards belongs more to the recipient.
      </p>
      <p style={prose.p}>
        Sometimes the product itself does not need a visible logo at all. The brand can appear on the box, card, sleeve, tray, note or reorder insert. This will not fit every campaign, but it can work when the relationship value comes from giving something genuinely useful and well presented.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-007-packaging"
        alt="Premium corporate gift box with subtle branding on packaging and a nearly logo-free metal gift inside"
      />

      <h2 style={prose.h2}>Why Metal Gifts Fit This Approach</h2>
      <p style={prose.p}>Metal is useful here because it already carries some of the value signal.</p>
      <p style={prose.p}>
        A brass pen has weight. A brushed stainless opener has finish. A matte aluminum stand has edge quality. Those details say something before the logo does.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-007-metal-detail"
        alt="Close-up of brushed stainless steel brass and matte aluminum gifts with subtle laser engraved marks"
      />
      <p style={prose.p}>That gives buyers more room to use a restrained mark.</p>
      <p style={prose.p}>
        On brushed stainless steel, a small laser mark can sit inside the grain of the finish. It is visible when the user turns the piece in the light, but it does not shout across the surface. On brass, the same restraint matters even more. The material already has warmth and weight; a large high-contrast logo can make it feel cheaper, not more branded.
      </p>
      <p style={prose.p}>
        Matte aluminum behaves differently. A small mark on the lower back edge of a phone stand may be enough because the form and finish are doing the first job. The brand appears when the object is handled, adjusted or packed away. That small moment of discovery often feels more natural than putting the mark across the front face.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Product type</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Subtle logo option</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Brass pen', 'Clip engraving, small cap mark, barrel-end mark'],
              ['Metal keyring', 'Back-side engraving, edge mark, tone-on-tone logo'],
              ['Bottle opener', 'Handle-end engraving, underside mark, small etched logo'],
              ['Card holder', 'Corner engraving, back panel, inside plate'],
              ['Phone stand', 'Lower back edge, underside, small front corner'],
              ['Desk cup or holder', 'Base mark, inside bottom, packaging-led logo'],
            ].map(([type, option], i) => (
              <tr key={type} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 500 }}>{type}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{option}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        If the gift is meant to be carried, displayed or used in front of other people, keep the logo where it will not make the recipient self-conscious.
      </p>

      <h2 style={prose.h2}>When the Logo Should Stay Big</h2>
      <p style={prose.p}>A large logo is not wrong. It is just often used in the wrong place.</p>
      <p style={prose.p}>Keep the logo large when:</p>
      <ul style={prose.ul}>
        {['the item is part of a branded event', 'the campaign goal is awareness, not retention', 'the item is low-cost and high-volume', 'the recipient expects event merchandise', 'the logo is part of the design itself', 'the buyer needs visibility in photos or social posts'].map(item => (
          <li key={item} style={prose.li}>{item}</li>
        ))}
      </ul>
      <p style={prose.p}>
        The problem is applying that logic to a relationship gift. A product meant to stay on a client's desk for a year should not be treated like a product handed out to 2,000 people at a booth.
      </p>

      <h2 style={prose.h2}>Before You Approve the Artwork</h2>
      <p style={prose.p}>Ask these questions before signing off:</p>
      <ol style={prose.ul}>
        {[
          'Would the recipient use this item in public with the logo at this size?',
          'Does the logo make the product feel better or just more promotional?',
          'Can the box, sleeve or insert card carry more of the message?',
          'Is engraving better than color printing for this material?',
          'Does the logo avoid wear points, hinges and high-contact areas?',
          'Will the logo still look acceptable after months of handling?',
          'Does the branding match the audience: mass, staff, client, executive or VIP?',
          'Would the product still make sense if the logo were half the size?',
        ].map(item => (
          <li key={item} style={prose.li}>{item}</li>
        ))}
      </ol>
      <p style={prose.p}>If the last answer is yes, test the smaller version.</p>

      <h2 style={prose.h2}>How to Brief a Supplier</h2>
      <p style={prose.p}>Do not write only: "Add our logo to the product."</p>
      <p style={prose.p}>Write the intent:</p>
      <div style={prose.callout}>
        We want a premium corporate gift that feels like a retail object, not a giveaway. Please suggest subtle logo options such as small laser engraving, tone-on-tone placement, underside branding or packaging-led branding. The product should still look appropriate for daily use if the recipient keeps it on a desk or carries it in public.
      </div>
      <p style={prose.p}>Then add the details that affect production:</p>
      <ul style={prose.ul}>
        {['target recipient', 'campaign purpose', 'preferred logo visibility level', 'brand color requirements', 'packaging needs', 'unit budget', 'MOQ', 'sample deadline', 'final in-hands date'].map(item => (
          <li key={item} style={prose.li}>{item}</li>
        ))}
      </ul>
      <p style={prose.p}>
        That kind of brief lets the supplier solve the real problem: not just where to put the logo, but how to keep the gift useful after the logo is applied.
      </p>

      <h2 style={prose.h2}>Practical Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What are discreet branding corporate gifts?</p>
      <p style={prose.p}>Discreet branding corporate gifts are gifts with subtle, restrained or low-visibility logo placement. The brand may appear through small engraving, tone-on-tone marks, packaging, insert cards or underside placement instead of a large logo on the main product surface.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Do low-logo corporate gifts still work?</p>
      <p style={prose.p}>Yes, when the goal is retention, relationship building or premium perception. A smaller logo can make the product feel more usable, which may increase the chance that the recipient keeps it. The stronger data point is that usefulness is a proven retention driver; logo size should be managed so it does not work against that use.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What logo method works well for premium metal gifts?</p>
      <p style={prose.p}>Laser engraving is often a strong choice for premium metal gifts because it is durable and restrained. Tone-on-tone engraving, small clip marks and packaging-led branding can make the product feel more refined.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Can the product have no visible logo?</p>
      <p style={prose.p}>Yes, if the brand is carried by the box, insert card, sleeve, tray or gift note. This works best for executive gifts, VIP gifts and high-value client appreciation programs. It is less suitable for awareness campaigns where public logo visibility is the point.</p>

      <div style={prose.callout}>
        Wischos Gift helps distributors, agencies and corporate buyers develop premium metal gifts with subtle engraving, low-logo placement and packaging-led branding for programs where the gift needs to feel useful, not disposable.
      </div>

      <h2 style={prose.h2}>Related Products and Guides</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><Link to={'/gift-sets' as RouterTo} style={prose.inlineLink}>Gift sets</Link></li>
        <li style={prose.li}><Link to={'/for-distributors' as RouterTo} style={prose.inlineLink}>For distributors</Link></li>
        <li style={prose.li}><Link to={'/products/wp-106-solid-brass-clip-ballpoint' as RouterTo} style={prose.inlineLink}>Solid brass clip ballpoint</Link></li>
        <li style={prose.li}><Link to={'/products/wp-208-precision-folding-aluminium-device-stand' as RouterTo} style={prose.inlineLink}>Precision folding aluminium device stand</Link></li>
      </ul>

      <h2 style={prose.h2}>Data Sources</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><a href="https://members.asicentral.com/news/strategy/march-2026/asi-s-2026-ad-impressions-study-5-compelling-takeaways/" style={prose.inlineLink}>ASI - 2026 Ad Impressions Study public summary</a>, published Mar. 30, 2026.</li>
        <li style={prose.li}><a href="https://www.ppai.org/media-hub/product-power-2026-what-consumers-want-next/" style={prose.inlineLink}>PPAI - Product Power 2026: What Consumers Want Next</a>, published Dec. 8, 2025.</li>
        <li style={prose.li}><a href="https://store-media.mpowerpromo.com/65e7a9eb2db27b3637eb81b2/assets/Promotional-Products-Power-2026-Quality-Value-and-Premium-Thresholds-1770594170119.pdf" style={prose.inlineLink}>PPAI Product Power 2026 quality/value summary</a>.</li>
      </ul>
    </div>
  )
}

function ArticleStandardCatalogueContent() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        Standard catalogues, or catalogs in North American terminology, are still the backbone of the promotional products industry. For everyday logo orders, rush events, repeat apparel jobs, basic drinkware, and simple giveaways, catalogue sourcing is usually the fastest and lowest-risk option.
      </p>
      <p style={prose.p}>
        Platforms such as ASI and SAGE exist because distributors need speed, range, supplier comparison, and repeatable ordering. That catalogue workflow is not going away. But some client briefs do not fit neatly inside a standard SKU search.
      </p>
      <p style={prose.p}>
        A client may not want "another pen," "another mug," or "another tumbler." They may need a gift for a service award, executive event, client appreciation program, sponsor package, or milestone campaign. In those moments, the question is not only "what product can we logo?" It becomes: what can we adapt, package, or develop so the item feels specific to this brand moment?
      </p>

      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-008-hero"
        alt="Standard catalogue products beside custom metal gift project components"
      />

      <h2 style={prose.h2}>What "Off-Catalogue" Means</h2>
      <p style={prose.p}>
        There is no single formal definition of "off-catalogue" across the promotional products industry. In practice, it usually means moving beyond a standard catalogue SKU with a logo added.
      </p>
      <div style={prose.callout}>
        Off-catalogue custom sourcing means modifying, combining, sourcing, or developing a product option that is not simply a standard catalogue item with standard branding.
      </div>
      <p style={prose.p}>
        It does not always mean creating a product from zero. For most distributor projects, off-catalogue does not need to start at the fully bespoke level. It often means taking a proven metal product family and adapting the material, finish, logo method, packaging, or gift-set structure around a client brief.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Level</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>What it means</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Catalogue-adjacent', 'A proven product family adapted for a project', 'Metal pen with custom finish, packaging, insert card, or set combination'],
              ['Semi-custom', 'A familiar product type made for a specific brief', 'Custom metal keychain, medal, pin, bottle opener, tag, or keepsake'],
              ['Fully bespoke', 'A new product shape, tooling, or structure', 'Custom-shaped desk piece, commemorative object, or campaign-specific metal item'],
            ].map(([level, meaning, example], i) => (
              <tr key={level} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 600 }}>{level}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{meaning}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-008-off-catalogue-levels"
        alt="Three levels of off-catalogue custom metal product development"
      />

      <h2 style={prose.h2}>When the Catalogue Is Still the Better Route</h2>
      <p style={prose.p}>
        A standard catalogue product is usually the better choice when speed, low unit cost, and proven repeatability matter most.
      </p>
      <p style={prose.p}>
        That includes many rush events, broad handouts, basic apparel orders, simple drinkware, tote bags, lanyards, and low-cost logo products. These are exactly the kinds of jobs where a distributor's existing ASI, SAGE, ESP, PPPC, or local supplier workflow is supposed to work well.
      </p>
      <p style={prose.p}>
        The mistake is not using catalogue products. The mistake is forcing a catalogue product into a brief that is asking for something more specific, more memorable, or more gift-like.
      </p>

      <h2 style={prose.h2}>When Distributors Should Consider Going Off-Catalogue</h2>
      <p style={prose.p}>A custom metal project may be worth exploring when the client says things like:</p>
      <ul style={prose.ul}>
        <li style={prose.li}>"We want something different this year."</li>
        <li style={prose.li}>"This is for our top clients."</li>
        <li style={prose.li}>"It needs to feel more premium."</li>
        <li style={prose.li}>"We want something people will keep."</li>
        <li style={prose.li}>"Can it match our event theme?"</li>
        <li style={prose.li}>"We do not want the usual giveaway item."</li>
      </ul>
      <p style={prose.p}>
        These are not normal commodity-order signals. They are project signals.
      </p>
      <p style={prose.p}>
        <a href="https://www.ppai.org/media-hub/product-power-2026-what-consumers-want-next-2/" style={prose.inlineLink}>PPAI's Product Power 2026 research</a> points in the same direction: recipients respond better when branded merchandise feels useful, relevant, well-designed, and emotionally connected to the moment. PPAI's distributor data also shows why wider sourcing conversations are now normal: 61% of U.S. distributors sourced direct from overseas manufacturers in 2024, up from 47% in 2022, according to <a href="https://www.ppai.org/wp-content/uploads/2025/02/2024-PPAI-Sales-Volume-Report.pdf" style={prose.inlineLink}>PPAI's 2024 U.S. Distributor Sales Volume Report</a>.
      </p>

      <h2 style={prose.h2}>Why Metal Works Well for Off-Catalogue Projects</h2>
      <p style={prose.p}>
        Metal is useful in off-catalogue projects because it changes the feel of the item. Compared with many lightweight giveaway products, metal can offer:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>weight and permanence</li>
        <li style={prose.li}>strong perceived value</li>
        <li style={prose.li}>better fit for recognition and milestone moments</li>
        <li style={prose.li}>more controlled branding through engraving, debossing, plating, or subtle logo placement</li>
        <li style={prose.li}>good compatibility with premium packaging</li>
        <li style={prose.li}>a wide range of formats: pens, keychains, medals, pins, card cases, desk pieces, bottle openers, drinkware, and custom-shaped keepsakes</li>
      </ul>
      <p style={prose.p}>
        A pen, for example, can be a cheap giveaway. But a brass pen in a structured box with restrained branding and a matching desk accessory becomes a different kind of object. The product category is familiar, but the presentation changes the meaning.
      </p>
      <p style={prose.p}>
        Off-catalogue projects can also help distributors move away from highly transparent commodity pricing. When the product, packaging, finish, and presentation are built around a brief, the conversation becomes less about matching the cheapest SKU and more about delivering a higher-perceived-value package.
      </p>

      <h2 style={prose.h2}>Catalogue or Custom Metal? A Decision Checklist</h2>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-008-decision-desk"
        alt="Distributor project planning desk for catalogue versus custom sourcing decisions"
      />
      <p style={prose.p}>Not every brief needs an off-catalogue solution. Use this checklist before moving into a custom metal quote.</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Question</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Standard catalogue is usually better when...</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Custom metal may be worth exploring when...</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['How urgent is the timeline?', 'The item needs to be confirmed or delivered within days.', 'The project has enough time for artwork, proofing, production, and shipping.'],
              ['What is the main goal?', 'Low unit cost, high quantity, or quick distribution.', 'Higher perceived value, retention, recognition, or a more memorable brand moment.'],
              ['Does the client want something different?', 'A regular logo product is enough.', 'The client asks for a specific shape, material, finish, packaging, or set combination.'],
              ['Who will receive it?', 'It is a broad handout for a large audience.', 'It is for selected clients, employees, sponsors, speakers, members, or VIPs.'],
              ['How should the brand appear?', 'Standard logo visibility is enough.', 'The client wants more restrained, premium, or theme-specific branding.'],
              ['How much uncertainty can the client accept?', 'They want a proven SKU, fast sampling, and low uncertainty.', 'They can review mockups or proofs and accept a planned development process.'],
            ].map(([question, catalogue, custom], i) => (
              <tr key={question} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.55rem 0.75rem', color: '#1a1a1a', fontWeight: 600 }}>{question}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{catalogue}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#3a3a3a' }}>{custom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        If most answers fall on the left, a standard catalogue product is probably the better route. If several answers fall on the right, the project may justify off-catalogue custom sourcing.
      </p>

      <h2 style={prose.h2}>What to Include in a Custom Metal Gift Brief</h2>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_860/blog/blog-008-brief-components"
        alt="Custom metal gift brief with material samples packaging and project planning tools"
      />
      <p style={prose.p}>
        Once a project looks suitable for custom sourcing, the next step is not to ask for a vague quote. A useful brief helps the supplier judge feasibility, cost, production time, and the right level of customization.
      </p>
      <p style={prose.p}>At minimum, clarify:</p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Project purpose:</strong> recognition, event, onboarding, client appreciation, retail-style merch, sponsor gift, or another use case.</li>
        <li style={prose.li}><strong style={prose.strong}>Recipient profile:</strong> employees, top clients, speakers, sponsors, members, customers, or VIP guests.</li>
        <li style={prose.li}><strong style={prose.strong}>Quantity:</strong> expected order quantity, plus whether there may be repeat orders.</li>
        <li style={prose.li}><strong style={prose.strong}>Target budget:</strong> per piece or per set, including distributor margin expectations and whether packaging is included.</li>
        <li style={prose.li}><strong style={prose.strong}>Deadline:</strong> required delivery date, event date, and whether the date is flexible.</li>
        <li style={prose.li}><strong style={prose.strong}>Product format:</strong> single item, paired items, or a full gift set.</li>
      </ul>
      <p style={prose.p}>
        Then add the technical details that shape the quote: material, finish, branding method, packaging expectations, approval process, documents, destination country, and delivery address type.
      </p>

      <h2 style={prose.h2}>Where Wischos Fits</h2>
      <p style={prose.p}>
        Wischos Gift is a China-based B2B exporter of custom metal corporate gifts, working with planned projects such as metal pens, desk pieces, daily-carry items, drinkware, pins, medals, custom-shaped metal pieces, and gift sets.
      </p>
      <p style={prose.p}>
        For distributors, this kind of supplier is best used as a planned-project source, not as a replacement for daily local catalogue supply. The fit is strongest when a standard catalogue item feels too generic and the client has enough time to develop something more specific.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>MOQ around 100 sets</li>
        <li style={prose.li}>Production lead time around 25-35 days</li>
        <li style={prose.li}>Strongest fit for catalogue-adjacent and semi-custom metal projects; fully bespoke tooling needs case-by-case review</li>
      </ul>
      <p style={prose.p}>
        Seasonal timing matters. For Q4 and year-end gifting, many buyers plan delivery 90-120 days ahead. That planning window is much more compatible with custom metal production than last-minute holiday buying.
      </p>

      <h2 style={prose.h2}>Example Project Scenarios</h2>
      <p style={prose.p}><strong style={prose.strong}>Employee recognition:</strong> a brass pen, custom metal badge, or desk piece packaged for service anniversaries or promotion milestones.</p>
      <p style={prose.p}><strong style={prose.strong}>Executive client appreciation:</strong> a metal pen and desk accessory set with restrained branding and structured gift packaging.</p>
      <p style={prose.p}><strong style={prose.strong}>Brewery or hospitality VIP gift:</strong> a custom metal opener, tag, coaster, or drinkware piece designed around the venue or campaign.</p>
      <p style={prose.p}><strong style={prose.strong}>Conference sponsor gift:</strong> a slim metal card case, pen, or custom-shaped keepsake for speakers, sponsors, or VIP attendees.</p>
      <p style={prose.p}><strong style={prose.strong}>Awards and milestone programs:</strong> custom medals, pins, challenge-coin-style pieces, or small metal objects that feel more permanent than a standard giveaway.</p>

      <h2 style={prose.h2}>Conclusion</h2>
      <p style={prose.p}>
        Standard catalogues are essential. They help distributors quote quickly, compare options, manage repeat orders, and serve everyday promotional needs.
      </p>
      <p style={prose.p}>
        Off-catalogue custom projects have a different role. They are for moments when the client wants the item to feel more specific, more durable, more gift-like, or more connected to the campaign.
      </p>
      <p style={prose.p}>
        The strongest distributor strategy is not catalogue or custom. It is knowing when each one fits.
      </p>

      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What does off-catalogue mean in promotional products?</p>
      <p style={prose.p}>Off-catalogue means moving beyond a standard promotional product SKU with a logo added. In practice, it can include adapting a proven product family, combining items into a custom set, sourcing a product not shown in the standard catalogue, or developing a semi-custom item for a specific client brief.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>When should a promo distributor use a custom metal gift instead of a catalogue item?</p>
      <p style={prose.p}>A custom metal gift is worth exploring when the client wants stronger perceived value, retention, recognition impact, specific materials, custom packaging, or a more memorable brand moment. Standard catalogue sourcing is usually better for rush orders, low-cost mass handouts, basic apparel, and simple repeatable logo items.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What information is needed for a custom metal gift quote?</p>
      <p style={prose.p}>A useful custom metal gift brief should include project purpose, recipient profile, quantity, target budget, deadline, product format, preferred material or finish, branding method, packaging expectations, approval process, destination country, and any compliance or documentation requirements.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Can off-catalogue suppliers replace local catalogue suppliers?</p>
      <p style={prose.p}>Usually, no. Off-catalogue suppliers are best used for planned custom projects that need a specific material, finish, packaging structure, or product format. Local catalogue suppliers remain the better route for rush fulfilment, apparel decoration, repeat SKU orders, and very low-cost mass giveaway sourcing.</p>

      <div style={prose.callout}>
        Have a brief that feels too generic for the catalogue?{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>Send your concept, target budget, quantity, and deadline</Link>.
        We can review whether the project is a realistic fit for a catalogue-adjacent, semi-custom, or fully bespoke metal gift approach before you commit to a quote path.
      </div>

      <h2 style={prose.h2}>Related Reading</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><Link to={'/blog/what-makes-a-corporate-gift-worth-keeping' as RouterTo} style={prose.inlineLink}>What Makes a Corporate Gift Worth Keeping?</Link></li>
        <li style={prose.li}><Link to={'/blog/metal-surface-finishes-corporate-gifts' as RouterTo} style={prose.inlineLink}>Surface Finishes for Metal Corporate Gifts</Link></li>
        <li style={prose.li}><Link to={'/for-distributors' as RouterTo} style={prose.inlineLink}>Custom Metal Gift Sets for Distributors</Link></li>
      </ul>

      <h2 style={prose.h2}>Sources</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><a href="https://www.ppai.org/media-hub/product-power-2026-what-consumers-want-next-2/" style={prose.inlineLink}>PPAI Product Power 2026</a></li>
        <li style={prose.li}><a href="https://www.ppai.org/wp-content/uploads/2025/02/2024-PPAI-Sales-Volume-Report.pdf" style={prose.inlineLink}>PPAI 2024 U.S. Distributor Sales Volume Report</a></li>
        <li style={prose.li}><a href="https://asicentral.com/" style={prose.inlineLink}>ASI ESP platform</a></li>
        <li style={prose.li}><a href="https://www.sageworld.com/" style={prose.inlineLink}>SAGE</a></li>
      </ul>
    </div>
  )
}

function ArticleProjectReviewContent() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        A custom metal gift request often starts before every detail is confirmed. That is normal.
      </p>
      <p style={prose.p}>
        You may have a product reference, a client idea, a target recipient group, a campaign deadline, or just a rough direction:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>"The client wants a premium metal gift set."</li>
        <li style={prose.li}>"We need something more specific than a standard catalogue item."</li>
        <li style={prose.li}>"The event date is fixed, but the final product is still open."</li>
      </ul>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-009-rough-idea"
        alt="Rough custom gift idea organized with blank notes, metal finish samples, packaging and calendar"
      />
      <p style={prose.p}>
        Sometimes a project starts with only a short direction, such as "titanium pen set." That, plus a rough quantity and a ship date, is enough to start a conversation. We do not expect a full technical drawing, packaging dieline, and final artwork in the first email.
      </p>
      <p style={prose.p}>
        What we do need is enough context to judge whether the project is realistic: the product direction, roughly how many units, when the gifts must arrive, and what kind of branding or packaging is expected.
      </p>
      <p style={prose.p}>
        This article explains what helps us review a custom metal gift project, whether it is a corporate gift brief, distributor sourcing request, or early client idea, before quoting.
      </p>

      <h2 style={prose.h2}>1. Product Idea or Reference</h2>
      <p style={prose.p}>
        The product direction tells us which sourcing lane to check first.
      </p>
      <p style={prose.p}>
        This can be specific: brass pen, stainless steel desk accessory, aluminium card holder, metal keychain, titanium drinkware, two-piece or three-piece gift set. Or it can be open: client appreciation gift, executive desk gift, dealer recognition item, event sponsor gift.
      </p>
      <p style={prose.p}>
        Both are workable.
      </p>
      <p style={prose.p}>
        Because Wischos focuses on metal gift sets, we look at material, surface finish, logo method and packaging together rather than as separate decisions. A product direction, even a rough one, lets us start that review.
      </p>
      <p style={prose.p}>
        If you have a reference image, past order, catalogue item, sketch, or client mood board, send it. A reference does not need to be the final design. It helps us understand the product lane: size, material direction, finish level, branding space and packaging expectation.
      </p>
      <p style={prose.p}>
        For off-catalogue projects, the reference is often a starting point rather than a product to copy. We may suggest adapting a proven product family, adjusting finish, combining items into a set, or changing packaging so the project fits the budget and timeline.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>What to send:</strong> product idea, reference image, or the type of gift the client has in mind.
      </p>

      <h2 style={prose.h2}>2. Quantity Range</h2>
      <p style={prose.p}>
        Quantity is usually the first number we look for. It determines whether we should look at existing product families, semi-custom routes, custom tooling, or a simpler catalogue-adjacent option.
      </p>
      <p style={prose.p}>
        An exact final quantity is not necessary at the first stage, but a working range changes the options we review. A rough range is better than silence: 100-200 units, 500, 1,000, or phased with a possible reorder.
      </p>
      <p style={prose.p}>
        One thing worth flagging: a one-time 100-set executive gift project and a 100-set pilot for a recurring recognition program may need different recommendations. The first may prioritize presentation. The second needs a product and packaging route that can be repeated cleanly later. Knowing which situation applies shapes the recommendation from the start.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>What to send:</strong> estimated quantity range and whether this is a one-time project or a pilot.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-009-material-finish-logo"
        alt="Metal samples with laser engraving marks and finish swatches for a custom metal gift branding review"
      />

      <h2 style={prose.h2}>3. Target Budget Range</h2>
      <p style={prose.p}>
        Budget helps us avoid sending back an option the project cannot actually use.
      </p>
      <p style={prose.p}>
        The same project idea may be possible in several ways: standard product with logo, existing metal item with upgraded packaging, semi-custom finish or product combination, fully bespoke gift set with custom insert and sleeve. Each route has a different cost structure.
      </p>
      <p style={prose.p}>
        For distributors, this also matters because a supplier price that looks acceptable but does not account for freight, duty, local handling, artwork or client revisions creates a problem when building the proposal. A working budget range lets us suggest a path that fits the project instead of only looking good on paper.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>What to send:</strong> target budget per item or per set, and whether the number is product-only, FOB, landed, or resale-level.
      </p>

      <h2 style={prose.h2}>4. Deadline or Event Date</h2>
      <p style={prose.p}>
        For custom metal gifts, the most important date is the required in-hands date, not the order date, not the production start date.
      </p>
      <p style={prose.p}>
        The project timeline includes more than production. Artwork review, sample or proof approval, packaging confirmation, inspection, export handling and shipping all happen before the box arrives. Wischos commonly discusses production around 25-35 days after approval, but that is not total project time. The full timeline depends on the item, quantity, packaging, sample requirement, destination and shipping method.
      </p>
      <p style={prose.p}>
        Tell us the event date early. If it is fixed, we may need a simpler configuration or air shipment. If it is flexible, that may make sea freight, better packaging, or a sample-first route possible.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-009-destination-feasibility"
        alt="Custom metal gift feasibility review desk with samples, calculator, folder and project planning documents"
      />

      <h2 style={prose.h2}>5. Logo and Branding Needs</h2>
      <p style={prose.p}>
        Logo details tell us whether the surface, finish and artwork can work together.
      </p>
      <p style={prose.p}>
        For metal products, common branding routes include laser engraving, printing, debossing, embossing, enamel, color fill, plating effects and packaging print. Laser engraving is often suitable for metal because it creates a durable mark without adding an ink layer. But it is not always right. Exact brand colors, gradients, very small text, or detailed crests may need a different approach.
      </p>
      <p style={prose.p}>
        The best logo method depends on the material, surface finish, logo size, color requirement and whether the brand prefers subtle or high-visibility marking. Vector artwork is preferred when available. If final artwork is not ready, a screenshot or low-resolution reference can still help us review feasibility.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>What to send:</strong> logo file if available, expected logo position, color requirement, and whether personalization is needed.
      </p>

      <h2 style={prose.h2}>6. Packaging Expectation</h2>
      <p style={prose.p}>
        Packaging is often where a simple metal item becomes a gift. The same metal piece in standard packaging and in a rigid gift box with a fitted insert are different offers: in perceived value, unit cost, production time and shipping volume.
      </p>
      <p style={prose.p}>
        You do not need final packaging artwork at the beginning. But it helps to know the intended presentation level: simple individual packaging, standard gift box, rigid box, drawer box, insert, sleeve, message card, or direct-mail use.
      </p>
      <p style={prose.p}>
        If the gift will go into a larger campaign pack, we should know early. If the packaging itself must carry the brand message, that changes both the design and the quotation path. At the early stage, even a simple note such as "standard box is fine" or "client wants a presentation box" helps us avoid quoting the wrong packaging route.
      </p>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-009-packaging-review"
        alt="Custom metal gifts shown in simple packaging and a rigid gift box with fitted insert"
      />

      <h2 style={prose.h2}>When a Feasibility Review Comes Before a Firm Quote</h2>
      <p style={prose.p}>
        Sometimes the right first step is not a firm quote. It is a feasibility review.
      </p>
      <p style={prose.p}>
        That usually happens when the product idea is still broad, quantity is uncertain, budget is not confirmed, or the event date may be tight. A feasibility review is not a delay. It is a way to avoid quoting a price that later fails because the artwork, packaging, shipping or approval path was not understood.
      </p>
      <p style={prose.p}>
        At this stage we may suggest a simpler route, a different material, a standard product family, a semi-custom option, or a packaging adjustment. The purpose is practical: find a route that can be made, approved, packed and shipped within the project constraints.
      </p>

      <h2 style={prose.h2}>Send What You Already Know</h2>
      <p style={prose.p}>
        You do not need to prepare a full sourcing brief before contacting us. If you have only a few details, send those first:
      </p>
      <pre style={{
        background: '#f7f4f1',
        border: '1px solid #e8ddd3',
        borderRadius: '2px',
        padding: '1rem',
        overflowX: 'auto',
        fontSize: '0.86rem',
        lineHeight: 1.7,
        color: '#2a2a2a',
        marginBottom: '1.35rem',
      }}>
{`Product idea or reference:
Quantity range:
Target budget range:
Deadline or event date:
Logo / branding needs:
Packaging expectation:`}
      </pre>
      <p style={prose.p}>
        Leave unknown fields blank. We will ask focused follow-up questions.
      </p>
      <p style={prose.p}>
        For distributors and gifting agencies, all client communication can stay through you. We review the project information you share, advise on a workable sourcing route, and support you with clear material, customization, packaging and production details for your proposal.
      </p>

      <h2 style={prose.h2}>Have a Custom Metal Gift Idea to Review?</h2>
      <p style={prose.p}>
        Send what you already know to <a href="mailto:johnlui@wischosgift.com" style={prose.inlineLink}>johnlui@wischosgift.com</a>: product idea, quantity range, budget range, and deadline. We can review whether the project is better suited to a catalogue-adjacent item, semi-custom metal piece, <Link to={'/gift-sets' as RouterTo} style={prose.inlineLink}>curated gift set</Link>, or more developed custom sourcing path.
      </p>

      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Do I need final artwork before asking Wischos to review a project?</p>
      <p style={prose.p}>No. A logo screenshot or reference is enough for an early feasibility review. Final production will need usable artwork, preferably vector files, but that comes later in the process.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Why do you ask for budget before quoting?</p>
      <p style={prose.p}>Budget helps us choose the right sourcing path. Without a range, we may suggest an option that is technically possible but does not account for freight, duty, local handling, artwork or client revisions, which makes the quote hard to use in a real proposal.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Is production time the same as total project time?</p>
      <p style={prose.p}>No. Production time starts after approval. Total project time also includes review, artwork, samples, packaging confirmation, inspection, export handling and shipping. For time-sensitive projects, the difference matters.</p>

      <h2 style={prose.h2}>Related Reading</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><Link to={'/blog/standard-catalogue-to-custom-metal-projects' as RouterTo} style={prose.inlineLink}>From Standard Catalogue to Custom Metal Projects</Link></li>
        <li style={prose.li}><Link to={'/blog/metal-surface-finishes-corporate-gifts' as RouterTo} style={prose.inlineLink}>Surface Finishes for Metal Corporate Gifts</Link></li>
        <li style={prose.li}><Link to={'/blog/laser-engraving-vs-color-printing-corporate-gifts' as RouterTo} style={prose.inlineLink}>Laser Engraving vs. Color Printing</Link></li>
        <li style={prose.li}><Link to={'/for-distributors' as RouterTo} style={prose.inlineLink}>Custom Metal Gift Sets for Distributors</Link></li>
      </ul>

      <h2 style={prose.h2}>Sources and Claim Notes</h2>
      <ul style={prose.ul}>
        <li style={prose.li}>Wischos internal project experience: production timing, common inquiry fields, material/logo/packaging review process.</li>
        <li style={prose.li}>Wischos buyer intent research: <code>docs/research-buyer-intent.md</code></li>
        <li style={prose.li}>Wischos competitor catalogue research: <code>docs/research-competitor-catalogs.md</code></li>
        <li style={prose.li}>Wischos blog data verification rules: <code>content create/blog/博客数据核实报告.md</code></li>
        <li style={prose.li}>Blog source list: <code>content create/blog/blog信息源.md</code></li>
        <li style={prose.li}><a href="https://www.cpsc.gov/" style={prose.inlineLink}>CPSC product safety reference</a></li>
        <li style={prose.li}><a href="https://eur-lex.europa.eu/legal-content/en/ALL/?uri=LEGISSUM%3A4670517" style={prose.inlineLink}>EU GPSR legal summary</a></li>
        <li style={prose.li}><a href="https://echa.europa.eu/legislation" style={prose.inlineLink}>ECHA / REACH legislation reference</a></li>
      </ul>
    </div>
  )
}

function ArticleQualityChecklistContent() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        Every buyer has a version of this story.
      </p>
      <p style={prose.p}>
        A sample looks clean. The material says "premium metal." The logo mockup looks sharp. You approve production. Three weeks before the client event, 500 units arrive, and the first box you open has pen clips that feel like they might snap, a logo so faint it is barely visible in normal light, and surface scratches from pieces rubbing each other in transit.
      </p>
      <p style={prose.p}>
        None of that was visible in the photos.
      </p>
      <p style={prose.p}>
        This is the structural problem with specifying metal gifts remotely. Studio lighting flatters polished surfaces. White backgrounds make items look heavier than they are. Digital mockups are always sharper than the real engraving. And "premium metal" could describe solid brass, plated zinc alloy, anodised aluminium, or plastic with a metallic coating. The phrase tells you almost nothing about what the recipient is actually holding.
      </p>
      <p style={prose.p}>
        <a href="https://www.ppai.org/media-hub/product-power-2026-what-consumers-want-next-2/" style={prose.inlineLink} target="_blank" rel="noopener noreferrer">PPAI's Product Power 2026 consumer study</a>, covering more than 5,000 U.S. respondents, found that nearly two-thirds are likely to keep a branded product for six months or longer, with durability, design, and material cited as primary reasons. That changes the quality calculation. A gift that looks impressive on delivery but feels hollow or scratched by week two is not doing anyone's brand any favors.
      </p>
      <p style={prose.p}>
        At Wischos, the same issues show up in very ordinary places: the crown of a bolt-action pen, the thread on a titanium capsule bottle, the edge of an aluminium notebook cover, or the insert that is supposed to stop three metal pieces from touching inside a gift box. The seven checks below — what we call the Wischos Pre-Production Review — should happen before production is confirmed, not after.
      </p>

      <h2 style={prose.h2}>The Wischos Pre-Production Review: 7 Checks at a Glance</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Quality check</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>What to inspect</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Material honesty', 'Actual metal, alloy, plating, grade', '"Premium metal" tells buyers nothing. The spec should.'],
              ['Weight and balance', 'Hand feel, balance point, use case fit', "Heavy isn't always better. Wrong weight reduces daily use."],
              ['Edges and seams', 'Burrs, corners, clip ends, hinge gaps', 'A sharp edge makes a premium gift feel unfinished.'],
              ['Surface finish', 'Fingerprints, scratches, coating consistency', 'Mirror polish looks great in photos. Less so after a week in a pocket.'],
              ['Logo result', 'Depth, contrast, readability, position', 'A strong product looks cheap with a muddy or oversized mark.'],
              ['Moving parts', 'Click, slide, fold, thread, hinge', 'The mechanism is the first place quality is actually felt.'],
              ['Packaging', 'Individual protection, abrasion prevention', 'Metal surfaces can be damaged before the recipient opens the box.'],
            ].map(([check, inspect, why], i) => (
              <tr key={check} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.6rem 0.75rem', color: '#1a1a1a', fontWeight: 600 }}>{check}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#3a3a3a' }}>{inspect}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#3a3a3a' }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        The Pre-Production Review covers buyer-side checks before order approval. It is not a substitute for product testing, compliance review, or legal advice.
      </p>

      <h2 style={prose.h2}>1. Confirm What Metal the Product Actually Uses</h2>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-016/material-samples"
        alt="Metal material and surface samples beside calipers and a magnifying loupe for buyer-side material review"
        caption="AI-generated editorial visual: material and finish samples used to illustrate why buyers should ask what metal, plating or coating is actually being supplied."
      />
      <p style={prose.p}>
        The first question to ask is not "does this look like metal?" It is "what is this actually made from?"
      </p>
      <p style={prose.p}>
        In practice, "metal" covers a lot of ground:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>solid brass</li>
        <li style={prose.li}>stainless steel, where the grade matters</li>
        <li style={prose.li}>anodised aluminium</li>
        <li style={prose.li}>titanium</li>
        <li style={prose.li}>zinc alloy with plating</li>
        <li style={prose.li}>steel or brass plating over another substrate</li>
        <li style={prose.li}>plastic with a metallic coating</li>
      </ul>
      <p style={prose.p}>
        None of these is automatically wrong for every project. Zinc alloy, for example, handles complex molded shapes well and is a reasonable choice for keyrings, tokens, and campaign pieces where custom geometry and cost control both matter. The problem is not the material. The problem is when the material is described vaguely while being positioned as something more substantial.
      </p>
      <p style={prose.p}>
        A product listed as "premium metal" on a quote does not tell a buyer whether the recipient is getting solid brass or plated zinc. Ask the supplier to state it plainly:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>Is the main body solid metal, or plated over something else?</li>
        <li style={prose.li}>If plated, what is the base material?</li>
        <li style={prose.li}>If stainless steel, what grade?</li>
        <li style={prose.li}>If aluminium, is the colour anodised, painted, or coated?</li>
        <li style={prose.li}>If titanium, which component is titanium, and how is that claim verified?</li>
        <li style={prose.li}>Are clips, rings, caps, or accessories made from a different material?</li>
      </ul>
      <p style={prose.p}>
        These questions take ten minutes by email. Finding out the answers after delivery takes considerably longer.
      </p>

      <h2 style={prose.h2}>2. Does the Weight Make Sense for How It Will Be Used?</h2>
      <p style={prose.p}>
        Weight is one of the fastest shortcuts the brain uses to judge quality. Heavy usually reads as substantial and well-made.
      </p>
      <p style={prose.p}>
        But it is not a simple "heavier is better" equation. A brass desk pen can carry real weight because it lives on a surface and gets picked up deliberately. A key organizer or card case needs to be light enough that someone actually keeps it in their pocket every day. A tumbler that feels impressively solid when empty becomes inconvenient to carry to a meeting when full.
      </p>
      <p style={prose.p}>
        The question during sample review is not "is this heavy?" It is "is this the right weight for what it is supposed to do?"
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Product type</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Weight should feel</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Watch for</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Desk pen', 'Stable, balanced, substantial in writing grip', 'Too heavy at tip or crown'],
              ['Card case', 'Slim, firm, pocketable without bulk', 'Sharp corners, pocket drag'],
              ['Key organizer', 'Dense enough to feel durable, light enough to carry daily', 'Stiff key movement, bulky ring'],
              ['Device stand', 'Stable under tablet or phone load', 'Too light at the base'],
              ['Bottle or tumbler', 'Premium when empty, usable when full', 'Great empty, tiring at full capacity'],
              ['Letter opener or desk tool', 'Comfortable, not toy-like', 'Over-polished grip, slippery under use'],
            ].map(([type, feel, watch], i) => (
              <tr key={type} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.6rem 0.75rem', color: '#1a1a1a', fontWeight: 600 }}>{type}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#3a3a3a' }}>{feel}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#3a3a3a' }}>{watch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        If possible, record the sample weight in grams. It makes comparisons between samples more consistent than "this one feels heavier."
      </p>

      <h2 style={prose.h2}>3. Run Your Fingers Along Every Edge</h2>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-016/mechanism-logo-inspection"
        alt="Close-up of metal corporate gift samples including brass pen, card case, folding stand, key organizer and calipers for edge, logo and mechanism inspection"
        caption="AI-generated editorial visual: close-up inspection context for edges, logo areas, hinges, slides and other touch points."
      />
      <p style={prose.p}>
        If material honesty is the first check, edge finishing is where quality becomes undeniable.
      </p>
      <p style={prose.p}>
        A product can use exactly the right material and still feel cheap if the edges are rough, seams are uneven, or corners have not been properly finished. For products that live in pockets, hands, or bags, such as pens, key tools, card cases, and bottle openers, these are not just aesthetic issues. Burrs and sharp corners affect daily comfort and, in some cases, safety.
      </p>
      <p style={prose.p}>
        Check these points on every sample:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>edges on card cases, bookmarks, openers, and metal tags</li>
        <li style={prose.li}>clip ends on pens, badge holders, and key tools</li>
        <li style={prose.li}>hinge lines and fold points on stands, scissors, or multi-tools</li>
        <li style={prose.li}>seams on bottles and tube-formed parts</li>
        <li style={prose.li}>corners on aluminium, steel, or zinc alloy pieces</li>
        <li style={prose.li}>logo edges after engraving, debossing, or stamping</li>
        <li style={prose.li}>holes, rings, chain slots, and carabiner gates</li>
      </ul>
      <p style={prose.p}>
        The test is simple: run a fingertip around the full perimeter. You are not trying to make every edge soft or rounded. Some products need clean geometric lines, and that is fine. You are looking for anything that would feel unfinished or uncomfortable in normal handling.
      </p>
      <p style={prose.p}>
        Product safety requirements vary by market and audience. The U.S. Consumer Product Safety Commission notes that promotional product suppliers and distributors have legal responsibilities under federal safety laws, particularly for products or decoration aimed at children 12 and under. Most executive desk gifts are not in that category, but the underlying principle applies regardless: who handles this, and how, should inform where you look.
      </p>

      <h2 style={prose.h2}>4. Pick a Surface Finish That Survives a Pocket</h2>
      <p style={prose.p}>
        Studio photos are a bad surface-finish test.
      </p>
      <p style={prose.p}>
        Under controlled lighting, mirror polish looks extraordinary. After a week of daily carry, it looks like someone's thumbprint collection. The finish you choose determines how the gift looks after normal use, not how it looks in the sample photo.
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Mirror polish</strong> catches light beautifully and signals effort. It also shows every fingerprint and fine scratch.</li>
        <li style={prose.li}><strong style={prose.strong}>Brushed and matte finishes</strong> are more forgiving. Minor contact leaves less visible marks, which makes them better for pens, card cases, and daily-carry pieces.</li>
        <li style={prose.li}><strong style={prose.strong}>Bead-blasted surfaces</strong> work similarly: the texture hides micro-damage that would be obvious on a smooth finish.</li>
        <li style={prose.li}><strong style={prose.strong}>Anodised aluminium</strong> delivers stable colour when the process is well controlled. Quality varies between suppliers more than the spec sheet suggests.</li>
        <li style={prose.li}><strong style={prose.strong}>PVD</strong> can create a premium dark or tonal look on the right metal substrate, but it depends on base material, process control, and real use.</li>
      </ul>
      <p style={prose.p}>
        For coated, plated, or painted products going to EU markets, REACH is the relevant chemical regulation framework, and ECHA maintains the applicable legislation and substance restriction information. In practice, this means asking the supplier whether the finish has been tested against relevant substance lists for the destination market.
      </p>

      <h2 style={prose.h2}>5. Approve the Real Logo, Not the Mockup</h2>
      <p style={prose.p}>
        A digital mockup is always cleaner than the actual result. Mockups do not account for surface texture, engraving depth, the exact angle of a laser head, or what small text does when it is physically cut into metal.
      </p>
      <p style={prose.p}>
        The same logo can produce very different outcomes depending on material, finish, surface shape, mark size, and method. A mark that reads cleanly on flat matte aluminium may disappear into the texture of brushed stainless or get lost in the reflections of polished brass. Curved surfaces shrink usable marking area and distort print registration. Laser engraving, screen print, enamel fill, debossing, and pad print all behave differently.
      </p>
      <p style={prose.p}>
        Before approving production, get the size confirmed in millimetres, not just "small" or "large." Confirm exact placement on the product. If the project includes multiple items in a gift set, check each piece separately. The right logo size for a pen is not the right logo size for a bottle or card case.
      </p>
      <p style={prose.p}>
        Laser engraving is usually the right call for metal gifts. It creates a permanent mark without adding an ink layer, and it ages well over years of handling. But exact Pantone colours, gradients, very fine illustration detail, or high-visibility event branding may need a different approach.
      </p>
      <p style={prose.p}>
        The safest approval is the least glamorous one: the real mark on the real surface, checked before production is confirmed.
      </p>

      <h2 style={prose.h2}>6. Click It, Fold It, Slide It — Then Do It Again</h2>
      <p style={prose.p}>
        The first time someone uses a metal gift, they are not admiring the surface finish. They are feeling whether the mechanism works.
      </p>
      <p style={prose.p}>
        For a bolt-action pen, that is the click. For a folding stand, the hinge. For a card case, the slide or spring release. For a key organizer, the movement of the keys. For a bottle, the cap thread. For folding scissors, the open-close resistance.
      </p>
      <p style={prose.p}>
        During sample review, test:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>Pens:</strong> click, twist, and cap action.</li>
        <li style={prose.li}><strong style={prose.strong}>Threads:</strong> smooth engagement on bottles and capsule containers.</li>
        <li style={prose.li}><strong style={prose.strong}>Hinges:</strong> consistent resistance on stands, scissors, and multi-tools.</li>
        <li style={prose.li}><strong style={prose.strong}>Springs and slides:</strong> clean return action on card cases.</li>
        <li style={prose.li}><strong style={prose.strong}>Clip tension:</strong> firm without being hard to use.</li>
        <li style={prose.li}><strong style={prose.strong}>Rings and gates:</strong> smooth, positive engagement.</li>
      </ul>
      <p style={prose.p}>
        Do not test it once. Open and close it. Click it repeatedly. Slide it back and forth. You are not running a lifecycle test; you are checking whether the product still feels controlled after the kind of use it will see in its first month.
      </p>

      <h2 style={prose.h2}>7. Packaging That Protects Before the Recipient Ever Sees It</h2>
      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-016/protective-packaging"
        alt="Open rigid gift box with separated metal gift items held in a fitted protective insert"
        caption="AI-generated editorial visual: protective gift-set packaging with separated metal pieces to illustrate metal-on-metal abrasion control."
      />
      <p style={prose.p}>
        Most metal gift damage happens in transit, not in production.
      </p>
      <p style={prose.p}>
        A polished pen rubs against a card case. A bottle shifts inside a loose carton. A keyring scratches a fine surface finish. A heavier item compresses weak padding from underneath. The recipient opens what was supposed to be a premium gift and finds scuffs before they have even used the product. The packaging failed, not the factory.
      </p>
      <p style={prose.p}>
        For sample review, the packaging should be treated as a product in its own right:
      </p>
      <ul style={prose.ul}>
        <li style={prose.li}>Does every item have its own recess, sleeve, or bag?</li>
        <li style={prose.li}>Can parts touch or rub during shipping?</li>
        <li style={prose.li}>Is the insert material soft enough not to mark finished metal surfaces?</li>
        <li style={prose.li}>Is the box structurally solid enough for the packed weight?</li>
        <li style={prose.li}>Does the packaging volume fit the shipping cost assumptions in the budget?</li>
        <li style={prose.li}>Does the outer export carton handle the final packed weight without folding?</li>
      </ul>
      <p style={prose.p}>
        One practical test: pack the sample in its intended packaging, shake it for ten seconds, then open it. If anything has shifted or you can hear parts moving, the packaging is not finished.
      </p>

      <h2 style={prose.h2}>When You Need More Than a Visual Check</h2>
      <p style={prose.p}>
        Everything above is buyer-side quality review: visual inspection and hands-on sample assessment. Some projects need more.
      </p>
      <p style={prose.p}>
        The relevant factors are destination market, product type, intended audience, decoration method, material, and any specific claims the product makes. An executive desk gift for a corporate client is a different compliance category from a drinkware product, a child-facing campaign piece, or anything making sustainability, food-contact, recycled-content, or RFID claims.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>If the project involves...</th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontWeight: 600, color: '#1a1a1a' }}>Ask before production</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Children or artwork likely to attract children', "Does it become a children's product? What testing does that require?"],
              ['Drinkware or food-contact surfaces', 'What material, lining, coating, and destination-specific rules apply?'],
              ['Coating, plating, paint, or ink', 'Are substance restrictions relevant in the destination market?'],
              ['Electronics or batteries', 'Does it trigger electrical, battery, transport, or labeling requirements?'],
              ['Sustainability claims', 'What documentation supports the claim?'],
              ['Titanium, stainless grade, recycled content, or RFID', 'How is the claim verified by the supplier?'],
              ['EU shipment', 'Who is the importer of record / responsible economic operator, and what documents are required?'],
              ['U.S. shipment', 'What CPSC rules, testing obligations, or reporting duties apply?'],
            ].map(([factor, ask], i) => (
              <tr key={factor} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: '0.6rem 0.75rem', color: '#1a1a1a', fontWeight: 600 }}>{factor}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#3a3a3a' }}>{ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={prose.p}>
        For U.S. markets, CPSC publishes guidance specifically for promotional product suppliers and distributors on federal consumer safety law. For EU markets, the General Product Safety Regulation sets the baseline framework. For substance restrictions in the EU, ECHA is the reference point for REACH legislation and chemical restrictions.
      </p>
      <p style={prose.p}>
        ISO 9001 certification can support supplier evaluation, but it is not proof that a specific sample is acceptable. It means the supplier has a documented quality management system, not that every product coming off their line will pass your review.
      </p>

      <h2 style={prose.h2}>Sample Approval Worksheet</h2>
      <p style={prose.p}>
        Use this worksheet when reviewing a custom metal corporate gift sample:
      </p>
      <pre style={{
        background: '#f7f4f1',
        border: '1px solid #e8ddd3',
        borderRadius: '2px',
        padding: '1rem',
        overflowX: 'auto',
        fontSize: '0.86rem',
        lineHeight: 1.7,
        color: '#2a2a2a',
        marginBottom: '1.35rem',
      }}>
{`Project:
Recipient:
Destination market:
Quantity:
Target budget:
Required in-hands date:

1. Material
- Supplier-stated material:
- Plated/coated/solid:
- Parts made from other materials:
- Claim needs verification? Yes / No

2. Weight and hand feel
- Sample weight:
- Balanced for use case? Yes / No
- Too heavy / too light / acceptable:

3. Edges and construction
- Burrs or sharp corners:
- Gaps, seams or misalignment:
- Touch points comfortable? Yes / No

4. Surface finish
- Finish type:
- Fingerprints visible? Yes / No
- Scratch risk acceptable? Yes / No
- Color or coating consistent? Yes / No

5. Logo
- Method:
- Size:
- Position:
- Contrast/readability:
- Approved on real sample? Yes / No

6. Mechanism or interaction
- Click / hinge / slide / thread / clip tested:
- Repeated handling result:
- Noise or looseness:

7. Packaging
- Individual protection:
- Items separated:
- Box strength:
- Shipping abrasion risk:

8. Documentation and compliance
- Destination rules checked:
- Testing needed:
- Material or claim documents needed:
- Importer/distributor responsibilities clarified:

Decision:
- Approve
- Approve with changes
- Re-sample required
- Reject`}
      </pre>

      <h2 style={prose.h2}>How Wischos Applies the Pre-Production Review</h2>
      <p style={prose.p}>
        Wischos focuses on custom metal corporate gifts and metal-led gift sets: brass pens, aluminium desk tools, titanium drinkware, stainless steel carry pieces, key organizers, card cases, and related packaging.
      </p>
      <p style={prose.p}>
        When reviewing a project, we look at the metal item as a complete buyer decision: material claim, use case, logo method, surface finish, packaging route, production timeline, and destination requirements.
      </p>
      <p style={prose.p}>
        For distributors and gifting agencies, this helps turn a vague client request such as "premium metal gift" into a product route that can be quoted, sampled, branded, packed, and delivered.
      </p>
      <div style={prose.callout}>
        Reviewing a metal gift idea?{' '}
        <Link to={'/contact' as RouterTo} style={prose.inlineLink}>Send the product reference, quantity range, target budget, logo requirement, packaging expectation, and destination country</Link>.
        We can help identify whether the project is better suited to an existing product family, semi-custom option, curated gift set, or more developed custom metal project.
      </div>

      <h2 style={prose.h2}>Frequently Asked Questions</h2>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What is the most important quality check for metal corporate gifts?</p>
      <p style={prose.p}>The first check is material honesty. Buyers should know whether the item is solid brass, stainless steel, aluminium, titanium, zinc alloy, plated metal, or coated plastic. Once the real material is clear, weight, finish, logo method, and packaging can be judged properly.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Does heavier always mean better for metal gifts?</p>
      <p style={prose.p}>No. Weight should match the use case. A desk pen or letter opener may benefit from a substantial feel, but a key organizer, card case, or travel item can become inconvenient if it is too heavy. Good metal gift quality is about balance, not maximum weight.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>Is laser engraving always the best logo method for metal gifts?</p>
      <p style={prose.p}>Laser engraving is often strong for metal because it creates a durable mark without an added ink layer. It is not always best for exact brand colours, gradients, very small text, or high-visibility event branding. Buyers should approve the real mark on the real surface.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What surface finish is safest for daily-use metal gifts?</p>
      <p style={prose.p}>For daily handling, brushed, matte, and bead-blasted finishes are usually more forgiving than mirror polish because they hide fingerprints and micro-scratches better. The right finish still depends on material, product shape, logo method, and whether the item is used on a desk, in a pocket, or with drinkware.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>When should a metal corporate gift be tested?</p>
      <p style={prose.p}>Testing should be considered when the product touches food or drink, may appeal to children, contains coatings or inks, includes electronics, makes sustainability or material claims, or ships to a market with specific safety and substance rules. Visual inspection alone is not enough for those cases.</p>
      <p style={{ ...prose.p, fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>What should I ask a supplier before ordering custom metal gifts?</p>
      <p style={prose.p}>Ask for the material, finish, logo method, sample weight, MOQ, packaging route, production time, destination assumptions, and any testing or documentation needed. Also ask whether the sample you approve will match the mass-production process.</p>

      <h2 style={prose.h2}>Related Reading</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><Link to={'/blog/metal-surface-finishes-corporate-gifts' as RouterTo} style={prose.inlineLink}>Surface Finishes for Metal Corporate Gifts</Link></li>
        <li style={prose.li}><Link to={'/blog/laser-engraving-vs-color-printing-corporate-gifts' as RouterTo} style={prose.inlineLink}>Laser Engraving vs. Color Printing</Link></li>
        <li style={prose.li}><Link to={'/blog/what-we-need-to-review-a-custom-metal-gift-project' as RouterTo} style={prose.inlineLink}>What We Need to Review a Custom Metal Gift Project</Link></li>
        <li style={prose.li}><Link to={'/gift-sets' as RouterTo} style={prose.inlineLink}>Custom Metal Gift Sets</Link></li>
        <li style={prose.li}><Link to={'/for-distributors' as RouterTo} style={prose.inlineLink}>For Distributors</Link></li>
      </ul>

      <h2 style={prose.h2}>Sources</h2>
      <ul style={prose.ul}>
        <li style={prose.li}><a href="https://www.ppai.org/media-hub/product-power-2026-what-consumers-want-next-2/" style={prose.inlineLink}>PPAI, Product Power 2026: What Consumers Want Next</a></li>
        <li style={prose.li}><a href="https://www.cpsc.gov/FAQ/Promotional-Products" style={prose.inlineLink}>U.S. Consumer Product Safety Commission, Promotional Products FAQ</a></li>
        <li style={prose.li}><a href="https://www.cpsc.gov/Business--Manufacturing/Business-Education" style={prose.inlineLink}>U.S. Consumer Product Safety Commission, Business Education</a></li>
        <li style={prose.li}><a href="https://commission.europa.eu/topics/business-and-industry/doing-business-eu/eu-product-safety-and-labelling/product-safety_en" style={prose.inlineLink}>European Commission, Product Safety</a></li>
        <li style={prose.li}><a href="https://echa.europa.eu/legislation" style={prose.inlineLink}>ECHA, Legislation</a></li>
        <li style={prose.li}><a href="https://www.iso.org/standards/popular/iso-9000-family" style={prose.inlineLink}>ISO, ISO 9000 family / quality management</a></li>
      </ul>
      <p style={{ ...prose.p, fontSize: '0.82rem', color: '#777' }}>
        Image note: the visuals in this article are AI-generated editorial images created for explanation. They should not be read as Wischos production samples, QC evidence, or photographs from a specific customer project.
      </p>
    </div>
  )
}

function ArticleMetalAnchorPieceContent() {
  return (
    <div style={prose.wrapper}>
      <p style={prose.p}>
        The case for usefulness, material quality, and restrained branding is already made in our post on{' '}
        <Link to={'/blog/what-makes-a-corporate-gift-worth-keeping' as RouterTo} style={prose.inlineLink}>what makes a corporate gift worth keeping</Link>{' '}
        and in our{' '}
        <Link to={'/blog/aluminum-brass-steel-titanium-corporate-gifts' as RouterTo} style={prose.inlineLink}>metals guide</Link>.
        This piece is about a different question: not <em>which</em> gift to choose, but <em>how to structure the set around it</em>.
      </p>

      <h2 style={prose.h2}>The structural problem no one names</h2>
      <p style={prose.p}>
        A set can contain good individual items and still feel incoherent.
      </p>
      <p style={prose.p}>
        The box is full: pen, notebook, pouch, card, food item. Each piece passes the usefulness test on its own. But when the recipient closes the box, nothing has clearly claimed the role of <em>the thing I am keeping</em>. Every item looks like an add-on to every other item. The set reads as assembled, not designed.
      </p>
      <p style={prose.p}>
        This is a set-design problem, distinct from a product-quality problem. Solving it does not require better individual items. It requires one of those items to take a defined role. We call that piece the <strong style={prose.strong}>anchor</strong>.
      </p>
      <p style={prose.p}>
        The anchor concept is Wischos-side working language, not an industry standard. But it maps onto a real decision that belongs in the brief early: after the packaging, food, card, and seasonal elements are gone, what is the recipient expected to keep?
      </p>

      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-017/role-taxonomy-gift-set"
        alt="Metal pen arranged as the anchor piece with supporting notebook, pouch, symbolic token and finish sample"
        caption="A clear hierarchy lets the anchor lead while supporting, symbolic, and sample pieces each serve a distinct purpose."
      />

      <h2 style={prose.h2}>The role taxonomy: anchor, supporting, symbolic, sample</h2>
      <p style={prose.p}>
        Not every piece in a set has the same job. Once you name the roles, the brief gets cleaner.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>The anchor piece</strong> is the item the recipient is most likely to keep, use, or recall six months later. Its job is to give the recipient a clear reason to hold onto the set. It benefits from physical properties that survive daily use, which is one reason a well-made metal piece often ends up here. A machined brass pen, a stainless card case, a compact EDC tool: these are anchor candidates when the brief supports them. But the anchor is defined by the brief, not the material. A high-quality leather notebook or a textile piece can anchor a set just as legitimately.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>The supporting piece</strong> exists to serve the anchor. Its job is not to stand alone. It is to make the anchor more usable or more complete. A notebook paired with a precision pen is not filler; it gives the pen something to write in. A slim pouch is not filler if it carries the two metal pieces the set is built around.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>The symbolic piece</strong> marks an occasion or membership rather than earning daily use. A custom-shaped token, a commemorative key tag, an event badge: these do not need to pass the desk-drawer test. Their job is to signal that something specific happened, and that the recipient was part of it.
      </p>
      <p style={prose.p}>
        <strong style={prose.strong}>The sample piece</strong> is specifically functional for the distributor's sales process: a finish swatch, a small engraved demo piece, or a compact version of the anchor that travels with a quote. It exists to demonstrate what is achievable, not to be the hero of the recipient's experience.
      </p>
      <p style={prose.p}>
        Most sets contain two or three of these roles. The mistake is building a set without deciding which is which.
      </p>
      <p style={prose.p}>
        One exception worth naming: when every item in a set is a durable metal piece with its own daily-use function, a parallel structure is equally valid. Not every all-metal set needs a single anchor. It can be designed around two or three pieces that each address a different moment in the recipient's day. The anchor framework is most critical when a set contains consumables or non-durable items: the piece that will outlast everything else needs a defined lead role.
      </p>

      <h2 style={prose.h2}>How the anchor changes every other piece's job</h2>
      <p style={prose.p}>
        This is the part of set design that becomes obvious once you have named it and invisible until you do.
      </p>
      <p style={prose.p}>
        Without an anchor, every item in the set is implicitly competing for the position. The pen, the notebook, the card case, the pouch: each one is trying to be <em>the thing</em>. None of them win. The result is a set that feels like a collection of candidates rather than a resolved design.
      </p>
      <p style={prose.p}>
        Once the anchor is identified, the brief for every other piece gets clearer. The notebook's job is no longer "be impressive on its own"; it is "give the pen something to write in." The pouch's job is no longer "add bulk"; it is "carry the two metal pieces without scratching them." The symbolic piece's job is no longer "justify its own cost"; it is "mark the occasion." Roles replace ambiguity.
      </p>
      <p style={prose.p}>
        This also concentrates perceived value in the right place. The retention logic we covered in{' '}
        <Link to={'/blog/what-makes-a-corporate-gift-worth-keeping' as RouterTo} style={prose.inlineLink}>our earlier article</Link>{' '}
        points consistently toward usefulness as the reason people hold onto branded objects. The anchor is where that usefulness lives. The rest of the set's job is to support it, not dilute it.
      </p>

      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-017/anchor-piece-daily-use"
        alt="Brushed metal pen in daily use with a notebook, card case and pouch on an office desk"
        caption="The anchor earns its role after unboxing: it should fit naturally into the recipient's real working day."
      />

      <h2 style={prose.h2}>Five questions before confirming the anchor</h2>
      <p style={prose.p}>
        Once a piece is on the shortlist for anchor, whether metal or otherwise, these five checks belong before sampling:
      </p>
      <ol style={prose.ul}>
        <li style={prose.li}><strong style={prose.strong}>What does it do after unboxing?</strong> Not "what is it"; what action does it support, and how regularly?</li>
        <li style={prose.li}><strong style={prose.strong}>Where will the recipient keep or carry it?</strong> The answer determines which material, finish, and size actually fits the use.</li>
        <li style={prose.li}><strong style={prose.strong}>Does the material support that use?</strong> A mirror-polished surface that goes into a bag or pocket every day shows scratches within weeks. A brushed or PVD-coated piece in the same position holds up for years.</li>
        <li style={prose.li}><strong style={prose.strong}>Can the logo be applied without making the object feel like an advertisement?</strong> As we have written in our{' '}
          <Link to={'/blog/discreet-branding-corporate-gifts-smaller-logos' as RouterTo} style={prose.inlineLink}>discreet branding post</Link>, an oversized imprint on a professional tool can reduce the likelihood it ever leaves the drawer.</li>
        <li style={prose.li}><strong style={prose.strong}>Can the packaging protect the surface within the total budget?</strong> A metal anchor that arrives scratched from transit has already failed its job.</li>
      </ol>
      <p style={prose.p}>
        If those five questions are difficult to answer, the piece may not be ready to anchor the set, or the set may need a different anchor.
      </p>

      <ArticleImage
        src="https://res.cloudinary.com/dcivh8ovs/image/upload/f_auto,q_auto,w_1200/blog/blog-017/protective-gift-set-packaging"
        alt="Open corporate gift box with metal items separated in fitted protective compartments"
        caption="Fitted compartments protect the anchor's finish and prevent metal-on-metal contact during transit."
      />

      <h2 style={prose.h2}>Ready to scope the set?</h2>
      <p style={prose.p}>
        Our role is on the supply side: once you know what the anchor needs to do, we handle material selection, finish, engraving placement, companion sourcing, packaging fit, sampling, and production follow-through.
      </p>
      <p style={prose.p}>
        If you are scoping a set and are not sure which piece should carry it, send us the recipient context, occasion, and budget direction. We will advise on what the metal side can realistically deliver, including whether a metal anchor is the right call at all. For the full list of inputs that make a custom metal brief workable, our{' '}
        <Link to={'/blog/what-we-need-to-review-a-custom-metal-gift-project' as RouterTo} style={prose.inlineLink}>project review guide</Link>{' '}
        covers what we need to get started.
      </p>
      <p style={{ ...prose.p, fontSize: '0.82rem', color: '#777' }}>
        Note: the anchor piece concept and role taxonomy are Wischos-side working language, not industry standards.
      </p>
    </div>
  )
}

const articleContent: Record<string, () => React.JSX.Element> = {
  'metal-anchor-piece-corporate-gift-set': ArticleMetalAnchorPieceContent,
  'aluminum-brass-steel-titanium-corporate-gifts': Article1Content,
  'laser-engraving-vs-color-printing-corporate-gifts': Article2Content,
  'how-to-order-custom-corporate-gifts-from-china': Article3Content,
  'corporate-gift-lead-times-china-planning-guide': Article4Content,
  'what-makes-a-corporate-gift-worth-keeping': Article6Content,
  'discreet-branding-corporate-gifts-smaller-logos': Article7Content,
  'metal-surface-finishes-corporate-gifts': Article8Content,
  'standard-catalogue-to-custom-metal-projects': ArticleStandardCatalogueContent,
  'what-we-need-to-review-a-custom-metal-gift-project': ArticleProjectReviewContent,
  'metal-corporate-gift-quality-checklist': ArticleQualityChecklistContent,
}

// ─── Page component ───────────────────────────────────────────────────────────

function ArticlePage() {
  const { post, others } = Route.useLoaderData()
  const ContentComponent = articleContent[post.slug]

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
        {ContentComponent ? <ContentComponent /> : (
          <p style={prose.p}>Article content coming soon.</p>
        )}
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
