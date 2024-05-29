import { UserRepositoryServicePort, UsersFindParams } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserEntityMapper } from '../entity-mapper'
import { Uuid } from '@common/type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserOrmEntity } from 'src/infrastructure/database/postgres/database-default/orm-entity'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { OrderDir } from '@common/enum'

@Injectable()
export class UserRepositoryServiceAdapter implements UserRepositoryServicePort {
  public constructor(
    private userEntityMapper: UserEntityMapper,
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  public async create(user: User): Promise<User> {
    const _userOrmEntity = this.userEntityMapper.toPersistence(user)
    const userOrmEntity = await this.repository.save(_userOrmEntity)
    return this.userEntityMapper.toDomain(userOrmEntity)
  }

  public async find(params: UsersFindParams): Promise<User[]> {
    const userOrmEntities = await this.query(params).getMany()
    return userOrmEntities.map((userOrmEntity) => this.userEntityMapper.toDomain(userOrmEntity))
  }

  public async load(id: Uuid): Promise<null | User> {
    const userOrmEntity = await this.repository.findOneBy({ id: id })
    return userOrmEntity ? this.userEntityMapper.toDomain(userOrmEntity) : null
  }

  public async delete(entity: User): Promise<void> {
    const userOrmEntity = this.userEntityMapper.toPersistence(entity)
    await this.repository.delete(userOrmEntity)
  }

  public async update(user: User): Promise<User> {
    const _userOrmEntity = this.userEntityMapper.toPersistence(user)
    const userOrmEntity = await this.repository.save(_userOrmEntity)
    return this.userEntityMapper.toDomain(userOrmEntity)
  }

  private query(params: UsersFindParams): SelectQueryBuilder<UserOrmEntity> {
    const query = this.repository.createQueryBuilder('user')

    if (params.status) {
      query.andWhere('category.status = :status', { status: params.status })
    }

    if (params.orderBy) {
      const orderField = `user.${params.orderBy}`
      const orderDir = params.orderDir === OrderDir.Descending ? 'DESC' : 'ASC'
      query.orderBy(orderField, orderDir)
    }

    if (params.take) {
      query.take(params.take)
    }

    if (params.skip) {
      query.skip(params.skip)
    }
    return query
  }
}
