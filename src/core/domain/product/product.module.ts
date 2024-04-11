import { Module } from '@nestjs/common'
import { ProductRepositoryService } from './service'
import { DatabaseDefaultModule } from '@infrastructure/database/postgres/database-default'
import { ProductRepositoryServiceAdapter } from '@infrastructure/database/postgres/database-default/service-adapter'

@Module({
  imports: [DatabaseDefaultModule],
  providers: [{ provide: ProductRepositoryService, useExisting: ProductRepositoryServiceAdapter }],
  exports: [ProductRepositoryService],
})
export class ProductModule {}
