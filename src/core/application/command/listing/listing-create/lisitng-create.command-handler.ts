import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ListingCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { ListingRepositoryService, ListingRepositoryServicePort } from '@core/domain/listing/service'
import { Listing } from '@core/domain/listing/entity/listing'

@CommandHandler(ListingCreateCommand)
export class ListingCreateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ListingRepositoryService) private listingRepositoryService: ListingRepositoryServicePort) {
    super()
  }

  public async run(command: ListingCreateCommand): Promise<Listing> {
    const listing = Listing.create(command)
    return this.listingRepositoryService.create(listing)
  }
}
