import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'

export type UserUpdateData = {
  id: Uuid
  firstName?: null | string
  lastName?: null | string
  email?: null | string
  password?: null | string
  status?: null | UserStatus
}
