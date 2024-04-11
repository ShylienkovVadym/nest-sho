import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'

config()

// eslint-disable-next-line
;(async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(3200)
})()
