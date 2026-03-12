import { homepage } from '@/content/homepage'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

type RouterTo = LinkProps['to']

export function CtaSection() {
  return (
    <section className="py-24 bg-[var(--lagoon)] text-white text-center">
      <div className="page-wrap">
        <h2 className="display-title text-3xl md:text-4xl font-bold mb-4">
          {homepage.cta.heading}
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{homepage.cta.body}</p>
        <Button asChild size="lg" variant="secondary">
          <Link to={'/inquiry' as RouterTo}>{homepage.cta.buttonLabel}</Link>
        </Button>
      </div>
    </section>
  )
}
