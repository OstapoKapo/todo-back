import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
          private readonly userService: UserService,
    ) {}
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllUsers() {
        const users = await this.userService.findAll();
        return { message: 'all users', users: users };
    }
    
}
