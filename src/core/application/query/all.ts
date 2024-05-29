import { userQueryHandlers } from './user/all'
import { listingQueryHandlers } from '@core/application/query/listing/all'
import { categoryQueryHandlers } from '@core/application/query/category/all'

export const queryHandlers = [...userQueryHandlers, ...listingQueryHandlers, ...categoryQueryHandlers]
