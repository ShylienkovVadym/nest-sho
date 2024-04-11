import { ProductUpdateData } from '@core/domain/product/entity/protocol'
import { Uuid } from '@common/type'
import { IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class ProductUpdateCommand implements ProductUpdateData {
  @IsUUID()
  public id: Uuid

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public productName: string

  @IsOptional()
  @Length(1, 2000)
  @IsString()
  public description: string

  @IsOptional()
  @IsNumber()
  public price: number

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public brand: string
}
