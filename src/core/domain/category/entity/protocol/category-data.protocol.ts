import { Uuid } from '@common/type'

export interface CategoryData {
  id: Uuid
  name: string
  parentCategoryId?: Uuid
  created: Date
  updated: Date
}
