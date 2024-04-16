import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { Product } from '@core/domain/product/entity/product'
import { ProductLoadQuery } from '@core/application/query/product/product-load'
import { ProductLoadInput } from '@interface/controller/product/product-load/input'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { init } from '@common/cqrs'

@Controller('api/')
export class ProductLoadController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('product')
  public async ProductLoad(@Body() input: ProductLoadInput): Promise<null | ProductOutput> {
    const query = init(ProductLoadQuery, input)
    const product = await this.queryBus.execute<ProductLoadQuery, null | Product>(query)
    return product ? new ProductOutput(product) : null
  }
}
