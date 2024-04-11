import { userCommandHandlers } from './user/all'
import { productCommandHandlers } from './product/all'

export const commandHandlers = [...userCommandHandlers, ...productCommandHandlers]
