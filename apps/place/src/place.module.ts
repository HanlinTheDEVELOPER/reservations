import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PlaceDocument, PlaceSchema } from '../model/place.schema';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PlaceDocument.name, schema: PlaceSchema },
    ]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
