import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../types';
import { LocalAuthService } from '../auth-services/local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localAuthService: LocalAuthService) {
    super({
      usernameField: 'email',
    });
  }
// : Promise<User>
  async validate(email: string, password: string) {
    const user = await this.localAuthService.login(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}