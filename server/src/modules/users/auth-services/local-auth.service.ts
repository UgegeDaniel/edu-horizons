import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser, User, UserFromDb, UserRoles } from '../types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class LocalAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const user: UserFromDb = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid User Credentials',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid User Credentials',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      jwt_token: (await this.getToken(user)).access_token,
      ...user,
    };
  }

  private async getToken(user: UserFromDb): Promise<{ access_token: string }> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthenticatedUser> {
    const newUserToBeRegistered: Omit<User, 'id'> = {
      ...createUserDto,
      role: UserRoles.unassigned,
      verified_email: false,
      strategy: 'local',
    };
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException(
        'Invalid User Credentials',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: User = {
      ...newUserToBeRegistered,
      password: hashedPassword,
    };
    await this.usersService.create(newUser);
    const createdUser = await this.usersService.findOneByEmail(newUser.email);
    return {
      jwt_token: (await this.getToken(createdUser)).access_token,
      ...newUser,
    };
  }
}