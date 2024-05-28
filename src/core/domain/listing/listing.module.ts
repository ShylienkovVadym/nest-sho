import { Module } from '@nestjs/common'
import { ListingRepositoryService } from './service'
import { DatabaseDefaultModule } from '@infrastructure/database/postgres/database-default'
import { ListingRepositoryServiceAdapter } from '@infrastructure/database/postgres/database-default/service-adapter'

@Module({
  imports: [DatabaseDefaultModule],
  providers: [{ provide: ListingRepositoryService, useExisting: ListingRepositoryServiceAdapter }],
  exports: [ListingRepositoryService],
})
export class ListingModule {}
