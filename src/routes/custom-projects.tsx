import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'
import { trackCtaClick } from '@/lib/analytics'
import { EmailLink } from '@/components/ui/EmailLink'
import { MobileStickyCta } from '@/components/sections/MobileStickyCta'
import { buildCanonical, buildOgMeta } from '@/content/meta'

const CustomProjectFormSection = lazy(() =>
  import('@/components/sections/CustomProjectFormSection').then((m) => ({ default: m.CustomProjectFormSection })),
)

const HERO_IMG = '/products/WGS-010-5-The-Blueprint/The-Blueprint-cover'

const PAGE_TITLE = 'Bespoke Metal Gifts & Custom Objects | Wischos Gift'
const PAGE_DESCRIPTION =
  'Bespoke metal gifts and objects, sourced in China to your design. Brass, stainless steel, aluminium and titanium. Usually from 100 pieces. Share your idea.'

/**
 * Case study block — kept off until a client case is approved for publication.
 * Flip to true and fill CASE_STUDY when ready.
 */
const SHOW_CASE_STUDY = false
const CASE_STUDY = {
  eyebrow: 'Recent Project',
  title: '',
  summary: '',
  images: [] as string[],
}

const FAQS = [
  {
    question: 'Are you a factory or a sourcing partner?',
    answer:
      'Wischos Gift is a China-based trading company and sourcing partner, not a factory. We match your brief to specialist manufacturers and coordinate specifications, sampling, production updates, quality checks, packaging and shipment through one contact.',
  },
  {
    question: 'What does a custom metal project cost?',
    answer:
      'It depends on material, tooling, finish and quantity, so every project is quoted individually. Send your brief with a rough budget per piece and we will tell you early whether it is realistic — before anyone spends money on samples.',
  },
  {
    question: 'Do you charge for samples?',
    answer:
      'Yes. Custom samples are paid, because they involve real tooling and factory time. Before sampling, the quotation confirms what the fee covers, any included revision rounds, and whether the fee can be credited against production based on the final quantity. If you change the approved design or request work outside that scope, we agree any extra cost and timing with you before proceeding.',
  },
  {
    question: 'How do we approve the sample?',
    answer:
      'Review the sample by photos and video, or have a physical sample sent to you when the schedule allows. We agree the approval method before sampling and include any sample shipping and review time in the project schedule. Production starts only after you approve the sample.',
  },
  {
    question: 'What is the minimum order for a custom project?',
    answer:
      'Most custom projects start at 100 pieces or sets. The workable minimum depends on the item and the tooling involved. If your quantity is lower, tell us anyway — we will say honestly whether it can work.',
  },
  {
    question: 'Can you work from a sketch, a photo or an object we already own?',
    answer:
      'Yes. A dimensioned drawing is ideal, but many projects start from a sketch, a photo or a reference object. We turn it into a production specification — material, dimensions, finish, engraving — and you approve it before sampling.',
  },
  {
    question: 'Can a custom gift set combine different metals and other materials?',
    answer:
      'Yes. A set can combine brass, stainless steel, aluminium or titanium with suitable leather, resin and packaging components. Material choices depend on the design, intended use and budget. We coordinate the specialist factories, check how the parts fit together and arrange final assembly and shipment.',
  },
  {
    question: 'Will my design stay confidential?',
    answer:
      'If you need an NDA, send it for review before sharing confidential files. We confirm whether we can accept its terms before signing. We also agree what information may be shared with the factories assessing and producing your project.',
  },
  {
    question: 'How long does a custom project take?',
    answer:
      'We assess timing after reviewing your enquiry, based on the design, quantity, sample requirements and delivery destination. Adapting an existing product can shorten sample preparation. Allow additional time for sample shipping, if needed, and your review. We confirm the sampling, production and shipping schedule in your quotation.',
  },
  {
    question: 'Can you deliver duty-paid to our door?',
    answer:
      'We offer FOB and CIF quotations. DDP is assessed for each project based on the destination and shipping arrangements. For an agreed DDP shipment, applicable duties, taxes and destination-port freight charges are included in our quotation and collected by us for payment to the relevant parties. We confirm the delivery scope and included charges in the quotation.',
  },
]

