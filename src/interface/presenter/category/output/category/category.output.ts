import { Uuid } from '@common/type'
import { Category } from '@core/domain/category/entity/category'

export class CategoryOutput {
  public readonly id: Uuid

  public readonly name: string

  public readonly parentCategoryId?: Uuid

  public readonly created: Date

  public readonly updated: Date

  public constructor(entity: Category) {
    this.id = entity.id
    this.name = entity.name
    this.parentCategoryId = entity.parentCategoryId
    this.created = entity.created
    this.updated = entity.updated
  }
}
