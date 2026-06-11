import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/markets/uae')({
  head: () => ({
    meta: [
      { title: 'Custom Metal Gift Sets for UAE Distributors & Corporate Buyers | Wischos Gift' },
      {
        name: 'description',
        content:
          'Custom metal gift sets for UAE distributors, gifting agencies, and corporate buyers in Dubai and Abu Dhabi. Brass, titanium, stainless steel, aluminium. 25–35 day production, 22–28 day sea freight or 4–6 day air express to Dubai.',
      },
      { property: 'og:title', content: 'Custom Metal Gift Sets for UAE Distributors | Wischos Gift' },
      { property: 'og:description', content: 'Premium metal gift sets sourced from China for UAE distributors, gifting agencies, and corporate buyers.' },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/markets/uae' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Metal Gift Set Sourcing for the UAE',
            provider: { '@type': 'Organization', name: 'Wischos Gift', url: 'https://wischosgift.com' },
            areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
            description: 'Custom metal gift sets for UAE distributors, gifting agencies, and corporate buyers in Dubai and Abu Dhabi.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is there a free trade agreement between China and the UAE?',
                acceptedAnswer: { '@type': 'Answer', text: 'There is no bilateral FTA between China and the UAE at the time of writing. Imports from China into the UAE are subject to the unified GCC customs tariff of 5% on most consumer goods, including metal gift items. We provide a General Certificate of Origin for every shipment as standard documentation.' },
              },
              {
                '@type': 'Question',
                name: 'How long does shipping from China to Dubai take?',
                acceptedAnswer: { '@type': 'Answer', text: 'Standard LCL sea freight from Shanghai or Ningbo to Jebel Ali (Dubai) takes 22–28 days. Air express via DHL/FedEx is 4–6 days for samples or urgent shipments. We work routinely with Dubai-based freight forwarders for inland delivery across the UAE and onward to GCC countries.' },
              },
              {
                '@type': 'Question',
                name: 'Do you work with UAE gifting agencies like Merchlist or Belfast Gifts?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. We work with UAE-based gifting agencies, corporate gifting consultants, and direct corporate procurement teams. All production is white-labelled — your agency or brand identity is what appears on products and packaging, not ours.' },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: UAEMarketPage,
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

function UAEMarketPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <a href="/" aria-label="Wischos Gift — Home"><img src={cloudinaryUrl('/wischos-logo')} alt="Wischos Gift" style={{ height: '2rem', width: 'auto' }} /></a>
      </header>

      {/* Hero */}
      <section>
        <style>{`
          .ae-hero { display: grid; grid-template-columns: 1fr; }
          .ae-hero-img { order: 1; width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; background: #f7f7f7; }
          .ae-hero-text { order: 2; padding: 2rem 1.25rem 2.5rem; }
          .ae-cta { display: block; text-align: center; }
          @media (min-width: 768px) {
            .ae-hero { grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; }
            .ae-hero-img { order: 2; aspect-ratio: auto; height: 100%; min-height: 480px; object-fit: cover; }
            .ae-hero-text { order: 1; padding: 4rem 2rem 3rem; }
            .ae-cta { display: inline-block; }
          }
        `}</style>
        <div className="ae-hero">
          <div className="ae-hero-text">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>For UAE Distributors, Agencies &amp; Corporate Buyers</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '22ch' }}>Premium metal gift sets, sourced from China for the UAE corporate gifting market.</h1>
            <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2rem' }}>Wischos is a China-based metal gift sourcing partner working with Dubai and Abu Dhabi distributors, gifting agencies, and direct corporate procurement teams. Across the metal family — brass, titanium, stainless steel, aluminium, and beyond — finished to a premium standard suited to the UAE corporate gifting context.</p>
            <a href="#inquiry-form" className="ae-cta" style={{ background: '#B87333', color: '#fff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.04em', padding: '0.85rem 2rem', textDecoration: 'none' }}>Request a UAE Quote →</a>
          </div>
          <img className="ae-hero-img" src={cloudinaryUrl('/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', { w: 800 })} alt="The Morning Ritual — Custom titanium and brass gift set for UAE distributors and corporate buyers" />
        </div>
      </section>

      {/* Trust points */}
      <section style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Premium finishes for the UAE context', body: 'PVD-coated brass, mirror-polished stainless steel, and titanium — finishes that sit well in a market where executive gifting standards are high. Match Pantone or premium dark/gold colour cues common in UAE corporate identity.' },
            { title: '22–28 day sea freight to Jebel Ali', body: 'LCL sea freight from Shanghai or Ningbo to Jebel Ali (Dubai) takes 22–28 days. Air express via DHL/FedEx in 4–6 days for samples and urgent shipments.' },
            { title: 'Works with UAE gifting agencies', body: 'White-label production for Dubai-based gifting consultants, agencies like Merchlist and Belfast Gifts, and direct corporate procurement teams. Your client relationship and brand remain yours.' },
            { title: 'Quick response, GCC business hours', body: 'China is 4 hours ahead of UAE business hours. Inquiries during your morning are typically answered the same day before your end-of-day.' },
          ].map((item) => (
            <div key={item.title}>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.5rem', color: '#0a0a0a' }}>{item.title}</p>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UAE customs explained */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>UAE Customs in Plain Language</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '32ch' }}>What import duty looks like for UAE shipments.</h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>There is no bilateral Free Trade Agreement between China and the UAE at the time of writing. Imports from China into the UAE are subject to the unified GCC (Gulf Cooperation Council) customs tariff of <strong>5% on most consumer goods</strong>, including finished metal gift items.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '1.25rem' }}>UAE VAT (currently 5%) applies on the customs value and is generally recoverable by VAT-registered importers. We provide a General Certificate of Origin for every shipment to support smooth customs clearance.</p>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>For shipments transiting through UAE free zones (Jebel Ali Free Zone, DAFZA, etc.) onward to other GCC or African destinations, special customs handling may apply — we work with Dubai-based freight forwarders familiar with these flows.</p>

        <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '1.75rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Indicative Landed Cost — 300 Premium Brass Gift Sets</p>
          <table style={{ width: '100%', fontSize: '0.88rem', color: '#333', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>FOB Shanghai (300 × $36)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>USD $10,800</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>Sea freight LCL to Jebel Ali</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~USD $420</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>UAE import duty (5% GCC)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~AED $2,060</td></tr>
              <tr style={{ borderBottom: '1px solid #e5e5e5' }}><td style={{ padding: '0.5rem 0' }}>UAE VAT (5%, recoverable)</td><td style={{ padding: '0.5rem 0', textAlign: 'right' }}>~AED $2,170</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.75rem', lineHeight: 1.6 }}>Illustrative figures only. Final landed cost depends on HS classification, quantity, exact destination, and current freight rates. We provide line-by-line landed cost in formal quotations.</p>
        </div>
      </section>

      {/* Recommended sets */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Popular With UAE Buyers</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '0.75rem' }}>Sets sized for the UAE corporate gifting context.</h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>UAE corporate gifting standards are high — premium materials, refined packaging, and event-driven volumes around national holidays, Ramadan, year-end, and major exhibitions (GITEX, Big 5, ADIPEC). These sets fit the premium positioning common to the market.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { image: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover', name: 'The Morning Ritual', sku: 'WGS-005', tagline: 'Titanium bottle, titanium keychain, and brass pen. The highest material tier in our lineup — suited to executive gifting for VIPs, government liaison, and high-value clients.', href: '/gift-sets/wgs-005-3-the-morning-ritual' },
              { image: '/products/WGS-008-4-The-Quartet/The-Quartet-cover', name: 'The Quartet', sku: 'WGS-008', tagline: 'Four-piece precision set in a magnetic rigid box. Built for milestone gifting, partnership announcements, and high-stakes onboarding programs.', href: '/gift-sets/wgs-008-4-the-quartet' },
              { image: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover', name: 'The Field EDC', sku: 'WGS-004', tagline: 'Stainless steel EDC carry set. Suited to operational and field-team gifting in oil &amp; gas, construction, and logistics sectors common to the GCC.', href: '/gift-sets/wgs-004-3-the-field-edc' },
              { image: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover', name: 'The Meeting Kit', sku: 'WGS-009', tagline: 'Three-piece meeting set — aluminium ring binder notebook, brass rollerball, steel card case. Built for sales and BD teams in consulting, finance, government liaison, and client-facing roles common to Dubai and Abu Dhabi.', href: '/gift-sets/wgs-009-3-the-meeting-kit' },
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
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Shipping &amp; Timing to the UAE</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '32ch' }}>How a typical UAE program runs.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Stage 1 — Sample', body: 'Custom samples take 7–10 working days. Couriered to Dubai via DHL/FedEx in 4–6 days.' },
            { label: 'Stage 2 — Production', body: '25–35 days from sample approval and deposit. Includes logo application, packaging assembly, and pre-shipment QC.' },
            { label: 'Stage 3 — Sea Freight', body: '22–28 days LCL from Shanghai/Ningbo to Jebel Ali (Dubai). Air express via DHL/FedEx in 4–6 days as an alternative.' },
            { label: 'Stage 4 — Delivery', body: 'Inland delivery via your freight forwarder or arranged by us across UAE and GCC. Typical total: 9–11 weeks (sea) or 6–8 weeks (air).' },
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
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>Common questions from UAE buyers</h2>
        {[
          { question: 'Is there a free trade agreement between China and the UAE?', answer: 'There is no bilateral FTA between China and the UAE at the time of writing. Imports from China into the UAE are subject to the unified GCC customs tariff of 5% on most consumer goods, including metal gift items. We provide a General Certificate of Origin for every shipment as standard documentation.' },
          { question: 'How long does shipping from China to Dubai take?', answer: 'Standard LCL sea freight from Shanghai or Ningbo to Jebel Ali (Dubai) takes 22–28 days. Air express via DHL/FedEx is 4–6 days for samples or urgent shipments. We work routinely with Dubai-based freight forwarders for inland delivery across the UAE and onward to GCC countries.' },
          { question: 'Do you work with UAE gifting agencies like Merchlist or Belfast Gifts?', answer: 'Yes. We work with UAE-based gifting agencies, corporate gifting consultants, and direct corporate procurement teams. All production is white-labelled — your agency or brand identity is what appears on products and packaging, not ours.' },
          { question: 'Can you handle Ramadan and year-end gifting peaks?', answer: 'Yes, with planning. UAE corporate gifting concentrates around Ramadan (varies by year), UAE National Day (early December), and Western year-end. We recommend confirming Ramadan programs by January, and year-end programs by July, to avoid Chinese factory peak season constraints.' },
          { question: 'Can you ship onward to Saudi Arabia, Qatar, Kuwait, or other GCC countries?', answer: 'Yes. UAE-cleared goods can move within the GCC under unified customs rules with minimal additional friction. Alternatively, we can ship directly to other GCC destinations from China. Tell us your end-destination and we will quote the most efficient route.' },
          { question: 'Can you quote in AED, USD, or another currency?', answer: 'We quote FOB in USD as standard. For DDP quotations to UAE we can express the total in AED at the prevailing spot rate. Payment is typically received in USD via T/T or Wise; AED payments are accepted on request.' },
        ].map((item) => <Accordion key={item.question} question={item.question} answer={item.answer} />)}
      </section>

      {/* Inquiry form */}
      <section id="inquiry-form" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>Request a UAE-priced quote</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>Tell us the recipient profile, quantity range, target budget, branding requirements, and delivery timeline. We respond within 1–2 business days with a set direction, sample path, and indicative landed cost into your nominated UAE port or city.</p>
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
