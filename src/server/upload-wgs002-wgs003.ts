/**
 * Replaces WGS-002 and WGS-003 set images on Cloudinary.
 * WGS-002: spinning top → device stand
 * WGS-003: nail clipper → titanium comb
 *
 * Run with: npx tsx src/server/upload-wgs002-wgs003.ts
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

const SETS = [
  {
    label: 'WGS-002 The Mechanical Desk',
    folder: 'products/WGS-002-3-The-Mechanical-Desk',
    files: [
      'The-Mechanical-Desk-cover.avif',
      'The-Mechanical-Desk-hover.avif',
      'The-Mechanical-Desk-detail-1.avif',
      'The-Mechanical-Desk-detail-2.avif',
      'The-Mechanical-Desk-detail-3.avif',
    ],
  },
  {
    label: 'WGS-003 The Pocket Three',
    folder: 'products/WGS-003-3-The-Pocket-Three',
    files: [
      'The-Pocket-Three-cover.avif',
      'The-Pocket-Three-hover.avif',
      'The-Pocket-Three-detail-1.avif',
      'The-Pocket-Three-detail-2.avif',
      'The-Pocket-Three-detail-3.avif',
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
  for (const set of SETS) {
    console.log(`\n── ${set.label}`)
    for (const file of set.files) {
      const localPath = path.join(PUBLIC_DIR, set.folder, file)
      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ NOT FOUND: ${file}`)
        continue
      }
      const ext = path.extname(file)
      const nameWithoutExt = path.basename(file, ext)
      const publicId = `${set.folder}/${nameWithoutExt}`
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
