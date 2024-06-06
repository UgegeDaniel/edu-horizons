import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Request as App_Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthenticatedUser, UserRole } from 'src/user/utils/types';
import {
  BASE_ROUTE,
  GOOGLE_TOKEN_LINK,
  GOOGLE_PROFILE_LINK,
  GOOGLE_TOKEN_REFRESH_LINK,
  GOOGLE_REVOKE_TOKEN_LINK,
} from 'src/utils/constants';

// interface GoogleAuthRequest extends App_Request {
//   user: { accessToken: string; refreshToken: string };
// }

type GoogleProfileResponse = Omit<
  CreateUserDto<'google'>,
  "password" | "verified_email" | "strategy" | "role"
>

@Injectable()
export class GoogleAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async googleSignIn(
    googleProfileResponse: GoogleProfileResponse,
  ): Promise<AuthenticatedUser> {
    try {
      const { email, given_name, family_name } = googleProfileResponse;
      const user = await this.userService.findOneByEmailOrCreate({
        given_name,
        family_name,
        email,
        password: null,
        strategy: 'google',
        role: "UNASSIGNED",
        verified_email: true,
      });
      const { password: passwordFromDb, createdAt, updatedAt, ...rest } = user;
      return {
        jwt_token: (await this.getJwtToken(user.email, user.id)).access_token,
        ...rest,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('OOPS... Something went wrong.', HttpStatus.BAD_REQUEST);
    }
  }

  googleSignOut(res: Response, refreshToken: string) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.revokeGoogleToken(refreshToken);
    res.redirect(BASE_ROUTE);
  }

  private async getJwtToken(email: string, id: number): Promise<{ access_token: string }> {
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
      console.error('Failed to refresh the access token:', error.response?.data || error.message);
      throw new HttpException('Failed to refresh the access token.', HttpStatus.BAD_REQUEST);
    }
  }

  async getProfile(token: string, refresh_token: string): Promise<{ data: CreateUserDto<'google'> }> {
    try {
      let isExpired = false;
      try {
        isExpired = await this.isTokenExpired(token);
      } catch (error) {
        console.log('Token expiration check failed, proceeding to get new access token:', error.message);
      }

      if (isExpired) {
        token = await this.getNewAccessToken(refresh_token);
      }

      const response = await axios.get(`${GOOGLE_PROFILE_LINK}${token}`);
      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to get the profile', HttpStatus.BAD_REQUEST);
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const response = await axios.get(`${GOOGLE_TOKEN_REFRESH_LINK}${token}`);
      const expiresIn = response.data.expires_in;
      return !expiresIn || expiresIn <= 0;
    } catch (error) {
      console.log('Error checking token expiry:', error.response?.data || error.message);
      throw new HttpException('Failed to check token expiry', HttpStatus.BAD_REQUEST);
    }
  }

  async revokeGoogleToken(token: string) {
    try {
      await axios.post(GOOGLE_REVOKE_TOKEN_LINK, null, {
        params: {
          token: token,
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (error) {
      console.error('Failed to revoke the token:', error.response?.data || error.message);
      throw new HttpException('Failed to revoke the token', HttpStatus.BAD_REQUEST);
    }
  }
}
