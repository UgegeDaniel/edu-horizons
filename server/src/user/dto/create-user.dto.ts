import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { AuthenticationStrategy } from '../utils/types';

export class CreateUserDto<Method extends AuthenticationStrategy> {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must contain the following characters A-Z, a-z, 0-9, and a special character',
    },
  )
  password: Method extends 'google' ? null : string;

  @IsNotEmpty()
  @IsString()
  given_name: string;

  @IsNotEmpty()
  @IsString()
  family_name: string;

  @IsBoolean()
  @IsOptional()
  verified_email: Method extends 'google' ? true : false;

  strategy: Method;
}
