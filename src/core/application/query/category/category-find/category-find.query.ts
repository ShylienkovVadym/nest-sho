import { OrderDir } from '@common/enum'
import { IsEnum, IsInt, IsOptional } from 'class-validator'
import { CategoryFields } from '@core/domain/category/entity/enum'
import { CategoriesFindParams } from '@core/domain/category/service'

export class CategoryFindQuery implements CategoriesFindParams {
  @IsOptional()
  @IsEnum(CategoryFields)
  public orderBy?: CategoryFields

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
