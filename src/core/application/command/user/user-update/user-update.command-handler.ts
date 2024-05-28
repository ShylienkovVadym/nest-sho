import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { UserUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { UserRepositoryService, UserRepositoryServicePort } from '@core/domain/user/service'
import { User } from '@core/domain/user/entity/user'
import { UserUpdateData } from '@core/domain/user/entity/protocol'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'

@CommandHandler(UserUpdateCommand)
export class UserUpdateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(@Inject(UserRepositoryService) private userRepositoryService: UserRepositoryServicePort) {
    super()
  }

  public async run(command: UserUpdateCommand): Promise<User> {
    const user = await this.userRepositoryService.load(command.id)
    if (!user) {
      throw new AppEntityNotFoundException('User', { id: command.id })
    }
    const updatedUser = this.applyUpdateData(user, command)
    return this.userRepositoryService.update(updatedUser)
  }

  private applyUpdateData(user: User, data: UserUpdateData): User {
    const { firstName, lastName, email, password, status } = data
    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (email) {
      user.email = email
    }
    if (password) {
      user.password = password
    }
    if (status) {
      user.status = status
    }
    return user
  }
}
