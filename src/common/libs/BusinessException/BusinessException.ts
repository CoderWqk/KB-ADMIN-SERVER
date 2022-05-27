import { HttpException } from '@nestjs/common';
import { ApiResult } from '../ApiResult/ApiResult';


export class BusinessException extends HttpException {
  constructor(errorData: ApiResult) {
    super(errorData, 200);
  }

  public static throwBusinessException( payload: {code: number, message: string}) {
    throw new BusinessException(ApiResult.ERROR(payload.code, payload.message));
  }
}