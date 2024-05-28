import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { init } from '@common/cqrs'
import { ListingLoadInput } from '@interface/controller/listing/listing-load/input'
import { ListingOutput } from '@interface/presenter/listing/output/product'
import { ListingLoadQuery } from '@core/application/query/listing'
import { Listing } from '@core/domain/listing/entity/listing'

@Controller('api/')
export class ListingLoadController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('listing')
  public async ListingLoad(@Body() input: ListingLoadInput): Promise<null | ListingOutput> {
    const query = init(ListingLoadQuery, input)
    const listing = await this.queryBus.execute<ListingLoadQuery, null | Listing>(query)
    return listing ? new ListingOutput(listing) : null
  }
}
