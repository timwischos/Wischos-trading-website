import { howItWorks } from '@/content/howItWorks'
import { ClipboardList, FlaskConical, CheckSquare, Truck } from 'lucide-react'

const stepIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '01': ClipboardList,
  '02': FlaskConical,
  '03': CheckSquare,
  '04': Truck,
}

export function ProcessStepsSection() {
  return (
    <section className="py-24 rise-in">
      <div className="page-wrap">
        <h1 className="display-title text-center">{howItWorks.hero.heading}</h1>
        <p className="mt-4 text-center text-[var(--sea-ink)] opacity-70 text-lg max-w-2xl mx-auto">
          {howItWorks.hero.subheading}
        </p>
        <ol className="flex flex-col gap-8 mt-16 max-w-3xl mx-auto">
          {howItWorks.steps.map((step) => {
            const Icon = stepIcons[step.number]
            return (
              <li key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--lagoon)] flex items-center justify-center text-white font-bold text-lg">
                  {Icon ? <Icon className="h-6 w-6" /> : step.number}
                </div>
                <div>
                  <p className="font-semibold text-[var(--sea-ink)] text-lg mb-2">{step.title}</p>
                  <p className="text-[var(--sea-ink)] opacity-70">{step.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
