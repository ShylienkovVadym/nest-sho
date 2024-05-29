import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { CategoryUpdateInput } from './input'
import { init } from '@common/cqrs'
import { CategoryUpdateCommand } from '@core/application/command'
import { Category } from '@core/domain/category/entity/category'
import { CategoryOutput } from '@interface/presenter/category/output/category'

@Controller('api/')
export class CategoryUpdateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('category/update')
  public async CategoryUpdate(@Body() input: CategoryUpdateInput): Promise<CategoryOutput> {
    const command = init(CategoryUpdateCommand, input)
    const category = await this.commandBus.execute<CategoryUpdateCommand, Category>(command)
    return new CategoryOutput(category)
  }
}
