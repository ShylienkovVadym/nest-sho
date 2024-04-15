import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { ProductUpdateInput } from './input'
import { ProductUpdateCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'
import { Product } from '@core/domain/product/entity/product'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { AppError } from '@common/error'

@Controller('api/')
export class ProductUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('product/update')
  public async ProductCreate(@Body() input: ProductUpdateInput): Promise<ProductOutput> {
    const command = plainToInstance(ProductUpdateCommand, input)
    try {
      const product = await this.commandBus.execute<ProductUpdateCommand, Product>(command)
      return new ProductOutput(product)
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException({ message: error.message, code: error.code }, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
