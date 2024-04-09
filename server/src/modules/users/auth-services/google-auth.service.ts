import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request as App_Request, Response } from 'express';
import {
  BASE_ROUTE,
  GOOGLE_PROFILE_LINK,
  GOOGLE_REVOKE_TOKEN_LINK,
  GOOGLE_TOKEN_LINK,
  GOOGLE_TOKEN_REFRESH_LINK,
} from 'src/modules/@constants';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';

interface GoogleAuthRequest extends App_Request {
  user: { accessToken: string; refreshToken: string };
}

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async googleSignIn(req: GoogleAuthRequest, res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;
    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });
    const googleProfileResponse = await this.getProfile(req.cookies['access_token']);
    await this.usersService.findOneByEmailOrCreate(googleProfileResponse.data)
    console.log(googleProfileResponse.data)
    return googleProfileResponse.data
  }
  
  googleSignOut(res: Response, refreshToken: string) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.revokeGoogleToken(refreshToken);
    res.redirect(BASE_ROUTE);
    //return instead of redirecting to base route
  }

  async getNewAccessToken(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post(GOOGLE_TOKEN_LINK, {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });

      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        'Failed to refresh the access token.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProfile(token: string): Promise<{data: CreateUserDto}> {
    try {
      return axios.get(`${GOOGLE_PROFILE_LINK}${token}`);
    } catch (error) {
      throw new HttpException(
        'Failed to revoke the token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const response = await axios.get(`${GOOGLE_TOKEN_REFRESH_LINK}${token}`);
      const expiresIn = response.data.expires_in;
      if (!expiresIn || expiresIn <= 0) {
        return true;
      }
    } catch (error) {
      throw new HttpException('Expired Access Token', HttpStatus.FORBIDDEN);
    }
  }

  async revokeGoogleToken(token: string) {
    try {
      await axios.get(`${GOOGLE_REVOKE_TOKEN_LINK}${token}`);
    } catch (error) {
      throw new HttpException(
        'Failed to revoke the token:',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
