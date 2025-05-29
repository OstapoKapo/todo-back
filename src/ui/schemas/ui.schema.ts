// src/ui/schemas/ui-settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UISettingsDocument = HydratedDocument<UISettings>;

@Schema({ collection: 'ui-settings' })
export class UISettings {
  @Prop({ required: true })
  tittle: string;

  @Prop({ required: true })
  footer: string;
}

export const UISettingsSchema = SchemaFactory.createForClass(UISettings);
