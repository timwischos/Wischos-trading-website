/**
 * Run with: npx tsx src/server/upload-blog-005.ts
 * Uploads blog-005 hero image to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const SOURCE = '/mnt/d/Project/Wischos trading website/content create/blog/005-Why We Often Recommend Metal in Corporate Gifting/blog-005.avif'
const PUBLIC_ID = 'blog/blog-005'

async function main() {
  console.log('Uploading blog-005 hero image...')
  const result = await cloudinary.uploader.upload(SOURCE, {
    public_id: PUBLIC_ID,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
  })
  console.log('✓ Uploaded:', result.secure_url)
}

main().catch((err) => {
  console.error('✗ FAILED:', err.message)
  process.exit(1)
})
