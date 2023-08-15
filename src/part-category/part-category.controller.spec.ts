import { Test, TestingModule } from '@nestjs/testing';
import { PartCategoryController } from './part-category.controller';

describe('PartCategoryController', () => {
  let controller: PartCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartCategoryController],
    }).compile();

    controller = module.get<PartCategoryController>(PartCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
