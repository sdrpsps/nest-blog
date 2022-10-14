import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 验证传入的参数是否符合条件
  app.useGlobalPipes(new Validate())
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
}
bootstrap();
