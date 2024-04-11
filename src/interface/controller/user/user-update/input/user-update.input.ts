import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'

export class UserUpdateInput {
  public id: Uuid

  public firstName?: string

  public lastName?: string

  public status?: UserStatus
}
