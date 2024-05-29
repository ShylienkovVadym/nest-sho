import { Module } from '@nestjs/common'
import { CategoryRepositoryService } from './service'
import { DatabaseDefaultModule } from '@infrastructure/database/postgres/database-default'
import { CategoryRepositoryServiceAdapter } from '@infrastructure/database/postgres/database-default/service-adapter'

@Module({
  imports: [DatabaseDefaultModule],
  providers: [{ provide: CategoryRepositoryService, useExisting: CategoryRepositoryServiceAdapter }],
  exports: [CategoryRepositoryService],
})
export class CategoryModule {}
