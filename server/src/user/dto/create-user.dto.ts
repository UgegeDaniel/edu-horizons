import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

//strong password validation
//minimum characters for the name

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  given_name?: string;

  @IsString()
  family_name?: string;
}
