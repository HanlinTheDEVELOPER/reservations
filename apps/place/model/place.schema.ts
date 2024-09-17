import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class PlaceDocument extends AbstractDocument {
  @Prop({ type: String, required: true })
  name: string;

  // @Prop({type: })
}

export const PlaceSchema = SchemaFactory.createForClass(PlaceDocument);
