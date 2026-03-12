import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'
import { ContactSection } from '@/components/sections/ContactSection'
import { InquiryFormSection } from '@/components/sections/InquiryFormSection'

export const Route = createFileRoute('/{-$locale}/contact')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.contact.title },
      { name: 'description', content: siteMeta.routes.contact.description },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
      <InquiryFormSection />
    </PageShell>
  )
}
