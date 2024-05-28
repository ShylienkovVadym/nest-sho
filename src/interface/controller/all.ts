import { userControllers } from './user/all'
import { listingControllers } from './listing/all'

export const controllers = [...userControllers, ...listingControllers]
