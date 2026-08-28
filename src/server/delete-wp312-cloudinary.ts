/**
 * Run with: npx tsx src/server/delete-wp312-cloudinary.ts
 * Deletes WP-312 images from Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const FOLDER = 'products/WP-312-titanium-bolt-action-inkless-pencil'
const FILES = [
  'titanium-bolt-action-inkless-pencil-cover',
  'titanium-bolt-action-inkless-pencil-hover',
  'titanium-bolt-action-inkless-pencil-detail-1',
  'titanium-bolt-action-inkless-pencil-detail-2',
  'titanium-bolt-action-inkless-pencil-detail-3',
  'titanium-bolt-action-inkless-pencil-detail-4',
  'titanium-bolt-action-inkless-pencil-detail-5',
  'titanium-bolt-action-inkless-pencil-detail-6',
]

async function main() {
  for (const f of FILES) {
    const publicId = `${FOLDER}/${f}`
    const res = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
    console.log(`${publicId} → ${res.result}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
