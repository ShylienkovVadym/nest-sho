import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { UserUpdateInput } from './input'
import { UserUpdateCommand } from '@core/application/command'
import { User } from '@core/domain/user/entity/user'
import { UserOutput } from '@interface/presenter/user/output/user'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('user/update')
  public async userCreate(@Body() input: UserUpdateInput): Promise<UserOutput> {
    const command = init(UserUpdateCommand, input)
    const user = await this.commandBus.execute<UserUpdateCommand, User>(command)
    return new UserOutput(user)
  }
}
