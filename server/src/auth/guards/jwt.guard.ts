import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers['authorization'];
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return false;
    // }
    const token = request.cookies.jwt;
    console.log({ token });
    if (!token) return false;
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
