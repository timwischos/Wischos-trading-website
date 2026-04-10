/**
 * Run with: npx tsx src/server/upload-to-cloudinary.ts
 * Uploads WGS-005 and WP-308 images to Cloudinary, overwriting existing assets.
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

const BATCHES = [
  {
    label: 'WGS-005 The Morning Ritual',
    folder: 'products/WGS-005-3-The-Morning-Ritual',
    files: [
      'The-Morning-Ritual-cover.avif',
      'The-Morning-Ritual-hover.avif',
      'The-Morning-Ritual-detail-1.avif',
      'The-Morning-Ritual-detail-2.avif',
      'The-Morning-Ritual-detail-3.avif',
    ],
  },
  {
    label: 'WP-308 Titanium EDC Carabiner',
    folder: 'products/WP-308-Titanium-EDC-Carabiner',
    files: [
      'Titanium-EDC-Carabiner-cover.avif',
      'Titanium-EDC-Carabiner-hover.avif',
      'Titanium-EDC-Carabiner-detail-1.avif',
      'Titanium-EDC-Carabiner-detail-2.avif',
      'Titanium-EDC-Carabiner-detail-3.avif',
      'Titanium-EDC-Carabiner-lifestyle.avif',
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
    console.log(`\n── ${batch.label}`)
    for (const file of batch.files) {
      const localPath = path.join(PUBLIC_DIR, batch.folder, file)
      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ NOT FOUND: ${file}`)
        continue
      }
      // public_id = folder/filename-without-extension
      const ext = path.extname(file)
      const nameWithoutExt = path.basename(file, ext)
      const publicId = `${batch.folder}/${nameWithoutExt}`
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
