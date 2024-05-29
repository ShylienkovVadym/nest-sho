import { CommandBus } from '@nestjs/cqrs'
import { Body, Controller, Post } from '@nestjs/common'
import { CategoryCreateInput } from './input'
import { init } from '@common/cqrs'
import { CategoryCreateCommand } from '@core/application/command/category'
import { Category } from '@core/domain/category/entity/category'

@Controller('api/')
export class CategoryCreateController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post('category/create')
  public async createCategory(@Body() input: CategoryCreateInput): Promise<Category> {
    const command = init(CategoryCreateCommand, input)
    const category = await this.commandBus.execute<CategoryCreateCommand, Category>(command)
    return await this.commandBus.execute(category)
  }
}
