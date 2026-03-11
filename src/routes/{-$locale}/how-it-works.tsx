import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/{-$locale}/how-it-works')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.howItWorks.title },
      { name: 'description', content: siteMeta.routes.howItWorks.description },
    ],
  }),
  component: HowItWorksPage,
})

function HowItWorksPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">How It Works</h1>
      <p className="mt-4 text-muted-foreground">Process page — Phase 2</p>
    </PageShell>
  )
}
