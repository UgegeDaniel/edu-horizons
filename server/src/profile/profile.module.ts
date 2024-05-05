import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { VerificationToken } from 'src/user/entities/verification-token.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, VerificationToken])],
  controllers: [ProfileController],
  providers: [ProfileService, UserService, JwtService],
})
export class ProfileModule {}
