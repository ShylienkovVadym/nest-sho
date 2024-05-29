import { Uuid } from '@common/type'

export class CategoryUpdateInput {
  public id: Uuid

  public name?: null | string

  public parentCategoryId?: null | Uuid
}
