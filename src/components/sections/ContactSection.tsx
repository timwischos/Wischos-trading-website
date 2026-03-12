import { contactContent } from '@/content/contact'

export function ContactSection() {
  return (
    <div className="page-wrap py-12">
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
            {contactContent.linkedinLabel}
          </span>
          <div className="mt-1">
            <a
              href={contactContent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base hover:underline"
            >
              Wischos Gift on LinkedIn
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">{contactContent.responseTime}</p>
    </div>
  )
}
