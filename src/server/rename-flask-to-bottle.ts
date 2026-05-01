/**
 * Run with: npx tsx src/server/rename-flask-to-bottle.ts
 * Renames WP-402 and WP-406 product IDs, names, SKU fields, and image paths
 * from "flask" to "bottle".
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

async function main() {
  await sql`
    UPDATE products
    SET
      id = 'wp-402-pure-titanium-capsule-bottle-150ml',
      sku = 'WP-402',
      name = 'Pure Titanium Capsule Bottle',
      hero_image = replace(hero_image, 'capsule-flask', 'capsule-bottle'),
      images = array(
        SELECT replace(image_path, 'capsule-flask', 'capsule-bottle')
        FROM unnest(images) AS image_path
      ),
      seo_keywords = array_replace(seo_keywords, 'custom titanium flask', 'custom titanium bottle')
    WHERE id IN (
      'wp-402-pure-titanium-capsule-flask-150ml',
      'wp-402-pure-titanium-capsule-bottle-150ml'
    )
  `
  console.log('✓ WP-402: flask → bottle (id + name + images)')

  await sql`
    UPDATE products
    SET
      id = 'wp-406-pure-titanium-capsule-bottle-200ml',
      sku = 'WP-406',
      name = 'Pure Titanium Capsule Bottle',
      hero_image = replace(hero_image, 'capsule-flask', 'capsule-bottle'),
      images = array(
        SELECT replace(image_path, 'capsule-flask', 'capsule-bottle')
        FROM unnest(images) AS image_path
      ),
      seo_keywords = array_replace(seo_keywords, 'branded titanium flask', 'branded titanium bottle'),
      key_insight = replace(
        key_insight,
        'between mini flask and full-size bottle',
        'between mini bottle and full-size bottle'
      ),
      expert_notes = jsonb_set(
        expert_notes,
        '{0,body}',
        to_jsonb(replace(expert_notes #>> '{0,body}', 'mini flask', 'mini bottle'))
      ),
      active = true
    WHERE id IN (
      'wp-406-pure-titanium-capsule-flask-200ml',
      'wp-406-pure-titanium-capsule-bottle-200ml'
    )
  `
  console.log('✓ WP-406: flask → bottle (id + name + images)')

  console.log('\n✅ Done. Run git push to deploy the code changes.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
