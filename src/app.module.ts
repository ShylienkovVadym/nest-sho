import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserModule } from '@core/domain/user'
import { commandHandlers } from '@core/application/command/all'
import { ConfigModule } from '@nestjs/config'
import { queryHandlers } from '@core/application/query/all'
import { controllers } from '@interface/controller/all'
import { ProductModule } from '@core/domain/product'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CqrsModule,
    UserModule,
    ProductModule,
  ],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [...controllers],
})
export class AppModule {}
