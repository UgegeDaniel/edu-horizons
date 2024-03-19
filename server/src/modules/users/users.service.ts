import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './types';
import { DEMO_USERS } from 'src/demo/users';

@Injectable()
export class UsersService {
  private readonly users: User[] = DEMO_USERS
  constructor(    private jwtService: JwtService    ){

  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }
  
  async create(newUser: User) {
    this.users.push(newUser)
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User): Promise<{ access_token: string}> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: Omit<User, 'id'>): Promise<{ access_token: string}> {
    const existingUser = await this.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = { ...user, verified_email: false, password: hashedPassword, id: "2" };
    await this.create(newUser);
    return {access_token: (await this.login(newUser)).access_token, ...newUser};
  }
}