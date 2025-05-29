import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import {CreateTodoDto} from '../dto/createTodo.dto';
import { Roles } from 'src/auth/jwt/roles.decorator';


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
  
  @Roles('admin', 'editor')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findById(id);
  }

  @Roles('admin', 'editor')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Todo>) {
    return this.todoService.update(id, updateData);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.todoService.delete(id);
    return this.todoService.findAll();
  }
}
