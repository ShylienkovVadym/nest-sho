import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete } from '@nestjs/common'
import { CategoryDeleteInput } from './input'
import { CategoryDeleteCommand } from '@core/application/command'
import { init } from '@common/cqrs'

@Controller('api/')
export class CategoryDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('category/delete')
  public async ListingDelete(@Body() input: CategoryDeleteInput): Promise<void> {
    const command = init(CategoryDeleteCommand, input)
    await this.commandBus.execute<CategoryDeleteCommand, void>(command)
  }
}
