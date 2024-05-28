import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { BaseQueryHandler } from '@common/cqrs'
import { ListingLoadQuery } from '@core/application/query/listing'
import { Listing } from '@core/domain/listing/entity/listing'
import { ListingRepositoryService, ListingRepositoryServicePort } from '@core/domain/listing/service'

@QueryHandler(ListingLoadQuery)
export class ListingLoadQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(ListingRepositoryService) private listingRepositoryService: ListingRepositoryServicePort) {
    super()
  }

  public async run(query: ListingLoadQuery): Promise<null | Listing> {
    return this.listingRepositoryService.load(query.id)
  }
}
