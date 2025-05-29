// src/ui/ui.controller.ts
import { Controller, Patch, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UIService } from './ui.service';
import { UpdateUISettingsDto } from '../dto/update-ui-settings.dto';
import { UISettings } from './schemas/ui.schema';

@Controller('ui')
export class UIController {
  constructor(private readonly uiService: UIService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateUI(@Body() dto: UpdateUISettingsDto): Promise<UISettings> {
    return this.uiService.updateSettings(dto);
  }

  @Get()
  async getUI(): Promise<UISettings  | null> {
    return this.uiService.getSettings();
  }
}
