import { ProductsFindParams } from '@core/domain/product/service'
import { OrderDir } from '@common/enum'
import { IsEnum, IsInt, IsOptional } from 'class-validator'

export class ProductFindQuery implements ProductsFindParams {
  @IsOptional()
  @IsEnum(['productName', 'description', 'price', 'brand', 'created', 'updated'])
  public orderBy?: 'productName' | 'description' | 'price' | 'brand' | 'created' | 'updated'

  @IsOptional()
  @IsEnum(OrderDir)
  public orderDir?: OrderDir

  @IsOptional()
  @IsInt()
  public take?: number

  @IsOptional()
  @IsInt()
  public skip?: number
}
