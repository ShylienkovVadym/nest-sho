import { Uuid } from '@common/type'
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator'
import { ListingUpdateData } from '@core/domain/listing/entity/protocol'
import { ListingCondition } from '@core/domain/listing/entity/enum'

export class ListingUpdateCommand implements ListingUpdateData {
  @IsUUID()
  public id: Uuid

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public title?: null | string

  @IsOptional()
  @Length(1, 2000)
  @IsString()
  public description?: null | string

  @IsOptional()
  @IsNumber()
  public price?: null | number

  @IsOptional()
  @IsEnum(ListingCondition)
  public condition?: null | ListingCondition
}
