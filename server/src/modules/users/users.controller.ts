import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
  Body,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CheckTokenExpiryGuard } from './guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthService } from './google-auth.service';

//alll dynamic routes ie. (:id) should be defined last
//Transform id string to number
// @Patch('id')
// update(@Param('id', ParseIntPipe)id: number){
// }

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly googleAuthService: GoogleAuthService,
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
    const newUser = await this.usersService.register({
      ...createUserDto,
      role: 'unassigned',
      verified_email: false,
      strategy: 'local',
    });
    return newUser;
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      return (await this.googleAuthService.getProfile(accessToken)).data;
    }
  }

  // @Get('local/profile')
  // @UseGuards(JwtAuthGuard)
  // async getLocalProfile(@Request() req) {
  //   const user = req.user;
  //   if (user) return await this.usersService.findOneByEmail(user.email);
  //   throw new UnauthorizedException('No access token');
  // }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
      this.googleAuthService.googleSignOut(res, refreshToken);
  }
}
