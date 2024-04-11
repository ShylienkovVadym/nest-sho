import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductFindQuery } from '@core/application/query/product/product-find/product-find.query'

@QueryHandler(ProductFindQuery)
export class ProductFindQueryHandler implements IQueryHandler<ProductFindQuery, Product[]> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(query: ProductFindQuery): Promise<Product[]> {
    return this.productRepositoryService.find(query)
  }
}
