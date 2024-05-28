import { ListingDeleteCommandHandler, ListingUpdateCommandHandler, ListingCreateCommandHandler } from '.'

export const listingCommandHandlers = [
  ListingCreateCommandHandler,
  ListingDeleteCommandHandler,
  ListingUpdateCommandHandler,
]
