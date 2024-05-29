import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Delete } from '@nestjs/common'
import { ListingDeleteInput } from './input'
import { ListingDeleteCommand } from '@core/application/command'
import { init } from '@common/cqrs'

@Controller('api/')
export class ListingDeleteController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Delete('category/delete')
  public async ListingDelete(@Body() input: ListingDeleteInput): Promise<void> {
    const command = init(ListingDeleteCommand, input)
    await this.commandBus.execute<ListingDeleteCommand, void>(command)
  }
}