export const Route = createFileRoute('/custom-projects')({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      ...buildOgMeta({
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        image: cloudinaryUrl(HERO_IMG, { w: 1200 }),
        url: '/custom-projects',
      }),
    ],
    links: [
      buildCanonical('/custom-projects'),
      {
        rel: 'preload',
        as: 'image',
        href: cloudinaryUrl(HERO_IMG, { w: 800 }),
        imageSrcSet: [
          `${cloudinaryUrl(HERO_IMG, { w: 640 })} 640w`,
          `${cloudinaryUrl(HERO_IMG, { w: 800 })} 800w`,
          `${cloudinaryUrl(HERO_IMG, { w: 1200 })} 1200w`,
        ].join(', '),
        imageSizes: '(min-width: 768px) 550px, 100vw',
        fetchPriority: 'high',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Sourcing & Production Coordination',
            serviceType: 'Sourcing and production coordination for bespoke metal gifts and objects made to client design',
            provider: { '@type': 'Organization', name: 'Wischos Gift', url: 'https://wischosgift.com' },
            areaServed: 'Worldwide',
            description: PAGE_DESCRIPTION,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]),
      },
    ],
  }),
  component: CustomProjectsPage,
})

function Accordion({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="cp-faq" style={{ borderBottom: '1px solid #e5e5e5' }}>
      <summary
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1rem 0', textAlign: 'left', gap: '1rem' }}
      >
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{question}</span>
        <span className="cp-faq-icon" aria-hidden="true" style={{ fontSize: '1.2rem', color: '#B87333', flexShrink: 0, lineHeight: 1 }} />
      </summary>
      <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, paddingTop: '0.5rem', paddingBottom: '1rem', margin: 0 }}>{answer}</p>
    </details>
  )
}

const eyebrowStyle: React.CSSProperties = { fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }
const h2Style: React.CSSProperties = { fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '2rem', maxWidth: '30ch' }
const cardTitle: React.CSSProperties = { fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }
const cardBody: React.CSSProperties = { fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }

const CAPABILITIES = [
  { title: 'Metal stationery & desk objects', body: 'Pens, notebooks, rulers, trays and desk accessories. Brass, stainless steel, aluminium and titanium are options depending on the item, design and budget.' },
  { title: 'Everyday-carry accessories', body: 'Card cases, key organisers, clips and compact tools. Cutting, machining and forming options are assessed against the part design, material and order quantity.' },
  { title: 'Surface finishes', body: 'Brushed, polished or matte appearances, protective coatings and colour options. Suitability, including anodising or PVD, is confirmed for the chosen metal before quotation.' },
  { title: 'Logos & personalisation', body: 'Laser engraving, names and numbering for individual pieces or sets. We review artwork, placement and contrast on the chosen surface; colour printing is assessed where needed.' },
  { title: 'Mixed-material sets', body: 'Metal pieces combined with leather, resin or other suitable components. We coordinate the specialist workshops and confirm fit, assembly and presentation for the complete set.' },
  { title: 'Fitted packaging', body: 'Gift boxes and fitted inserts built around the final pieces. Box branding, protective materials and the arrangement of each component are agreed as part of the project.' },
]

