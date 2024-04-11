import { Module } from '@nestjs/common'
import { UserRepositoryServiceAdapter } from './service-adapter'
import { UserFileStorageService } from './service'
import { UserEntityMapper } from './entity-mapper'

@Module({
  providers: [UserRepositoryServiceAdapter, UserFileStorageService, UserEntityMapper],
  exports: [UserRepositoryServiceAdapter],
})
export class FileStorageModule {}
