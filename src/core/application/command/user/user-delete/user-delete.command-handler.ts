import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'

@CommandHandler(UserDeleteCommand)
export class UserDeleteCommandHandler implements ICommandHandler<UserDeleteCommand, void> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(command: UserDeleteCommand): Promise<void> {
    await this.userRepositoryService.delete(new User(command))
  }
}
