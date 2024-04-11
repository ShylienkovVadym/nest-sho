import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'
import { User } from '@core/domain/user/entity/user'

export class UserOutput {
  public readonly id: Uuid

  public readonly firstName: string

  public readonly lastName: string

  public readonly status: UserStatus

  public readonly created: Date

  public readonly updated: Date

  public constructor(entity: User) {
    this.id = entity.id
    this.firstName = entity.firstName
    this.lastName = entity.lastName
    this.status = entity.status
    this.created = entity.created
    this.updated = entity.updated
  }
}
