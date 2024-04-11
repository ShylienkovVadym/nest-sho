import { UsersFindParams } from '@core/domain/user/service'
import { UserStatus } from '@core/domain/user/entity/enum'
import { OrderDir } from '@common/enum'
import { IsEnum, IsInt, IsOptional } from 'class-validator'

export class UserFindQuery implements UsersFindParams {
  @IsOptional()
  @IsEnum(UserStatus)
  public status?: UserStatus

  @IsOptional()
  @IsEnum(['firstName', 'lastName', 'status', 'created', 'updated'])
  public orderBy?: 'firstName' | 'lastName' | 'status' | 'created' | 'updated'

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
