import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { AppError } from '@common/error'

@CommandHandler(UserDeleteCommand)
export class UserDeleteCommandHandler implements ICommandHandler<UserDeleteCommand, void> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(command: UserDeleteCommand): Promise<void> {
    const user = await this.userRepositoryService.load(command.id)
    if (!user) {
      throw new AppError('User with this id does not exist.', '404')
    }
    await this.userRepositoryService.delete(user)
  }
}
