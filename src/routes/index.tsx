import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.home.title },
      { name: 'description', content: siteMeta.routes.home.description },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">Wischos Gift</h1>
      <p className="mt-4 text-muted-foreground">Landing page — Phase 2</p>
    </PageShell>
  )
}
