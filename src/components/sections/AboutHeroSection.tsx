import { about } from '@/content/about'

export function AboutHeroSection() {
  return (
    <section className="py-20 text-center rise-in bg-[var(--surface)]">
      <div className="page-wrap">
        <h1 className="display-title text-4xl md:text-5xl font-bold text-[var(--sea-ink)] mb-6">
          {about.hero.heading}
        </h1>
        <p className="text-lg md:text-xl text-[var(--sea-ink)] opacity-80 max-w-2xl mx-auto">
          {about.hero.subheading}
        </p>
        <blockquote className="island-shell rounded-xl p-6 mt-10 max-w-2xl mx-auto text-left">
          <p className="font-semibold mb-2 text-[var(--sea-ink)]">{about.mission.heading}</p>
          <p className="text-sm text-[var(--sea-ink)] opacity-80">{about.mission.body}</p>
        </blockquote>
      </div>
    </section>
  )
}
