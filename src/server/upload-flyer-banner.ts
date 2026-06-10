/**
 * Run with: npx tsx src/server/upload-flyer-banner.ts
 * Uploads distributor short flyer banner to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import * as path from 'path'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

async function main() {
  const localPath = path.join(
    process.cwd(),
    'docs/Wischos Gift — Catalogue/Wischos Gift - Distributor Short Flyer 2026-banner.png'
  )
  const publicId = 'docs/distributor-flyer-2026-banner'
  const result = await cloudinary.uploader.upload(localPath, {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
  })
  console.log('✓ Uploaded:', result.secure_url)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
