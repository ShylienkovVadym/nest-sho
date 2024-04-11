import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserModule } from '@core/domain/user'
import { commandHandlers } from '@core/application/command/all'
import { userControllers } from '@interface/controller/user/all'
import { ConfigModule } from '@nestjs/config'
import { queryHandlers } from '@core/application/query/all'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CqrsModule,
    UserModule,
  ],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [...userControllers],
})
export class AppModule {}
