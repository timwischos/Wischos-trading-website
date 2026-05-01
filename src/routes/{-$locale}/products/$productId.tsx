import { useEffect } from 'react'
import { createFileRoute, notFound, redirect, Link, type LinkProps } from '@tanstack/react-router'
import { ProductDetailSection } from '@/components/sections/ProductDetailSection'
import { getProductById, getProducts } from '@/server/getProducts'
import type { DbProduct } from '@/server/schema'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'
import {
  applyProductSeoGeoOverride,
  type ProductWithSeoGeo,
} from '@/content/productSeoGeoOverrides'
import { cloudinaryUrl } from '@/lib/cloudinary'
import { trackViewItem } from '@/lib/analytics'

type RouterTo = LinkProps['to']

const PRODUCT_REDIRECTS: Record<string, string> = {
  'wp-308-titanium-edc-carabiner': 'wp-308-titanium-edc-keychain',
  'wp-402-pure-titanium-capsule-flask-150ml': 'wp-402-pure-titanium-capsule-bottle-150ml',
  'wp-406-pure-titanium-capsule-flask-200ml': 'wp-406-pure-titanium-capsule-bottle-200ml',
}

export const Route = createFileRoute('/{-$locale}/products/$productId')({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: (async ({ params }: any) => {
    const redirectProductId = PRODUCT_REDIRECTS[params.productId]
    if (redirectProductId) {
      throw redirect({
        to: '/products/$productId',
        params: { productId: redirectProductId },
      })
    }

    const [product, allProducts] = await Promise.all([
      getProductById({ data: params.productId }),
      getProducts({ data: null }),
    ])
    if (!product) throw notFound()
    const productWithSeoGeo = applyProductSeoGeoOverride(product)
    const related = allProducts
      .filter(p => p.category === productWithSeoGeo.category && p.id !== productWithSeoGeo.id)
      .slice(0, 4)
    return { product: productWithSeoGeo, related }
  }) as any,
  head: ({ loaderData }) => {
    if (!loaderData?.product) return {}
    const { product } = loaderData
    const title = `${product.name} | Corporate Gift`
    const description = product.metaDescription ?? product.tagline
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        ...buildOgMeta({
          title,
          description,
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
            description: product.description,
            sku: product.sku ?? product.id,
            image: product.images.slice(0, 3).map(
              (img: string) => cloudinaryUrl(img, { w: 800 })
            ),
            ...(product.materials?.length ? { material: product.materials.join(', ') } : {}),
            category: product.category,
            brand: { '@type': 'Brand', name: siteMeta.siteName },
            manufacturer: { '@type': 'Organization', name: siteMeta.legalName },
            ...(product.specifications?.length
              ? {
                  additionalProperty: product.specifications.map((spec: { label: string; value: string }) => ({
                    '@type': 'PropertyValue',
                    name: spec.label,
                    value: spec.value,
                  })),
                }
              : {}),
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
  const { product, related } = Route.useLoaderData() as { product: ProductWithSeoGeo; related: DbProduct[] }

  useEffect(() => {
    trackViewItem({
      productId: product.id,
      productName: product.name,
      category: product.category ?? undefined,
    })
  }, [product.id, product.name, product.category])

  return <ProductDetailSection product={product} relatedProducts={related} />
}
