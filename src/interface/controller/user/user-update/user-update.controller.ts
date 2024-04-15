import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { UserUpdateInput } from './input'
import { ProductUpdateCommand, UserUpdateCommand } from '@core/application/command'
import { plainToInstance } from 'class-transformer'
import { User } from '@core/domain/user/entity/user'
import { UserOutput } from '@interface/presenter/user/output/user'
import { Product } from '@core/domain/product/entity/product'
import { ProductOutput } from '@interface/presenter/user/output/product'
import { AppError } from '@common/error'

@Controller('api/')
export class UserUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('user/update')
  public async userCreate(@Body() input: UserUpdateInput): Promise<UserOutput> {
    const command = plainToInstance(UserUpdateCommand, input)
    try {
      const user = await this.commandBus.execute<UserUpdateCommand, User>(command)
      return new UserOutput(user)
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException({ message: error.message, code: error.code }, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
