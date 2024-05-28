import { Injectable } from '@nestjs/common'
import { Listing } from '@core/domain/listing/entity/listing'
import { LISTING_ID_NEW } from '@core/domain/listing/entity/constant'
import { ListingOrmEntity } from '@infrastructure/database/postgres/database-default/orm-entity'

@Injectable()
export class ListingEntityMapper {
  public toDomain(entity: ListingOrmEntity): Listing {
    return new Listing({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      price: entity.price,
      condition: entity.condition,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    })
  }

  public toPersistence(entity: Listing): Partial<ListingOrmEntity> {
    return {
      id: LISTING_ID_NEW != entity.id ? entity.id : undefined,
      title: entity.title,
      description: entity.description,
      price: entity.price,
      condition: entity.condition,
      created: new Date(entity.created),
      updated: new Date(entity.updated),
    }
  }
}
