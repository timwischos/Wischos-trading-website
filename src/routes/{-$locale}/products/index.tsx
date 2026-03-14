import { createFileRoute } from '@tanstack/react-router'
import { ProductGridSection } from '@/components/sections/ProductGridSection'
import { siteMeta } from '@/content/meta'
import { getProducts } from '@/server/getProducts'

export const Route = createFileRoute('/{-$locale}/products/')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.products.title },
      { name: 'description', content: siteMeta.routes.products.description },
    ],
  }),
  loader: () => getProducts(),
  component: ProductsPage,
})

function ProductsPage() {
  const products = Route.useLoaderData()
  return <ProductGridSection products={products} />
}
