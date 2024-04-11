import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseDefaultConfig } from '@infrastructure/database/postgres/database-default/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { CqrsModule } from '@nestjs/cqrs'
import { UserOrmEntity } from 'src/infrastructure/database/postgres/database-default/orm-entity'
import { UserEntityMapper } from '@infrastructure/database/postgres/database-default/entity-mapper'
import { UserRepositoryServiceAdapter } from '@infrastructure/database/postgres/database-default/service-adapter'

@Module({
  imports: [
    ConfigModule.forFeature(databaseDefaultConfig),
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => <PostgresConnectionOptions>configService.get('databaseDefault'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  providers: [UserEntityMapper, UserRepositoryServiceAdapter],
  exports: [UserRepositoryServiceAdapter],
})
export class DatabaseDefaultModule {}
