import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { AppEntityNotFoundException, ValidationException } from '@common/exception'

interface ResponseBody {
  type: string
  httpStatus: number
  message?: string
  details?: {
    entries: unknown
  }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let responseBody: ResponseBody = {
      type: 'unknown',
      httpStatus: status,
      message: 'Internal server error',
    }

    if (exception instanceof AppEntityNotFoundException) {
      status = exception.httpStatus
      responseBody = {
        type: 'entity-not-found',
        httpStatus: status,
        message: exception.message,
      }
    } else if (exception instanceof ValidationException) {
      status = HttpStatus.BAD_REQUEST
      responseBody = {
        type: exception.type,
        httpStatus: exception.httpStatus,
        details: {
          entries: exception.details ? exception.details.entries : [],
        },
      }
    }

    response.status(status).json(responseBody)
  }
}
