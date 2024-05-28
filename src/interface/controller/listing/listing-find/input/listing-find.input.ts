import { OrderDir } from '@common/enum'
import { ListingFields } from '@core/domain/listing/entity/enum'

export class ListingFindInput {
  public orderBy?: ListingFields

  public orderDir?: OrderDir

  public take?: number

  public skip?: number
}
