/**
 * Run with: npx tsx src/server/upload-wp313-315-217.ts
 * Uploads WP-313, WP-314, WP-315 and WP-217 images to Cloudinary.
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

const FOLDERS = [
  'WP-313-solid-brass-quick-release-swivel-keychain',
  'WP-314-solid-brass-spring-belt-hook',
  'WP-315-solid-brass-slide-lock-key-hook',
  'WP-217-solid-brass-round-storage-canister',
]

async function main() {
  for (const folder of FOLDERS) {
    console.log(`── ${folder}`)
    const dir = path.join(PUBLIC_DIR, 'products', folder)
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.avif'))) {
      const publicId = `products/${folder}/${path.basename(file, '.avif')}`
      try {
        const result = await cloudinary.uploader.upload(path.join(dir, file), {
          public_id: publicId,
          overwrite: true,
          invalidate: true,
          resource_type: 'image',
        })
        console.log(`  ✓ ${file}  ${result.width}x${result.height}`)
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
