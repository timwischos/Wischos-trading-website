/**
 * Run with: npx tsx src/server/upload-wp105.ts
 * Uploads WP-105 images to Cloudinary.
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

const FOLDER = 'products/WP-105-artisan-brass-rollerball'
const FILES = [
  'artisan-brass-rollerball-cover.avif',
  'artisan-brass-rollerball-cover-hover.avif',
  'artisan-brass-rollerball-lifestyle.avif',
  'artisan-brass-rollerball-detail-1.avif',
  'artisan-brass-rollerball-detail-2.avif',
  'artisan-brass-rollerball-detail-3.avif',
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
  console.log('── WP-105 Artisan Brass Rollerball')
  for (const file of FILES) {
    const localPath = path.join(PUBLIC_DIR, FOLDER, file)
    if (!fs.existsSync(localPath)) {
      console.log(`  ✗ NOT FOUND: ${file}`)
      continue
    }
    const ext = path.extname(file)
    const nameWithoutExt = path.basename(file, ext)
    const publicId = `${FOLDER}/${nameWithoutExt}`
    try {
      const url = await uploadFile(localPath, publicId)
      console.log(`  ✓ ${file}`)
      console.log(`    ${url}`)
    } catch (err: any) {
      console.error(`  ✗ FAILED: ${file} — ${err.message}`)
    }
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
