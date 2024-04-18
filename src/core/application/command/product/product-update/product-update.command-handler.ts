import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { ProductUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { ProductRepositoryService, ProductRepositoryServicePort } from '@core/domain/product/service'
import { Product } from '@core/domain/product/entity/product'
import { ProductUpdateData } from '@core/domain/product/entity/protocol'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(ProductRepositoryService) private productRepositoryService: ProductRepositoryServicePort) {
    super()
  }

  public async run(command: ProductUpdateCommand): Promise<Product> {
    const product = await this.productRepositoryService.load(command.id)
    if (!product) {
      throw new AppEntityNotFoundException('Product', { id: command.id })
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
