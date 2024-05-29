import { Uuid } from '@common/type'
import { IsOptional, IsString, IsUUID, Length } from 'class-validator'
import { CategoryUpdateData } from '@core/domain/category/entity/protocol'

export class CategoryUpdateCommand implements CategoryUpdateData {
  @IsUUID()
  public id: Uuid

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public name?: null | string

  @IsOptional()
  @IsUUID()
  public parentCategoryId?: null | Uuid
}
