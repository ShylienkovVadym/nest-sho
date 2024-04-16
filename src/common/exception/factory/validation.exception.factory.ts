import { ValidationError } from '@nestjs/common'
import { ValidationEntry, ValidationException } from '../../exception'
import { Int } from '../../type'

type Path = Array<Int | string>

export class ValidationExceptionFactory {
  public static fromValidationErrors(errors: ValidationError[]): ValidationException {
    const entries = this.getEntriesFromErrors(errors)
    return new ValidationException(...entries)
  }

  private static getEntriesFromErrors(errors: ValidationError[]): ValidationEntry[] {
    return (<ValidationEntry[]>[]).concat(...errors.map((error) => this.getEntriesFromError(error)))
  }

  private static getEntriesFromError(error: ValidationError, path: Path = []): ValidationEntry[] {
    const entries: ValidationEntry[] = []
    const key = Array.isArray(error.target) ? +error.property : error.property
    path = [...path, key]
    if (error.children?.length) {
      error.children.map((error) => entries.push(...this.getEntriesFromError(error, path)))
    } else if (error.constraints) {
      const property = this.getProperty(path)
      const { value } = error
      const constraints = this.prepareConstraints(error.property, error.constraints)
      entries.push({ property, value, constraints })
    }
    return entries
  }

  private static getProperty(path: Path): string {
    return path
      .map((key) => ('number' === typeof key ? `[${key}]` : `.${key}`))
      .join('')
      .replace(/^\./, '')
  }

  private static prepareConstraints(property: string, constraints: Record<string, string>): Record<string, string> {
    return Object.entries(constraints).reduce((constraints, [id, message]) => {
      if ('whitelistValidation' === id) {
        id = 'unexpectedProperty'
      }
      message =
        message
          .replace(new RegExp(`^All ${property}'s elements `), 'All elements ')
          .replace(new RegExp(`^each value in ${property} `), 'Each value ')
          .replace(new RegExp(`^${property} `), 'Value ')
          .replace(new RegExp(`^property ${property} should not exist$`), 'Property should not exist')
          .replace(/\.+$/, '') + '.'
      return { ...constraints, [id]: message }
    }, {})
  }
}
