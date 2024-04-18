import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { ProductUpdateInput } from './input'
import { ProductUpdateCommand } from '@core/application/command'
import { Product } from '@core/domain/product/entity/product'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { init } from '@common/cqrs'

@Controller('api/')
export class ProductUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('product/update')
  public async ProductCreate(@Body() input: ProductUpdateInput): Promise<ProductOutput> {
    const command = init(ProductUpdateCommand, input)
    const product = await this.commandBus.execute<ProductUpdateCommand, Product>(command)
    return new ProductOutput(product)
  }
}
