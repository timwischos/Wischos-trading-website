/**
 * Establish tier positioning for the brass pen range (WP-101/105/106/107/108).
 * Run with: npx tsx src/server/update-brass-pen-range.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const SHARED_COMPARISON_TABLE = {
  columns: ['Pen', 'Mechanism · Weight', 'Best for'],
  rows: [
    ['WP-101 Brass Crown Bolt-Action', 'Bolt-action · 28g', 'Everyday carry and field notes'],
    ['WP-105 Artisan Brass Rollerball', 'Rollerball · 30g', 'Long-form writing'],
    ['WP-106 Solid Brass Ballpoint', 'Ballpoint · 50g', 'Formal signing and executive gifting'],
    ['WP-107 Hexagonal Brass Click', 'Click · 50g', 'Daily desk use'],
    ['WP-108 Solid Brass Bolt-Action', 'Bolt-action · 75g', 'Desk-weight signature piece'],
  ],
}

const PENS: Array<{
  id: string
  tagline: string
  descriptionPrefix: string
  idempotencyMarker: string
}> = [
  {
    id: 'wp-101-brass-crown-bolt-action-pen',
    tagline: "Bolt-action · 28g · The everyday carry",
    descriptionPrefix:
      "The lightweight bolt-action. At 28g with an aluminium body and brass crown, this is the pen that leaves the desk — pocket notebooks, site visits, daily carry. Want the same mechanism in full desk-weight brass? See the Solid Brass Bolt-Action Pen (WP-108).",
    idempotencyMarker: 'The lightweight bolt-action.',
  },
  {
    id: 'wp-105-artisan-brass-rollerball',
    tagline: "Rollerball · 30g · The writer's pen",
    descriptionPrefix:
      "The writer's pen. The rollerball refill gives the smoothest line in our brass range — the right choice when the recipient actually writes at length. For a formal signing pen in the same solid brass, see the Solid Brass Ballpoint (WP-106).",
    idempotencyMarker: "The writer's pen.",
  },
  {
    id: 'wp-106-solid-brass-clip-ballpoint',
    tagline: "Ballpoint · 50g · The formal classic",
    descriptionPrefix:
      "The formal classic. Solid brass, clean cylindrical profile, dependable ballpoint — built for contract signings and executive gifting. If the recipient writes long-form, the Artisan Brass Rollerball (WP-105) trades formality for a smoother line.",
    idempotencyMarker: 'The formal classic.',
  },
  {
    id: 'wp-107-hexagonal-brass-click-pen',
    tagline: "Click action · 50g · The desk workhorse",
    descriptionPrefix:
      "The desk workhorse. One-hand click action at 50g — the pen that lives beside the keyboard and gets used twenty times a day. For a more ceremonial mechanism, see our bolt-action pair (WP-101 / WP-108).",
    idempotencyMarker: 'The desk workhorse.',
  },
  {
    id: 'wp-108-solid-brass-bolt-action-pen',
    tagline: "Bolt-action · 75g · The signature piece",
    descriptionPrefix:
      "The signature bolt-action. Machined from solid brass at 75g, this pen is deliberately desk-weight — made to sit at the centre of a desk, not the bottom of a bag. For the same satisfying bolt mechanism in a lighter everyday format, see the Brass Crown Bolt-Action Pen (WP-101).",
    idempotencyMarker: 'The signature bolt-action.',
  },
]

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

  try {
    for (const pen of PENS) {
      // 1. Fetch current values
      const [row] = await sql<[{ tagline: string; description: string }]>`
        select tagline, description from products where id = ${pen.id}
      `
      if (!row) {
        console.error(`✗ ${pen.id} — NOT FOUND in DB`)
        continue
      }

      // 2. Tagline
      const oldTagline = row.tagline
      await sql`update products set tagline = ${pen.tagline} where id = ${pen.id}`
      console.log(`✓ tagline [${pen.id}]`)
      console.log(`  before: ${oldTagline}`)
      console.log(`  after:  ${pen.tagline}`)

      // 3. Description (idempotent)
      const oldDescription = row.description ?? ''
      let newDescription: string
      if (oldDescription.startsWith(pen.idempotencyMarker)) {
        newDescription = oldDescription
        console.log(`  description: already prefixed, skipped`)
      } else {
        newDescription = pen.descriptionPrefix + '\n\n' + oldDescription
        await sql`update products set description = ${newDescription} where id = ${pen.id}`
        console.log(`  description: prefixed (${pen.descriptionPrefix.slice(0, 60)}...)`)
      }

      // 4. Comparison table (always overwrite)
      await sql`
        update products
        set comparison_table = ${sql.json(SHARED_COMPARISON_TABLE)}
        where id = ${pen.id}
      `
      console.log(`  comparison_table: set to 5-pen brass range table`)
      console.log()
    }
  } finally {
    await sql.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
