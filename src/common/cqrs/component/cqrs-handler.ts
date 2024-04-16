import { ICommand, IQuery } from '@nestjs/cqrs'
import { validate } from 'class-validator'
import { ValidationExceptionFactory } from '../../exception/factory'
import { release } from '../util'

export abstract class CqrsHandler<T extends ICommand | IQuery = ICommand | IQuery> {
  public abstract run(commandOrQuery: T): unknown

  public async execute(commandOrQuery: T): Promise<unknown> {
    await this.validate(commandOrQuery)
    return this.run(release(commandOrQuery))
  }

  private async validate(commandOrQuery: T): Promise<void> {
    const errors = await validate(commandOrQuery, { whitelist: true, forbidNonWhitelisted: true })
    if (errors.length) {
      throw ValidationExceptionFactory.fromValidationErrors(errors)
    }
  }
}
