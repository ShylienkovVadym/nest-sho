import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { ListingCreateInput } from './input'
import { init } from '@common/cqrs'
import { ListingOutput } from 'src/interface/presenter/listing/output/listing'
import { ListingCreateCommand } from '@core/application/command'
import { Listing } from '@core/domain/listing/entity/listing'

@Controller('api/')
export class ListingCreateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('category/create')
  public async ListingCreate(@Body() input: ListingCreateInput): Promise<ListingOutput> {
    const command = init(ListingCreateCommand, input)
    const listing = await this.commandBus.execute<ListingCreateCommand, Listing>(command)
    return new ListingOutput(listing)
  }
}
