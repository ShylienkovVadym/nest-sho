import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { ProductUpdateInput } from './input'
import { ProductUpdateCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'
import { Product } from '@core/domain/product/entity/product'
import { ProductOutput } from '@interface/presenter/user/output/product'

@Controller('api/')
export class ProductUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('product/update')
  public async ProductCreate(@Body() input: ProductUpdateInput): Promise<null | ProductOutput> {
    const command = plainToInstance(ProductUpdateCommand, input)
    const product = await this.commandBus.execute<ProductUpdateCommand, Product>(command)
    return product ? new ProductOutput(product) : null
  }
}
