import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { AppError } from '@common/error'

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler implements ICommandHandler<ProductDeleteCommand, void> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(command: ProductDeleteCommand): Promise<void> {
    const product = await this.productRepositoryService.load(command.id)
    if (!product) {
      throw new AppError('Product with this id does not exist.', '404')
    }
    await this.productRepositoryService.delete(product)
  }
}
