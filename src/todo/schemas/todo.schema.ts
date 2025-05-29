// src/ui/schemas/ui-settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ collection: 'todo' })
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdTime: number;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: false })
  author: string;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);
