import { UserUpdateData } from '@core/domain/user/entity/protocol'
import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class UserUpdateCommand implements UserUpdateData {
  @IsUUID()
  public id: Uuid

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public firstName?: null | string

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public lastName?: null | string

  @IsOptional()
  @Length(1, 255)
  @IsString()
  @IsEmail()
  public email?: null | string

  @IsOptional()
  @Length(1, 255)
  @IsString()
  public password?: null | string

  @IsOptional()
  @IsEnum(UserStatus)
  public status?: null | UserStatus
}
