import { createFileRoute } from '@tanstack/react-router'
import { siteMeta } from '@/content/meta'
import { privacy } from '@/content/privacy'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.privacy.title },
      { name: 'description', content: siteMeta.routes.privacy.description },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="page-wrap py-16">
      <article className="prose prose-neutral max-w-prose mx-auto">
        <h1>{privacy.title}</h1>
        <p className="text-sm text-muted-foreground not-prose">
          <em>Effective date: {privacy.effectiveDate}</em>
        </p>
        {privacy.sections.map((section) => (
          <section key={section.id}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <hr />
        <p className="text-sm">
          For data requests, contact:{' '}
          <a href={`mailto:${privacy.contactEmail}`}>{privacy.contactEmail}</a>
        </p>
      </article>
    </div>
  )
}
