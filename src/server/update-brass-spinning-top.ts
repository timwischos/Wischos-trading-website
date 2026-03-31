/**
 * Run with: npx tsx src/server/update-brass-spinning-top.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .update(products)
    .set({
      name: 'Precision Kinetic Brass Spinning Top',
      tagline: 'Solid Brass | Diamond-Knurl Stem | Low-Friction Rotation | Develops Natural Patina',
      highlights: [
        'Diamond-Knurl Stem: The precisely machined diamond-knurl grip on the stem provides exceptional finger purchase for a controlled, repeatable spin — superior to smooth or milled stems.',
        'Living Patina: Solid brass naturally develops a rich amber-gold patina with handling over time, making each top uniquely personal. Polishable back to original luster at any time.',
        'Focus Enhancement: Precision-balanced for smooth, sustained rotation to help channel restless energy and improve concentration.',
        'Solid Brass Build: Substantial weighted feel far superior to plastic alternatives — built to last indefinitely.',
      ],
      description:
        'This solid brass spinning top is designed for the modern workspace, where durability and professionalism are paramount. The substantial weight of the brass ensures a steady, satisfying mechanical feedback that plastic simply cannot replicate — a genuine kinetic object that earns its place on an executive desk.\n\nBuilt to withstand years of daily handling, brass resists the aging, cracking, and deformation common in low-cost office gadgets. Its compact size makes it a discreet addition to any desk or EDC kit. As a corporate gift, it represents a commitment to quality and mental well-being, providing a functional way to manage focus in high-pressure environments.',
      specifications: [
        { label: 'Material', value: 'Solid Brass' },
        { label: 'Weight Options', value: '14g (Portable Top) / 30g (Standard Spinner)' },
        { label: 'Dimensions', value: '~23mm – 40mm' },
        { label: 'Stem', value: 'Diamond-Knurl Grip (Precision Machined)' },
        { label: 'Design', value: 'Low-friction mechanical rotation' },
      ],
      faqs: [
        {
          q: 'How does the durability compare to plastic fidget toys?',
          a: 'Brass is a non-aging metal. Unlike plastic spinners that become brittle or lose balance over time, this solid brass top maintains its structural integrity and weight indefinitely, even with high-frequency use.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes. We support logo customization and tailored packaging. Please contact us with your vector files to discuss the best placement for your brand identity.',
        },
        {
          q: 'How should the brass surface be maintained?',
          a: 'Simply wipe with a microfiber cloth to remove oils or fingerprints. Over time, brass develops a natural patina that many find attractive, or it can be polished back to its original luster with a soft cloth.',
        },
      ],
      seoKeywords: [
        // Core product
        'solid brass spinning top',
        'precision brass desk spinner',
        'heavy brass executive spinner',
        'CNC brass spinning top',
        'brass fidget top',
        // B2B / corporate gifting
        'corporate wellness desk gift',
        'executive stress relief tool',
        'bulk office spinning top',
        'custom brass corporate gift',
        'employee appreciation desk gift',
        // Functional / benefit
        'focus enhancement desk tool',
        'stress relief office accessory',
        'low-friction spinning top',
        'desktop mindfulness tool',
        'precision fidget for adults',
      ],
    })
    .where(eq(products.id, 'precision-brass-spinning-01'))

  console.log('✓ Precision Brass Spinning Top updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
