import { Uuid } from '@common/type'

export type ProductUpdateData = {
  id: Uuid
  productName?: string
  description?: string
  price?: number
  brand?: string
}
