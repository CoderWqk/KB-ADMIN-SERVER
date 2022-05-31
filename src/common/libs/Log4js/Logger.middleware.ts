import { Request, Response } from 'express';
import { Logger } from './Log4js.util';

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  //响应状态码
  const code = res.statusCode;
  
  // 组装日志信息
  const logFormat =
    ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  RequestOriginal: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  StatusCode: ${code}
  Parmas: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;

  next();
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    console.log(logFormat);

    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}