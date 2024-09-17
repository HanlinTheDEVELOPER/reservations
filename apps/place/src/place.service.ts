import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceService {
  getHello(): string {
    return 'Hello World!';
  }
}
