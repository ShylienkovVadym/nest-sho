import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserFindQuery } from '@core/application/query/user/user-find/user-find.query'

@QueryHandler(UserFindQuery)
export class UserFindQueryHandler implements IQueryHandler<UserFindQuery, User[]> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(query: UserFindQuery): Promise<User[]> {
    return this.userRepositoryService.find(query)
  }
}
