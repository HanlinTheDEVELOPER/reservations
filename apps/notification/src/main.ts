import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: configService.get('TCP_PORT'),
      host: '0.0.0.0',
    },
  });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
}
bootstrap();
