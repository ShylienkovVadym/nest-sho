import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler implements ICommandHandler<ProductDeleteCommand, void> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(command: ProductDeleteCommand): Promise<void> {
    await this.productRepositoryService.delete(new Product(command))
  }
}
