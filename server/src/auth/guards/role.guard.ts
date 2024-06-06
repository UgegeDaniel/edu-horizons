import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/utils/types';

export class CheckRole implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private allowedRoles: UserRole[],
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findById(decodedToken.id);
      if (this.allowedRoles.includes(user.role)) {
        return true;
      }
      throw new HttpException(
        'User not allowed to access this route',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}

@Injectable()
export class IsAdmin extends CheckRole {
  constructor(jwtService: JwtService, userService: UserService) {
    super(jwtService, userService, ["ADMIN"]);
  }
}

@Injectable()
export class IsTutor extends CheckRole {
  constructor(jwtService: JwtService, userService: UserService) {
    super(jwtService, userService, ["ADMIN", "TUTOR"]);
  }
}

@Injectable()
export class IsStudent extends CheckRole {
  constructor(jwtService: JwtService, userService: UserService) {
    super(jwtService, userService, ["ADMIN", "STUDENT"]);
  }
}

@Injectable()
export class IsStudentOrTutor extends CheckRole {
  constructor(jwtService: JwtService, userService: UserService) {
    super(jwtService, userService, [
      "ADMIN",
      "STUDENT",
      "TUTOR",
    ]);
  }
}
