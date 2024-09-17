import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

describe('PlaceController', () => {
  let placeController: PlaceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [PlaceService],
    }).compile();

    placeController = app.get<PlaceController>(PlaceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(placeController.getHello()).toBe('Hello World!');
    });
  });
});
