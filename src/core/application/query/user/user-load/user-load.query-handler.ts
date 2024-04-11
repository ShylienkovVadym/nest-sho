import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserLoadQuery } from '@core/application/query/user/user-load/user-load.query'

@QueryHandler(UserLoadQuery)
export class UserLoadQueryHandler implements IQueryHandler<UserLoadQuery, null | User> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(query: UserLoadQuery): Promise<null | User> {
    return this.userRepositoryService.load(query.id)
  }
}
