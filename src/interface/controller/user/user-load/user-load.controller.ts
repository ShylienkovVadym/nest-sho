import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { UserOutput } from '@interface/presenter/user/output/user'
import { User } from '@core/domain/user/entity/user'
import { UserLoadQuery } from '@core/application/query/user/user-load'
import { UserLoadInput } from '@interface/controller/user/user-load/input'
import { init } from '@common/cqrs'

@Controller('api/')
export class UserLoadController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('user')
  public async userLoad(@Body() input: UserLoadInput): Promise<null | UserOutput> {
    const query = init(UserLoadQuery, input)
    const user = await this.queryBus.execute<UserLoadQuery, null | User>(query)
    return user ? new UserOutput(user) : null
  }
}
