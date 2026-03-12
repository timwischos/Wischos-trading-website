export const about = {
  hero: {
    heading: 'A Trading Partner Built for Corporate Buyers',
    subheading:
      'Wischos Gift sources, customises, and delivers premium metal gift sets to corporate buyers in Europe, the United States, and Australia.',
  },
  expertise: {
    kicker: 'Market Expertise',
    heading: 'We understand your market',
    markets: [
      {
        region: 'European Union',
        insight:
          'EU buyers require REACH-compliant materials, precise lead time commitments, and packaging suited to premium retail environments.',
      },
      {
        region: 'United States',
        insight:
          'US corporate gifting programmes expect brand consistency, scalable reorder options, and straightforward T/T payment terms.',
      },
      {
        region: 'Australia',
        insight:
          'Australian buyers value responsive communication across time zones and clear customs documentation for smooth importation.',
      },
    ],
  },
  whyUs: {
    kicker: 'Why Wischos Gift',
    heading: 'The alternative to factory-direct complexity',
    points: [
      {
        title: 'You deal with one professional',
        body: 'A single account contact manages every aspect of your order — specification, sampling, production, and logistics. You are never passed to a factory floor.',
      },
      {
        title: 'Your brand stays yours',
        body: 'We do not publish supplier names or expose manufacturing relationships. Your competitive advantage — a curated, branded product line — remains confidential.',
      },
      {
        title: 'Small-batch without compromise',
        body: 'MOQ 50 sets enables premium gifting programmes that would be uneconomical at factory minimum quantities. Quality is not scaled down for smaller orders.',
      },
    ],
  },
  trust: {
    registrationLabel: 'Company Registration',
    // PLACEHOLDER: Replace with actual 统一社会信用代码 before launch
    registrationNumber: '[PLACEHOLDER — awaiting company registration details]',
    registrationNote: 'Registered trading company. Full details available on request.',
    email: 'inquiries@wischosgift.com',
    qualityStatement:
      'Every order is quality-checked against a written specification before shipment. We do not release production without written client approval of samples.',
  },
  mission: {
    heading: 'Our commitment',
    body: 'Corporate gifting should be effortless for the buyer and impressive for the recipient. We handle the complexity of international sourcing so you can focus on your programme outcomes.',
  },
} as const
