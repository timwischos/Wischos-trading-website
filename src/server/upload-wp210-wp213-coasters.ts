/**
 * Run with: npx tsx src/server/upload-wp210-wp213-coasters.ts
 * Uploads WP-210, WP-211, WP-212, WP-213 images to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'fs'
import * as path from 'path'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const PRODUCTS = [
  {
    folder: 'products/WP-210-weighted-brass-coaster',
    files: [
      'weighted-brass-coaster-cover.avif',
      'weighted-brass-coaster-hover.avif',
      'weighted-brass-coaster-detail-1.avif',
      'weighted-brass-coaster-detail-2.avif',
      'weighted-brass-coaster-lifestyle.avif',
    ],
  },
  {
    folder: 'products/WP-211-reversible-brass-coaster',
    files: [
      'reversible-brass-coaster-cover.avif',
      'reversible-brass-coaster-hover.avif',
      'reversible-brass-coaster-detail-1.avif',
      'reversible-brass-coaster-detail-2.avif',
      'reversible-brass-coaster-lifestyle.avif',
    ],
  },
  {
    folder: 'products/WP-212-brass-inlay-coaster',
    files: [
      'brass-inlay-coaster-cover.avif',
      'brass-inlay-coaster-hover.avif',
      'brass-inlay-coaster-detail-1.avif',
      'brass-inlay-coaster-detail-2.avif',
      'brass-inlay-coaster-detail-3.avif',
      'brass-inlay-coaster-detail-4.avif',
      'brass-inlay-coaster-detail-5.avif',
      'brass-inlay-coaster-detail-6.avif',
      'brass-inlay-coaster-detail-7.avif',
      'brass-inlay-coaster-detail-8.avif',
      'brass-inlay-coaster-detail-9.avif',
    ],
  },
  {
    folder: 'products/WP-213-solid-brass-tealight-holder',
    files: [
      'solid-brass-tealight-holder-cover.avif',
      'solid-brass-tealight-holder-hover.avif',
      'solid-brass-tealight-holder-detail-1.avif',
      'solid-brass-tealight-holder-detail-2.avif',
      'solid-brass-tealight-holder-lifestyle.avif',
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
  for (const product of PRODUCTS) {
    console.log(`\n── ${product.folder}`)
    for (const file of product.files) {
      const localPath = path.join(PUBLIC_DIR, product.folder, file)
      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ NOT FOUND: ${file}`)
        continue
      }
      const nameWithoutExt = path.basename(file, path.extname(file))
      const publicId = `${product.folder}/${nameWithoutExt}`
      try {
        const url = await uploadFile(localPath, publicId)
        console.log(`  ✓ ${file}`)
        console.log(`    ${url}`)
      } catch (err: any) {
        console.error(`  ✗ FAILED: ${file} — ${err.message}`)
      }
    }
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
