import { ListingCondition } from '@core/domain/listing/entity/enum'

export class ListingCreateInput {
  public title: string

  public description: string

  public price: number

  public condition: ListingCondition
}
