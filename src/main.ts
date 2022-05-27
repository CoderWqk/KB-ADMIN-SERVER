import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/libs';
import { setupSwagger } from './swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true
	});
	setupSwagger(app);

	// 耗时统计的横切面
	app.useGlobalInterceptors(new LoggingInterceptor());

	// // 全局验证
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			enableDebugMessages: true,
			disableErrorMessages: true
		})
	);

	await app.listen(3000);
	console.log('swagger running http://localhost:3000/api-docs/');
}
bootstrap();
