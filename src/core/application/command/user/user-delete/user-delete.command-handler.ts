import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { UserDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'

@CommandHandler(UserDeleteCommand)
export class UserDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(command: UserDeleteCommand): Promise<void> {
    const user = await this.userRepositoryService.load(command.id)
    if (!user) {
      throw new AppEntityNotFoundException('User', { id: command.id })
    }
    await this.userRepositoryService.delete(user)
  }
}
