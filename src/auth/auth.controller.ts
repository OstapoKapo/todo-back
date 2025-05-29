import {
    Body,
    Controller,
    Post,
    Res,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { SignInDto } from '../dto/signIn.dto';
  import { UserService } from '../user/user.service';
  import { AuthService } from './auth.service';
  import { LogInDto } from 'src/dto/logIn.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
    ) {}
  
    @Post('signIn')
    @HttpCode(HttpStatus.CREATED)
    async register(
      @Body() dto: SignInDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      const user = await this.userService.createUser(dto);
      const token = await this.authService.generateToken(user);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
  
      return { message: 'User registered', userId: user._id };
    }

  @Post('logIn')
  @HttpCode(HttpStatus.OK)
  async logIn(
    @Body() dto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    const token = await this.authService.generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { message: 'User logged in', userId: user._id };
  }
}