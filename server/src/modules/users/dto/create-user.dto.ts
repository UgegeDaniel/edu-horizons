import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

//strong password validation
//minimum characters for the name

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  given_name?: string;

  @IsOptional()
  @IsString()
  family_name?: string;
  
  @IsOptional()
  @IsString()
  picture?: string;
  
  // @IsNotEmpty()
  // @IsEnum(['admin', 'tutor', 'student', 'unasssigned'], {message: "Please provide a valid role"})
  // role: 'admin' | 'tutor' | 'student' | 'unassigned';

  // @IsNotEmpty()
  // @IsEnum(['google', 'local'], {message: "Invalid strategy"})
  // strategy: 'google' | 'local';
}
