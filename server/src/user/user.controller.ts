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
  Response
} from '@nestjs/common';
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
import { AuthenticatedUser, UserRole } from './utils/types';
import { Verified } from 'src/auth/guards/verified.guard';
import { GoogleOAuthGuard } from 'src/auth/guards/google-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly localAuthService: LocalAuthService,
  ) { }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() { }

  @Get('auth/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginCallback(@Request() req, @Response() res) {
    const { jwt_token, ...googleUser } = await this.googleAuthService.googleSignIn(req.user);
    res.cookie('jwt', jwt_token, { httpOnly: true });
    res.redirect('http://localhost:4200');
    return googleUser;
  }

  @Get('auth/verify-token')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Request() req, @Response() res) {
    try {
      const authenticatedUser = await this.localAuthService.findUserWithProfile(req.user.id);
      res.json(authenticatedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  @Get('auth/sign-out')
  @UseGuards(JwtAuthGuard)
  async signOut(@Request() _req, @Response() res) {
    try {
      res.cookie('jwt', '', { expires: new Date(0), path: '/' });
      res.redirect('http://localhost:4200');
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


  @Post('auth/local/register')
  async registerWithLocalStrategy(
    @Body(ValidationPipe) createUserDto: CreateUserDto<'local'>,
    @Response() res
  ) {
    const {jwt_token, ...newUser} = await this.localAuthService.register(createUserDto);
    res.cookie('jwt', jwt_token, { httpOnly: true });
    res.status(302).redirect('http://localhost:4200');
    return newUser
  }

  @Post('auth/local/login')
  @UseGuards(LocalAuthGuard)
  async loginWithLocalStrategy(
    @Body(ValidationPipe) signinUserDto: SigninUserDto,
    @Response() res
  ) {
    const {jwt_token, ...user} = await this.localAuthService.login(
      signinUserDto.email,
      signinUserDto.password,
    );
    res.cookie('jwt', jwt_token, { httpOnly: true });
    res.redirect('http://localhost:4200');
    return user
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
  ): Promise<{ role: UserRole }> {
    return await this.localAuthService.updateUserRole(
      req.user.id,
      updateRoleDto.role,
    );
  }
}
