import { Uuid } from '@common/type'
import { Product } from '@core/domain/product/entity/product'

export class ProductOutput {
  public readonly id: Uuid

  public readonly productName: string

  public readonly description: string

  public readonly price: number

  public readonly brand: string

  public readonly created: Date

  public readonly updated: Date

  public constructor(entity: Product) {
    this.id = entity.id
    this.productName = entity.productName
    this.description = entity.description
    this.price = entity.price
    this.brand = entity.brand
    this.created = entity.created
    this.updated = entity.updated
  }
}
