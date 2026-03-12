import { Link, type LinkProps } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Stamp } from 'lucide-react'
import { products, type Product } from '@/content/products'

type RouterTo = LinkProps['to']

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}` as RouterTo}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      aria-label={product.name}
    >
      <Card className="h-full cursor-pointer transition-shadow hover:ring-foreground/20">
        {/* img MUST be first direct child of Card for has-[>img:first-child]:pt-0 to work */}
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="secondary">MOQ 50 Sets</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Stamp className="size-3 shrink-0" aria-hidden="true" />
            Custom Logo Available
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

export function ProductGridSection() {
  return (
    <section className="py-20">
      <div className="page-wrap">
        <p className="island-kicker mb-4">Our Products</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--sea-ink)] mb-2">
          Premium Metal Gift Sets
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Each series is available from MOQ 50 sets with full custom logo and packaging design.
          Sample before you commit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
