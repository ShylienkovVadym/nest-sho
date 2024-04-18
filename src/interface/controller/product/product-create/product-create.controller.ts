import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { ProductCreateInput } from './input'
import { ProductCreateCommand } from '@core/application/command'
import { Product } from '@core/domain/product/entity/product'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { init } from '@common/cqrs'

@Controller('api/')
export class ProductCreateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('product/create')
  public async ProductCreate(@Body() input: ProductCreateInput): Promise<ProductOutput> {
    const command = init(ProductCreateCommand, input)
    const product = await this.commandBus.execute<ProductCreateCommand, Product>(command)
    return new ProductOutput(product)
  }
}
