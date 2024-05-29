import { OrderDir } from '@common/enum'
import { CategoryFields } from '@core/domain/category/entity/enum'

export class CategoryFindInput {
  public orderBy?: CategoryFields

  public orderDir?: OrderDir

  public take?: number

  public skip?: number
}
