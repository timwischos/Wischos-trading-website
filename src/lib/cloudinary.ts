const CLOUD_NAME = 'dcivh8ovs'
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`

/**
 * Convert a local public path to a Cloudinary URL.
 *
 * Input examples:
 *   /products/WP-101.../cover.avif       → image URL with f_auto,q_auto
 *   /images/banner.avif                  → image URL with f_auto,q_auto
 *   /how-it-works.mp4                    → video URL (no transforms)
 *   videos/how-it-works                  → video URL (no transforms)
 *
 * Options:
 *   w / h   – width / height crop
 *   fill    – use c_fill (default crop mode when both w+h provided)
 */
export function cloudinaryUrl(
  path: string,
  opts?: { w?: number; h?: number; fill?: boolean }
): string {
  if (!path) return path

  // Already a full Cloudinary URL — return as-is
  if (path.startsWith('https://res.cloudinary.com')) return path

  // Normalise: strip leading slash, strip extension
  const stripped = path.replace(/^\//, '').replace(/\.[^/.]+$/, '')

  // Video assets
  const isVideo = stripped.startsWith('videos/') || stripped.endsWith('.mp4')
  if (isVideo) {
    return `${BASE}/video/upload/${stripped}`
  }

  // Build transform string
  const transforms: string[] = ['f_auto', 'q_auto']
  if (opts?.w) transforms.push(`w_${opts.w}`)
  if (opts?.h) transforms.push(`h_${opts.h}`)
  if (opts?.w && opts?.h) transforms.push(opts.fill !== false ? 'c_fill' : 'c_fill')
  const tx = transforms.join(',')

  return `${BASE}/image/upload/${tx}/${stripped}`
}
