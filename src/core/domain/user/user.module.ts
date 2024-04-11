import { Module } from '@nestjs/common'
import { UserRepositoryService } from './service'
import { DatabaseDefaultModule } from '@infrastructure/database/postgres/database-default'
import { UserRepositoryServiceAdapter } from '@infrastructure/database/postgres/database-default/service-adapter'

@Module({
  imports: [DatabaseDefaultModule],
  providers: [{ provide: UserRepositoryService, useExisting: UserRepositoryServiceAdapter }],
  exports: [UserRepositoryService],
})
export class UserModule {}
