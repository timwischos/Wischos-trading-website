/**
 * Run with: npx tsx src/server/upload-blog-020.ts
 * Uploads the corporate black colour matching article hero image to Cloudinary.
 * The two SVG inline images are served as static assets from public/ — no upload needed.
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

const BASE = '/mnt/d/Project/Wischos trading website/public/images/blog/blog-020'

const ASSETS = [
  ['hero-corporate-black-material-mismatch-v1.png', 'blog/blog-020/hero-corporate-black-material-mismatch-v1'],
] as const

async function main() {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in .env.local')
  }

  for (const [file, publicId] of ASSETS) {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      { invalidate: true, overwrite: true, public_id: publicId, timestamp },
      process.env.CLOUDINARY_API_SECRET,
    )
    const response = execFileSync(
      'curl',
      [
        '-fsS',
        'https://api.cloudinary.com/v1_1/dcivh8ovs/image/upload',
        '-F', `file=@${BASE}/${file}`,
        '-F', `api_key=${process.env.CLOUDINARY_API_KEY}`,
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
