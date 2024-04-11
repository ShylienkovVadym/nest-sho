import { DataSource } from 'typeorm'
import { databaseDefaultConfig } from '.'

export const connectionSourceDefault = new DataSource({
  ...databaseDefaultConfig(),
  entities: [`${__dirname}/../orm-entity/*.orm-entity.{ts,js}`],
})
