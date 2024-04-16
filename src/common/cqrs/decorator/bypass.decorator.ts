import { applyDecorators } from '@nestjs/common'
import { Exclude } from 'class-transformer'
import { Allow } from 'class-validator'
import { CQRS_SKIP_TRANSFORM } from '../constant'

export function Bypass() {
  return applyDecorators(Allow(), Exclude(), CqrsSkipTransform())
}

function CqrsSkipTransform() {
  return function (target: object, propertyKey: string | symbol) {
    Reflect.defineMetadata(CQRS_SKIP_TRANSFORM, true, target, propertyKey)
  }
}
