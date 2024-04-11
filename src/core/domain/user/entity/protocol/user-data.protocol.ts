import { UserStatus } from '../enum'
import { Uuid } from '@common/type'

export interface UserData {
  id: Uuid
  firstName: string
  lastName: string
  status: UserStatus
  created: Date
  updated: Date
}
