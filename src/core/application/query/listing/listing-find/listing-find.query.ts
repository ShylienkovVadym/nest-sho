import { OrderDir } from '@common/enum'
import { IsEnum, IsInt, IsOptional } from 'class-validator'
import { ListingsFindParams } from '@core/domain/listing/service'
import { ListingFields } from '@core/domain/listing/entity/enum'

export class ListingFindQuery implements ListingsFindParams {
  @IsOptional()
  @IsEnum(ListingFields)
  public orderBy?: ListingFields

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
