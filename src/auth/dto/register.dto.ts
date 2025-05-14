import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../common/password-match.decorator';

export class registerDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @Match('password')
  passwordConfirm: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
