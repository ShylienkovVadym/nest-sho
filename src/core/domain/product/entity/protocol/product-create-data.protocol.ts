import { ProductData } from './product-data.protocol'

export type ProductCreateData = Pick<ProductData, 'productName' | 'description' | 'price' | 'brand'>
