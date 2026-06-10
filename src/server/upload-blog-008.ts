/**
 * Run with: npx tsx src/server/upload-blog-008.ts
 * Uploads blog-008 images to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const BASE =
  '/mnt/d/Project/Wischos trading website/content create/blog/008-From-Standard-Catalogue-to-Custom-Metal-Projects-When-Promo-Distributors-Should-Go-Off-Catalogue'

const ASSETS = [
  ['hero-catalogue-to-custom-metal-projects.png', 'blog/blog-008-hero'],
  ['off-catalogue-custom-levels.png', 'blog/blog-008-off-catalogue-levels'],
  ['catalogue-vs-custom-decision-desk.png', 'blog/blog-008-decision-desk'],
  ['custom-metal-gift-brief-components.png', 'blog/blog-008-brief-components'],
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
