import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 验证传入的参数是否符合条件
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
