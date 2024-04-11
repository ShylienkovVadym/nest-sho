import { userQueryHandlers } from './user/all'
import { productQueryHandlers } from './product/all'

export const queryHandlers = [...userQueryHandlers, ...productQueryHandlers]
