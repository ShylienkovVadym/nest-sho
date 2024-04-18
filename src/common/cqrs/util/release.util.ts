import { instanceToPlain } from 'class-transformer'

export function release<T extends Record<string, any>>(instance: T): T {
  const plain = instanceToPlain(instance)
  return <T>plain
}
