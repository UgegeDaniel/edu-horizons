import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  // UnauthorizedException,
  Body,
  Post,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CheckTokenExpiryGuard } from './guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
// import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthService } from './auth-services/google-auth.service';
import { LocalAuthService } from './auth-services/local-auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

//alll dynamic routes ie. (:id) should be defined last
//Transform id string to number
// @Patch('id')
// update(@Param('id', ParseIntPipe)id: number){
// }

//return profile details for either google profile or custom profile
//verify email route 
//change/forgot passowrd route (send link to email)
//change password callback route (secret sent to email and accept new password)

export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = uuidv4();
          const extension: string = file.mimetype.split('/')[1];

            cb(null, `${filename}.${extension}`)
        }
    })

}

@Controller('users')
export class UsersController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly localAuthService: LocalAuthService
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
    const newUser = await this.localAuthService.login(signinUserDto.email, signinUserDto.password);
    return newUser;
  }

  @UseGuards(CheckTokenExpiryGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      return (await this.googleAuthService.getProfile(accessToken)).data;
    }
    //   const user = req.user;
    //   if (user) return await this.usersService.findOneByEmail(user.email);
    //   throw new UnauthorizedException('No access token');
  }

  @Post('profile/update-profile')
  @UseInterceptors(FileInterceptor('file', storage))
  async updateProfile(@UploadedFile() file, @Request() req) {
    console.log(file)
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
      this.googleAuthService.googleSignOut(res, refreshToken);
  }
}
