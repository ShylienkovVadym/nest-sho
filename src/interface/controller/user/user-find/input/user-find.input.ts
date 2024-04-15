import { UserFields, UserStatus } from '@core/domain/user/entity/enum'
import { OrderDir } from '@common/enum'

export class UserFindInput {
  public status?: UserStatus

  public orderBy?: UserFields

  public orderDir?: OrderDir

  public take?: number

  public skip?: number
}
