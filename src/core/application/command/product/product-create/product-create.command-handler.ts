import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ProductCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { BaseCommandHandler } from '@common/cqrs'

@CommandHandler(ProductCreateCommand)
export class ProductCreateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(command: ProductCreateCommand): Promise<Product> {
    const product = Product.create(command)
    return this.productRepositoryService.create(product)
  }
}
