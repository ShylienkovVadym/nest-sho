import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { Product } from '@core/domain/product/entity/product'
import { ProductFindInput } from '@interface/controller/product/product-find/input'
import { ProductFindQuery } from '@core/application/query'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { init } from '@common/cqrs'

@Controller('api/')
export class ProductFindController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('products')
  public async ProductCreate(@Body() input: ProductFindInput): Promise<ProductOutput[]> {
    const query = init(ProductFindQuery, input)
    const products = await this.queryBus.execute<ProductFindQuery, Product[]>(query)
    return products.map((product) => new ProductOutput(product))
  }
}
