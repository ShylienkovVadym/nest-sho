import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { UserCreateInput } from './input'
import { UserCreateCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'
import { UserOutput } from '@interface/presenter/user/output/user'
import { User } from '@core/domain/user/entity/user'

@Controller('api/')
export class UserCreateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('product/create')
  public async userCreate(@Body() input: UserCreateInput): Promise<UserOutput> {
    const command = plainToInstance(UserCreateCommand, input)
    const user = await this.commandBus.execute<UserCreateCommand, User>(command)
    return new UserOutput(user)
  }
}
