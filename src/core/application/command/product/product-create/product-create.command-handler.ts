import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'

@CommandHandler(ProductCreateCommand)
export class ProductCreateCommandHandler implements ICommandHandler<ProductCreateCommand, Product> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(command: ProductCreateCommand): Promise<Product> {
    const product = Product.create(command)
    return this.productRepositoryService.create(product)
  }
}
