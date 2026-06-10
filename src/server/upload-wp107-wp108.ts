/**
 * Run with:
 *   npx tsx src/server/upload-wp107-wp108.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { v2 as cloudinary } from 'cloudinary'
import { readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const dirs = [
  'public/products/WP-107-hexagonal-brass-click-pen',
  'public/products/WP-108-solid-brass-bolt-action-pen',
]

const imageExts = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp'])

function walk(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

async function main() {
  const root = process.cwd()
  const files = dirs
    .flatMap(walk)
    .filter((file) => imageExts.has(extname(file).toLowerCase()))

  console.log(`Uploading ${files.length} files to Cloudinary`)

  let ok = 0
  let fail = 0

  for (const file of files) {
    const rel = relative(join(root, 'public'), file).replace(/\\/g, '/')
    const publicId = rel.replace(/\.[^.]+$/, '')

    try {
      await cloudinary.uploader.upload(file, {
        public_id: publicId,
        resource_type: 'image',
        overwrite: false,
        use_filename: false,
        unique_filename: false,
      })
      console.log(`✓ ${publicId}`)
      ok++
    } catch (err: any) {
      const message = err?.error?.message ?? String(err)
      if (err?.error?.http_code === 400 && message.includes('already exists')) {
        console.log(`– ${publicId} exists`)
        ok++
        continue
      }
      console.error(`✗ ${publicId}: ${message}`)
      fail++
    }
  }

  console.log(`Done: ${ok} ok, ${fail} failed`)
  if (fail > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

