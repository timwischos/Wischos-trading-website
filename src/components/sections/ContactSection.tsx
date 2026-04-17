import { contactContent } from '@/content/contact'

const NEXT_STEPS = [
  {
    number: '01',
    title: 'Submit your inquiry',
    desc: 'Share your product interest, quantity, and any branding requirements.',
  },
  {
    number: '02',
    title: 'We review and respond',
    desc: 'Within 2 business days with clarifying questions or a preliminary quote.',
  },
  {
    number: '03',
    title: 'Receive a tailored proposal',
    desc: 'Pricing, lead time, customization options, and sample availability.',
  },
]

export function ContactSection({ dark = false, headingAs: Heading = 'h1' }: { dark?: boolean; headingAs?: 'h1' | 'p' }) {
  const fg = dark ? '#fff' : '#0a0a0a'
  const muted = dark ? 'rgba(255,255,255,0.62)' : '#6b7280'
  const divider = dark ? 'rgba(255,255,255,0.12)' : '#e5e7eb'

  return (
    <div>
      <Heading style={{
        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        color: fg,
      }}>
        {contactContent.heading}
      </Heading>
      <p style={{
        marginTop: '1rem',
        fontSize: '0.875rem',
        color: muted,
        lineHeight: 1.8,
        maxWidth: '44ch',
      }}>
        {contactContent.intro}
      </p>

      {/* Contact details */}
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1.5rem', borderTop: `1px solid ${divider}` }}>
        <div>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted }}>
            {contactContent.emailLabel}
          </span>
          <div style={{ marginTop: '0.25rem' }}>
            <a
              href={`mailto:${contactContent.email}`}
              style={{ fontSize: '0.875rem', color: fg, textDecoration: 'none' }}
            >
              {contactContent.email}
            </a>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted }}>
            {contactContent.companyLabel}
          </span>
          <div style={{ marginTop: '0.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: fg, margin: 0 }}>{contactContent.companyName}</p>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted }}>
            {contactContent.addressLabel}
          </span>
          <div style={{ marginTop: '0.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: muted, margin: 0, lineHeight: 1.6 }}>{contactContent.address}</p>
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${divider}` }}>
        <h2 style={{
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: muted,
          marginBottom: '1.25rem',
        }}>
          What happens next
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {NEXT_STEPS.map((step) => (
            <div key={step.number} style={{ display: 'flex', gap: '1rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                marginTop: '0.1rem',
                flexShrink: 0,
                color: 'var(--accent-brand)',
              }}>
                {step.number}
              </span>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 500, color: fg, margin: 0 }}>{step.title}</p>
                <p style={{ fontSize: '0.8rem', color: muted, marginTop: '0.25rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
