import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * 监控请求处理耗时
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const after = Date.now();
		const ctx = context.switchToHttp();
		const request = ctx.getRequest();
		return next
			.handle()
			.pipe(
				tap(() =>
					console.dir(
						`用户 ${request.user ? request.user.username : '未登录'} 请求 ${request.url
						}，处理耗时：${Date.now() - after}ms`,
					),
				),
			);
	}
}