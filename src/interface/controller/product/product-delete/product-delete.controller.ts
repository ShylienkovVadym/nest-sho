import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete } from '@nestjs/common'
import { ProductDeleteInput } from './input'
import { ProductDeleteCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'

@Controller('api/')
export class ProductDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('product/delete')
  public async ProductCreate(@Body() input: ProductDeleteInput): Promise<void> {
    const command = plainToInstance(ProductDeleteCommand, input)
    await this.commandBus.execute<ProductDeleteCommand, void>(command)
  }
}
