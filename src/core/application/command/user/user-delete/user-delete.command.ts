import { UserData } from '@core/domain/user/entity/protocol'
import { Uuid } from '@common/type'
import { UserStatus } from '@core/domain/user/entity/enum'
import { IsDate, IsEnum, IsString, IsUUID, Length } from 'class-validator'

export class UserDeleteCommand implements UserData {
  @IsUUID()
  public id: Uuid

  @Length(1, 255)
  @IsString()
  public firstName: string

  @Length(1, 255)
  @IsString()
  public lastName: string

  @IsEnum(UserStatus)
  public status: UserStatus

  @IsDate()
  public created: Date

  @IsDate()
  public updated: Date
}
