import { Type } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CQRS_SKIP_TRANSFORM } from '../constant'

type D<T> = T extends Type<infer D> ? D : Record<string, any>

export function init<T extends Type<Record<string, any>>>(type: T, data: D<T>): D<T> {
  const bypassed = Object.entries(data).reduce((bypassed, [key, value]) => {
    const bypass = Reflect.getMetadata(CQRS_SKIP_TRANSFORM, type.prototype, key)
    return bypass ? { ...bypassed, [key]: value } : bypassed
  }, {})
  const instance = plainToInstance(type, data)
  Object.entries(bypassed).forEach(([key, value]) => (instance[key] = value))
  return <D<T>>instance
}
