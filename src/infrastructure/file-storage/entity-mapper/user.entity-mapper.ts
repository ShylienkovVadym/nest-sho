import { Injectable } from '@nestjs/common'
import { UserRecord } from '../protocol'
import { User } from '@core/domain/user/entity/user'
import { UserStatus } from '@core/domain/user/entity/enum'

@Injectable()
export class UserEntityMapper {
  public toDomain(record: UserRecord): User {
    return new User({
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      status: <UserStatus>record.status,
      created: new Date(record.created),
      updated: new Date(record.updated),
    })
  }

  public toPersistence(entity: User): UserRecord {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      status: entity.status,
      created: entity.created.getTime(),
      updated: entity.updated.getTime(),
    }
  }
}
