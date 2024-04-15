import { Uuid } from '@common/type'

export type ProductUpdateData = {
  id: Uuid
  productName?: null | string
  description?: null | string
  price?: null | number
  brand?: null | string
}
