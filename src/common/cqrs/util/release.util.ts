import { instanceToPlain } from 'class-transformer'
import { CQRS_SKIP_TRANSFORM } from '../constant'

export function release<T extends Record<string, any>>(instance: T): T {
  const bypassed = Object.entries(instance).reduce((bypassed, [key, value]) => {
    const bypass = Reflect.getMetadata(CQRS_SKIP_TRANSFORM, instance.constructor.prototype, key)
    return bypass ? { ...bypassed, [key]: value } : bypassed
  }, {})
  const plain = instanceToPlain(instance)
  Object.entries(bypassed).forEach(([key, value]) => (plain[key] = value))
  return <T>plain
}
