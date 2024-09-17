import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaceDocument } from '../model/place.schema';

@Injectable()
export class PlaceRepository extends AbstractRepository<PlaceDocument> {
  protected readonly logger = new Logger(PlaceRepository.name);
  constructor(
    @InjectModel(PlaceDocument.name) placeModel: Model<PlaceDocument>,
  ) {
    super(placeModel);
  }
}
