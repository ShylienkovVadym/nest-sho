import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { BaseQueryHandler } from '@common/cqrs'
import { CategoryLoadQuery } from '@core/application/query/category'
import { Category } from '@core/domain/category/entity/category'
import { CategoryRepositoryService, CategoryRepositoryServicePort } from '@core/domain/category/service'

@QueryHandler(CategoryLoadQuery)
export class CategoryLoadQueryHandler extends BaseQueryHandler<IQuery> {
  public constructor(
    @Inject(CategoryRepositoryService) private categoryRepositoryService: CategoryRepositoryServicePort,
  ) {
    super()
  }

  public async run(query: CategoryLoadQuery): Promise<null | Category> {
    return this.categoryRepositoryService.load(query.id)
  }
}
