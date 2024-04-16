import { HttpStatus } from '@nestjs/common'
import { AppException } from '.'

export class AppEntityNotFoundException extends AppException {
  public readonly httpStatus: HttpStatus = HttpStatus.NOT_FOUND

  public constructor(type: string, identity: Record<string, unknown>) {
    super('entity-not-found', 'Entity not found.')
    this.details = { type, identity }
  }
}
