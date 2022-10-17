import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { HttpExceptionFilter } from './http-exception.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 验证传入的参数是否符合条件
  app.useGlobalPipes(new Validate())
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // API 前缀
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
