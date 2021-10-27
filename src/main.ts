import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: config.CORS_OPTIONS,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // Use '/api' for general prefix
  app.setGlobalPrefix('api');

  const port = process.env.port || 3000;
  await app.listen(port);
  Logger.log(`Server is now listening on port ${port}...`);
}

bootstrap().then().catch();
