import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserFindQuery } from '@core/application/query/user/user-find/user-find.query'
import { BaseQueryHandler } from '@common/cqrs'

@QueryHandler(UserFindQuery)
export class UserFindQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(query: UserFindQuery): Promise<User[]> {
    return this.userRepositoryService.find(query)
  }
}
