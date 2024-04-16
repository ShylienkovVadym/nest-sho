import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { UserDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { AppError } from '@common/error'
import { BaseCommandHandler } from '@common/cqrs'

@CommandHandler(UserDeleteCommand)
export class UserDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(command: UserDeleteCommand): Promise<void> {
    const user = await this.userRepositoryService.load(command.id)
    if (!user) {
      throw new AppError('User with this id does not exist.', '404')
    }
    await this.userRepositoryService.delete(user)
  }
}
