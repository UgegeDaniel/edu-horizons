import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './auth-strategies/google.auth-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './auth-strategies/local.auth-strategy';
import { JwtStrategy } from './auth-strategies/jwt.auth-strategy';
import { GoogleAuthService } from './auth-services/google-auth.service';
import { LocalAuthService } from './auth-services/local-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { VerificationToken } from './entities/verification_entity';
import { Appointment } from './entities/appointments.entity';
import { Assesment } from './entities/assessment.entity';
import { Payment } from './entities/payment.entity';
import { Topic } from './entities/topic.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Profile, VerificationToken, Appointment, Assesment, Topic, Payment])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    GoogleAuthService,
    LocalAuthService,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UserService] 
})
export class UsersModule {}
