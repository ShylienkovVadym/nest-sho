import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { UserOutput } from '@interface/presenter/user/output/user'
import { User } from '@core/domain/user/entity/user'
import { UserLoadQuery } from '@core/application/query/user/user-load'
import { UserLoadInput } from '@interface/controller/user/user-load/input'

@Controller('api/')
export class UserLoadController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('user')
  public async userLoad(@Body() input: UserLoadInput): Promise<null | UserOutput> {
    const query = plainToInstance(UserLoadQuery, input)
    const user = await this.queryBus.execute<UserLoadQuery, null | User>(query)
    return user ? new UserOutput(user) : null
  }
}
