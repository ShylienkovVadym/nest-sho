import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { UserDeleteInput } from './input'
import { UserDeleteCommand } from '@core/application/command'
import { AppError } from '@common/error'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('user/delete')
  public async userCreate(@Body() input: UserDeleteInput): Promise<void> {
    const command = init(UserDeleteCommand, input)
    try {
      await this.commandBus.execute<UserDeleteCommand, void>(command)
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException({ message: error.message, code: error.code }, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
