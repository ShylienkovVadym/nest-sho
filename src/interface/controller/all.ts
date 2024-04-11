import { userControllers } from './user/all'
import { productControllers } from './product/all'

export const controllers = [...userControllers, ...productControllers]
