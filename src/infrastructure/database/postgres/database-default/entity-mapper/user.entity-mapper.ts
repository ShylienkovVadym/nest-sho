import { Injectable } from '@nestjs/common'
import { UserOrmEntity } from 'src/infrastructure/database/postgres/database-default/orm-entity'
import { User } from '@core/domain/user/entity/user'
import { UserStatus } from '@core/domain/user/entity/enum'
import { USER_ID_NEW } from '@core/domain/user/entity/constant'

@Injectable()
export class UserEntityMapper {
  public toDomain(entity: UserOrmEntity): User {
    return new User({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      status: <UserStatus>entity.status,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    })
  }

  public toPersistence(entity: User): Partial<UserOrmEntity> {
    return {
      id: USER_ID_NEW != entity.id ? entity.id : undefined,
      firstName: entity.firstName,
      lastName: entity.lastName,
      status: entity.status,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    }
  }
}
