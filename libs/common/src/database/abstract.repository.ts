import { Logger, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: Partial<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: Partial<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndUpdate(
    filterQuery: Partial<TDocument>,
    update: Partial<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(
        filterQuery,
        { $set: update, $inc: { __v: 1 } },
        { new: true },
      )
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new Error('Document not found.');
    }

    return document;
  }

  async findOneAndDelete(filterQuery: Partial<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
