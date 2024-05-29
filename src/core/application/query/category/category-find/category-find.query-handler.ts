import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { BaseQueryHandler } from '@common/cqrs'
import { Category } from '@core/domain/category/entity/category'
import { CategoryFindQuery } from '@core/application/query/category'
import { CategoryRepositoryService, CategoryRepositoryServicePort } from '@core/domain/category/service'

@QueryHandler(CategoryFindQuery)
export class CategoryFindQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(
    @Inject(CategoryRepositoryService) private categoryRepositoryService: CategoryRepositoryServicePort,
  ) {
    super()
  }

  public async run(query: CategoryFindQuery): Promise<Category[]> {
    return this.categoryRepositoryService.find(query)
  }
}
