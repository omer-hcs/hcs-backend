import { Test, TestingModule } from '@nestjs/testing';
import { HomepageContentService } from './homepage-content.service';

describe('HomepageContentService', () => {
  let service: HomepageContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomepageContentService],
    }).compile();

    service = module.get<HomepageContentService>(HomepageContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
