import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  Req,
  ValidationPipe,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthService } from './auth-services/local-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SigninUserDto } from './dto/signin-user.dto';
import { GoogleAuthService } from './auth-services/google-auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly localAuthService: LocalAuthService,
  ) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    this.googleAuthService.googleSignIn(req, res);
  }

  @Post('auth/local/register')
  async registerWithLocalStrategy(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    const newUser = await this.localAuthService.register(createUserDto);
    return newUser;
  }

  @Post('auth/local/login')
  async loginWithLocalStrategy(
    @Body(ValidationPipe) signinUserDto: SigninUserDto,
  ) {
    const newUser = await this.localAuthService.login(
      signinUserDto.email,
      signinUserDto.password,
    );
    return newUser;
  }

  @Post('password/change')
  requestPasswordChange(@Req() req) {
    // Logic for requesting password change
  }

  @Get('email/verify/:token')
  verifyEmailCallback(@Param('token') token: string) {
    // Logic for verifying email
  }
}
