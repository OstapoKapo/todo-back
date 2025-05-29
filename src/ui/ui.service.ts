// src/ui/ui.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UISettings, UISettingsDocument } from './schemas/ui.schema';
import { Model } from 'mongoose';
import { UpdateUISettingsDto } from '../dto/update-ui-settings.dto';

@Injectable()
export class UIService {
  constructor(
    @InjectModel(UISettings.name)
    private uiSettingsModel: Model<UISettingsDocument>,
  ) {}

  async updateSettings(dto: UpdateUISettingsDto): Promise<UISettings> {
    const existing = await this.uiSettingsModel.findOne();
    if (existing) {
        if (dto.tittle?.trim()) {
          existing.tittle = dto.tittle;
        }
        if (dto.footer?.trim()) {
          existing.footer = dto.footer;
        }
        return await existing.save();
      }

    const created = new this.uiSettingsModel(dto);
    return await created.save();
  }

  async getSettings(): Promise<UISettings | null> {
    return await this.uiSettingsModel.findOne();
  }
}
