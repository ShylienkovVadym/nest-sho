import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ListingDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'
import { ListingRepositoryService, ListingRepositoryServicePort } from '@core/domain/listing/service'

@CommandHandler(ListingDeleteCommand)
export class ListingDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ListingRepositoryService) private listingRepositoryService: ListingRepositoryServicePort) {
    super()
  }

  public async run(command: ListingDeleteCommand): Promise<void> {
    const listing = await this.listingRepositoryService.load(command.id)
    if (!listing) {
      throw new AppEntityNotFoundException('Listing', { id: command.id })
    }
    await this.listingRepositoryService.delete(listing)
  }
}
