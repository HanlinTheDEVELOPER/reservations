import { NestFactory } from '@nestjs/core';
import { PlaceModule } from './place.module';

async function bootstrap() {
  const app = await NestFactory.create(PlaceModule);
  await app.listen(3000);
}
bootstrap();
