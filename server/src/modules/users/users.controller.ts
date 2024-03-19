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

//alll dynamic routes ie. (:id) should be defined last
//Transform id string to number
// @Patch('id')
// update(@Param('id', ParseIntPipe)id: number){
// }

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;
    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });
    res.redirect('http://localhost:5000/users/profile');
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
    if (accessToken)
      return (await this.usersService.getProfile(accessToken)).data;
    throw new UnauthorizedException('No access token');
  }

  @Get('local/profile')
  @UseGuards(JwtAuthGuard)
  async getLocalProfile(@Request() req) {
    const user = req.user;
    console.log(user)
    if (user)
      return (await this.usersService.findOneByEmail(user.email));
    throw new UnauthorizedException('No access token');
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.usersService.revokeGoogleToken(refreshToken);
    res.redirect('http://localhost:5000/');
  }
}
