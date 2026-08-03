/**
 * Run with: npx tsx src/server/upload-wp310.ts
 * Uploads WP-310 images to Cloudinary.
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

const UPLOADS: { folder: string; files: string[] }[] = [
  {
    folder: 'products/WP-310-titanium-alloy-keychain-capsule',
    files: [
      'titanium-alloy-keychain-capsule-cover.avif',
      'titanium-alloy-keychain-capsule-hover.avif',
      'titanium-alloy-keychain-capsule-detail-1.avif',
      'titanium-alloy-keychain-capsule-detail-2.avif',
      'titanium-alloy-keychain-capsule-detail-3.avif',
      'titanium-alloy-keychain-capsule-lifestyle.avif',
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
  for (const { folder, files } of UPLOADS) {
    console.log(`\n── ${folder}`)
    for (const file of files) {
      const localPath = path.join(PUBLIC_DIR, folder, file)
      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ NOT FOUND: ${file}`)
        continue
      }
      const nameWithoutExt = path.basename(file, path.extname(file))
      const publicId = `${folder}/${nameWithoutExt}`
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
