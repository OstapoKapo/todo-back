import { Test, TestingModule } from '@nestjs/testing';
import { UIController } from './ui.controller';

describe('UiController', () => {
  let controller: UIController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UIController],
    }).compile();

    controller = module.get<UIController>(UIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
