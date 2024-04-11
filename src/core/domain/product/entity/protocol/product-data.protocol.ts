import { Uuid } from '@common/type'

export interface ProductData {
  id: Uuid
  productName: string
  description: string
  price: number
  brand: string
  created: Date
  updated: Date
}
