import { createFileRoute } from '@tanstack/react-router'
import { siteMeta } from '@/content/meta'
import { AboutHeroSection } from '@/components/sections/AboutHeroSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { TrustSection } from '@/components/sections/TrustSection'

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
    <>
      <AboutHeroSection />
      <ExpertiseSection />
      <WhyUsSection />
      <TrustSection />
    </>
  )
}
