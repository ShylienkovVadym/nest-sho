import { CategoryData } from './category-data.protocol'

export type CategoryCreateData = Pick<CategoryData, 'name' | 'parentCategoryId'>
