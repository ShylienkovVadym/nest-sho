import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'

export class UserUpdateInput {
  public id: Uuid

  public firstName?: null | string

  public lastName?: null | string

  public email?: null | string

  public password?: null | string

  public status?: null | UserStatus
}
