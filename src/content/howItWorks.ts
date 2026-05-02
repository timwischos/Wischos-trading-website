export const howItWorks = {
  hero: {
    heading: 'From Brief to Shipment',
    subheading: 'A clear sourcing and production process for custom metal gift sets.',
  },
  steps: [
    {
      number: '01',
      title: 'Share Your Brief',
      body: 'Send the target recipient, quantity, budget range, preferred products, logo needs, packaging direction, and delivery timeline. We review the brief and respond within 1–2 business days.',
    },
    {
      number: '02',
      title: 'Confirm the Sourcing Path',
      body: 'We review suitable product and factory options, confirm what can be customized at the expected quantity, and prepare a quotation or sample direction for discussion.',
    },
    {
      number: '03',
      title: 'Review Samples and Details',
      body: 'Reference samples or custom samples can be arranged after the project direction is clear. Product feel, material claims, logo method, color, packaging, and set composition are reviewed before bulk production.',
    },
    {
      number: '04',
      title: 'Produce and Ship',
      body: 'After approval and deposit, we coordinate production updates, packaging checks, pre-shipment photos, and shipment follow-up.',
    },
  ],
  samplePolicy: {
    heading: 'Sample Policy',
    reference: 'Reference samples: Free of charge. Client covers international shipping cost.',
    custom:
      'Custom samples: Sample fee applies. Fee amount confirmed at inquiry stage before sampling begins.',
  },
  leadTimes: {
    heading: 'Lead Times',
    samples: 'Confirmed per project at inquiry stage',
    bulk: 'Normally 25–35 days from production start',
    note: 'All timelines are indicative. Exact lead times depend on customization details and are confirmed per order during the inquiry process.',
  },
  paymentTerms: {
    heading: 'Payment Terms',
    method: 'T/T (Telegraphic Transfer / Bank Transfer)',
    structure:
      'Deposit on order confirmation; balance due before shipment. Full payment schedule confirmed at order stage.',
  },
} as const
