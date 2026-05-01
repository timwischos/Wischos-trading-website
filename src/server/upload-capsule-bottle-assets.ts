/**
 * Run with: npx tsx src/server/upload-capsule-bottle-assets.ts
 * Uploads WP-402 and WP-406 capsule bottle images to Cloudinary using the
 * bottle public IDs expected by the product pages.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import { existsSync } from 'fs'
import { basename, extname, join } from 'path'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const PUBLIC_DIR = join(process.cwd(), 'public')

const BATCHES = [
  {
    label: 'WP-402 Pure Titanium Capsule Bottle 150ml',
    folder: 'products/WP-402-pure-titanium-capsule-bottle-150ml',
    files: [
      'pure-titanium-capsule-bottle-150ml-cover.avif',
      'pure-titanium-capsule-bottle-150ml-hover.avif',
      'pure-titanium-capsule-bottle-150ml-detail-1.avif',
      'pure-titanium-capsule-bottle-150ml-detail-2.avif',
      'pure-titanium-capsule-bottle-150ml-detail-3.avif',
      'pure-titanium-capsule-bottle-150ml-detail-4.avif',
      'pure-titanium-capsule-bottle-150ml-detail-5.avif',
    ],
  },
  {
    label: 'WP-406 Pure Titanium Capsule Bottle 200ml',
    folder: 'products/WP-406-pure-titanium-capsule-bottle-200ml',
    files: [
      'pure-titanium-capsule-bottle-200ml-cover.avif',
      'pure-titanium-capsule-bottle-200ml-hover.avif',
      'pure-titanium-capsule-bottle-200ml-detail-1.avif',
      'pure-titanium-capsule-bottle-200ml-detail-2.avif',
      'pure-titanium-capsule-bottle-200ml-detail-3.avif',
      'pure-titanium-capsule-bottle-200ml-detail-4.avif',
      'pure-titanium-capsule-bottle-200ml-detail-5.avif',
      'pure-titanium-capsule-bottle-200ml-detail-6.avif',
      'pure-titanium-capsule-bottle-200ml-detail-7.avif',
    ],
  },
]

async function uploadFile(localPath: string, publicId: string) {
  const result = await cloudinary.uploader.upload(localPath, {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
  })
  return result.secure_url
}

async function main() {
  for (const batch of BATCHES) {
    console.log(`\n-- ${batch.label}`)
    for (const file of batch.files) {
      const localPath = join(PUBLIC_DIR, batch.folder, file)
      if (!existsSync(localPath)) {
        console.log(`  x NOT FOUND: ${file}`)
        continue
      }
      const publicId = `${batch.folder}/${basename(file, extname(file))}`
      const url = await uploadFile(localPath, publicId)
      console.log(`  ok ${publicId}`)
      console.log(`     ${url}`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
