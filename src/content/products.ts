export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  materials: string[]
  heroImage: string
  moq: number
  customizationOptions: string[]
  leadTimeSample: string
  leadTimeBulk: string
}

export const products: Product[] = []
