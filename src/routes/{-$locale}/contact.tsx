import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { ContactSection } from '@/components/sections/ContactSection'
import { InquiryFormSection } from '@/components/sections/InquiryFormSection'

export const Route = createFileRoute('/{-$locale}/contact')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.contact.title },
      { name: 'description', content: siteMeta.routes.contact.description },
      ...buildOgMeta({
        title: siteMeta.routes.contact.title,
        description: siteMeta.routes.contact.description,
        image: siteMeta.defaultOgImage,
        url: '/contact',
      }),
    ],
    links: [buildCanonical('/contact')],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <PageShell>
      <div className="page-wrap py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ContactSection />
          <InquiryFormSection />
        </div>
      </div>
    </PageShell>
  )
}
