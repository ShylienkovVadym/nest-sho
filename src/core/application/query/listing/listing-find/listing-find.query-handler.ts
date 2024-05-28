import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { BaseQueryHandler } from '@common/cqrs'
import { Listing } from '@core/domain/listing/entity/listing'
import { ListingFindQuery } from '@core/application/query/listing'
import { ListingRepositoryService, ListingRepositoryServicePort } from '@core/domain/listing/service'

@QueryHandler(ListingFindQuery)
export class ListingFindQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(ListingRepositoryService) private listingRepositoryService: ListingRepositoryServicePort) {
    super()
  }

  public async run(query: ListingFindQuery): Promise<Listing[]> {
    return this.listingRepositoryService.find(query)
  }
}
