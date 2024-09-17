import { Controller, Get } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  getHello(): string {
    return this.placeService.getHello();
  }
}
