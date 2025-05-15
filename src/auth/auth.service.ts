import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async register(user: User): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    return this.userService.create(user);
  }

  signToken(user: User) {
    const payload = { email: user.email, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid token';
      throw new UnauthorizedException(
        `Token verification failed: ${errorMessage}`,
      );
    }
  }
}
