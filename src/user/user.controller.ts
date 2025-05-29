import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/jwt/roles.decorator';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Response } from 'express';


@Controller('user')
export class UserController {
    constructor(
          private readonly userService: UserService,
            private readonly authService: AuthService,
    ) {}
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllUsers() {
        const users = await this.userService.findAll();
        return { message: 'all users', users: users };
    }
    @Patch('/:id')
    @UseGuards(JwtAuthGuard) // захищено, лише авторизовані
    @HttpCode(HttpStatus.OK)
    async updateUserRole(@Param('id') id: string, @Body('role') role: string, @Res({ passthrough: true }) res: Response,) {
        const updatedUser = await this.userService.updateUserRole(id, role);
        const token = await this.authService.generateToken(updatedUser);

        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        return { message: 'user role updated', user: updatedUser };
    }

    @Roles('admin')
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        const users = await this.userService.findAll();
        return{message: 'user deleted', users: users}
    }
    
}
