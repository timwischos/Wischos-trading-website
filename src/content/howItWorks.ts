export const howItWorks = {
  hero: {
    heading: 'From Inquiry to Delivery',
    subheading: 'A transparent, four-step process — no surprises, no hidden fees.',
  },
  steps: [
    {
      number: '01',
      title: 'Submit Your Inquiry',
      body: 'Tell us your product interest, estimated quantity, and target timeline. You will receive a clear programme outline and proposed next steps within 1–2 business days.',
    },
    {
      number: '02',
      title: 'Review Samples',
      body: 'You receive reference samples free of charge — freight collect. If your project requires custom samples with your logo or packaging, a sample fee applies, confirmed before we proceed. You review and approve before anything moves forward.',
    },
    {
      number: '03',
      title: 'Confirm and Deposit',
      body: 'Once you approve the samples, you receive a proforma invoice for the bulk order. A deposit by T/T (bank transfer) locks in your production slot. You set the timeline — production starts when you are ready.',
    },
    {
      number: '04',
      title: 'Production and Delivery',
      body: 'You receive regular progress updates and pre-shipment quality photos for your sign-off. Final balance is settled prior to or against shipping documents, depending on the shipment method. Tracking details are sent to you as soon as goods are on their way.',
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
