import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductLoadQuery } from '@core/application/query/product/product-load/product-load.query'

@QueryHandler(ProductLoadQuery)
export class ProductLoadQueryHandler implements IQueryHandler<ProductLoadQuery, null | Product> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(query: ProductLoadQuery): Promise<null | Product> {
    return this.productRepositoryService.load(query.id)
  }
}
