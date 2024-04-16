import { Product } from '../entity/product'
import { OrderDir } from '@common/enum'
import { Uuid } from '@common/type'
import { ProductUpdateData } from '@core/domain/product/entity/protocol'
import { ProductFields } from '@core/domain/product/entity/enum'

export type ProductsFindParams = {
  orderBy?: ProductFields
  orderDir?: OrderDir
  take?: number
  skip?: number
}

export interface ProductRepositoryServicePort {
  create(product: Product): Promise<Product>
  update(data: ProductUpdateData): Promise<Product>
  delete(entity: Product): Promise<void>
  load(id: Uuid): Promise<null | Product>
  find(params: ProductsFindParams): Promise<Product[]>
}

export const ProductRepositoryService = Symbol('Product repository service')
