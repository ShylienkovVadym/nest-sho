import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductFindQuery } from '@core/application/query/product/product-find/product-find.query'
import { BaseQueryHandler } from '@common/cqrs'

@QueryHandler(ProductFindQuery)
export class ProductFindQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(query: ProductFindQuery): Promise<Product[]> {
    return this.productRepositoryService.find(query)
  }
}
