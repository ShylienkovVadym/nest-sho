import { Uuid } from '@common/type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { OrderDir } from '@common/enum'
import { CategoryRepositoryServicePort, CategoriesFindParams } from '@core/domain/category/service'
import { Category } from '@core/domain/category/entity/category'
import { CategoryEntityMapper } from '@infrastructure/database/postgres/database-default/entity-mapper'
import { CategoryOrmEntity } from '@infrastructure/database/postgres/database-default/orm-entity'

@Injectable()
export class CategoryRepositoryServiceAdapter implements CategoryRepositoryServicePort {
  public constructor(
    private categoryEntityMapper: CategoryEntityMapper,
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  public async create(category: Category): Promise<Category> {
    const _categoryOrmEntity = this.categoryEntityMapper.toPersistence(category)
    const categoryOrmEntity = await this.repository.save(_categoryOrmEntity)
    return this.categoryEntityMapper.toDomain(categoryOrmEntity)
  }

  public async find(params: CategoriesFindParams): Promise<Category[]> {
    const categoryOrmEntities = await this.query(params).getMany()
    return categoryOrmEntities.map((categoryOrmEntity) => this.categoryEntityMapper.toDomain(categoryOrmEntity))
  }

  public async load(id: Uuid): Promise<null | Category> {
    const categoryOrmEntity = await this.repository.findOneBy({ id: id })
    return categoryOrmEntity ? this.categoryEntityMapper.toDomain(categoryOrmEntity) : null
  }

  public async delete(entity: Category): Promise<void> {
    const categoryOrmEntity = this.categoryEntityMapper.toPersistence(entity)
    await this.repository.delete(categoryOrmEntity)
  }

  public async update(category: Category): Promise<Category> {
    const _categoryOrmEntity = this.categoryEntityMapper.toPersistence(category)
    const categoryOrmEntity = await this.repository.save(_categoryOrmEntity)
    return this.categoryEntityMapper.toDomain(categoryOrmEntity)
  }

  private query(params: CategoriesFindParams): SelectQueryBuilder<CategoryOrmEntity> {
    const query = this.repository.createQueryBuilder('category')

    if (params.orderBy) {
      const orderField = `category.${params.orderBy}`
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
