import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { HeroSection } from '@/components/sections/HeroSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { HomepageProductsSection } from '@/components/sections/HomepageProductsSection'
import { HomepageFeaturedProductsSection } from '@/components/sections/HomepageFeaturedProductsSection'
import { ProcessPreviewSection } from '@/components/sections/ProcessPreviewSection'
import { ExpertNotesTeaser } from '@/components/sections/ExpertNotesTeaser'
import { WhySection } from '@/components/sections/WhySection'
import { getProductsByIds } from '@/server/getProducts'

const FEATURED_PRODUCT_IDS = [
  'WP-402-pure-titanium-capsule-flask-150ml',
  'WP-207-carbon-fiber-magnetic-fidget-stick',
  'WP-203-executive-zinc-alloy-letter-opener',
  'WP-102-executive-dual-head-metal-pen',
]

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.home.title },
      { name: 'description', content: siteMeta.routes.home.description },
      ...buildOgMeta({
        title: siteMeta.routes.home.title,
        description: siteMeta.routes.home.description,
        image: siteMeta.defaultOgImage,
        url: '/',
      }),
    ],
    links: [buildCanonical('/')],
  }),
  loader: () => getProductsByIds({ data: FEATURED_PRODUCT_IDS }),
  component: HomePage,
})

function HomePage() {
  const featuredProducts = Route.useLoaderData()
  return (
    <>
      {/* A — Attention */}
      <HeroSection />

      {/* I — Gift Sets */}
      <HomepageProductsSection />

      {/* I — Featured individual products */}
      <HomepageFeaturedProductsSection products={featuredProducts} />

      {/* D — Why us */}
      <WhySection />

      {/* D — Process transparency */}
      <ProcessPreviewSection />

      {/* E-E-A-T — Material expertise */}
      <ExpertNotesTeaser />

      {/* A — Action */}
      <CtaSection />
    </>
  )
}
