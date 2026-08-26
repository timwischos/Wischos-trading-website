/**
 * Run with: npx tsx src/server/upload-wp215-to-cloudinary.ts
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
    label: 'WP-215 Solid Brass Measurement Set',
    folder: 'products/WP-215-brass-measurement-set',
    files: [
      'brass-measurement-set-cover.avif',
      'brass-measurement-set-hover.avif',
      'brass-measurement-set-detail-1.avif',
      'brass-measurement-set-detail-2.avif',
      'brass-measurement-set-detail-3.avif',
      'brass-measurement-set-detail-4.avif',
      'brass-measurement-set-lifestyle.avif',
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
