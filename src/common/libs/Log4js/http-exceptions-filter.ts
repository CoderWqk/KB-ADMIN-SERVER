import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Logger } from './Log4js.util';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    const logFormat = `
        -----------------------------------------------------------------------
        RequestOriginal: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status: ${status}
        Response: ${exception.toString() + `（${exceptionResponse?.msg || exception.message}）`}
        -----------------------------------------------------------------------
        `
    Logger.info(logFormat)
    response.status(status).json({
      status: exceptionResponse?.status || exception.status,
      msg: exceptionResponse?.msg || exception.message
    })
  }
}