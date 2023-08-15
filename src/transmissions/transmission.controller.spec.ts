import { Test, TestingModule } from '@nestjs/testing';
import { TransmissionsController } from './transmissions.controller';

describe('TransmissionController', () => {
  let controller: TransmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransmissionsController],
    }).compile();

    controller = module.get<TransmissionsController>(TransmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
