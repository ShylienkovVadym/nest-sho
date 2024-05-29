import { userControllers } from './user/all'
import { listingControllers } from './listing/all'
import { categoryControllers } from './category/all'

export const controllers = [...userControllers, ...listingControllers, ...categoryControllers]
