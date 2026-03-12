import { Globe } from 'lucide-react'
import { about } from '@/content/about'

export function ExpertiseSection() {
  return (
    <section className="py-20">
      <div className="page-wrap">
        <p className="island-kicker">{about.expertise.kicker}</p>
        <h2 className="text-3xl font-bold text-[var(--sea-ink)] mt-2">{about.expertise.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {about.expertise.markets.map((market) => (
            <div key={market.region} className="island-shell feature-card rounded-xl p-6">
              <Globe className="h-5 w-5 text-[var(--lagoon-deep)] mb-3" />
              <p className="font-semibold text-[var(--sea-ink)] mb-2">{market.region}</p>
              <p className="text-sm text-[var(--sea-ink)] opacity-70">{market.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
