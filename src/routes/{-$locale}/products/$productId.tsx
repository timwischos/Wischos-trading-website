import { createFileRoute, notFound, Link, type LinkProps } from '@tanstack/react-router'
import { ProductDetailSection } from '@/components/sections/ProductDetailSection'
import { getProductById } from '@/server/getProducts'
import type { DbProduct } from '@/server/schema'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/products/$productId')({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: (async ({ params }: any) => {
    const product = await getProductById({ data: params.productId })
    if (!product) throw notFound()
    return { product }
  }) as any,
  head: ({ loaderData }) => {
    if (!loaderData?.product) return {}
    const { product } = loaderData
    return {
      meta: [
        { title: `${product.name} | Wischos Gift` },
        { name: 'description', content: product.tagline },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: { '@type': 'Brand', name: 'Wischos Gift' },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: 'On Request',
              },
            },
          }),
        },
      ],
    }
  },
  notFoundComponent: () => (
    <div className="page-wrap py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      <p className="text-muted-foreground mb-8">
        The product you are looking for does not exist or may have been removed.
      </p>
      <Link to={'/products' as RouterTo} className="text-sm underline underline-offset-4 hover:text-foreground">
        View all products
      </Link>
    </div>
  ),
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { product } = Route.useLoaderData() as { product: DbProduct }
  return <ProductDetailSection product={product} />
}
