import { OrderDir } from '@common/enum'
import { Uuid } from '@common/type'
import { Category } from '@core/domain/category/entity/category'
import { CategoryUpdateData } from '@core/domain/category/entity/protocol'
import { CategoryFields } from '@core/domain/category/entity/enum'

export type CategoriesFindParams = {
  orderBy?: CategoryFields
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export interface CategoryRepositoryServicePort {
  create(category: Category): Promise<Category>
  update(data: CategoryUpdateData): Promise<Category>
  delete(entity: Category): Promise<void>
  load(id: Uuid): Promise<null | Category>
  find(params: CategoriesFindParams): Promise<Category[]>
}

export const CategoryRepositoryService = Symbol('Category repository service')
