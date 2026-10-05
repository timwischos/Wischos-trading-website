/**
 * Run with: npx tsx src/server/upload-blog-018.ts
 * Uploads the all-metal vs metal-led gift-set article images to Cloudinary.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { execFileSync } from 'node:child_process'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const BASE = '/mnt/d/Project/Wischos trading website/public/images/blog/blog-018'

const ASSETS = [
  ['hero-all-metal-vs-metal-led-gift-sets.png', 'blog/blog-018/hero-all-metal-vs-metal-led-gift-sets-v2'],
  ['all-metal-sourcing-quote.png', 'blog/blog-018/all-metal-sourcing-quote-v2'],
  ['metal-led-companion-quality.png', 'blog/blog-018/metal-led-companion-quality-v2'],
  ['packaging-routes-and-freight.png', 'blog/blog-018/packaging-routes-and-freight-v2'],
] as const

async function main() {
  for (const [file, publicId] of ASSETS) {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      { invalidate: true, overwrite: true, public_id: publicId, timestamp },
      process.env.CLOUDINARY_API_SECRET!,
    )
    const response = execFileSync(
      'curl',
      [
        '-fsS',
        `https://api.cloudinary.com/v1_1/dcivh8ovs/image/upload`,
        '-F', `file=@${BASE}/${file}`,
        '-F', `api_key=${process.env.CLOUDINARY_API_KEY!}`,
        '-F', `timestamp=${timestamp}`,
        '-F', `signature=${signature}`,
        '-F', `public_id=${publicId}`,
        '-F', 'overwrite=true',
        '-F', 'invalidate=true',
      ],
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
    )
    const result = JSON.parse(response) as { secure_url: string }
    console.log(`Uploaded ${publicId}: ${result.secure_url}`)
  }
}

await main().catch((err) => {
  const error = err as { message?: string; name?: string; http_code?: number; error?: { message?: string } }
  console.error(
    'FAILED:',
    error.message ?? error.error?.message ?? error.name ?? JSON.stringify(error),
    error.http_code ? `(HTTP ${error.http_code})` : '',
  )
  process.exitCode = 1
})
