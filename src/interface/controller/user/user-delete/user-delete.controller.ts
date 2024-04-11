import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete } from '@nestjs/common'
import { UserDeleteInput } from './input'
import { UserDeleteCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'

@Controller('api/')
export class UserDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('user/delete')
  public async userCreate(@Body() input: UserDeleteInput): Promise<void> {
    const command = plainToInstance(UserDeleteCommand, input)
    await this.commandBus.execute<UserDeleteCommand, void>(command)
  }
}
