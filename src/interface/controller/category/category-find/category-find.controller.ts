import { QueryBus } from '@nestjs/cqrs'
import { Body, Controller, Get } from '@nestjs/common'
import { init } from '@common/cqrs'
import { CategoryFindInput } from '@interface/controller/category/category-find/input'
import { Category } from '@core/domain/category/entity/category'
import { CategoryFindQuery } from '@core/application/query/category'
import { CategoryOutput } from '@interface/presenter/category/output/category'

@Controller('api/')
export class CategoryFindController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('categories')
  public async CategoryFind(@Body() input: CategoryFindInput): Promise<CategoryOutput[]> {
    const query = init(CategoryFindQuery, input)
    const categories = await this.queryBus.execute<CategoryFindQuery, Category[]>(query)
    return categories.map((category) => new CategoryOutput(category))
  }
}
