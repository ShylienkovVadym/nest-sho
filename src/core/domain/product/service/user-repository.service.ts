import { Product } from '../entity/product'
import { OrderDir } from '@common/enum'
import { Uuid } from '@common/type'
import { ProductUpdateData } from '@core/domain/product/entity/protocol'

export type ProductsFindParams = {
  orderBy?: 'productName' | 'description' | 'price' | 'brand' | 'created' | 'updated'
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export interface ProductRepositoryServicePort {
  create(product: Product): Promise<Product>
  update(data: ProductUpdateData): Promise<null | Product>
  delete(entity: Product): Promise<void>
  load(id: Uuid): Promise<null | Product>
  find(params: ProductsFindParams): Promise<Product[]>
}

export const ProductRepositoryService = Symbol('Product repository service')
