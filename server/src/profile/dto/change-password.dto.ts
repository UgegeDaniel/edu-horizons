import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
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
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
