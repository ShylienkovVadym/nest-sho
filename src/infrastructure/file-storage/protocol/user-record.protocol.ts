import { Uuid } from '@common/type'

export interface UserRecord {
  id: Uuid
  firstName: string
  lastName: string
  status: string
  created: number
  updated: number
}
