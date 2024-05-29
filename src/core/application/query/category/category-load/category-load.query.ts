import { IsUUID } from 'class-validator'
import { Uuid } from '@common/type'

export class CategoryLoadQuery {
  @IsUUID()
  public id: Uuid
}
