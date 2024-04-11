import { OrderDir } from '@common/enum'

export class ProductFindInput {
  public orderBy?: 'productName' | 'description' | 'price' | 'brand' | 'created' | 'updated'

  public orderDir?: OrderDir

  public take?: number

  public skip?: number
}
