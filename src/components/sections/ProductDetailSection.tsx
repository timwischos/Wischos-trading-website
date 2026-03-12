import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Stamp } from 'lucide-react'
import type { Product } from '@/content/products'

type RouterTo = LinkProps['to']

interface ProductLightboxProps {
  product: Product
}

export function ProductLightbox({ product }: ProductLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="cursor-zoom-in w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          aria-label={`View ${product.name} full size`}
        >
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-background flex items-center justify-center">
        <DialogTitle className="sr-only">{product.name} — full size image</DialogTitle>
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}

interface ProductDetailSectionProps {
  product: Product
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="page-wrap">
        {/* Breadcrumb hint */}
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to={'/products' as RouterTo} className="hover:text-foreground transition-colors">
            Our Products
          </Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span>{product.category}</span>
        </nav>

        {/* 2-column layout: image left, info right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Image with lightbox */}
          <div>
            <ProductLightbox product={product} />
            <p className="mt-2 text-xs text-muted-foreground text-center">Click image to view full size</p>
          </div>

          {/* Right: Product info */}
          <div className="space-y-8">

            {/* Name + tagline */}
            <div>
              <p className="island-kicker mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--sea-ink)] leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground">{product.tagline}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                About This Series
              </h2>
              <p className="text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Materials */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Materials
              </h2>
              <p className="text-base">{product.materials.join(' · ')}</p>
            </div>

            {/* Customization options (PROD-05) */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Stamp className="size-4" aria-hidden="true" />
                Customization
              </h2>
              <ul className="space-y-2">
                {product.customizationOptions.map((option) => (
                  <li key={option} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 rounded-full bg-foreground/40 shrink-0" aria-hidden="true" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead time + MOQ */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Order Quantity</span>
                <span className="font-medium">{product.moq} sets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sample Lead Time</span>
                <span className="font-medium">{product.leadTimeSample}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bulk Lead Time</span>
                <span className="font-medium">{product.leadTimeBulk}</span>
              </div>
            </div>

            {/* CTA — links to /inquiry with product name as query param */}
            {/* Phase 4 will read the ?product= param to pre-fill the inquiry form */}
            <div>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link
                  to={`/inquiry?product=${encodeURIComponent(product.name)}` as RouterTo}
                >
                  Request a Quote
                </Link>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                We respond to all inquiries within 1 business day.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
