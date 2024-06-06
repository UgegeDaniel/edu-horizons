import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { GOOGLE_REDIRECT_URI } from '../../utils/constants';
import { GoogleAuthService } from '../google-auth.service';

//use config service

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly googleAuthService: GoogleAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URI,
      passReqToCallback: true,
      scope: ['profile', 'email'],
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { emails, photos, name } = profile;
    const user = {
      family_name: name.familyName,
      given_name: name.givenName,
      email: emails ? emails[0].value : null,
      photo: photos ? photos[0].value : null,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
