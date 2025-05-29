import { Test, TestingModule } from '@nestjs/testing';
import { UIService } from './ui.service';

describe('UiService', () => {
  let service:  UIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UIService],
    }).compile();

    service = module.get<UIService>(UIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
