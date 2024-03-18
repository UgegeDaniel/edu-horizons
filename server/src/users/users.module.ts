import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GoogleStrategy } from './auth-strategies/google.auth-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { LocalStrategy } from './auth-strategies/local.auth-strategy';
import { JwtStrategy } from './auth-strategies/jwt.auth-strategy';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot()
  ],
  controllers: [UsersController],
  providers: [UsersService, GoogleStrategy, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
