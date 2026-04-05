import { useEffect } from 'react'
import { createFileRoute, notFound, Link, type LinkProps } from '@tanstack/react-router'
import { ProductDetailSection } from '@/components/sections/ProductDetailSection'
import { getProductById, getProducts } from '@/server/getProducts'
import type { DbProduct } from '@/server/schema'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import { trackViewItem } from '@/lib/analytics'

type RouterTo = LinkProps['to']

export const Route = createFileRoute('/{-$locale}/products/$productId')({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: (async ({ params }: any) => {
    const [product, allProducts] = await Promise.all([
      getProductById({ data: params.productId }),
      getProducts({ data: null }),
    ])
    if (!product) throw notFound()
    const related = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
    return { product, related }
  }) as any,
  head: ({ loaderData }) => {
    if (!loaderData?.product) return {}
    const { product } = loaderData
    const title = `${product.name} | Wischos Gift`
    return {
      meta: [
        { title },
        { name: 'description', content: product.tagline },
        ...buildOgMeta({
          title,
          description: product.tagline,
          image: product.heroImage || product.images[0],
          type: 'product',
          url: `/products/${product.id}`,
        }),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.tagline,
            sku: product.id,
            image: product.images.slice(0, 3).map(
              (img: string) => `${siteMeta.siteUrl}${img}`
            ),
            ...(product.materials?.length ? { material: product.materials.join(', ') } : {}),
            category: product.category,
            brand: { '@type': 'Brand', name: siteMeta.siteName },
            manufacturer: { '@type': 'Organization', name: siteMeta.legalName },
            offers: {
              '@type': 'Offer',
              url: `${siteMeta.siteUrl}/products/${product.id}`,
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                description: `Price on request. MOQ 100 pcs.`,
              },
              seller: { '@type': 'Organization', name: siteMeta.siteName },
            },
          }),
        },
        ...(product.faqs?.length
          ? [{
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: product.faqs.map((faq: { q: string; a: string }) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              }),
            }]
          : []),
      ],
      links: [buildCanonical(`/products/${product.id}`)],
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
  const { product, related } = Route.useLoaderData() as { product: DbProduct; related: DbProduct[] }

  useEffect(() => {
    trackViewItem({
      productId: product.id,
      productName: product.name,
      category: product.category ?? undefined,
    })
  }, [product.id, product.name, product.category])

  return <ProductDetailSection product={product} relatedProducts={related} />
}
