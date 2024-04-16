import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserLoadQuery } from '@core/application/query/user/user-load/user-load.query'
import { BaseQueryHandler } from '@common/cqrs'

@QueryHandler(UserLoadQuery)
export class UserLoadQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(query: UserLoadQuery): Promise<null | User> {
    return this.userRepositoryService.load(query.id)
  }
}
