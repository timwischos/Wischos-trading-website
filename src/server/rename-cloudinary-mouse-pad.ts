/**
 * Run with: npx tsx src/server/rename-cloudinary-mouse-pad.ts
 * Renames WP-201 images in Cloudinary from desk-mat to mouse-pad.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const RENAMES = [
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-cover',
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-hover',
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-1',
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-2',
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-3',
  'products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-lifestyle',
]

async function main() {
  for (const from of RENAMES) {
    const to = from
      .replace('WP-201-professional-aluminum-desk-mat', 'WP-201-professional-aluminum-mouse-pad')
      .replace(/professional-aluminum-desk-mat-/g, 'professional-aluminum-mouse-pad-')

    try {
      await cloudinary.uploader.rename(from, to)
      console.log(`✓ ${from.split('/').pop()} → ${to.split('/').pop()}`)
    } catch (err: any) {
      console.error(`✗ ${from.split('/').pop()}: ${err.message}`)
    }
  }
}

main()
