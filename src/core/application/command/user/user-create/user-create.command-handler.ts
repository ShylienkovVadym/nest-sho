import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { UserCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { BaseCommandHandler } from '@common/cqrs'

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(command: UserCreateCommand): Promise<User> {
    const user = User.create(command)
    return this.userRepositoryService.create(user)
  }
}
