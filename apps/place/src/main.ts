import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { PlaceModule } from './place.module';

async function bootstrap() {
  const app = await NestFactory.create(PlaceModule);
  app.setGlobalPrefix('api/v1');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
