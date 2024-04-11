import { Uuid } from '@common/type'

export class ProductUpdateInput {
  public id: Uuid

  public productName?: string

  public description?: string

  public price?: number

  public brand?: string
}
