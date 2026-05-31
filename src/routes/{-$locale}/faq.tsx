import { createFileRoute } from '@tanstack/react-router'
import { siteMeta, buildOgMeta, buildCanonical } from '@/content/meta'

const faqItems = [
  {
    question: 'What is the minimum order quantity?',
    answer:
      'Our standard minimum is 100 sets — for specific products or smaller quantities, reach out and we\'ll advise. If you need reference samples before committing to a bulk order, we can supply up to 5 sets — you cover shipping costs. Custom samples (with your logo applied) are quoted separately per project.',
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
      'Custom samples take 7–10 business days to produce. Bulk orders take 25–35 days in production after sample approval and deposit receipt. Shipping adds 5–10 days by air express, or 10–28 days by sea freight depending on destination.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Payment is by T/T bank transfer. We require a 30% deposit to start production and the remaining 70% before shipment. Sample fees are quoted per project and credited against the bulk order on confirmation.',
  },
  {
    question: 'Can you design the packaging?',
    answer:
      'Yes. Custom packaging design is included in our service at no additional design fee. Options include rigid gift boxes, drawer boxes, custom foam or card inserts, and branded tissue paper. Reusable tinplate tin box — crush-proof, brandable, and keeps brand exposure long after unboxing. We provide design files for your approval before production begins.',
  },
  {
    question: 'Which countries do you ship to?',
    answer:
      'We regularly ship to Australia, New Zealand, Singapore, the UAE, Hong Kong, the UK, and Switzerland. Other destinations are available on request — contact us with your location and we will confirm shipping options, applicable trade agreements, and lead times.',
  },
  {
    question: 'How is quality checked before shipment?',
    answer:
      'We conduct a pre-shipment inspection at the factory before goods are packed for export. We send photos and video of randomly selected samples for your review and approval. Third-party inspection by an independent agency is also available on request.',
  },
  {
    question: 'What is the best gift set for new employee onboarding?',
    answer:
      'For new employee onboarding kits, WGS-006 The First Day is our purpose-built option. It includes an RFID aluminium badge holder for daily building access, a 6-in-1 metal tool pen for desk setup and meetings, and an aluminium pen holder for permanent desk presence. Typical configuration runs 50–500 sets per quarterly intake. The set ships in a rigid lid gift box suitable for HR welcome programs and onboarding day handouts.',
  },
  {
    question: 'What is the best gift set for VIP and executive clients?',
    answer:
      'For VIP and board-level executive gifting, WGS-008 The Quartet is our top-tier four-piece option in the existing catalog (FOB USD 44–58). It pairs a solid brass ballpoint pen, slim push stainless steel business card case, folding aluminium device stand, and titanium tea infuser business cup — four metals for four parts of the executive day. For higher-tier government engagement and board-level appreciation, our WGS-011 The Boardroom 5-piece set (in development) adds a premium brass fountain pen and engraved brass paperweight.',
  },
  {
    question: 'What is the best branded drinkware gift for corporate hydration programs?',
    answer:
      'For drinkware-focused programs, we are launching WGS-010 The Hydration — a three-piece set covering a 30oz (880ml) insulated tumbler with handle, a 500ml carry bottle, and the existing pure titanium 150ml capsule bottle. All vessels are 304 stainless steel or pure titanium, no plastic, no coatings. Ships under ChAFTA for duty-free entry into Australia. Standalone drinkware single-item programs are also supported via WP-402, WP-407, and WP-408 in the current catalog.',
  },
  {
    question: 'Can you support distributor wholesale programs with white-label production?',
    answer:
      'Yes. White-label production is our standard. The Wischos name does not appear on products, packaging, or fulfilment documents unless you request it. Quotes, spec sheets, and product photography are yours to use directly in client proposals. We work with distributors across multiple client briefs simultaneously and handle each project as a separate engagement.',
  },
  {
    question: 'Can you accommodate Singapore MNC gift budgets at SGD 100–300 per recipient?',
    answer:
      'Yes. Singapore MNC budget tiers are well-served by our existing range: employee gifts at SGD 50–100 per recipient align with WGS-001 The Desk Starter or WGS-003 The Pocket Three; client gifts at SGD 200–300 align with WGS-005 The Morning Ritual or WGS-007 The Thinking Desk; VIP client gifts at SGD 300+ align with WGS-008 The Quartet. CSFTA Form X is included for duty-free entry into Singapore.',
  },
  {
    question: 'How do FTA Certificates of Origin work and what do you provide?',
    answer:
      'We arrange the relevant FTA Certificate of Origin through CCPIT or Chinese Customs for every qualifying shipment at no additional charge. ChAFTA Certificate of Origin for Australia, NZ–China FTA Certificate for New Zealand, Form X for Singapore (CSFTA), CEPA Certificate for Hong Kong, and China–Switzerland FTA Certificate for Switzerland — these enable duty-free preferential entry on covered tariff lines. Processing adds 1–3 working days to outbound documentation. Full reference table is available on our Duty, Shipping & FTA Coverage page.',
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
