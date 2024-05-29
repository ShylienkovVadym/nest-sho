import { CommandHandler, ICommand } from '@nestjs/cqrs'
import { CategoryDeleteCommand } from '.'
import { Inject } from '@nestjs/common'
import { BaseCommandHandler } from '@common/cqrs'
import { AppEntityNotFoundException } from '@common/exception'
import { CategoryRepositoryService, CategoryRepositoryServicePort } from '@core/domain/category/service'

@CommandHandler(CategoryDeleteCommand)
export class CategoryDeleteCommandHandler extends BaseCommandHandler<ICommand> {
  public constructor(
    @Inject(CategoryRepositoryService) private categoryRepositoryService: CategoryRepositoryServicePort,
  ) {
    super()
  }

  public async run(command: CategoryDeleteCommand): Promise<void> {
    const category = await this.categoryRepositoryService.load(command.id)
    if (!category) {
      throw new AppEntityNotFoundException('Category', { id: command.id })
    }
    await this.categoryRepositoryService.delete(category)
  }
}
