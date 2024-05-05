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
import { AuthGuard } from '@nestjs/passport';
import { SigninUserDto } from './dto/signin-user.dto';
import { GoogleAuthService } from 'src/auth/google-auth.service';
import { LocalAuthService } from 'src/auth/local-auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ForgotPasswordDto,
  PasswordChangeRequestDto,
} from './dto/forgot-password.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthenticatedUser, User, UserRoles } from './utils/types';
import { Verified } from 'src/auth/guards/verified.guard';

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
  googleLoginCallback(
    @Request() req,
    @Res() res: Response,
  ): Promise<AuthenticatedUser> {
    return this.googleAuthService.googleSignIn(req, res);
  }

  @Post('auth/local/register')
  async registerWithLocalStrategy(
    @Body(ValidationPipe) createUserDto: CreateUserDto<'local'>,
  ): Promise<AuthenticatedUser> {
    const newUser = await this.localAuthService.register(createUserDto);
    return newUser;
  }

  @Post('auth/local/login')
  @UseGuards(LocalAuthGuard)
  async loginWithLocalStrategy(
    @Body(ValidationPipe) signinUserDto: SigninUserDto,
  ): Promise<AuthenticatedUser> {
    const newUser = await this.localAuthService.login(
      signinUserDto.email,
      signinUserDto.password,
    );
    return newUser;
  }

  @Post('request-password-change')
  async requestPasswordChange(
    @Body(ValidationPipe) passwordChangeRequestDto: PasswordChangeRequestDto,
  ): Promise<{ message: string }> {
    return await this.localAuthService.requestPasswordChange(
      passwordChangeRequestDto,
    );
  }

  @Post('forgot-password/:token')
  async forgotPasswordReset(
    @Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto,
    @Param('token') token: string,
  ): Promise<{ message: string }> {
    return this.localAuthService.forgotPasswordReset(forgotPasswordDto, token);
  }

  @Get('verify-email/:token')
  @UseGuards(JwtAuthGuard)
  async verifyEmailCallback(
    @Req() req,
    @Param('token') token: string,
  ): Promise<{ verified_email: boolean }> {
    const verifiedUser = await this.localAuthService.verifyUserEmail(
      req.user.id,
      token,
    );
    return verifiedUser;
  }

  @Post('update-user-role')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  async updateUserRole(
    @Req() req,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ): Promise<{ role: UserRoles }>{
    return await this.localAuthService.updateUserRole(
      req.user.id,
      updateRoleDto.role,
    );
  }
}
