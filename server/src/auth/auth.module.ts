import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { LocalAuthService } from './local-auth.service';
import { GoogleStrategy } from './auth-strategies/google.auth-strategy';
import { JwtStrategy } from './auth-strategies/jwt.auth-strategy';
import { LocalStrategy } from './auth-strategies/local.auth-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailingModule } from 'src/mailing/mailing.module';
import { VerificationToken } from 'src/user/entities/verification-token.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        signOptions: {
          expiresIn: "1d"
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, VerificationToken, Profile]),
    MailingModule
  ],
  providers: [
    UserService,
    GoogleAuthService,
    LocalAuthService,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [GoogleAuthService, LocalAuthService],
})
export class AuthModule {}
