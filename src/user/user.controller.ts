import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
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

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
        const updatedUser = await this.userService.updateUserRole(id, role);
        return { message: 'user role updated', user: updatedUser };
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        const users = await this.userService.findAll();
        return{message: 'user deleted', users: users}
    }
    
}
