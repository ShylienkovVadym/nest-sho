import { Uuid } from '@common/type'
import { IsUUID } from 'class-validator'

export class CategoryDeleteCommand {
  @IsUUID()
  public id: Uuid
}
