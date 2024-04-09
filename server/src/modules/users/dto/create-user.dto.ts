import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

//strong password validation
//minimum characters for the name

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  given_name?: string;

  @IsOptional()
  @IsString()
  family_name?: string;
  
  @IsOptional()
  @IsString()
  picture?: string;
}
