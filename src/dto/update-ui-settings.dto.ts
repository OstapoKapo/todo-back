import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUISettingsDto {
  @ApiProperty({example: 'My Application', description: 'Title of the application'})  
  @IsString()
  tittle: string;
 
  @ApiProperty({example: 'Welcome to My Application', description: 'Footer of the application'})
  @IsString()
  footer: string;
}