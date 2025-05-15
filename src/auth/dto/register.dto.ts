import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../decorators/password-match.decorator';

export class registerDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsString()
  @Match('password')
  passwordConfirm: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
