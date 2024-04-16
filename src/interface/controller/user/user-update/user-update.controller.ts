import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { UserUpdateInput } from './input'
import { UserUpdateCommand } from '@core/application/command'
import { User } from '@core/domain/user/entity/user'
import { UserOutput } from '@interface/presenter/user/output/user'
import { AppError } from '@common/error'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('user/update')
  public async userCreate(@Body() input: UserUpdateInput): Promise<UserOutput> {
    const command = init(UserUpdateCommand, input)
    try {
      const user = await this.commandBus.execute<UserUpdateCommand, User>(command)
      return new UserOutput(user)
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException({ message: error.message, code: error.code }, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
