import { CheckCircle } from 'lucide-react'
import { about } from '@/content/about'

export function WhyUsSection() {
  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="page-wrap">
        <p className="island-kicker">{about.whyUs.kicker}</p>
        <h2 className="text-3xl font-bold text-[var(--sea-ink)] mt-2">{about.whyUs.heading}</h2>
        <div className="flex flex-col gap-6 mt-10 max-w-3xl mx-auto">
          {about.whyUs.points.map((point) => (
            <div key={point.title} className="flex gap-4 items-start island-shell rounded-xl p-6">
              <CheckCircle className="flex-shrink-0 h-5 w-5 text-[var(--lagoon-deep)] mt-0.5" />
              <div>
                <p className="font-semibold text-[var(--sea-ink)] mb-1">{point.title}</p>
                <p className="text-sm text-[var(--sea-ink)] opacity-70">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
