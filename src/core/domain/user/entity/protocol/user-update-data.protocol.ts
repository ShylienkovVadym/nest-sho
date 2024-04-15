import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'

export type UserUpdateData = {
  id: Uuid
  firstName?: null | string
  lastName?: null | string
  status?: null | UserStatus
}
