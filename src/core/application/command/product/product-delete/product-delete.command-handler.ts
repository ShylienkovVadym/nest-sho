import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ProductDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'

@CommandHandler(ProductDeleteCommand)
export class ProductDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(command: ProductDeleteCommand): Promise<void> {
    const product = await this.productRepositoryService.load(command.id)
    if (!product) {
      throw new AppEntityNotFoundException('Product', { id: command.id })
    }
    await this.productRepositoryService.delete(product)
  }
}
