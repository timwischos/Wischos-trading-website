import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
config({ path: '.env.local' })

cloudinary.config({
  cloud_name: 'dcivh8ovs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const SUFFIXES = ['cover', 'hover', 'detail-1', 'detail-2', 'detail-3', 'lifestyle']
const OLD_PREFIX = 'solid-brass-desk-rule'
const NEW_PREFIX = 'solid-brass-desk-ruler'
const OLD_FOLDER = 'products/WP-214-solid-brass-desk-rule'
const NEW_FOLDER = 'products/WP-214-solid-brass-desk-ruler'

for (const suffix of SUFFIXES) {
  const from = `${OLD_FOLDER}/${OLD_PREFIX}-${suffix}`
  const to = `${NEW_FOLDER}/${NEW_PREFIX}-${suffix}`
  try {
    const result = await cloudinary.uploader.rename(from, to)
    console.log(`✓ ${from} → ${to}`)
  } catch (err) {
    console.error(`✗ ${from}: ${err.message}`)
  }
}
