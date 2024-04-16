import { Allow } from 'class-validator'

export class CqrsEmpty {
  @Allow()
  public readonly _?: undefined
}
