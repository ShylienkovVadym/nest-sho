import { ProductEntityMapper } from '../entity-mapper'
import { Uuid } from '@common/type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductOrmEntity } from 'src/infrastructure/database/postgres/database-default/orm-entity'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { OrderDir } from '@common/enum'
import { ProductRepositoryServicePort, ProductsFindParams } from '@core/domain/product/service'
import { Product } from 'src/core/domain/product/entity/product'
import { UserUpdateData } from '@core/domain/user/entity/protocol'
import { ProductUpdateData } from '@core/domain/product/entity/protocol'

@Injectable()
export class ProductRepositoryServiceAdapter implements ProductRepositoryServicePort {
  public constructor(
    private productEntityMapper: ProductEntityMapper,
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  public async create(product: Product): Promise<Product> {
    const _productOrmEntity = this.productEntityMapper.toPersistence(product)
    const productOrmEntity = await this.repository.save(_productOrmEntity)
    return this.productEntityMapper.toDomain(productOrmEntity)
  }

  public async find(params: ProductsFindParams): Promise<Product[]> {
    const productOrmEntities = await this.query(params).getMany()
    return productOrmEntities.map((productOrmEntity) => this.productEntityMapper.toDomain(productOrmEntity))
  }

  public async load(id: Uuid): Promise<null | Product> {
    const productOrmEntity = await this.repository.findOneBy({ id: id })
    return productOrmEntity ? this.productEntityMapper.toDomain(productOrmEntity) : null
  }

  public async delete(entity: Product): Promise<void> {
    const productOrmEntity = this.productEntityMapper.toPersistence(entity)
    await this.repository.delete(productOrmEntity)
  }

  public async update(product: Product): Promise<Product> {
    const _productOrmEntity = this.productEntityMapper.toPersistence(product)
    const productOrmEntity = await this.repository.save(_productOrmEntity)
    return this.productEntityMapper.toDomain(productOrmEntity)
  }

  private query(params: ProductsFindParams): SelectQueryBuilder<ProductOrmEntity> {
    const query = this.repository.createQueryBuilder('product')

    if (params.orderBy) {
      const orderField = `product.${params.orderBy}`
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
