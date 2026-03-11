import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/{-$locale}/inquiry')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.inquiry.title },
      { name: 'description', content: siteMeta.routes.inquiry.description },
    ],
  }),
  component: InquiryPage,
})

function InquiryPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">Request an Inquiry</h1>
      <p className="mt-4 text-muted-foreground">Inquiry form — Phase 4</p>
    </PageShell>
  )
}
