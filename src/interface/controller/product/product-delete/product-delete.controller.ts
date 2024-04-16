import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { ProductDeleteInput } from './input'
import { ProductDeleteCommand } from '@core/application/command'
import { AppError } from '@common/error'
import { init } from '@common/cqrs'

@Controller('api/')
export class ProductDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('product/delete')
  public async ProductCreate(@Body() input: ProductDeleteInput): Promise<void> {
    const command = init(ProductDeleteCommand, input)
    try {
      await this.commandBus.execute<ProductDeleteCommand, void>(command)
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException({ message: error.message, code: error.code }, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
