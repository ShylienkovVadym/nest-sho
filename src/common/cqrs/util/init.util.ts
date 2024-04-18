import { Type } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

type D<T> = T extends Type<infer D> ? D : Record<string, any>

export function init<T extends Type<Record<string, any>>>(type: T, data: D<T>): D<T> {
  const instance = plainToInstance(type, data)
  return <D<T>>instance
}
