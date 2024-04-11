export class AppError extends Error {
  public readonly code: string

  public constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
