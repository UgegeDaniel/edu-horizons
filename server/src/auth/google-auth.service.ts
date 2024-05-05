import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Request as App_Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser, UserFromDb } from 'src/user/utils/types';
import {
  BASE_ROUTE,
  GOOGLE_TOKEN_LINK,
  GOOGLE_PROFILE_LINK,
  GOOGLE_TOKEN_REFRESH_LINK,
  GOOGLE_REVOKE_TOKEN_LINK,
} from 'src/utils/constants';

interface GoogleAuthRequest extends App_Request {
  user: { accessToken: string; refreshToken: string };
}

@Injectable()
export class GoogleAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async googleSignIn(
    req: GoogleAuthRequest,
    res: Response,
  ): Promise<AuthenticatedUser> {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;
    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });
    const googleProfileResponse = await this.getProfile(
      req.cookies['access_token'],
    );
    const user = await this.userService.findOneByEmailOrCreate({
      ...googleProfileResponse.data,
      verified_email: true,
    });
    const { password: passwordFromDb, createdAt, updatedAt, ...rest } = user;
    return {
      jwt_token: (await this.getJwtToken(user.email, user.id)).access_token,
      ...rest,
    };
  }

  googleSignOut(res: Response, refreshToken: string) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.revokeGoogleToken(refreshToken);
    res.redirect(BASE_ROUTE);
    //return instead of redirecting to base route
  }
  private async getJwtToken(
    email: string,
    id: number,
  ): Promise<{ access_token: string }> {
    const payload = { email: email, id: id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
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

  async getProfile(token: string): Promise<{ data: CreateUserDto<'google'> }> {
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
