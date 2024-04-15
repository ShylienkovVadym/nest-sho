import { Uuid } from '@common/type'

export class ProductUpdateInput {
  public id: Uuid

  public productName?: null | string

  public description?: null | string

  public price?: null | number

  public brand?: null | string
}
