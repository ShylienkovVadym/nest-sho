import { IsString, Length, IsOptional } from 'class-validator'
import { CategoryCreateData } from '@core/domain/category/entity/protocol'

export class CategoryCreateCommand implements CategoryCreateData {
  @Length(1, 255)
  @IsString()
  public name: string

  @IsOptional()
  @IsString()
  public parentCategoryId?: string
}
