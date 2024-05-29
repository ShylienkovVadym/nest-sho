import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { init } from '@common/cqrs'
import { CategoryLoadInput } from '@interface/controller/category/category-load/input'
import { CategoryLoadQuery } from '@core/application/query/category'
import { Category } from '@core/domain/category/entity/category'
import { CategoryOutput } from '@interface/presenter/category/output/category'

@Controller('api/')
export class CategoryLoadController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('category')
  public async CategoryLoad(@Body() input: CategoryLoadInput): Promise<null | CategoryOutput> {
    const query = init(CategoryLoadQuery, input)
    const category = await this.queryBus.execute<CategoryLoadQuery, null | Category>(query)
    return category ? new CategoryOutput(category) : null
  }
}
