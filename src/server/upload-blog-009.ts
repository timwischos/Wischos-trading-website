/**
 * Run with: npx tsx src/server/upload-blog-009.ts
 * Uploads blog-009 images to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const BASE = '/mnt/d/Project/Wischos trading website/public/images/blog/blog-009'

const ASSETS = [
  ['hero-custom-metal-gift-project-review.avif', 'blog/blog-009-hero'],
  ['rough-idea-to-reviewable-project.avif', 'blog/blog-009-rough-idea'],
  ['material-finish-logo-review.avif', 'blog/blog-009-material-finish-logo'],
  ['custom-metal-gift-packaging-review.avif', 'blog/blog-009-packaging-review'],
  ['destination-feasibility-review.avif', 'blog/blog-009-destination-feasibility'],
] as const

async function main() {
  for (const [file, publicId] of ASSETS) {
    const source = `${BASE}/${file}`
    console.log(`Uploading ${file} -> ${publicId}`)
    const result = await cloudinary.uploader.upload(source, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
    })
    console.log(`Uploaded: ${result.secure_url}`)
  }
}

main().catch((err) => {
  console.error('FAILED:', err.message)
  process.exit(1)
})
