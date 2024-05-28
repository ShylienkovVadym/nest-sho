import { ListingData } from './listing-data.protocol'

export type ListingCreateData = Pick<ListingData, 'title' | 'description' | 'price' | 'condition'>
