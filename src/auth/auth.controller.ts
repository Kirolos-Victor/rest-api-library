import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { Public } from '../decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    user: loginDto,
  ) {
    const validatedUser = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return this.authService.signToken(validatedUser);
  }

  @Post('register')
  async register(
    @Body()
    user: registerDto,
  ) {
    return this.authService.register(user);
  }
}
