import { ProductCreateData } from '@core/domain/product/entity/protocol'
import { IsNumber, IsString, Length } from 'class-validator'

export class ProductCreateCommand implements ProductCreateData {
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
}
