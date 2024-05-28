import { UserStatus } from '@core/domain/user/entity/enum'

export class UserCreateInput {
  public firstName: string

  public lastName: string

  public email: string

  public password: string

  public status: UserStatus
}
