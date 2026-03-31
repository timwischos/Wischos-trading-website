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

export function ContactSection() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">{contactContent.heading}</h1>
      <p className="mt-4 text-muted-foreground">{contactContent.intro}</p>

      <div className="mt-8 space-y-3">
        <div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {contactContent.emailLabel}
          </span>
          <div className="mt-1">
            <a
              href={`mailto:${contactContent.email}`}
              className="text-base hover:underline"
            >
              {contactContent.email}
            </a>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {contactContent.companyLabel}
          </span>
          <div className="mt-1">
            <p className="text-base">{contactContent.companyName}</p>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {contactContent.addressLabel}
          </span>
          <div className="mt-1">
            <p className="text-base">{contactContent.address}</p>
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-5">
          What happens next
        </h2>
        <div className="space-y-5">
          {NEXT_STEPS.map((step) => (
            <div key={step.number} className="flex gap-4">
              <span
                className="text-sm font-mono mt-0.5 shrink-0"
                style={{ color: 'var(--accent-brand)' }}
              >
                {step.number}
              </span>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
