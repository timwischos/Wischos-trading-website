/**
 * Run with: npx tsx src/server/update-wp208-seo.ts
 * Improves WP-208 tagline, description, expert notes, and SEO keywords
 * based on market research and competitor analysis (2026-04-24).
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
  await db.update(products).set({
    tagline:
      'Three modes, one desk accessory — phone dock, height-adjustable laptop riser, and travel carry. MagSafe compatible. Laser-engravable. Custom branded from 100 pcs.',

    description:
      'A folding aluminium stand that switches between three configurations without tools or adjustment. Flat on a desk, it holds phones and tablets via a ring-magnet array compatible with MagSafe-enabled devices — place, attach, done. Folded upright, it raises a laptop screen by up to 20cm, reducing neck load during extended desk sessions. Collapsed to 182 × 60 × 18mm and 150g, it fits in a jacket pocket or laptop bag without adding meaningful weight. High-damping hinges hold any set angle without drift. The anodised body and silicone contact pads protect surfaces on both sides.\n\nFor corporate gifting, the three-mode design earns its place where a single-function phone stand cannot. The recipient uses it as a height-adjustable laptop riser during morning calls, switches to phone dock mode at the desk, and carries it flat in a bag between locations. A promotional stand that travels with its owner reaches more contexts — and delivers more daily brand exposure — than a desk-only fixture. The flat aluminium base panel accepts laser engraving permanently on the metal surface: logo facing outward every time the stand is deployed.',

    sourcingNotes: [
      {
        title: 'Why this lands in WFH onboarding kits',
        body: 'A laptop stand is one of the few corporate gifts that gets used before the recipient has finished unpacking the box. For companies running remote or hybrid onboarding, shipping this alongside a badge holder or welcome letter puts a branded object on the home desk from day one — and it stays there. Unlike pens or notebooks that migrate to drawers, a stand is a fixed desk fixture with the logo facing outward every working day.',
      },
      {
        title: 'Magnetic attachment: what the ring-array design means in practice',
        body: 'The circular magnet arrangement aligns the phone automatically as it approaches the mount — no fine adjustment, no clipping. This matters for gifting because recipients use it immediately without reading instructions. For non-MagSafe devices, the included thin metal ring (under 0.5mm) adheres to the phone back without adding noticeable bulk, extending compatibility to virtually any smartphone in a mixed corporate fleet.',
      },
      {
        title: '3-in-1 value: what the three modes mean for gifting ROI',
        body: 'A laptop riser retails around $40–60. A MagSafe phone dock runs $25–45. A compact travel stand, another $20–30. This stand replaces all three from one unit at one price point. For a procurement team building a remote onboarding kit, that consolidation matters — fewer line items, one supplier contact, one branded object instead of three unrelated ones. From a brand exposure standpoint, an object the recipient uses in three daily contexts generates roughly three times the touchpoints of a single-use item.',
      },
      {
        title: 'Why this outperforms a standard promotional phone stand for senior recipients',
        body: 'Most promotional phone stands are plastic, single-angle, desk-only. They work well as low-cost volume items. This product serves a different buyer profile: an executive or senior professional who will notice whether a gift is well-made. The 150g weight communicates something before the stand has been unfolded. The high-damping hinges — which hold position without drift — signal engineering effort. For recipients who already own premium accessories, a promotional-grade plastic stand goes in a drawer. This stands alongside their equipment.',
      },
      {
        title: 'Height adjustment and ergonomics: the wellness case for a gifted desk stand',
        body: 'Raising a laptop screen 18–20cm eliminates the forward head tilt that accumulates over hours of desk work. For companies gifting to remote employees, this is a wellness argument as much as a productivity one. Unlike a fixed-height stand, the high-damping hinge system lets recipients set the exact angle for their desk height and monitor position — and it stays there without creeping. That adaptability is why recipients keep an adjustable stand rather than replacing it: it fits any desk, any chair height, any user.',
      },
    ],

    seoKeywords: [
      'custom aluminium phone stand corporate gift',
      'height adjustable laptop stand corporate gift',
      'folding device stand bulk order engraved',
      'MagSafe compatible desk stand corporate',
      '3-in-1 phone laptop stand branded',
      'remote employee tech onboarding gift',
      'custom engraved phone stand bulk',
      'branded metal desk stand wholesale',
    ],
  }).where(eq(products.id, 'wp-208-precision-folding-aluminium-device-stand'))

  console.log('✓ WP-208 SEO content updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
