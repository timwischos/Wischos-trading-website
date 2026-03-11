import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/{-$locale}/about')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.about.title },
      { name: 'description', content: siteMeta.routes.about.description },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">About Wischos Gift</h1>
      <p className="mt-4 text-muted-foreground">About page — Phase 2</p>
    </PageShell>
  )
}
