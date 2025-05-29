import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({example: 'create ts', description: 'name for task'})  
  @IsString()
  name: string;

  @ApiProperty({example: 'ostapokapo', description: 'author of task'}) 
  @IsString()
  author: string;

  @ApiProperty({example: '10/06', description: 'Deadline'})
  @IsString()
  deadline: string;

  @ApiProperty({example: '3123313', description: 'Time from start'})
  @IsNumber()
  createdTime: number ;
}