import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { AllExceptionFilter } from './filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('/api/v1');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  // cookies
  app.use(cookieParser());

  // 静态目录
  app.useStaticAssets(path.join(__dirname, 'images'));

  const port = process.env['PORT'];
  await app.listen(port);
}
bootstrap();
