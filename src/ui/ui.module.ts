import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UISettings, UISettingsSchema,  } from './schemas/ui.schema';
import { UIService } from './ui.service';
import { UIController } from './ui.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: UISettings.name, schema: UISettingsSchema }])],
    controllers: [UIController],
  providers: [UIService],
  exports: [UIService],
})
export class UiModule {}
