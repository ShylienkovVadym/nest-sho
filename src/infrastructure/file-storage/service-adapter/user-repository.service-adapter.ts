import { UserRepositoryServicePort, UsersFindParams } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserRecord } from '../protocol'
import { UserEntityMapper } from '../entity-mapper'
import { Uuid } from '@common/type'
import { UserFileStorageService } from '../service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepositoryServiceAdapter implements UserRepositoryServicePort {
  public constructor(
    private userEntityMapper: UserEntityMapper,
    private userFileStorageService: UserFileStorageService<UserRecord>,
  ) {}

  public async create(user: User): Promise<User> {
    const _userRecord = this.userEntityMapper.toPersistence(user)
    const userRecord = await this.userFileStorageService.save(_userRecord)
    return this.userEntityMapper.toDomain(userRecord)
  }

  public async delete(entity: User): Promise<void> {
    const userRecord = this.userEntityMapper.toPersistence(entity)
    await this.userFileStorageService.delete(userRecord)
  }

  public async find(params: UsersFindParams): Promise<User[]> {
    const { status, ..._params } = params
    const userRecords = await this.userFileStorageService.find({
      ..._params,
      filter: status ? { status } : {},
    })
    return userRecords.map((userRecord) => this.userEntityMapper.toDomain(userRecord))
  }

  public async load(id: Uuid): Promise<null | User> {
    const userRecord = await this.userFileStorageService.findOne(id)
    return userRecord ? this.userEntityMapper.toDomain(userRecord) : null
  }

  public async update(entity: User): Promise<User> {
    const _userRecord = this.userEntityMapper.toPersistence(entity)
    const userRecord = await this.userFileStorageService.save(_userRecord)
    return this.userEntityMapper.toDomain(userRecord)
  }
}
