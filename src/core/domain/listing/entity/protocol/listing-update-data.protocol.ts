import { Uuid } from '@common/type'
import { ListingCondition } from '@core/domain/listing/entity/enum'

export type ListingUpdateData = {
  id: Uuid
  title?: null | string
  description?: null | string
  price?: null | number
  condition?: null | ListingCondition
}
