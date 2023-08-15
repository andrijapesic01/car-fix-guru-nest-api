import { Test, TestingModule } from '@nestjs/testing';
import { TransmissionsService } from './transmissions.service';

describe('TransmissionService', () => {
  let service: TransmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransmissionsService],
    }).compile();

    service = module.get<TransmissionsService>(TransmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
