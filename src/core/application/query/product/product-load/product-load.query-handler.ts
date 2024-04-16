import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductLoadQuery } from '@core/application/query/product/product-load/product-load.query'
import { BaseQueryHandler } from '@common/cqrs'

@QueryHandler(ProductLoadQuery)
export class ProductLoadQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(query: ProductLoadQuery): Promise<null | Product> {
    return this.productRepositoryService.load(query.id)
  }
}
