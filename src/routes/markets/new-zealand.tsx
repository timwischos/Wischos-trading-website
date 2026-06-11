import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/new-zealand')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for New Zealand Distributors | NZ–China FTA Duty-Free | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for New Zealand promotional products distributors and corporate buyers. NZ–China FTA Certificate of Origin included — duty-free entry on qualifying goods. Brass, titanium, stainless steel, aluminium. 25–35 day production, 22–28 day sea freight to Auckland.',
      },
      { property: 'og:title', content: 'Custom Metal Gift Sets for New Zealand Distributors | Wischos Gift' },
      { property: 'og:description', content: 'NZ–China FTA duty-free metal gift sets sourced from China for New Zealand distributors and corporate buyers.' },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/new-zealand' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for New Zealand',
            provider: { '@type': 'Organization', name: 'Wischos Gift', url: 'https://wischosgift.com' },
            areaServed: { '@type': 'Country', name: 'New Zealand' },
            description: 'Custom metal gift sets for New Zealand distributors and corporate buyers. NZ–China FTA Certificate of Origin included for duty-free entry on qualifying goods.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you provide NZ–China FTA Certificates of Origin?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. We arrange the NZ–China FTA Certificate of Origin through CCPIT or Chinese Customs for every qualifying shipment to New Zealand. This is what enables your goods to enter New Zealand duty-free under the agreement (originally signed 2008, upgraded 2022). The certificate is included in standard shipping documents at no additional charge.' },
              },
              {
                '@type': 'Question',
                name: 'How long does sea freight from China to Auckland take?',
                acceptedAnswer: { '@type': 'Answer', text: 'Standard LCL sea freight from Shanghai or Ningbo to Auckland takes 22–28 days door-to-port. Add 5–7 days for inland delivery and customs clearance. Air express via DHL/FedEx takes 5–7 days for urgent shipments.' },
              },
              {
                '@type': 'Question',
                name: 'Can a smaller New Zealand order still be viable?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. New Zealand programs are typically smaller than Australian ones, and our MOQ of 100 pieces per SKU is sized for this. For premium gift sets, we routinely run programs of 50–200 sets, which fits most NZ corporate and distributor briefs.' },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: NewZealandMarketPage,
})

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 0', textAlign: 'left', gap: '1rem' }} aria-expanded={open}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{question}</span>
        <span style={{ fontSize: '1.2rem', color: '#B87333', flexShrink: 0, lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, paddingBottom: '1rem', margin: 0 }}>{answer}</p>}
    </div>
  )
}

function NewZealandMarketPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <a href="/" aria-label="Wischos Gift — Home"><img src={cloudinaryUrl('/wischos-logo')} alt="Wischos Gift" style={{ height: '2rem', width: 'auto' }} /></a>
      </header>

      {/* Hero */}
      <section>
        <style>{`
          .nz-hero { display: grid; grid-template-columns: 1fr; }
          .nz-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .nz-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .nz-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .nz-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .nz-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .nz-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .nz-cta { display: inline-block; }
          }
        `}</style>
        <div className="nz-hero">
          <div className="nz-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>For New Zealand Distributors &amp; Corporate Buyers</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '22ch' }}>Custom metal gift sets, shipped duty-free under the NZ–China FTA.</h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>Wischos is a China-based metal gift sourcing partner working with New Zealand distributors and corporate procurement teams. Across the metal family — brass, titanium, stainless steel, aluminium, and beyond — produced in China, cleared duty-free into New Zealand under the NZ–China Free Trade Agreement on qualifying tariff lines.</p>
            <a href="#inquiry-form" className="nz-cta" style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}>Request a New Zealand-Priced Quote →</a>
          </div>
          <img className="nz-hero-img" src={cloudinaryUrl('/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', { w: 800 })} alt="The Morning Ritual — Custom titanium and brass gift set for New Zealand distributors" />
        </div>
      </section>

      {/* Trust points */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'NZ–China FTA Certificate of Origin included', body: 'Every qualifying shipment to New Zealand ships with an NZ–China FTA Certificate of Origin so your goods enter duty-free on covered tariff lines. We handle documentation through CCPIT or Chinese Customs.' },
            { title: '22–28 day sea freight to Auckland', body: 'LCL sea freight from Shanghai or Ningbo to Auckland and Wellington is predictable and well-routed. Air express to Auckland via DHL/FedEx in 5–7 days for urgent restocks.' },
            { title: 'Sized for smaller NZ programs', body: 'New Zealand corporate programs are typically smaller than Australian equivalents. Our 100-piece MOQ and 50–200 set programs fit common NZ brief sizes.' },
            { title: 'White-label, your brand only', body: 'Wischos branding does not appear on products or packaging. Your client receives the goods with their identity — no third-party supplier visibility.' },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NZ–China FTA explained */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>The NZ–China FTA in Plain Language</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '32ch' }}>What the agreement means for your landed cost.</h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>The New Zealand–China Free Trade Agreement was signed in 2008 and upgraded in 2022. New Zealand was the first developed economy to sign an FTA with China. From 2018 onwards, essentially all Chinese-made consumer goods — including metal gift items and finished gift sets — enter New Zealand duty-free on qualifying tariff lines.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>For New Zealand distributors and corporate buyers, this means your landed cost on qualifying metal gift programs contains <strong>zero import duty</strong> — provided the shipment is accompanied by a valid NZ–China FTA Certificate of Origin issued in China.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>We arrange this certificate as standard on every New Zealand shipment. The cost is included; the process adds 1–3 working days to outbound documentation.</p>

        <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '1.75rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Indicative Landed Cost — 100 Titanium Gift Sets</p>
          <table style={{ width: '100%', fontSize: '0.88rem', color: '#333', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>FOB Shanghai (100 × $48)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $4,800</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Auckland</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $380</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>NZ GST (15%, recoverable)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~NZD $1,260</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0', color: '#B87333', fontWeight: 600 }}>Import duty (NZ–China FTA covered)</td><td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#B87333', fontWeight: 600 }}>NZD $0</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>Illustrative figures only. Final landed cost depends on HS classification, quantity, exact destination port, and current freight rates. We provide line-by-line landed cost in formal quotations.</p>
        </div>
      </section>

      {/* Recommended sets */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Popular With New Zealand Buyers</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '0.75rem' }}>Sets sized for the New Zealand market.</h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>New Zealand corporate gifting is typically smaller-batch and higher-premium than equivalent Australian programs. These sets fit the common context — but every program is configurable to your specific brief.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', name: 'The Morning Ritual', sku: 'WGS-005', tagline: 'Titanium bottle, titanium keychain, and brass pen. The highest material tier in our lineup — suited to executive and high-value client gifting in Auckland and Wellington.', href: '/gift-sets/wgs-005-3-the-morning-ritual' },
              { image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover', name: 'The Quartet', sku: 'WGS-008', tagline: 'Four-piece precision set in a magnetic rigid box. A complete onboarding or milestone gift program in tighter, higher-spec quantities.', href: '/gift-sets/wgs-008-4-the-quartet' },
              { image: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover', name: 'The Field EDC', sku: 'WGS-004', tagline: 'Stainless steel EDC carry set. Suited to outdoor-adjacent industries, conservation, primary production, and field services common to NZ regional businesses.', href: '/gift-sets/wgs-004-3-the-field-edc' },
              { image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover', name: 'The Meeting Kit', sku: 'WGS-009', tagline: 'Three-piece meeting set — aluminium ring binder notebook, brass rollerball, steel card case. Suited to sales and BD teams, professional services firms, and client-facing roles common to Auckland and Wellington.', href: '/gift-sets/wgs-009-3-the-meeting-kit' },
            ].map((set) => (
              <div key={set.sku}>
                <img src={cloudinaryUrl(set.image, { w: 600 })} alt={set.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', background: '#f0f0f0', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>{set.sku}</p>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{set.name}</p>
                <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>{set.tagline}</p>
                <a href={set.href} style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>View set details →</a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
            <a href="/gift-sets" style={{ fontSize: '0.85rem', color: '#0a0a0a', textDecoration: 'none', fontWeight: 500 }}>View full catalog →</a>
          </div>
        </div>
      </section>

      {/* Shipping & timing */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Shipping &amp; Timing to New Zealand</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '32ch' }}>How a typical New Zealand program runs.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Stage 1 — Sample', body: 'After brief confirmation, custom samples take 7–10 working days. Couriered to NZ via DHL/FedEx in 5–7 days.' },
            { label: 'Stage 2 — Production', body: '25–35 days from sample approval and deposit. Includes logo application, packaging assembly, and pre-shipment QC.' },
            { label: 'Stage 3 — Sea Freight', body: '22–28 days LCL from Shanghai/Ningbo to Auckland. Customs clearance with NZ–China FTA Certificate of Origin.' },
            { label: 'Stage 4 — Delivery', body: 'Inland delivery via your freight forwarder or arranged by us. Typical total: 9–11 weeks from order confirmation.' },
          ].map((item) => (
            <div key={item.label} style={{ borderTop: '2px solid #B87333', paddingTop: '1rem' }}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.label}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>Common questions from New Zealand distributors</h2>
        {[
          { question: 'Do you provide NZ–China FTA Certificates of Origin?', answer: 'Yes. We arrange the NZ–China FTA Certificate of Origin through CCPIT or Chinese Customs for every qualifying shipment to New Zealand. This is what enables your goods to enter New Zealand duty-free under the agreement. The certificate is included in standard shipping documents at no additional charge.' },
          { question: 'How long does sea freight from China to Auckland take?', answer: 'Standard LCL sea freight from Shanghai or Ningbo to Auckland takes 22–28 days door-to-port. Add 5–7 days for inland delivery and customs clearance. For urgent shipments, air express via DHL/FedEx takes 5–7 days.' },
          { question: 'Can a smaller New Zealand order still be viable?', answer: 'Yes. New Zealand programs are typically smaller than Australian ones, and our MOQ of 100 pieces per SKU is sized for this. For premium gift sets, we routinely run programs of 50–200 sets, which fits most NZ corporate and distributor briefs.' },
          { question: 'How is GST handled on imports to New Zealand?', answer: 'NZ GST (currently 15%) applies on the customs value at the point of entry and is generally recoverable by GST-registered importers. The NZ–China FTA eliminates import duty but does not affect GST. We provide commercial invoices and packing lists structured to support smooth customs valuation.' },
          { question: 'Can you quote in NZD, or only USD?', answer: 'We quote FOB in USD as standard. For DDP (delivered duty paid) quotations to New Zealand ports we can express the total in NZD at the prevailing spot rate, or hold a quoted NZD rate for a defined acceptance window. Payment is typically received in USD via T/T or Wise.' },
          { question: 'Do you work with the same supplier base as our Australian distributors?', answer: 'Yes. The factories and quality control processes are the same as for our Australian shipments. The only differences are the shipping route, certificate of origin (NZ–China FTA instead of ChAFTA), and timing.' },
        ].map((item) => <Accordion key={item.question} question={item.question} answer={item.answer} />)}
      </section>

      {/* Inquiry form */}
      <section id="inquiry-form" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>Request a New Zealand-priced quote</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>Tell us the recipient profile, quantity range, target budget, branding requirements, and delivery timeline. We respond within 1–2 business days with a set direction, sample path, and indicative landed cost into Auckland or your nominated NZ port.</p>
          <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.65, marginBottom: '0.5rem' }}>Prefer email?</p>
          <a href="mailto:inquiries@wischosgift.com" style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>inquiries@wischosgift.com</a>
          <a href="https://www.linkedin.com/in/john-lui-4529a3102/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#B87333', textDecoration: 'none', fontWeight: 500 }}>Connect on LinkedIn →</a>
        </div>
        <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
          <Suspense fallback={<div style={{ height: '400px' }} />}><InquiryFormSection /></Suspense>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#888' }}>© {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp; inquiries@wischosgift.com</p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>wischosgift.com</a>
      </footer>
    </div>
  )
}
