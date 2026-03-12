import { createFileRoute } from '@tanstack/react-router'
import { siteMeta } from '@/content/meta'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { ProcessPolicySection } from '@/components/sections/ProcessPolicySection'

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
    <>
      <ProcessStepsSection />
      <ProcessPolicySection />
    </>
  )
}
