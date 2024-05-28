import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ListingUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'
import { ListingRepositoryService, ListingRepositoryServicePort } from '@core/domain/listing/service'
import { Listing } from '@core/domain/listing/entity/listing'
import { ListingUpdateData } from '@core/domain/listing/entity/protocol'

@CommandHandler(ListingUpdateCommand)
export class ListingUpdateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ListingRepositoryService) private listingRepositoryService: ListingRepositoryServicePort) {
    super()
  }

  public async run(command: ListingUpdateCommand): Promise<Listing> {
    const listing = await this.listingRepositoryService.load(command.id)
    if (!listing) {
      throw new AppEntityNotFoundException('Listing', { id: command.id })
    }
    const updatedListing = this.applyUpdateData(listing, command)
    return this.listingRepositoryService.update(updatedListing)
  }

  private applyUpdateData(listing: Listing, data: ListingUpdateData): Listing {
    const { title, description, price, condition } = data
    if (title) {
      listing.title = title
    }
    if (description) {
      listing.description = description
    }
    if (price) {
      listing.price = price
    }
    if (condition) {
      listing.condition = condition
    }
    return listing
  }
}
