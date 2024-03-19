import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//strong password validation

export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
