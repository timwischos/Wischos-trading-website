import { createFileRoute } from '@tanstack/react-router'
import { ProductGridSection } from '@/components/sections/ProductGridSection'
import { siteMeta } from '@/content/meta'

export const Route = createFileRoute('/{-$locale}/products/')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.products.title },
      { name: 'description', content: siteMeta.routes.products.description },
    ],
  }),
  component: ProductsPage,
})

function ProductsPage() {
  return <ProductGridSection />
}
