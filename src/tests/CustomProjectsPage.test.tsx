import type { ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/sections/MobileStickyCta', () => ({ MobileStickyCta: () => null }))
vi.mock('@/components/sections/CustomProjectFormSection', () => ({ CustomProjectFormSection: () => null }))
vi.mock('@/lib/analytics', () => ({ trackCtaClick: vi.fn(), trackEmailClick: vi.fn() }))

import { Route } from '@/routes/custom-projects'

const Page = Route.options.component as ComponentType

function serverDocument() {
  return new DOMParser().parseFromString(renderToStaticMarkup(<Page />), 'text/html')
}

async function pageHead() {
  const head = Route.options.head!
  return head({} as Parameters<typeof head>[0])
}

describe('Custom project page SEO and sourcing positioning', () => {
  it('identifies the service and all four metals in the first paragraph', () => {
    const document = serverDocument()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelector('h1')?.textContent).toBe('Custom metal gifts, made to your design.')
    const intro = document.querySelector('.cp-intro')?.textContent ?? ''
    expect(intro).toContain('Wischos Gift is a China-based sourcing partner')
    for (const metal of ['brass', 'stainless steel', 'aluminium', 'titanium']) {
      expect(intro).toContain(metal)
    }
    expect(intro).toContain('coordinate specialist factories')
  })

  it('uses consistent title, description, canonical and service metadata', async () => {
    const head = await pageHead()
    expect(head.meta).toContainEqual({ title: 'Bespoke Metal Gifts & Custom Objects | Wischos Gift' })
    expect(head.meta).toContainEqual({
      name: 'description',
      content: expect.stringContaining('Brass, stainless steel, aluminium and titanium'),
    })
    expect(head.links).toContainEqual({ rel: 'canonical', href: 'https://wischosgift.com/custom-projects' })
    const json = head.scripts?.find((script) => script?.type === 'application/ld+json')?.children
    const schemas = JSON.parse(String(json))
    expect(schemas.find((schema: { '@type': string }) => schema['@type'] === 'Service')).toMatchObject({
      name: 'Custom Metal Gift Sourcing & Production Coordination',
      provider: { name: 'Wischos Gift' },
    })
  })

  it('includes every FAQ answer in server HTML, even while all disclosures are closed', async () => {
    const document = serverDocument()
    const disclosures = [...document.querySelectorAll('details.cp-faq')]
    expect(disclosures).toHaveLength(10)
    expect(disclosures.every((detail) => !detail.hasAttribute('open'))).toBe(true)
    const head = await pageHead()
    const json = head.scripts?.find((script) => script?.type === 'application/ld+json')?.children
    const schemas = JSON.parse(String(json))
    const faq = schemas.find((schema: { '@type': string }) => schema['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(disclosures.length)
    disclosures.forEach((detail, index) => {
      expect(detail.querySelector('summary')?.textContent?.trim()).toBe(faq.mainEntity[index].name)
      expect(detail.querySelector('p')?.textContent).toBe(faq.mainEntity[index].acceptedAnswer.text)
    })
  })

  it('explains the sourcing role and mixed-material capability without a brass-only FAQ', () => {
    const document = serverDocument()
    const answers = [...document.querySelectorAll('details p')].map((answer) => answer.textContent)
    expect(answers.some((answer) => answer?.includes('trading company and sourcing partner, not a factory'))).toBe(true)
    expect(answers.some((answer) => answer?.includes('brass, stainless steel, aluminium or titanium'))).toBe(true)
    expect(document.body.textContent).not.toContain('Can one gift combine brass')
    expect(document.querySelectorAll('#what-we-can-make h3')).toHaveLength(6)
    expect(document.querySelectorAll('#before-we-sample h3')).toHaveLength(5)
  })

  it('describes each starting-point image and gives each detail link a distinct name', () => {
    const document = serverDocument()
    const section = document.querySelector('#starting-points')!
    const names = ['The Blueprint', 'The Aurora Duet', 'The Meeting Kit', 'The Mechanical Desk']
    const images = [...section.querySelectorAll('img')]
    const links = [...section.querySelectorAll('a')]
    expect(images).toHaveLength(4)
    expect(links).toHaveLength(4)
    names.forEach((name, index) => {
      expect(images[index].alt).toContain(`${name}: `)
      expect(images[index].alt.length).toBeGreaterThan(name.length + 20)
      expect(images[index].getAttribute('loading')).toBe('lazy')
      expect(links[index].textContent).toBe(`Explore ${name} →`)
      expect(links[index].getAttribute('href')).toMatch(/^\/gift-sets\//)
    })
  })

  it('preserves conditional sampling, shipping and quotation terms', () => {
    const text = serverDocument().body.textContent ?? ''
    expect(text).toContain('Most custom projects start at 100 pieces or sets')
    expect(text).toContain('Adapting an existing product can shorten sample preparation')
    expect(text).toContain('Shipping times depend on the destination and route')
    expect(text).toContain('We offer FOB and CIF quotations')
    expect(text).toContain('DDP is assessed for each project')
    expect(text).toContain('included in our quotation and collected by us')
  })

  it('keeps all five process steps but confirms timing per enquiry without fixed durations', async () => {
    const document = serverDocument()
    const process = [...document.querySelectorAll('section')].find((section) =>
      section.querySelector('h2')?.textContent === 'From brief to delivery',
    )!
    expect([...process.querySelectorAll('h3')].map((heading) => heading.textContent)).toEqual([
      'Share your idea', 'Specification & quotation', 'Paid sample', 'Production', 'Delivery',
    ])
    expect(process.textContent).toContain('Timing is confirmed after we review your enquiry')
    expect(process.textContent).toContain('We agree the schedule in your quotation')
    const fixedDuration = /\b\d+(?:\s*[–-]\s*\d+)?\s*(?:business\s+)?(?:hours?|days?|weeks?|months?)\b/i
    expect(document.body.textContent).not.toMatch(fixedDuration)
    expect(JSON.stringify(await pageHead())).not.toMatch(fixedDuration)
  })

  it('offers physical sample review when time permits and keeps fee credit conditional', () => {
    const document = serverDocument()
    const hero = document.querySelector('.cp-text')?.textContent ?? ''
    expect(hero).toContain('Approve by photos/video, or receive a physical sample when time allows')
    expect(hero).toContain('Sample fees may be credited toward your production order, depending on final quantity')
    expect(hero).toContain('Terms confirmed in your quotation')
    const text = document.body.textContent ?? ''
    expect(text).toContain('have a physical sample sent to you when the schedule allows')
    expect(text).toContain('Allow additional time for sample shipping, if needed, and your review')
    expect(text).toContain('Production starts only after you approve the sample')
    expect(text).toContain('photos and video for your approval before shipment')
    expect(text).not.toContain('free sample shipping')
  })

  it('avoids blanket customization promises and unpublished client claims', () => {
    const text = serverDocument().body.textContent ?? ''
    for (const claim of ['faster and cheaper', 'any part', 'A common base', 'lowest unit price', 'Terrain', 'Recent Project']) {
      expect(text).not.toContain(claim)
    }
    expect(text).toContain('Changes to components or finishes are reviewed for feasibility')
    expect(text).toContain('brass-crown bolt-action pen')
  })
})
