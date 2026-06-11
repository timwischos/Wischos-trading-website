/**
 * Uploads WGS-009 The Meeting Kit images to Cloudinary.
 *
 * Run with: npx tsx src/server/upload-wgs009.ts
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

const SET = {
  label: 'WGS-009 The Meeting Kit',
  folder: 'products/WGS-009-3-The-Meeting-Kit',
  files: [
    'The-Meeting-Kit-cover.avif',
    'The-Meeting-Kit-hover.avif',
    'The-Meeting-Kit-detail-1.avif',
    'The-Meeting-Kit-detail-2.avif',
    'The-Meeting-Kit-detail-3.avif',
  ],
}

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
  console.log(`── ${SET.label}`)
  for (const file of SET.files) {
    const localPath = path.join(PUBLIC_DIR, SET.folder, file)
    if (!fs.existsSync(localPath)) {
      console.log(`  ✗ NOT FOUND: ${file}`)
      continue
    }
    const ext = path.extname(file)
    const nameWithoutExt = path.basename(file, ext)
    const publicId = `${SET.folder}/${nameWithoutExt}`
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
