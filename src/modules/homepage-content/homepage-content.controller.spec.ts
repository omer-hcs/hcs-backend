import { Test, TestingModule } from '@nestjs/testing';
import { HomepageContentController } from './homepage-content.controller';

describe('HomepageContentController', () => {
  let controller: HomepageContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomepageContentController],
    }).compile();

    controller = module.get<HomepageContentController>(HomepageContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
