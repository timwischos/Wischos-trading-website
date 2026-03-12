import { homepage } from '@/content/homepage'

export function CredibilitySection() {
  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="page-wrap">
        <p className="island-kicker mb-4 text-center">{homepage.credibility.kicker}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--sea-ink)] text-center">
          {homepage.credibility.heading}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
          {homepage.credibility.stats.map((stat) => (
            <div key={stat.label}>
              <p className="display-title text-3xl md:text-4xl font-bold text-[var(--lagoon-deep)]">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--sea-ink)] opacity-70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
