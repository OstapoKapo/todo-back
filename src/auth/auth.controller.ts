import {
    Body,
    Controller,
    Post,
    Res,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    Req,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { SignInDto } from '../dto/signIn.dto';
  import { UserService } from '../user/user.service';
  import { AuthService } from './auth.service';
  import { LogInDto } from 'src/dto/logIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './jwt/jwt.guard';
import { Request } from 'express';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
  
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request & { user: UserDocument }) {
    const user = await this.userService.findByEmail(req.user.email);
    return  user 
   }

   @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token'); // або як у тебе називається кука
    return { message: 'Logged out successfully' };
}
} 

