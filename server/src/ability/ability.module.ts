import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory/ability.factory';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { VerificationToken } from 'src/user/entities/verification-token.entity';

@Module({
  imports: [
    AbilityModule,
    TypeOrmModule.forFeature([
      User,
      Profile,
      VerificationToken,
    ]),
  ],
  providers: [AbilityFactory, UserService],
  exports: [AbilityFactory],
})
export class AbilityModule {}
