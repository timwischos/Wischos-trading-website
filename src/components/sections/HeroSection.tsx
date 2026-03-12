import { homepage } from '@/content/homepage'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

type RouterTo = LinkProps['to']

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 text-center rise-in">
      <div className="page-wrap">
        <p className="island-kicker mb-4">{homepage.hero.kicker}</p>
        <h1 className="display-title text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--sea-ink)] mb-6">
          {homepage.hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-[var(--sea-ink)] opacity-80 max-w-2xl mx-auto mb-10">
          {homepage.hero.subheadline}
        </p>
        <Button asChild size="lg">
          <Link to={'/inquiry' as RouterTo}>{homepage.hero.cta}</Link>
        </Button>
      </div>
    </section>
  )
}
