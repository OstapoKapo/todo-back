import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty({example: 'user@example.com', description: 'User email address'})  
  @IsEmail()
  email: string;

  @ApiProperty({example: 'strongPassword1234', description: 'User password'}) 
  @IsString()
  @MinLength(6)
  password: string;

}