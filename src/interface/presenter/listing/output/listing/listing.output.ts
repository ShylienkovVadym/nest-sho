import { Uuid } from '@common/type'
import { Listing } from '@core/domain/listing/entity/listing'

export class ListingOutput {
  public readonly id: Uuid

  public readonly title: string

  public readonly description: string

  public readonly price: number

  public readonly condition: string

  public readonly created: Date

  public readonly updated: Date

  public constructor(entity: Listing) {
    this.id = entity.id
    this.title = entity.title
    this.description = entity.description
    this.price = entity.price
    this.condition = entity.condition
    this.created = entity.created
    this.updated = entity.updated
  }
}
