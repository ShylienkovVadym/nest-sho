import { Uuid } from '@common/type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { OrderDir } from '@common/enum'
import { ListingRepositoryServicePort, ListingsFindParams } from '@core/domain/listing/service'
import { Listing } from '@core/domain/listing/entity/listing'
import { ListingEntityMapper } from '@infrastructure/database/postgres/database-default/entity-mapper'
import { ListingOrmEntity } from '@infrastructure/database/postgres/database-default/orm-entity'

@Injectable()
export class ListingRepositoryServiceAdapter implements ListingRepositoryServicePort {
  public constructor(
    private listingEntityMapper: ListingEntityMapper,
    @InjectRepository(ListingOrmEntity)
    private readonly repository: Repository<ListingOrmEntity>,
  ) {}

  public async create(listing: Listing): Promise<Listing> {
    const _listingOrmEntity = this.listingEntityMapper.toPersistence(listing)
    const listingOrmEntity = await this.repository.save(_listingOrmEntity)
    return this.listingEntityMapper.toDomain(listingOrmEntity)
  }

  public async find(params: ListingsFindParams): Promise<Listing[]> {
    const listingOrmEntities = await this.query(params).getMany()
    return listingOrmEntities.map((listingOrmEntity) => this.listingEntityMapper.toDomain(listingOrmEntity))
  }

  public async load(id: Uuid): Promise<null | Listing> {
    const listingOrmEntity = await this.repository.findOneBy({ id: id })
    return listingOrmEntity ? this.listingEntityMapper.toDomain(listingOrmEntity) : null
  }

  public async delete(entity: Listing): Promise<void> {
    const listingOrmEntity = this.listingEntityMapper.toPersistence(entity)
    await this.repository.delete(listingOrmEntity)
  }

  public async update(listing: Listing): Promise<Listing> {
    const _listingOrmEntity = this.listingEntityMapper.toPersistence(listing)
    const listingOrmEntity = await this.repository.save(_listingOrmEntity)
    return this.listingEntityMapper.toDomain(listingOrmEntity)
  }

  private query(params: ListingsFindParams): SelectQueryBuilder<ListingOrmEntity> {
    const query = this.repository.createQueryBuilder('listing')

    if (params.orderBy) {
      const orderField = `listing.${params.orderBy}`
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
