import { Injectable } from '@nestjs/common'
import { Category } from '@core/domain/category/entity/category'
import { CategoryOrmEntity } from '@infrastructure/database/postgres/database-default/orm-entity'

@Injectable()
export class CategoryEntityMapper {
  public toDomain(entity: CategoryOrmEntity): Category {
    return new Category({
      id: entity.id,
      name: entity.name,
      parentCategoryId: entity.parentCategoryId,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    })
  }

  public toPersistence(entity: Category): Partial<CategoryOrmEntity> {
    return {
      id: entity.id,
      name: entity.name,
      parentCategoryId: entity.parentCategoryId,
      created: entity.created,
      updated: entity.updated,
    }
  }
}
