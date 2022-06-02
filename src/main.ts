import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { LoggingInterceptor } from './common/libs';
import { logger } from './common/libs/Log4js/Logger.middleware';
import { setupSwagger } from './swagger';
import { TransformInterceptor } from './common/libs/Log4js/Log4js.interceptor';
import { HttpExceptionsFilter } from './common/libs/log4js/http-exceptions-filter';
import { ExceptionsFilter } from './common/libs/log4js/exceptions-filter';
import { Logger } from './common/libs/Log4js/Log4js.util';

import helmet from 'helmet';

import * as express from 'express';
import * as Chalk from 'chalk';
import * as csurf from 'csurf';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true
	});
	// Swagger
	setupSwagger(app);

	// web 安全，防常见漏洞
  app.use(helmet());

	// 防止跨站请求伪造
  // 设置 csrf 保存 csrfToken
  // app.use(csurf())

	// 耗时统计的横切面
	app.useGlobalInterceptors(new LoggingInterceptor());

	// 全局验证
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			enableDebugMessages: true,
			disableErrorMessages: true
		})
	);

	// 监听所有的请求路由，并打印日志
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger)

	// 使用全局拦截器打印出参
	app.useGlobalInterceptors(new TransformInterceptor());

	// 过滤处理 http 异常
	app.useGlobalFilters(new ExceptionsFilter())
	app.useGlobalFilters(new HttpExceptionsFilter())

	await app.listen(3000);
	Logger.log(
		Chalk.green(`Nest-Admin 服务启动成功 `),
		`http://localhost:3000/`,
		'\n',
		Chalk.green('swagger 文档地址        '),
		`http://localhost:3000/api-docs/`)
}
bootstrap();
