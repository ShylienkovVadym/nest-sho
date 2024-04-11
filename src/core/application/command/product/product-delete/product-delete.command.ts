import { ProductData } from '@core/domain/product/entity/protocol'
import { Uuid } from '@common/type'
import { IsDate, IsNumber, IsString, IsUUID, Length } from 'class-validator'

export class ProductDeleteCommand implements ProductData {
  @IsUUID()
  public id: Uuid

  @Length(1, 255)
  @IsString()
  public productName: string

  @Length(1, 2000)
  @IsString()
  public description: string

  @IsNumber()
  public price: number

  @Length(1, 255)
  @IsString()
  public brand: string

  @IsDate()
  public created: Date

  @IsDate()
  public updated: Date
}
