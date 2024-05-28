import { Uuid } from '@common/type'
import { ListingCondition } from '@core/domain/listing/entity/enum'

export class ListingUpdateInput {
  public id: Uuid

  public title?: null | string

  public description?: null | string

  public price?: null | number

  public condition?: null | ListingCondition
}
