import { UserStatus } from '@core/domain/user/entity/enum'
import { UserCreateData } from '@core/domain/user/entity/protocol'
import { IsEmail, IsEnum, IsString, Length } from 'class-validator'

export class UserCreateCommand implements UserCreateData {
  @Length(1, 255)
  @IsString()
  public firstName: string

  @Length(1, 255)
  @IsString()
  public lastName: string

  @Length(1, 255)
  @IsString()
  @IsEmail()
  public email: string

  @Length(1, 255)
  @IsString()
  public password: string

  @IsEnum(UserStatus)
  public status: UserStatus
}
