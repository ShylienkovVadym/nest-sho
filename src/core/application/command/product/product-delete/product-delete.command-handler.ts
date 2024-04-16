import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ProductDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { AppError } from '@common/error'
import { BaseCommandHandler } from '@common/cqrs'

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(command: ProductDeleteCommand): Promise<void> {
    const product = await this.productRepositoryService.load(command.id)
    if (!product) {
      throw new AppError('Product with this id does not exist.', '404')
    }
    await this.productRepositoryService.delete(product)
  }
}
