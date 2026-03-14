// Product type mirrors the DB schema (products table).
// Data is loaded via src/server/getProducts.ts — not hardcoded here.
export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  materials: string[]
  heroImage: string
  images: string[]
  moq: number
  customizationOptions: string[]
  sortOrder: number
  active: boolean
}
