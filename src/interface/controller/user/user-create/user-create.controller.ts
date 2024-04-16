import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { UserCreateInput } from './input'
import { UserCreateCommand } from '@core/application/command'
import { UserOutput } from '@interface/presenter/user/output/user'
import { User } from '@core/domain/user/entity/user'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserCreateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('user/create')
  public async userCreate(@Body() input: UserCreateInput): Promise<UserOutput> {
    const command = init(UserCreateCommand, input)
    const user = await this.commandBus.execute<typeof command, User>(command)
    return new UserOutput(user)
  }
}
