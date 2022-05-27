import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorator/public.decorator';
import { LoginPayload } from './common/dto/loginPayload.dto';
import { ApiResult } from './common/libs';
import { AuthService } from './modules/auth/auth.service';

@Controller()
@ApiTags('ROOT')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private authService: AuthService
	) { }

	@Public()
	@Get()
	@ApiOperation({ summary: 'Hello World' })
	getHello(): string {
		return this.appService.getHello();
	}

	@Public()
	@ApiOperation({ summary: '登录' })
	@Post('auth/login')
	async login(@Body() payload: LoginPayload) {
		return ApiResult.SUCCESS(await this.authService.login(payload));
	}
}
