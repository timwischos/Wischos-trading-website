export const howItWorks = {
  hero: {
    heading: 'From Inquiry to Delivery',
    subheading: 'A transparent, four-step process — no surprises, no hidden fees.',
  },
  steps: [
    {
      number: '01',
      title: 'Submit Your Inquiry',
      body: 'Tell us about your gifting programme — product interest, estimated quantity, and target timeline. We review every inquiry and respond within 1 business day with a programme outline and next steps.',
    },
    {
      number: '02',
      title: 'Sample and Review',
      body: 'Reference samples are provided free of charge; you cover international shipping cost. Custom samples (with your logo or packaging specification) carry a sample fee confirmed at inquiry stage. Sample lead time: 7–10 business days from dispatch.',
    },
    {
      number: '03',
      title: 'Confirm and Pay',
      body: 'Once samples are approved, we issue a proforma invoice for the bulk order. Payment is by T/T (telegraphic transfer / bank transfer). Production begins on receipt of the agreed deposit.',
    },
    {
      number: '04',
      title: 'Production and Delivery',
      body: 'Bulk orders are typically ready within approximately 30 days of production start. Exact timelines are confirmed per order and may vary by product type and quantity. We provide production updates and pre-shipment quality photos.',
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
    samples: '7–10 business days from sample dispatch',
    bulk: 'Approximately 30 days from production start',
    note: 'All timelines are indicative. Exact lead times are confirmed per order during the inquiry process and depend on product type, quantity, and current production schedules.',
  },
  paymentTerms: {
    heading: 'Payment Terms',
    method: 'T/T (Telegraphic Transfer / Bank Transfer)',
    structure:
      'Deposit on order confirmation; balance due before shipment. Full payment schedule confirmed at order stage.',
  },
} as const
