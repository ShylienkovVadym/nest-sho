import { User } from '../entity/user'
import { UserFields, UserStatus } from '../entity/enum'
import { OrderDir } from '@common/enum'
import { Uuid } from '@common/type'
import { UserUpdateData } from '@core/domain/user/entity/protocol'

export type UsersFindParams = {
  status?: UserStatus
  orderBy?: UserFields
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export interface UserRepositoryServicePort {
  create(user: User): Promise<User>
  update(data: UserUpdateData): Promise<User>
  delete(entity: User): Promise<void>
  load(id: Uuid): Promise<null | User>
  find(params: UsersFindParams): Promise<User[]>
}

export const UserRepositoryService = Symbol('User repository service')
