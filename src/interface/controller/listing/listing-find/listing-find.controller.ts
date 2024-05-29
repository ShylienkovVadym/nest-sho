import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { init } from '@common/cqrs'
import { ListingFindInput } from '@interface/controller/listing/listing-find/input'
import { ListingOutput } from 'src/interface/presenter/listing/output/listing'
import { ListingFindQuery } from '@core/application/query/listing'
import { Listing } from '@core/domain/listing/entity/listing'

@Controller('api/')
export class ListingFindController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('listings')
  public async ListingFind(@Body() input: ListingFindInput): Promise<ListingOutput[]> {
    const query = init(ListingFindQuery, input)
    const listings = await this.queryBus.execute<ListingFindQuery, Listing[]>(query)
    return listings.map((listing) => new ListingOutput(listing))
  }
}
