import { OrderDir } from '@common/enum'
import { Uuid } from '@common/type'
import { Listing } from '@core/domain/listing/entity/listing'
import { ListingUpdateData } from '@core/domain/listing/entity/protocol'
import { ListingFields } from '@core/domain/listing/entity/enum'

export type ListingsFindParams = {
  orderBy?: ListingFields
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export interface ListingRepositoryServicePort {
  create(listing: Listing): Promise<Listing>
  update(data: ListingUpdateData): Promise<Listing>
  delete(entity: Listing): Promise<void>
  load(id: Uuid): Promise<null | Listing>
  find(params: ListingsFindParams): Promise<Listing[]>
}

export const ListingRepositoryService = Symbol('Listing repository service')
