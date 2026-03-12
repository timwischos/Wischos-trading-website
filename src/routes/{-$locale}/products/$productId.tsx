import { createFileRoute, notFound, Link, type LinkProps } from '@tanstack/react-router'
import { products, type Product } from '@/content/products'
import { ProductDetailSection } from '@/components/sections/ProductDetailSection'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/products/$productId')({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId)
    if (!product) return {}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: (({ params }: any) => {
    const product = products.find((p: Product) => p.id === params.productId)
    if (!product) throw notFound()
    return { product }
  }) as any,
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
  const loaderData = Route.useLoaderData() as { product: Product }
  return <ProductDetailSection product={loaderData.product} />
}
