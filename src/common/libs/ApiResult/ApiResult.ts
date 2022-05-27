import { ApiProperty } from '@nestjs/swagger';

export class ApiResult {
  constructor(status = 200, msg?: string, data?: any, total?: number) {
    this.status = status;
    this.msg = msg || 'success';
    this.data = data || null;
    this.total = total || undefined;
  }

  @ApiProperty({ type: 'number', default: 200 })
  status: number;

  @ApiProperty({ type: 'string', default: 'success' })
  msg?: string;

  data?: any;

  total?: number;

  /**
   * 带消息的成功响应
   * @param data 数据
   * @param total 数据条数
   * @param msg 消息体
   * @returns 
   */
  public static SUCCESS(data?: any, total?: number, msg?: string): ApiResult {
    return new ApiResult(200, msg, data, total);
  }

  /**
   * 带消息的错误响应
   * @param status 状态码
   * @param msg 消息体
   * @param data 数据
   * @returns 
   */
  public static ERROR(status: number, msg?: string, data?: any): ApiResult {
    return new ApiResult(status || 500, msg || 'error', data);
  }
}