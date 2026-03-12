import { homepage } from '@/content/homepage'
import { CheckCircle } from 'lucide-react'

export function DifferentiatorSection() {
  return (
    <section className="py-20">
      <div className="page-wrap">
        <p className="island-kicker mb-4">{homepage.differentiators.kicker}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--sea-ink)] mb-4">
          {homepage.differentiators.heading}
        </h2>
        <p className="text-[var(--sea-ink)] opacity-70 max-w-2xl mb-10">
          {homepage.differentiators.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {homepage.differentiators.items.map((item) => (
            <div key={item.claim} className="island-shell rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-[var(--lagoon-deep)] shrink-0" />
                <p className="font-semibold text-[var(--sea-ink)]">{item.claim}</p>
              </div>
              <p className="text-sm text-[var(--sea-ink)] opacity-70">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
