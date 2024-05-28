import { Uuid } from '@common/type'
import { IsUUID } from 'class-validator'

export class ListingDeleteCommand {
  @IsUUID()
  public id: Uuid
}
