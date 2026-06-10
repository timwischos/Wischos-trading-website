import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/singapore')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for Singapore Distributors | CSFTA Duty-Free | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for Singapore corporate buyers, MNC procurement, and gifting agencies. CSFTA Form X included — duty-free entry on qualifying goods. Brass, titanium, stainless steel, aluminium. 25–35 day production, 5–10 day sea freight from China.',
      },
      { property: 'og:title', content: 'Custom Metal Gift Sets for Singapore Distributors | Wischos Gift' },
      { property: 'og:description', content: 'CSFTA duty-free metal gift sets sourced from China for Singapore corporate buyers and gifting agencies.' },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/singapore' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for Singapore',
            provider: { '@type': 'Organization', name: 'Wischos Gift', url: 'https://wischosgift.com' },
            areaServed: { '@type': 'Country', name: 'Singapore' },
            description: 'Custom metal gift sets for Singapore corporate buyers and gifting agencies. CSFTA Form X included for duty-free entry on qualifying goods.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do you provide CSFTA Form X for Singapore shipments?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. We arrange the China–Singapore FTA Form X through CCPIT or Chinese Customs for every qualifying shipment to Singapore. This is what enables your goods to enter Singapore duty-free under the agreement. The certificate is included in standard shipping documents at no additional charge.' },
              },
              {
                '@type': 'Question',
                name: 'How long does sea freight from China to Singapore take?',
                acceptedAnswer: { '@type': 'Answer', text: 'Standard LCL sea freight from Shanghai, Ningbo, or Shenzhen to Singapore takes 5–10 days door-to-port. Singapore is one of our fastest destinations. Air express via DHL/FedEx is 2–4 days for urgent shipments or samples.' },
              },
              {
                '@type': 'Question',
                name: 'Can you communicate in Chinese for Singapore-based teams?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our entire team is based in mainland China. We can communicate in English, Mandarin (Simplified or Traditional Chinese characters), and handle WeChat or WhatsApp as preferred. This often suits Singapore-based procurement teams working with both regional and global stakeholders.' },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: SingaporeMarketPage,
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

function SingaporeMarketPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <a href="/" aria-label="Wischos Gift — Home"><img src={cloudinaryUrl('/wischos-logo')} alt="Wischos Gift" style={{ height: '2rem', width: 'auto' }} /></a>
      </header>

      {/* Hero */}
      <section>
        <style>{`
          .sg-hero { display: grid; grid-template-columns: 1fr; }
          .sg-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .sg-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .sg-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .sg-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .sg-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .sg-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .sg-cta { display: inline-block; }
          }
        `}</style>
        <div className="sg-hero">
          <div className="sg-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>For Singapore Corporate Buyers &amp; Gifting Agencies</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '22ch' }}>Custom metal gift sets, shipped duty-free under the CSFTA.</h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>Wischos is a China-based metal gift sourcing partner working with Singapore-based corporate procurement teams, MNC regional headquarters, and gifting agencies. Across the metal family — brass, titanium, stainless steel, aluminium, and beyond — produced in China, cleared duty-free into Singapore under the China–Singapore Free Trade Agreement, with 5–10 day sea freight transit.</p>
            <a href="#inquiry-form" className="sg-cta" style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}>Request a Singapore-Priced Quote →</a>
          </div>
          <img className="sg-hero-img" src={cloudinaryUrl('/products/WGS-008-4-The-Quartet/The-Quartet-cover', { w: 800 })} alt="The Quartet — Custom four-piece metal gift set for Singapore corporate buyers" />
        </div>
      </section>

      {/* Trust points */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'CSFTA Form X included', body: 'Every qualifying shipment to Singapore ships with the China–Singapore FTA Form X so your goods enter duty-free. We handle the application through CCPIT or Chinese Customs.' },
            { title: '5–10 day sea freight from China', body: 'LCL sea freight from Shanghai, Ningbo, or Shenzhen to Singapore is one of the fastest sea routes globally. Air express in 2–4 days for samples and urgent restocks.' },
            { title: 'English &amp; Mandarin communication', body: 'Our team is based in mainland China. We handle inquiries in English or Mandarin (Simplified or Traditional), via email, WeChat, or WhatsApp — matching how Singapore-based teams work.' },
            { title: 'Same time zone, no delay', body: 'China and Singapore share the same time zone. Inquiries during your business day are answered the same day.' },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSFTA explained */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>The CSFTA in Plain Language</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '32ch' }}>What the China–Singapore FTA means for your landed cost.</h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>The China–Singapore Free Trade Agreement (CSFTA) is one of the most comprehensive bilateral trade agreements in Asia. For Chinese-origin goods entering Singapore, qualifying tariff lines receive a zero-duty preference — provided the shipment is accompanied by a valid Form X issued in China.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>For Singapore-based corporate buyers, MNC regional procurement, and gifting agencies, this means your landed cost on qualifying metal gift programs contains <strong>zero import duty</strong> — a meaningful advantage over goods sourced from non-FTA origins.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>We arrange Form X as standard on every Singapore shipment. The cost is included; the process adds 1–3 working days to outbound documentation.</p>

        <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '1.75rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Indicative Landed Cost — 200 Premium Brass Sets</p>
          <table style={{ width: '100%', fontSize: '0.88rem', color: '#333', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>FOB Shanghai (200 × $32)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $6,400</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Singapore</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $240</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>Singapore GST (9%, recoverable)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~SGD $810</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0', color: '#B87333', fontWeight: 600 }}>Import duty (CSFTA covered)</td><td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#B87333', fontWeight: 600 }}>SGD $0</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>Illustrative figures only. Final landed cost depends on HS classification, quantity, exact destination, and current freight rates. Singapore is largely a free port — most consumer goods carry zero duty under MFN, but CSFTA documentation supports preferential customs handling.</p>
        </div>
      </section>

      {/* Recommended sets */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Popular With Singapore Buyers</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '0.75rem' }}>Sets fit for the Singapore corporate context.</h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>Singapore corporate gifting concentrates around finance, technology, professional services, and MNC regional offices. These sets fit the most common briefs — onboarding kits, client retention, and executive recognition.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover', name: 'The Quartet', sku: 'WGS-008', tagline: 'Four-piece precision set in a magnetic rigid box. Built for executive onboarding and milestone gifting in finance, law, and MNC regional offices.', href: '/gift-sets/wgs-008-4-the-quartet' },
              { image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', name: 'The Morning Ritual', sku: 'WGS-005', tagline: 'Titanium bottle, titanium keychain, and brass pen. The highest material tier in our lineup — for client retention programs at private banks and consultancies.', href: '/gift-sets/wgs-005-3-the-morning-ritual' },
              { image: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover', name: 'The Field EDC', sku: 'WGS-004', tagline: 'Stainless steel EDC carry set. Suited to technology, engineering, and operational team gifting where everyday utility matters.', href: '/gift-sets/wgs-004-3-the-field-edc' },
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
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Shipping &amp; Timing to Singapore</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '32ch' }}>How a typical Singapore program runs.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Stage 1 — Sample', body: 'Custom samples take 7–10 working days. Couriered to Singapore via DHL/FedEx in 2–4 days.' },
            { label: 'Stage 2 — Production', body: '25–35 days from sample approval and deposit. Includes logo application, packaging assembly, and pre-shipment QC.' },
            { label: 'Stage 3 — Sea Freight', body: '5–10 days LCL from Shanghai/Ningbo/Shenzhen to Singapore. Customs clearance with Form X.' },
            { label: 'Stage 4 — Delivery', body: 'Inland delivery via your freight forwarder or arranged by us. Typical total: 6–8 weeks from order confirmation — the fastest of our primary destinations.' },
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
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>Common questions from Singapore buyers</h2>
        {[
          { question: 'Do you provide CSFTA Form X for Singapore shipments?', answer: 'Yes. We arrange the China–Singapore FTA Form X through CCPIT or Chinese Customs for every qualifying shipment to Singapore. This is what enables your goods to enter Singapore duty-free under the agreement. The certificate is included in standard shipping documents at no additional charge.' },
          { question: 'How long does sea freight from China to Singapore take?', answer: 'Standard LCL sea freight from Shanghai, Ningbo, or Shenzhen to Singapore takes 5–10 days door-to-port. Singapore is one of our fastest destinations. Air express via DHL/FedEx is 2–4 days for urgent shipments or samples.' },
          { question: 'Can you communicate in Chinese for Singapore-based teams?', answer: 'Yes. Our team is based in mainland China. We handle inquiries in English, Mandarin (Simplified or Traditional Chinese), and can use WeChat or WhatsApp as you prefer. This often suits Singapore-based teams working with both regional and global stakeholders.' },
          { question: 'Can you quote in SGD?', answer: 'We quote FOB in USD as standard. For DDP quotations to Singapore we can express the total in SGD at the prevailing spot rate, or hold a quoted SGD rate for a defined acceptance window. Payment is typically received in USD via T/T or Wise; SGD payments can be accepted on request.' },
          { question: 'Do you ship to MNC regional offices serving multiple ASEAN countries?', answer: 'Yes. We can ship a consolidated quantity to Singapore for onward distribution by your regional logistics team, or split shipments across multiple ASEAN destinations directly. Each destination shipment can include its own appropriate FTA Certificate of Origin (CSFTA for Singapore, Form E for ASEAN under CAFTA).' },
          { question: 'How does the CSFTA compare to Singapore being largely a free port?', answer: 'Singapore is indeed largely a free port — most consumer goods enter at MFN 0% duty already. CSFTA does not change that for most metal gift items, but the Form X is still useful as official documentation of Chinese origin and supports preferential customs handling. For non-FTA origin goods (e.g. sourced from third countries), MFN rates apply as usual.' },
        ].map((item) => <Accordion key={item.question} question={item.question} answer={item.answer} />)}
      </section>

      {/* Inquiry form */}
      <section id="inquiry-form" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>Request a Singapore-priced quote</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>Tell us the recipient profile, quantity range, target budget, branding requirements, and delivery timeline. We respond within 1–2 business days with a set direction, sample path, and indicative landed cost into Singapore. Mandarin communication welcome.</p>
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
