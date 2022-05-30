import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException, ErrorCode } from 'src/common/libs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // 在这里添加自定义的身份证校验
    // 比如调用super.login（请求）来建立会话。
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // 你可以根据参数 info、err 抛出异常
    if (err || !user) {
      BusinessException.throwBusinessException(ErrorCode.ERR_10003());
    }

    return user;
  }
}
