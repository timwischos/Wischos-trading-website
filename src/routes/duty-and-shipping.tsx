import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const InquiryFormSection = lazy(() =>
  import('@/components/sections/InquiryFormSection').then(m => ({ default: m.InquiryFormSection }))
)

export const Route = createFileRoute('/duty-and-shipping')({
  head: () => ({
    meta: [
      { title: 'Duty, Shipping & FTA Coverage Reference | Wischos Gift' },
      {
        name: 'description',
        content:
          'A landed-cost reference for distributors and procurement teams planning a metal gift program. Import duty rates, FTA coverage, shipping options, and Incoterms for shipments from China.',
      },
      { property: 'og:title', content: 'Duty, Shipping & FTA Coverage Reference | Wischos Gift' },
      { property: 'og:description', content: 'Import duty rates, FTA coverage, shipping options, and Incoterms for metal gift shipments from China.' },
    ],
    links: [{ rel: 'canonical', href: 'https://wischosgift.com/duty-and-shipping' }],
  }),
  component: DutyAndShippingPage,
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

const DUTY_TABLE: Array<{
  country: string
  flag: string
  fta: string
  duty: string
  certificate: string
}> = [
  { country: 'Australia', flag: '🇦🇺', fta: 'ChAFTA', duty: '0% (qualifying goods)', certificate: 'ChAFTA Certificate of Origin' },
  { country: 'New Zealand', flag: '🇳🇿', fta: 'NZ–China FTA (2008 + 2022 Upgrade)', duty: '0% (qualifying goods)', certificate: 'NZ–China FTA Certificate or origin declaration' },
  { country: 'Singapore', flag: '🇸🇬', fta: 'CSFTA / MFN', duty: '0% (most metal goods are 0% MFN)', certificate: 'Form X if FTA claimed; generally not required' },
  { country: 'Hong Kong', flag: '🇭🇰', fta: 'Free port', duty: '0%', certificate: 'No certificate required' },
  { country: 'Switzerland', flag: '🇨🇭', fta: 'No FTA required', duty: '0% (all industrial goods, from 1 Jan 2024)', certificate: 'No certificate required' },
  { country: 'South Korea', flag: '🇰🇷', fta: 'China–Korea FTA + RCEP', duty: 'Varies by HS code; phasing to 0% on most lines', certificate: 'Form K (China–Korea FTA) or RCEP Certificate' },
  { country: 'Japan', flag: '🇯🇵', fta: 'RCEP', duty: 'Varies by HS code; phasing to 0% on majority of lines', certificate: 'RCEP Certificate or importer self-declaration' },
  { country: 'Chile', flag: '🇨🇱', fta: 'China–Chile FTA', duty: '0% on most lines (small exclusion list applies)', certificate: 'Form F' },
  { country: 'Peru', flag: '🇵🇪', fta: 'China–Peru FTA', duty: '0% on qualifying lines', certificate: 'Form R' },
  { country: 'UAE', flag: '🇦🇪', fta: 'No FTA', duty: '5% (CIF value; verify by HS code)', certificate: 'General Certificate of Origin' },
  { country: 'Saudi Arabia', flag: '🇸🇦', fta: 'No FTA', duty: 'Varies by HS code; typically 5–15%', certificate: 'General Certificate of Origin' },
  { country: 'United Kingdom', flag: '🇬🇧', fta: 'No FTA', duty: 'Varies by HS code; typically 2–6% MFN', certificate: 'General Certificate of Origin' },
  { country: 'Canada', flag: '🇨🇦', fta: 'No FTA', duty: 'Varies by HS code; base rate plus applicable steel/aluminium surtaxes — confirm per product', certificate: 'General CoO; additional declarations may apply' },
  { country: 'United States', flag: '🇺🇸', fta: 'No FTA', duty: 'Section 301 + Section 232 stacked; rates vary significantly by HS code and product — confirm per shipment', certificate: 'General Certificate of Origin' },
  { country: 'Other destinations', flag: '—', fta: '—', duty: 'Quoted on request', certificate: '—' },
]

function DutyAndShippingPage() {
  return (
    <div style={{ fontFamily: 'inherit', color: '#0a0a0a', background: '#fff' }}>
      <header style={{ borderBottom: '1px solid #e5e5e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
        <a href="/" aria-label="Wischos Gift — Home"><img src={cloudinaryUrl('/wischos-logo')} alt="Wischos Gift" style={{ height: '2rem', width: 'auto' }} /></a>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Reference</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', maxWidth: '24ch' }}>Duty, Shipping &amp; FTA Coverage</h1>
        <p style={{ fontSize: '1.05rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '60ch', marginBottom: '1rem' }}>A landed-cost reference for distributors and procurement teams planning a metal gift program.</p>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.75, maxWidth: '64ch' }}>This page documents the import duty environment, shipping timelines, and Free Trade Agreement coverage for the destinations we currently ship to. It is intended as a planning reference — actual landed cost varies by HS classification, quantity, port pair, and prevailing freight rates, and is confirmed line-by-line in formal quotations.</p>
      </section>

      {/* Duty Table */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Duty Coverage</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2rem', maxWidth: '32ch' }}>Duty rates on metal gift goods by destination.</h2>
          <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #e5e5e5' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '720px' }}>
              <thead>
                <tr style={{ background: '#fafafa', borderBottom: '2px solid #e5e5e5' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#0a0a0a', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Destination</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#0a0a0a', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Trade Agreement</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#0a0a0a', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Import Duty</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#0a0a0a', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Certificate We Provide</th>
                </tr>
              </thead>
              <tbody>
                {DUTY_TABLE.map((row) => (
                  <tr key={row.country} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.85rem 1rem', color: '#0a0a0a', fontWeight: 500 }}><span style={{ marginRight: '0.4rem' }}>{row.flag}</span>{row.country}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#555' }}>{row.fta}</td>
                    <td style={{ padding: '0.85rem 1rem', color: row.duty.startsWith('0%') ? '#B87333' : '#555', fontWeight: row.duty.startsWith('0%') ? 600 : 400 }}>{row.duty}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#555', fontSize: '0.8rem' }}>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              'Duty rates above apply to qualifying metal gift goods correctly classified under their applicable HS tariff codes. Final classification is determined by customs in the destination country.',
              'FTA Certificates of Origin enable the preferential duty rate where an FTA applies. We arrange through CCPIT or Chinese Customs and include in standard shipping documents at no additional charge. Hong Kong and Switzerland do not require a certificate — zero duty applies regardless of origin.',
              'General Certificates of Origin serve as proof of Chinese origin for customs and statistical purposes. They do not confer any duty preference where no FTA exists.',
              'Local sales tax, VAT, or GST (e.g. Australian GST 10%, NZ GST 15%, UK VAT 20%) applies independently of import duty and is generally recoverable by registered importers.',
            ].map((note, i) => (
              <p key={i} style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.65, margin: 0 }}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Shipping Options</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '2.5rem', maxWidth: '32ch' }}>Sea freight, air express, and transit times.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Sea freight card */}
          <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B87333', fontWeight: 600, marginBottom: '0.75rem' }}>Sea Freight (LCL)</p>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>For orders 100+ sets, non-urgent timelines.</p>
            <ul style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.8, paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
              <li>Origin ports: Shanghai, Ningbo, Shenzhen</li>
              <li>Cost: $300–800 per cubic metre typical</li>
              <li>Docs: B/L, Packing List, Invoice, Certificate of Origin</li>
            </ul>
            <p style={{ fontSize: '0.78rem', color: '#888', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Transit times (door-to-port)</p>
            <table style={{ width: '100%', fontSize: '0.83rem', color: '#444', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Hong Kong / Singapore', '5–10 days'],
                  ['Sydney / Melbourne', '18–25 days'],
                  ['Auckland', '22–28 days'],
                  ['Dubai / Abu Dhabi', '22–28 days'],
                  ['Felixstowe (UK)', '30–38 days'],
                ].map(([dest, time]) => (
                  <tr key={dest} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.4rem 0' }}>{dest}</td>
                    <td style={{ padding: '0.4rem 0', textAlign: 'right' }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Air express card */}
          <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B87333', fontWeight: 600, marginBottom: '0.75rem' }}>Air Express (DHL / FedEx / UPS)</p>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>For samples, urgent restocks, orders under 50kg.</p>
            <ul style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.8, paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
              <li>Cost: $6–15 per kg depending on volume</li>
              <li>Docs: Airwaybill, Commercial Invoice, Certificate of Origin</li>
            </ul>
            <p style={{ fontSize: '0.78rem', color: '#888', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Transit times (door-to-door)</p>
            <table style={{ width: '100%', fontSize: '0.83rem', color: '#444', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Singapore / Hong Kong', '2–4 days'],
                  ['Sydney / Auckland', '4–6 days'],
                  ['Dubai', '4–6 days'],
                  ['London / Manchester', '4–7 days'],
                  ['Toronto / Vancouver', '5–8 days'],
                ].map(([dest, time]) => (
                  <tr key={dest} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.4rem 0' }}>{dest}</td>
                    <td style={{ padding: '0.4rem 0', textAlign: 'right' }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Incoterms */}
      <section style={{ background: '#fafafa', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>How We Quote</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '0.75rem', maxWidth: '32ch' }}>Three Incoterms — choose what fits your logistics setup.</h2>
          <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '56ch' }}>We quote on three Incoterms. Choose the one that fits your team's logistics capability and your client's pricing expectations.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { term: 'FOB [Port]', includes: 'Goods + export packaging + export clearance. Risk transfers to buyer when goods are loaded onto the vessel at the named Chinese port.', when: 'You have a freight forwarder you trust and want full control over shipping and customs.' },
              { term: 'CIF [Port]', includes: 'FOB + sea freight + insurance to destination port', when: 'You want a single price to destination port but plan to clear customs yourself.' },
              { term: 'DDP [City]', includes: 'All-in price including duty, freight, clearance, and inland delivery to your client\'s door', when: 'Your client expects a fully-landed price and you don\'t want to handle customs at all.' },
            ].map((item) => (
              <div key={item.term} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: '1.75rem' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#0a0a0a' }}>{item.term}</p>
                <p style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: '0.4rem' }}>Includes</p>
                <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.65, marginBottom: '1.25rem' }}>{item.includes}</p>
                <p style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: '0.4rem' }}>When to choose</p>
                <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.65 }}>{item.when}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.7, marginTop: '2rem', maxWidth: '60ch' }}>For destinations where zero duty applies (e.g. Australia and New Zealand under ChAFTA/NZ–China FTA, Singapore for most metal goods, Hong Kong as a free port, Switzerland for all industrial goods), DDP pricing reflects the zero-duty advantage. For non-zero-duty destinations, DDP includes the applicable import duty calculated on your specific HS classification. We do not mark up customs duty or freight in DDP quotes — line items are visible in the quotation so you can verify each cost.</p>
        </div>
      </section>

      {/* FTA Claim Process */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>FTA Process</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '36ch' }}>How an FTA preference is claimed.</h2>
        <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem' }}>The duty-free rate under an FTA does not apply automatically. The preference is claimed by the importer at the time of customs entry, supported by a valid Certificate of Origin issued in the exporting country.</p>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {[
            { step: 'Step 1', title: 'You order, we produce', body: 'Normal production cycle. No FTA action needed at this stage.' },
            { step: 'Step 2', title: 'We arrange the Certificate of Origin', body: 'Once the shipment is ready, we apply for the relevant FTA Certificate of Origin through CCPIT or Chinese Customs. Processing time: 1–3 working days.' },
            { step: 'Step 3', title: 'We ship with full documentation', body: 'Certificate of Origin is included with the shipping documents alongside the Commercial Invoice, Packing List, and Bill of Lading or Airwaybill. Original or scanned copy depending on destination customs requirements.' },
            { step: 'Step 4', title: 'Your customs broker claims the preference', body: 'At destination, your customs broker presents the Certificate of Origin during entry. Duty is assessed at the FTA preferential rate.' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'start' }}>
              <p style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B87333', fontWeight: 600, paddingTop: '0.25rem' }}>{item.step}</p>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#fafafa', border: '1px solid #e5e5e5' }}>
          <p style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Important Notes</p>
          <ul style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.75, paddingLeft: '1.25rem', margin: 0 }}>
            <li>The Certificate of Origin must accompany the shipment. Delayed or missing certificates can result in full duty being assessed and refunded only after the certificate is presented (subject to destination customs rules).</li>
            <li>Some FTAs require specific Rules of Origin to be met (e.g. minimum regional value content). We verify this at the quotation stage and do not issue a Certificate of Origin if the goods would not qualify.</li>
            <li>We do not provide tax or customs advice. For complex programs, please consult your customs broker or trade compliance advisor.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem 3rem' }}>
        <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '2rem' }}>Common questions</h2>
        {[
          { question: "Why doesn't the duty rate change my quoted FOB price?", answer: 'FOB price is the cost of goods at the Chinese port and is independent of destination duty. Duty becomes relevant only at CIF + duty calculations or DDP quotations.' },
          { question: 'Can I see the FTA Certificate before shipment?', answer: 'Yes. We can send a scanned copy of the Certificate of Origin for your review before original documents are dispatched with the shipment.' },
          { question: "What happens if my country isn't on your list?", answer: 'Tell us your destination during the inquiry stage. We will research the applicable duty rate, confirm whether any FTA applies, and quote landed cost accordingly.' },
          { question: 'Do you charge extra for the FTA Certificate?', answer: 'No. The certificate application fee is absorbed into our standard shipping documentation cost. There is no separate line item.' },
          { question: 'What if customs questions the Certificate of Origin?', answer: 'We retain documentation supporting the origin claim (raw material invoices, production records, factory certifications) and can provide these on request to support customs verification queries.' },
          { question: 'Does the FTA cover all metal gift products equally?', answer: 'FTA preferences apply line-by-line based on HS classification. For the metal categories we work with (brass, titanium, stainless steel, aluminium, and other metal alloy gift goods), the vast majority of relevant HS lines are covered under our FTA destinations. We confirm coverage per project.' },
          { question: 'How do you handle anti-dumping or safeguard duties?', answer: 'Anti-dumping and safeguard measures (e.g. EU stainless steel anti-dumping duties, Canadian steel surtaxes) apply independently of FTAs. We flag any applicable measure during quotation and recommend product or destination alternatives where useful.' },
          { question: "Can you ship under my consignee name, even if I'm not the importer of record?", answer: 'Yes. Consignee, notify party, and importer of record can be configured per shipment to match your client setup. We follow your instructions on documentation.' },
        ].map((item) => <Accordion key={item.question} question={item.question} answer={item.answer} />)}
      </section>

      {/* CTA / Inquiry */}
      <section id="inquiry-form" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 300, marginBottom: '1rem' }}>Need a landed cost for your specific program?</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.25rem' }}>Tell us the destination, quantity, and target set configuration. We respond within 1–2 business days with a line-by-line landed cost breakdown including freight, duty, certificate handling, and Incoterm options.</p>
          <p style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.65, marginBottom: '0.5rem' }}>Prefer email?</p>
          <a href="mailto:johnlui@wischosgift.com" style={{ fontSize: '0.85rem', color: '#B87333', textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>johnlui@wischosgift.com</a>
        </div>
        <div style={{ border: '1px solid #e5e5e5', padding: '2rem' }}>
          <Suspense fallback={<div style={{ height: '400px' }} />}><InquiryFormSection /></Suspense>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#888' }}>© {new Date().getFullYear()} Wischos Gift Trading Co. &nbsp;·&nbsp; johnlui@wischosgift.com &nbsp;·&nbsp; Page last reviewed: August 2026</p>
        <a href="https://wischosgift.com" style={{ fontSize: '0.72rem', color: '#888', textDecoration: 'none' }}>wischosgift.com</a>
      </footer>
    </div>
  )
}
