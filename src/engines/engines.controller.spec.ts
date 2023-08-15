import { Test, TestingModule } from '@nestjs/testing';
import { EnginesController } from './engines.controller';

describe('EnginesController', () => {
  let controller: EnginesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnginesController],
    }).compile();

    controller = module.get<EnginesController>(EnginesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
