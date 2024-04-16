import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { User } from '@core/domain/user/entity/user'
import { UserFindInput } from '@interface/controller/user/user-find/input'
import { UserFindQuery } from '@core/application/query'
import { UserOutput } from '@interface/presenter/user/output/user'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserFindController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('users')
  public async userCreate(@Body() input: UserFindInput): Promise<UserOutput[]> {
    const query = init(UserFindQuery, input)
    const users = await this.queryBus.execute<UserFindQuery, User[]>(query)
    return users.map((user) => new UserOutput(user))
  }
}
