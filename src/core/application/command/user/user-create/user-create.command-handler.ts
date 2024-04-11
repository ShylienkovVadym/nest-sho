import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler implements ICommandHandler<UserCreateCommand, User> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(command: UserCreateCommand): Promise<User> {
    const user = User.create(command)
    return this.userRepositoryService.create(user)
  }
}
