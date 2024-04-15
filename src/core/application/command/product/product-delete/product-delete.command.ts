import { Uuid } from '@common/type'
import { IsUUID } from 'class-validator'

export class ProductDeleteCommand {
  @IsUUID()
  public id: Uuid
}
