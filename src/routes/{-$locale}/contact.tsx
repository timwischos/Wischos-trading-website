import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'

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
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mt-4 text-muted-foreground">Contact page — Phase 2</p>
    </PageShell>
  )
}
