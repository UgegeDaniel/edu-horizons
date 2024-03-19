import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from './types';
import { DEMO_USERS } from 'src/demo/users';

@Injectable()
export class GoogleAuthService {
  googleSignOut(res:any, refreshToken: any) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.revokeGoogleToken(refreshToken);
    res.redirect('http://localhost:5000/');
  }
  private readonly users: User[] = DEMO_USERS
  constructor(  ){

  }
  async googleSignIn(req: any, res: any){
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;
    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });
    res.redirect('http://localhost:5000/users/profile');
  }
  
  async create(newUser: User) {
    this.users.push(newUser)
  }

  async getNewAccessToken(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://accounts.google.com/o/oauth2/token',
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        },
      );

      return response.data.access_token;
    } catch (error) {
      throw new Error('Failed to refresh the access token.');
    }
  }

  async getProfile(token: string) {
    try {
      return axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );

      const expiresIn = response.data.expires_in;

      if (!expiresIn || expiresIn <= 0) {
        return true;
      }
    } catch (error) {
      return true;
    }
  }

  async revokeGoogleToken(token: string) {
    try {
      await axios.get(
        `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }
}