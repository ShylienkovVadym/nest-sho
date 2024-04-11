import { Injectable } from '@nestjs/common'
import { ProductOrmEntity } from '@infrastructure/database/postgres/database-default/orm-entity/product.orm-entity'
import { Product } from 'src/core/domain/product/entity/product'
import { PRODUCT_ID_NEW } from '@core/domain/product/entity/constant'

@Injectable()
export class ProductEntityMapper {
  public toDomain(entity: ProductOrmEntity): Product {
    return new Product({
      id: entity.id,
      productName: entity.productName,
      description: entity.description,
      price: entity.price,
      brand: entity.brand,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    })
  }

  public toPersistence(entity: Product): Partial<ProductOrmEntity> {
    return {
      id: PRODUCT_ID_NEW != entity.id ? entity.id : undefined,
      productName: entity.productName,
      description: entity.description,
      price: entity.price,
      brand: entity.brand,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    }
  }
}
