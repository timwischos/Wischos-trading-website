import { createFileRoute } from '@tanstack/react-router'
import { ProductGridSection } from '@/components/sections/ProductGridSection'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { getProducts } from '@/server/getProducts'
import type { DbProduct } from '@/server/schema'

export const Route = createFileRoute('/{-$locale}/products/')({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === 'string' ? search.category : undefined,
    q: typeof search.q === 'string' ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: siteMeta.routes.products.title },
      { name: 'description', content: siteMeta.routes.products.description },
      ...buildOgMeta({
        title: siteMeta.routes.products.title,
        description: siteMeta.routes.products.description,
        image: '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-lifestyle.avif',
        url: '/products',
      }),
    ],
    links: [buildCanonical('/products')],
  }),
  loaderDeps: ({ search }) => ({ category: search.category, q: search.q }),
  loader: ({ deps }) => getProducts({ data: deps.category ?? null }),
  component: ProductsPage,
})

function filterByQuery(products: DbProduct[], query: string | undefined): DbProduct[] {
  if (!query) return products
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    (p.materials && p.materials.some(m => m.toLowerCase().includes(q))) ||
    (p.description && p.description.toLowerCase().includes(q))
  )
}

function ProductsPage() {
  const products = Route.useLoaderData()
  const { category, q } = Route.useSearch()
  const filtered = filterByQuery(products, q)
  return <ProductGridSection products={filtered} category={category} searchQuery={q} />
}
