import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { CategoryCreateCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { CategoryRepositoryService, CategoryRepositoryServicePort } from '@core/domain/category/service'
import { Category } from '@core/domain/category/entity/category'

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(
    @Inject(CategoryRepositoryService) private categoryRepositoryService: CategoryRepositoryServicePort,
  ) {
    super()
  }

  public async run(command: CategoryCreateCommand): Promise<Category> {
    const category = Category.create(command)
    return this.categoryRepositoryService.create(category)
  }
}
