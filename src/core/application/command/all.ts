import { userCommandHandlers } from './user/all'
import { listingCommandHandlers } from './listing/all'

export const commandHandlers = [...userCommandHandlers, ...listingCommandHandlers]
