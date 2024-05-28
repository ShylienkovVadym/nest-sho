import { IsEnum, IsNumber, IsString, Length } from 'class-validator'
import { ListingCondition } from '@core/domain/listing/entity/enum'
import { ListingCreateData } from '@core/domain/listing/entity/protocol'

export class ListingCreateCommand implements ListingCreateData {
  @Length(1, 255)
  @IsString()
  public title: string

  @Length(1, 2000)
  @IsString()
  public description: string

  @IsNumber()
  public price: number

  @IsEnum(ListingCondition)
  public condition: ListingCondition
}
