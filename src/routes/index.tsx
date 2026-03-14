import { createFileRoute } from '@tanstack/react-router'
import { siteMeta } from '@/content/meta'
import { HeroSection } from '@/components/sections/HeroSection'
import { ValuePropSection } from '@/components/sections/ValuePropSection'
import { DifferentiatorSection } from '@/components/sections/DifferentiatorSection'
import { CredibilitySection } from '@/components/sections/CredibilitySection'
import { ProductPreviewSection } from '@/components/sections/ProductPreviewSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { ImageTextSection } from '@/components/sections/ImageTextSection'

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
      <ImageTextSection
        image="/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-lifestyle.avif"
        kicker="Craftsmanship"
        heading="Precision Engineered, Built to Impress"
        body="Every piece in our catalogue is machined from premium metals — aluminium, titanium, brass, stainless steel. We obsess over tolerances so your clients notice the difference the moment they pick it up."
        ctaLabel="View Products"
        ctaHref="/products"
      />
      <ImageTextSection
        image="/products/Letter-opener-01/Letter-opener-01-lifestyle.avif"
        kicker="Custom Branding"
        heading="Your Brand on Objects That Last"
        body="Laser engraving, anodized finishes, bespoke packaging — we handle every detail. From 50 to 50,000 sets, your brand stays sharp across the full run."
        ctaLabel="Request a Quote"
        ctaHref="/contact"
        imageRight
      />
      <ValuePropSection />
      <DifferentiatorSection />
      <CredibilitySection />
      <ProductPreviewSection />
      <CtaSection />
    </>
  )
}
