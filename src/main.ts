import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { HttpExceptionFilter } from '@api/filters/http-exception.filter';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument, customOptions } from '@api/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  SwaggerModule.setup('api/v1', app, createDocument(app), customOptions);

  await app.listen(3000);
}
bootstrap();