const STARTING_POINTS = [
  { image: '/products/WGS-010-5-The-Blueprint/The-Blueprint-cover', name: 'The Blueprint', alt: 'The Blueprint: solid brass ruler, two set squares, protractor and inkless pen', note: 'Five-piece solid brass drafting set with an inkless pen. Review engraving, finish or packaging options for your project.', href: '/gift-sets/wgs-010-5-the-blueprint' },
  { image: '/products/WGS-011-4-Aurora-Duet/Aurora-Duet-cover', name: 'The Aurora Duet', alt: 'The Aurora Duet: four brass-framed coasters with blue and blush resin inlays in a gift box', note: 'Four brass-framed resin coasters in a fitted gift box. Explore colour combinations, engraving and packaging for your project.', href: '/gift-sets/wgs-011-4-aurora-duet' },
  { image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover', name: 'The Meeting Kit', alt: 'The Meeting Kit: aluminium notebook, brass rollerball pen and stainless steel business card case', note: 'An aluminium notebook, brass rollerball and stainless steel card case. A mixed-metal starting point for a personalised meeting set.', href: '/gift-sets/wgs-009-3-the-meeting-kit' },
  { image: '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-cover', name: 'The Mechanical Desk', alt: 'The Mechanical Desk: brass-crown bolt-action pen, propeller letter opener and folding aluminium device stand', note: 'A brass-crown bolt-action pen, propeller letter opener and folding aluminium stand. Changes to components or finishes are reviewed for feasibility.', href: '/gift-sets/wgs-002-3-the-mechanical-desk' },
]

const STEPS = [
  { step: 'Share your idea', detail: 'A few sentences or a reference link is enough to start. We will follow up about the details.' },
  { step: 'Specification & quotation', detail: 'Material, dimensions, finish, engraving and packaging confirmed with the factory.' },
  { step: 'Paid sample', detail: 'We arrange a physical sample for approval by photos and video, or send it to you when the schedule allows. Sample scope, revisions, any credit toward production and shipping arrangements are confirmed in the quotation. Adapting an existing product can shorten sample preparation; allow additional time for sample shipping and review.' },
  { step: 'Production', detail: 'Starts only after you approve the sample. Progress photos at key stages, with photos and video for your approval before shipment.' },
  { step: 'Delivery', detail: 'FOB or CIF; DDP assessed per project. For agreed DDP shipments, applicable duties, taxes and destination-port freight charges are collected on your behalf and included in the quotation. Shipping times depend on the destination and route.' },
]

const DECISIONS = [
  { title: 'Material, weight & feel', body: 'Brass, stainless steel, aluminium, titanium or a mix — we confirm the grade, thickness and target weight to suit how the object will be used and your budget.' },
  { title: 'Surface finish & care', body: 'Colour, texture, gloss and how the surface may change with use. We agree finish and care expectations for the selected material; any comparison samples are scoped and quoted in advance.' },
  { title: 'Branding & artwork', body: 'Logo position, size, contrast and the appropriate marking method. We review small lettering, individual names and numbering against the available marking area.' },
  { title: 'Dimensions, fit & function', body: 'Overall dimensions, critical tolerances, edges and moving parts. For a set, we also check how the components fit together and sit in their packaging.' },
  { title: 'Packaging & presentation', body: 'Box format, insert layout, branding and protection in transit. We agree the intended presentation, with final fit checked against the approved pieces.' },
]

function CustomProjectsPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      <MobileStickyCta />

      {/* Hero */}
      <section>
        <style>{`
          .cp-hero { display: grid; grid-template-columns: 1fr; }
          .cp-img { order: 2; width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; background: #f7f7f7; }
          .cp-text { order: 1; padding: 1rem 1.25rem 1.25rem; }
          .cp-intro { font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.1rem; }
          .cp-faq summary { list-style: none; }
          .cp-faq summary::-webkit-details-marker { display: none; }
          .cp-faq summary:focus-visible { outline: 2px solid #0a0a0a; outline-offset: 4px; }
          .cp-faq-icon::before { content: '+'; }
          .cp-faq[open] .cp-faq-icon::before { content: '−'; }
          .cp-ctas { display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem; }
          .cp-btn { display: block; width: 100%; text-align: center; box-sizing: border-box; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.04em; padding: 0.95rem 1rem; text-decoration: none; }
          .cp-btn-primary { background: #B87333; color: #fff; }
          .cp-btn-secondary { background: none; color: #0a0a0a; border: 1px solid #0a0a0a; }
          @media (min-width: 768px) {
            .cp-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .cp-img { aspect-ratio: auto; height: 100%; min-height: 480px; }
            .cp-text { padding: 4rem 2rem 3rem; }
            .cp-intro { font-size: 1.05rem; line-height: 1.7; margin-bottom: 2rem; }
            .cp-ctas { flex-direction: row; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
            .cp-btn { display: inline-block; width: auto; font-size: 0.9rem; padding: 0.85rem 2rem; }
          }
        `}</style>
        <div className="cp-hero">
          <div className="cp-text">
            <p style={eyebrowStyle}>Custom Projects · Your Metal Sourcing Partner</p>
            <h1 style={{ fontSize: 'clamp(1.55rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '20ch' }}>
              Custom metal gifts, made to your design.
            </h1>
            <p className="cp-intro" style={{ color: '#4a4a4a', maxWidth: '52ch' }}>
              Wischos Gift is a China-based sourcing partner for bespoke metal gifts and objects in brass, stainless steel, aluminium and titanium. From your drawing or reference, we coordinate specialist factories, paid samples, packaging and delivery through one contact.
            </p>
            <div className="cp-ctas">
              <a href="#inquiry-form" className="cp-btn cp-btn-primary" onClick={() => trackCtaClick({ location: 'custom_hero', label: 'start_brief' })}>
                Start a custom project →
              </a>
              <a href="#starting-points" className="cp-btn cp-btn-secondary" onClick={() => trackCtaClick({ location: 'custom_hero', label: 'starting_points' })}>
                See starting points ↓
              </a>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
              Usually from 100 pieces · Paid samples
            </p>
            <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6, margin: '0.4rem 0 0' }}>
              Approve by photos/video, or receive a physical sample when time allows.
            </p>
            <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.6, margin: '0.4rem 0 0' }}>
              Sample fees may be credited toward your production order, depending on final quantity. Terms confirmed in your quotation.
            </p>
          </div>
          <img
            className="cp-img"
            src={cloudinaryUrl(HERO_IMG, { w: 800 })}
            srcSet={[
              `${cloudinaryUrl(HERO_IMG, { w: 640 })} 640w`,
              `${cloudinaryUrl(HERO_IMG, { w: 800 })} 800w`,
              `${cloudinaryUrl(HERO_IMG, { w: 1200 })} 1200w`,
            ].join(', ')}
            sizes="(min-width: 768px) 550px, 100vw"
            width={800}
            height={600}
            loading="eager"
            fetchPriority="high"
            alt="The Blueprint brass drafting gift set with a ruler, two set squares, protractor and inkless pen"
          />
        </div>
      </section>

      {/* Fit */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
          <p style={eyebrowStyle}>Is This the Right Fit?</p>
          <h2 style={h2Style}>Built for objects that don&rsquo;t exist yet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2.5rem' }}>
            <div style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <h3 style={cardTitle}>A good fit</h3>
              <ul style={{ ...cardBody, paddingLeft: '1.1rem', margin: 0 }}>
                <li>You have a drawing, sketch or reference you can&rsquo;t buy in the spec you want</li>
                <li>Metal is the hero piece — brass, steel, titanium or aluminium</li>
                <li>Around 100–300 pieces or sets (larger runs welcome)</li>
                <li>You&rsquo;ll approve the sample before production</li>
                <li>The person who decides on the design is part of the conversation</li>
              </ul>
            </div>
            <div style={{ borderTop: '2px solid #d4d4d4', paddingTop: '1rem' }}>
              <h3 style={cardTitle}>Probably not the right fit</h3>
              <ul style={{ ...cardBody, paddingLeft: '1.1rem', margin: 0 }}>
                <li>
                  You only need logo engraving on a standard item — browse our{' '}
                  <a href="/gift-sets" style={{ color: '#B87333', textDecoration: 'none' }}>gift sets</a> and{' '}
                  <a href="/products" style={{ color: '#B87333', textDecoration: 'none' }}>products</a> instead
                </li>
                <li>You need a guaranteed delivery date before we review the design — share your deadline so we can assess feasibility, including adapting an existing product</li>
                <li>Very small quantities with no flexibility — ask anyway; we&rsquo;ll say upfront if it can&rsquo;t work</li>
                <li>Food, textile or plastic-led gifts — we only make metal-led pieces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="what-we-can-make" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={eyebrowStyle}>What We Can Make</p>
        <h2 style={h2Style}>Custom metal objects we can source</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2rem' }}>
          {CAPABILITIES.map((c) => (
            <div key={c.title} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <h3 style={cardTitle}>{c.title}</h3>
              <p style={cardBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Starting points */}
      <section id="starting-points" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
        <p style={eyebrowStyle}>Starting Points</p>
        <h2 style={{ ...h2Style, marginBottom: '0.75rem' }}>Start from an existing gift set</h2>
        <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '58ch' }}>
          An existing gift set can be a starting point for your design. Changes to size, material, finish, engraving or set contents are reviewed for feasibility. Reusing suitable components or tooling can reduce development time and cost.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '2rem' }}>
          {STARTING_POINTS.map((p) => (
            <div key={p.name}>
              <img src={cloudinaryUrl(p.image, { w: 600 })} alt={p.alt} loading="lazy" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0', marginBottom: '1rem' }} />
              <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>{p.note}</p>
              <a href={p.href} style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>Explore {p.name} →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Case study — hidden until approved */}
      {SHOW_CASE_STUDY && CASE_STUDY.title && (
        <section style={{ background: '#0a0a0a', color: '#fff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
            <p style={{ ...eyebrowStyle, color: '#999' }}>{CASE_STUDY.eyebrow}</p>
            <h2 style={{ ...h2Style, color: '#fff' }}>{CASE_STUDY.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: 1.7, maxWidth: '60ch' }}>{CASE_STUDY.summary}</p>
          </div>
        </section>
      )}

      {/* Process */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={eyebrowStyle}>How It Works</p>
          <h2 style={{ ...h2Style, marginBottom: '0.75rem' }}>From brief to delivery</h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2rem' }}>
            Timing is confirmed after we review your enquiry, based on the design, quantity, sample requirements and delivery destination. We agree the schedule in your quotation, including any sample shipping and review time.
          </p>
          {STEPS.map((s, i) => (
            <div key={s.step} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #e5e5e5' }}>
              <span style={{ fontSize: '0.85rem', color: '#B87333', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 600, margin: 0 }}>{s.step}</h3>
                <p style={{ fontSize: '0.83rem', color: '#666', lineHeight: 1.6, margin: '0.35rem 0 0' }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decisions */}
      <section id="before-we-sample" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={eyebrowStyle}>Before We Sample</p>
        <h2 style={h2Style}>What we confirm before sampling</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2rem' }}>
          {DECISIONS.map((d) => (
            <div key={d.title} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <h3 style={cardTitle}>{d.title}</h3>
              <p style={cardBody}>{d.body}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, marginTop: '2.5rem' }}>
          More detail:{' '}
          <a href="/blog/what-we-need-to-review-a-custom-metal-gift-project" style={{ color: '#B87333', textDecoration: 'none' }}>What we need to review a custom project</a>
          {' · '}
          <a href="/blog/metal-corporate-gift-quality-checklist" style={{ color: '#B87333', textDecoration: 'none' }}>Our quality checklist</a>
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>Common questions</h2>
        {FAQS.map((f) => (
          <Accordion key={f.question} question={f.question} answer={f.answer} />
        ))}
      </section>

      {/* Brief form */}
      <section
        id="inquiry-form"
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem clamp(1rem, 4vw, 2rem) 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '4rem', alignItems: 'start' }}
      >
        <div className="inq-side">
          <style>{`@media (min-width: 768px) { .inq-side { position: sticky; top: 2rem; } }`}</style>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>Tell us what you want made</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Start with a few sentences or a reference link. You don&rsquo;t need a finished brief — we&rsquo;ll help you work out the details.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '0.5rem' }}>Prefer to send files directly?</p>
          <EmailLink email="johnlui@wischosgift.com" location="custom_projects" style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}>
            johnlui@wischosgift.com
          </EmailLink>
          <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6, paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
            Sourcing for a client?{' '}
            <a href="/for-distributors" style={{ color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>Our distributor programme →</a>{' '}
            is white-label as standard.
          </p>
        </div>
        <div style={{ minWidth: 0, border: '1px solid #e5e5e5', padding: 'clamp(1rem, 4vw, 2rem)' }}>
          <Suspense fallback={<div style={{ height: '410px' }} />}>
            <CustomProjectFormSection />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
