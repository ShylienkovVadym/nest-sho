import { OrderDir } from '@common/enum'
import { ProductFields } from '@core/domain/product/entity/enum'

export class ProductFindInput {
  public orderBy?: ProductFields

  public orderDir?: OrderDir

  public take?: number

  public skip?: number
}
