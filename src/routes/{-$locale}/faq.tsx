import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'

const faqItems = [
  {
    question: 'What is the minimum order quantity?',
    answer:
      'The minimum order quantity is 100 sets. If you need reference samples before committing to a bulk order, we can supply up to 5 sets — you cover shipping costs. Custom samples (with your logo applied) are quoted separately per project.',
  },
  {
    question: 'What products can be included in a gift set?',
    answer:
      'Any combination from our catalog can be included — writing instruments, desk accessories, EDC tools, and drinkware. Standard sets contain 3 items. Custom configurations with different quantities or product mix are available on request.',
  },
  {
    question: 'Can I add our company logo to the products?',
    answer:
      'Yes. Both laser engraving (permanent, monochrome) and UV color printing are available. Logo placement, sizing, and method are confirmed during the sample stage before bulk production begins, so you approve the exact result before any quantity is made.',
  },
  {
    question: 'How long does production take?',
    answer:
      'Custom samples take 7–10 business days to produce. Bulk orders take 25–35 days in production after sample approval and deposit receipt. Shipping to Australia and EU adds 5–15 days by sea freight or 3–5 days by air express.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Payment is by T/T bank transfer. We require a 30% deposit to start production and the remaining 70% before shipment. Sample fees are quoted per project and credited against the bulk order on confirmation.',
  },
  {
    question: 'Can you design the packaging?',
    answer:
      'Yes. Custom packaging design is included in our service at no additional design fee. Options include rigid gift boxes, drawer boxes, custom foam or card inserts, and branded tissue paper. We provide design files for your approval before production begins.',
  },
  {
    question: 'Which countries do you ship to?',
    answer:
      'We regularly ship to Australia, New Zealand, EU countries (Netherlands, Germany, UK, France), Singapore, South Korea, and Japan. Other destinations are available on request — contact us with your location and we will confirm shipping options and lead times.',
  },
  {
    question: 'How is quality checked before shipment?',
    answer:
      'We conduct a pre-shipment inspection at the factory before goods are packed for export. We send photos and video of randomly selected samples for your review and approval. Third-party inspection by an independent agency is also available on request.',
  },
]

export const Route = createFileRoute('/{-$locale}/faq')({
  head: () => ({
    meta: [
      { title: siteMeta.routes.faq.title },
      { name: 'description', content: siteMeta.routes.faq.description },
      ...buildOgMeta({
        title: siteMeta.routes.faq.title,
        description: siteMeta.routes.faq.description,
        image: siteMeta.defaultOgImage,
        url: '/faq',
      }),
    ],
    links: [buildCanonical('/faq')],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
})

function FaqPage() {
  return (
    <div className="page-wrap py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-10">
          Common questions about ordering custom branded metal gift sets from Wischos Gift.
        </p>
        <dl className="divide-y divide-border">
          {faqItems.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="font-semibold text-lg mb-2">{item.question}</dt>
              <dd className="text-muted-foreground leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
