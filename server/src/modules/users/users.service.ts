import { Injectable } from '@nestjs/common';
import { User, UserFromDb } from './types';
import { DatabaseService } from '../@database/database.service';

//DB SERVICE

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }
  // : Promise<UserFromDb | undefined>
  async findOneByEmail(email: string) {
  // const user = await this.databaseService.user.findUnique({
  //     where:{
  //       email
  //     }
  //   });
  //   return user
  }


  async create(newUser: User) {
    // const user = await this.databaseService.user.create({ data: newUser });
    // console.log({user}, 'usersignup');
    // return user;
  }
}
