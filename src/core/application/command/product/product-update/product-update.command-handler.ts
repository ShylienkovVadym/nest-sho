import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductUpdateData } from '@core/domain/product/entity/protocol'
import { AppError } from '@common/error'

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler implements ICommandHandler<ProductUpdateCommand, null | Product> {
  public constructor(
    @Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort,
  ) {}

  public async execute(command: ProductUpdateCommand): Promise<Product> {
    const product = await this.productRepositoryService.load(command.id)
    if (!product) {
      throw new AppError('Product with this id does not exist.', '404')
    }
    const updatedProduct = this.applyUpdateData(product, command)
    return this.productRepositoryService.update(updatedProduct)
  }

  private applyUpdateData(product: Product, data: ProductUpdateData): Product {
    const { productName, description, price, brand } = data
    if (productName) {
      product.productName = productName
    }
    if (description) {
      product.description = description
    }
    if (price) {
      product.price = price
    }
    if (brand) {
      product.brand = brand
    }
    return product
  }
}
