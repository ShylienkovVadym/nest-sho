import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'

@CommandHandler(UserUpdateCommand)
export class UserUpdateCommandHandler implements ICommandHandler<UserUpdateCommand, null | User> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(command: UserUpdateCommand): Promise<null | User> {
    return this.userRepositoryService.update(command)
  }
}
