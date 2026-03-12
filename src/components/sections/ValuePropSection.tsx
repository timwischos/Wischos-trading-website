import { homepage } from '@/content/homepage'
import { Gem, Package, CheckCircle } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gem,
  Package,
  CheckCircle,
}

export function ValuePropSection() {
  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="page-wrap">
        <p className="island-kicker mb-4 text-center">{homepage.valueProps.kicker}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--sea-ink)] text-center">
          {homepage.valueProps.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {homepage.valueProps.items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={item.title} className="feature-card island-shell rounded-xl p-6">
                {Icon && <Icon className="h-6 w-6 text-[var(--lagoon-deep)] mb-4" />}
                <p className="font-semibold text-[var(--sea-ink)] mb-2">{item.title}</p>
                <p className="text-sm text-[var(--sea-ink)] opacity-70">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
