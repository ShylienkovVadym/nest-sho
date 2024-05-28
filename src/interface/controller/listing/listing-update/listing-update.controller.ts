import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { ListingUpdateInput } from './input'
import { init } from '@common/cqrs'
import { ListingOutput } from '@interface/presenter/listing/output/product'
import { ListingUpdateCommand } from '@core/application/command'
import { Listing } from '@core/domain/listing/entity/listing'

@Controller('api/')
export class ListingUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('listing/update')
  public async ListingUpdate(@Body() input: ListingUpdateInput): Promise<ListingOutput> {
    const command = init(ListingUpdateCommand, input)
    const listing = await this.commandBus.execute<ListingUpdateCommand, Listing>(command)
    return new ListingOutput(listing)
  }
}
