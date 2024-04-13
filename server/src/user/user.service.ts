import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor( 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(){
    return await this.userRepository.find();
  }

  async findById(id: number){
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string){
    return await this.userRepository.findOne({
      where: {
      email
    }});
  }

  async findOneByEmailOrCreate(user: CreateUserDto){
    const existingUser = await this.userRepository.findOne({
      where: {
      email: user.email
      }
    });
    console.log(existingUser)
    if(existingUser) return existingUser;
    return this.create(user)
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user)
    return await this.userRepository.save(newUser);
  }

  async update(id: number, user: User) {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
