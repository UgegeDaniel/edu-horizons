import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Verified implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers['authorization'];
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return false;
    // }
    const token = request.cookies.jwt;
    console.log({ token });
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findById(decodedToken.id);
      if (user.verified_email) {
        return true;
      }
      throw new HttpException('User not verified', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
