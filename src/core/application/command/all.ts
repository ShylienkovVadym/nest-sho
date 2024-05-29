import { userCommandHandlers } from './user/all'
import { listingCommandHandlers } from './listing/all'
import { categoryCommandHandlers } from './category/all'

export const commandHandlers = [...userCommandHandlers, ...listingCommandHandlers, ...categoryCommandHandlers]
