/**
 * Run with: npx tsx src/server/upload-wp110-wp312.ts
 * Uploads WP-110 and WP-312 images to Cloudinary.
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
    label: 'WP-110 Solid Brass Hexagonal Ballpoint Pen',
    folder: 'products/WP-110-solid-brass-hexagonal-ballpoint-pen',
    files: [
      'solid-brass-hexagonal-ballpoint-pen-cover.avif',
      'solid-brass-hexagonal-ballpoint-pen-hover.avif',
      'solid-brass-hexagonal-ballpoint-pen-detail-1.avif',
      'solid-brass-hexagonal-ballpoint-pen-detail-2.avif',
      'solid-brass-hexagonal-ballpoint-pen-detail-3.avif',
      'solid-brass-hexagonal-ballpoint-pen-detail-4.avif',
      'solid-brass-hexagonal-ballpoint-pen-lifestyle.avif',
    ],
  },
  {
    label: 'WP-312 Titanium Bolt-Action Inkless Pencil',
    folder: 'products/WP-312-titanium-bolt-action-inkless-pencil',
    files: [
      'titanium-bolt-action-inkless-pencil-cover.avif',
      'titanium-bolt-action-inkless-pencil-hover.avif',
      'titanium-bolt-action-inkless-pencil-detail-1.avif',
      'titanium-bolt-action-inkless-pencil-detail-2.avif',
      'titanium-bolt-action-inkless-pencil-detail-3.avif',
      'titanium-bolt-action-inkless-pencil-detail-4.avif',
      'titanium-bolt-action-inkless-pencil-detail-5.avif',
      'titanium-bolt-action-inkless-pencil-lifestyle.avif',
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
    console.log(`\n── ${product.label}`)
    for (const file of product.files) {
      const localPath = path.join(PUBLIC_DIR, product.folder, file)
      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ NOT FOUND: ${file}`)
        continue
      }
      const ext = path.extname(file)
      const nameWithoutExt = path.basename(file, ext)
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
