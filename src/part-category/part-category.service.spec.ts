import { Test, TestingModule } from '@nestjs/testing';
import { PartCategoryService } from './part-category.service';

describe('PartCategoryService', () => {
  let service: PartCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartCategoryService],
    }).compile();

    service = module.get<PartCategoryService>(PartCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
