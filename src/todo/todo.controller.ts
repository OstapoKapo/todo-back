import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import {CreateTodoDto} from '../dto/createTodo.dto';


interface createTodo {
    name: string;
    deadline: string;
    author?: string;
    createdTime?: number;
}
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/')
  create(@Body() body: createTodo) {
    console.log('Creating todo with body:', body);
    this.todoService.create(body);
    return this.todoService.findAll();
  }

  @Get('/all')
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Todo>) {
    return this.todoService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.todoService.delete(id);
    return this.todoService.findAll();
  }
}
