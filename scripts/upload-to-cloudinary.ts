/**
 * Upload all product + site images to Cloudinary.
 *
 * Usage:
 *   CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy npx tsx scripts/upload-to-cloudinary.ts
 *
 * What it uploads:
 *   public/products/**  → Cloudinary folder: products/
 *   public/images/**    → Cloudinary folder: images/
 *   public/how-it-works.mp4 → Cloudinary folder: videos/
 *   public/wischos-logo.png  → Cloudinary root
 *
 * Cloudinary public_id is derived from the file path, e.g.:
 *   public/products/WP-101.../cover.avif  → products/WP-101.../cover
 *   public/images/banner.avif             → images/banner
 *
 * Re-running is safe: use_filename + overwrite=false means existing files are skipped.
 */

import { v2 as cloudinary } from 'cloudinary'
import { readdirSync, statSync } from 'fs'
import { join, relative, extname, basename } from 'path'

const CLOUD_NAME = 'dcivh8ovs'
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!API_KEY || !API_SECRET) {
  console.error('Missing env vars: CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET required')
  process.exit(1)
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET })

const ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname)

/** Recursively collect all files under a directory */
function walkDir(dir: string): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full))
    } else {
      results.push(full)
    }
  }
  return results
}

const IMAGE_EXTS = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp'])
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm'])

interface UploadTarget {
  localPath: string
  publicId: string   // Cloudinary public_id (no extension)
  resourceType: 'image' | 'video' | 'raw'
}

function buildTargets(): UploadTarget[] {
  const targets: UploadTarget[] = []

  // 1. public/products/**
  const productsDir = join(ROOT, 'public/products')
  for (const file of walkDir(productsDir)) {
    const ext = extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext) && !VIDEO_EXTS.has(ext)) continue
    const rel = relative(join(ROOT, 'public'), file) // products/WP-xxx.../name.avif
    const publicId = rel.replace(/\.[^.]+$/, '')       // strip extension
    targets.push({
      localPath: file,
      publicId,
      resourceType: VIDEO_EXTS.has(ext) ? 'video' : 'image',
    })
  }

  // 2. public/images/**
  const imagesDir = join(ROOT, 'public/images')
  for (const file of walkDir(imagesDir)) {
    const ext = extname(file).toLowerCase()
    if (!IMAGE_EXTS.has(ext)) continue
    const rel = relative(join(ROOT, 'public'), file)
    const publicId = rel.replace(/\.[^.]+$/, '')
    targets.push({ localPath: file, publicId, resourceType: 'image' })
  }

  // 3. public/how-it-works.mp4
  const videoPath = join(ROOT, 'public/how-it-works.mp4')
  try {
    statSync(videoPath)
    targets.push({ localPath: videoPath, publicId: 'videos/how-it-works', resourceType: 'video' })
  } catch {}

  // 4. public/wischos-logo.png
  const logoPath = join(ROOT, 'public/wischos-logo.png')
  try {
    statSync(logoPath)
    targets.push({ localPath: logoPath, publicId: 'wischos-logo', resourceType: 'image' })
  } catch {}

  return targets
}

async function uploadOne(target: UploadTarget): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.upload(target.localPath, {
      public_id: target.publicId,
      resource_type: target.resourceType,
      overwrite: false,        // skip if already exists
      use_filename: false,
      unique_filename: false,
    })
    console.log(`✓  ${target.publicId}`)
    return true
  } catch (err: any) {
    if (err?.error?.http_code === 400 && err?.error?.message?.includes('already exists')) {
      console.log(`–  ${target.publicId} (skipped, exists)`)
      return true
    }
    console.error(`✗  ${target.publicId}: ${err?.error?.message ?? err}`)
    return false
  }
}

async function main() {
  const targets = buildTargets()
  console.log(`\nUploading ${targets.length} files to Cloudinary (cloud: ${CLOUD_NAME})\n`)

  let ok = 0, fail = 0
  // Upload in batches of 5 to avoid rate limits
  for (let i = 0; i < targets.length; i += 5) {
    const batch = targets.slice(i, i + 5)
    const results = await Promise.all(batch.map(uploadOne))
    ok += results.filter(Boolean).length
    fail += results.filter(r => !r).length
  }

  console.log(`\nDone: ${ok} succeeded, ${fail} failed`)
}

main()
