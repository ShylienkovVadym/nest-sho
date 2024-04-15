import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserUpdateData } from '@core/domain/user/entity/protocol'
import { AppError } from '@common/error'

@CommandHandler(UserUpdateCommand)
export class UserUpdateCommandHandler implements ICommandHandler<UserUpdateCommand, User> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {}

  public async execute(command: UserUpdateCommand): Promise<User> {
    const user = await this.userRepositoryService.load(command.id)
    if (!user) {
      throw new AppError('User with this id does not exist.', '404')
    }
    const updatedUser = this.applyUpdateData(user, command)
    return this.userRepositoryService.update(updatedUser)
  }

  private applyUpdateData(user: User, data: UserUpdateData): User {
    const { firstName, lastName, status } = data
    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (status) {
      user.status = status
    }
    return user
  }
}
