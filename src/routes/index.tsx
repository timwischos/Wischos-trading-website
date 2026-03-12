import { createFileRoute } from '@tanstack/react-router'
import { siteMeta } from '@/content/meta'
import { HeroSection } from '@/components/sections/HeroSection'
import { ValuePropSection } from '@/components/sections/ValuePropSection'
import { DifferentiatorSection } from '@/components/sections/DifferentiatorSection'
import { CredibilitySection } from '@/components/sections/CredibilitySection'
import { ProductPreviewSection } from '@/components/sections/ProductPreviewSection'
import { CtaSection } from '@/components/sections/CtaSection'

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
    <>
      <HeroSection />
      <ValuePropSection />
      <DifferentiatorSection />
      <CredibilitySection />
      <ProductPreviewSection />
      <CtaSection />
    </>
  )
}
