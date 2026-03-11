import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Wischos Gift' },
      { name: 'description', content: 'Privacy policy for Wischos Gift — how we handle your inquiry data.' },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">Privacy policy — Phase 2</p>
    </PageShell>
  )
}
