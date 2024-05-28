import { userQueryHandlers } from './user/all'
import { listingQueryHandlers } from '@core/application/query/listing/all'

export const queryHandlers = [...userQueryHandlers, ...listingQueryHandlers]
