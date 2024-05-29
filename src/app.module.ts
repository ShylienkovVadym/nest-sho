import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserModule } from '@core/domain/user'
import { commandHandlers } from '@core/application/command/all'
import { ConfigModule } from '@nestjs/config'
import { queryHandlers } from '@core/application/query/all'
import { controllers } from '@interface/controller/all'
import { ListingModule } from '@core/domain/listing'
import { CategoryModule } from '@core/domain/category'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CqrsModule,
    UserModule,
    ListingModule,
    CategoryModule,
  ],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [...controllers],
})
export class AppModule {}
