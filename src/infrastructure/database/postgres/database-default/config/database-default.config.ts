import { registerAs } from '@nestjs/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
//import { config } from 'dotenv'

//config()

export const databaseDefaultConfig: () => PostgresConnectionOptions = registerAs('databaseDefault', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  autoLoadEntities: true,
  migrations: [`${__dirname}/../migration/*.{ts,js}`],
  migrationsRun: true,
  //logging: true,
}))
