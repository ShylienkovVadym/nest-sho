import { IsUUID } from 'class-validator'
import { Uuid } from '@common/type'

export class ListingLoadQuery {
  @IsUUID()
  public id: Uuid
}
