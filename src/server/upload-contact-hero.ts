/**
 * Run with: npx tsx src/server/upload-contact-hero.ts
 * Uploads contact page hero image to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import * as path from 'path'
import * as fs from 'fs'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const LOCAL_PATH = path.join(process.cwd(), 'public/images/contact-hero.avif')
const PUBLIC_ID = 'site/contact-hero'

async function main() {
  if (!fs.existsSync(LOCAL_PATH)) {
    console.error(`✗ File not found: ${LOCAL_PATH}`)
    process.exit(1)
  }

  console.log('Uploading contact-hero.avif...')
  const result = await cloudinary.uploader.upload(LOCAL_PATH, {
    public_id: PUBLIC_ID,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
  })
  console.log(`✓ Uploaded: ${result.secure_url}`)
  console.log(`  Size: ${result.bytes} bytes | ${result.width}×${result.height}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
