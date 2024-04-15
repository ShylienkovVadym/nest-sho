import { Uuid } from '@common/type'
import { IsUUID } from 'class-validator'

export class UserDeleteCommand {
  @IsUUID()
  public id: Uuid
}
