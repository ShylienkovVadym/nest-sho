import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler implements ICommandHandler<ProductUpdateCommand, null | Product> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(command: ProductUpdateCommand): Promise<null | Product> {
    return this.productRepositoryService.update(command)
  }
}
