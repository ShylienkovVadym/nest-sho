import { Uuid } from '@common/type'

export type CategoryUpdateData = {
  id: Uuid
  name?: null | string
  parentCategoryId?: null | Uuid
}
