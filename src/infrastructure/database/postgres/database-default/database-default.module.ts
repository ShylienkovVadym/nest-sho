import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseDefaultConfig } from '@infrastructure/database/postgres/database-default/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { CqrsModule } from '@nestjs/cqrs'
import { ormEntities } from '@infrastructure/database/postgres/database-default/orm-entity/all'
import { serviceAdapters } from '@infrastructure/database/postgres/database-default/service-adapter/all'
import { entityMappers } from '@infrastructure/database/postgres/database-default/entity-mapper/all'

@Module({
  imports: [
    ConfigModule.forFeature(databaseDefaultConfig),
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => <PostgresConnectionOptions>configService.get('databaseDefault'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...ormEntities]),
  ],
  providers: [...entityMappers, ...serviceAdapters],
  exports: [...serviceAdapters],
})
export class DatabaseDefaultModule {}
