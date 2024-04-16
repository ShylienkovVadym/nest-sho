import { ProductsFindParams } from '@core/domain/product/service'
import { OrderDir } from '@common/enum'
import { IsEnum, IsInt, IsOptional } from 'class-validator'
import { ProductFields } from '@core/domain/product/entity/enum'

export class ProductFindQuery implements ProductsFindParams {
  @IsOptional()
  @IsEnum(ProductFields)
  public orderBy?: ProductFields

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
