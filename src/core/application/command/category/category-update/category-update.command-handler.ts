import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { CategoryUpdateCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'
import { CategoryRepositoryService, CategoryRepositoryServicePort } from '@core/domain/category/service'
import { Category } from '@core/domain/category/entity/category'
import { CategoryUpdateData } from '@core/domain/category/entity/protocol'

@CommandHandler(CategoryUpdateCommand)
export class CategoryUpdateCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(
    @Inject(CategoryRepositoryService) private categoryRepositoryService: CategoryRepositoryServicePort,
  ) {
    super()
  }

  public async run(command: CategoryUpdateCommand): Promise<Category> {
    const category = await this.categoryRepositoryService.load(command.id)
    if (!category) {
      throw new AppEntityNotFoundException('Category', { id: command.id })
    }
    const updatedCategory = this.applyUpdateData(category, command)
    return this.categoryRepositoryService.update(updatedCategory)
  }

  private applyUpdateData(category: Category, data: CategoryUpdateData): Category {
    const { name, parentCategoryId } = data
    if (name) {
      category.name = name
    }
    if (parentCategoryId) {
      category.parentCategoryId = parentCategoryId
    }
    return category
  }
}
