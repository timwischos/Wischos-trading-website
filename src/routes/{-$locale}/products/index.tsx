import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/layout/PageShell'
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
  return (
    <PageShell>
      <h1 className="text-4xl font-bold">Our Products</h1>
      <p className="mt-4 text-muted-foreground">Product catalog — Phase 3</p>
    </PageShell>
  )
}
