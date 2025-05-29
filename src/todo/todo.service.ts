import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(data: any): Promise<TodoDocument> {
    const created = new this.todoModel(data);
    return created.save();
  }

  async findAll(): Promise<TodoDocument[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: string, updateData: Partial<TodoDocument>): Promise<TodoDocument> {
    const updated = await this.todoModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new NotFoundException('Todo not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.todoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Todo not found');
  }
}
