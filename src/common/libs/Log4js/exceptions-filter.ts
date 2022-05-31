import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Logger } from './Log4js.util'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const logFormat = `
      -----------------------------------------------------------------------
      RequestOriginal: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status: ${status}
      Response: ${exception}
      -----------------------------------------------------------------------
      `
    Logger.error(logFormat)
    response.status(status).json({
      status: status,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    })
  }
}