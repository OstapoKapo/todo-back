import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import {CreateTodoDto} from '../dto/createTodo.dto';
import { Roles } from 'src/auth/jwt/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/jwt/jwt.guard';


interface createTodo {
    name: string;
    deadline: string;
    author?: string;
    createdTime?: number;
}
@Controller('todos')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.todoService.findById(id);
  }


  @Patch(':id')
  @Roles('admin', 'editor')
  update(@Param('id') id: string, @Body() updateData: Partial<Todo>) {
    return this.todoService.update(id, updateData);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    this.todoService.delete(id);
    return this.todoService.findAll();
  }
}
