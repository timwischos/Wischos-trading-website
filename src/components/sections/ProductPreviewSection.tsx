import { homepage } from '@/content/homepage'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type RouterTo = LinkProps['to']

export function ProductPreviewSection() {
  return (
    <section className="py-20">
      <div className="page-wrap">
        <p className="island-kicker mb-4">{homepage.productPreview.kicker}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--sea-ink)] mb-10">
          {homepage.productPreview.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {homepage.productPreview.items.map((item) => (
            <Card key={item.name}>
              <CardHeader>
                <p className="font-semibold text-[var(--sea-ink)]">{item.name}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.tagline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to={'/products' as RouterTo}>{homepage.productPreview.viewAllCta}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
