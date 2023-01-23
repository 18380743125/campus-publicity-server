import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const port = process.env["PORT"]
  await app.listen(port);
}
bootstrap();
