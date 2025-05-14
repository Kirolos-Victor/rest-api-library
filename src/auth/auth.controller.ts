import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    user: loginDto,
  ) {
    const userData = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return this.authService.login(userData);
  }

  @Post('register')
  async register(
    @Body()
    user: registerDto,
  ) {
    return this.authService.register(user);
  }
}
