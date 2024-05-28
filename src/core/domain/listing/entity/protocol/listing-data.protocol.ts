import { Uuid } from '@common/type'
import { ListingCondition } from '@core/domain/listing/entity/enum'

export interface ListingData {
  id: Uuid
  title: string
  description: string
  price: number
  condition: ListingCondition
  created: Date
  updated: Date
}
