import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LocalAuthService } from '../local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localAuthService: LocalAuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.localAuthService.login(email, password);
    if (!user) {
      throw new HttpException(
        'Invalid User Credentials',
        HttpStatus.UNAUTHORIZED,
      );    }
    return user;
  }
}