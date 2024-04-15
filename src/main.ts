import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'
import { ValidationPipe } from '@nestjs/common'

config()

// eslint-disable-next-line
;(async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(3200)
})()
