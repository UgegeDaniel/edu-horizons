import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GoogleStrategy } from './auth-strategies/google.auth-strategies';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConfigService, GoogleStrategy],
})
export class UsersModule {}
