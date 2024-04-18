import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete } from '@nestjs/common'
import { UserDeleteInput } from './input'
import { UserDeleteCommand } from '@core/application/command'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('user/delete')
  public async userCreate(@Body() input: UserDeleteInput): Promise<void> {
    const command = init(UserDeleteCommand, input)
    await this.commandBus.execute<UserDeleteCommand, void>(command)
  }
}
