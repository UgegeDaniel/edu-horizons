import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import {
  AuthenticatedUser,
  UserFromDb,
  User,
  UserRoles,
  VerificationTokenType,
} from 'src/user/utils/types';
import { MailingService } from 'src/mailing/mailing.service';
import { generateVerificationToken } from './utils/generate-verification-token';
import {
  getPasswordChangeRequestHtml,
  getVerificationEmailHtml,
} from 'src/mailing/utils/get-html';
import {
  ForgotPasswordDto,
  PasswordChangeRequestDto,
} from 'src/user/dto/forgot-password.dto';

const throwInvalidCredError = () => {
  throw new HttpException('Invalid User Credentials', HttpStatus.UNAUTHORIZED);
};
@Injectable()
export class LocalAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailingService,
  ) {}
  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const user: UserFromDb = await this.userService.findOneByEmail(email);
    if (!user) return throwInvalidCredError();
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) return throwInvalidCredError();
    const { password: passwordFromDb, createdAt, updatedAt, ...rest } = user;
    return {
      jwt_token: (await this.getJwtToken(user.email, user.id)).access_token,
      ...rest,
    };
  }

  private async getJwtToken(
    email: string,
    id: number,
  ): Promise<{ access_token: string }> {
    const payload = { email, id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(
    createUserDto: CreateUserDto<'local'>,
  ): Promise<AuthenticatedUser> {
    const newUserToBeRegistered: Omit<User, 'id'> = {
      ...createUserDto,
      role: UserRoles.UNASSIGNED,
      verified_email: false,
      strategy: 'local',
    };
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) return throwInvalidCredError();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verificationToken = generateVerificationToken(8);
    const verification_token = await this.userService.saveVerificationToken(
      verificationToken,
      VerificationTokenType['VERIFICATION-TOKEN'],
    );
    const newUser = await this.userService.create(
      {
        ...newUserToBeRegistered,
        password: hashedPassword,
      },
      {
        verification_token,
      },
    );
    await this.mailerService.sendMail(
      createUserDto.email,
      'Email Verification',
      getVerificationEmailHtml(verificationToken),
    );
    const {
      password,
      verification_token: userVerifcationDetails,
      ...rest
    } = newUser;
    return {
      jwt_token: (await this.getJwtToken(newUser.email, newUser.id))
        .access_token,
      ...rest,
    };
  }

  async verifyUserEmail(id: number, token: string) {
    try {
      const verifiedUser = await this.userService.verifyAndUpdateUserByToken(
        id,
        token,
        VerificationTokenType['VERIFICATION-TOKEN'],
      );
      const {
        // password,
        // verification_token: userVerifcationDetails,
        verified_email,
        // ...rest
      } = verifiedUser;
      return {
        // jwt_token: (await this.getJwtToken(verifiedUser.email, verifiedUser.id)).access_token,
        verified_email,
        // ...rest,
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async requestPasswordChange(
    passwordChangeRequestDto: PasswordChangeRequestDto,
  ) {
    const requestUser = await this.userService.findOneByEmail(
      passwordChangeRequestDto.email,
    );
    const verificationToken = generateVerificationToken(4);
    await this.mailerService.sendMail(
      requestUser.email,
      'Password Change Request',
      getPasswordChangeRequestHtml(verificationToken),
    );

    await this.userService.updateVerificationToken(
      passwordChangeRequestDto.email,
      verificationToken,
      VerificationTokenType['FORGOT-PASSWORD-TOKEN'],
    );
    return {
      message: 'Click the link in your mail to change your password',
    };
  }

  async forgotPasswordReset(
    forgotPasswordDto: ForgotPasswordDto,
    token: string,
  ) {
    const { id: userId } = await this.userService.findOneByEmail(
      forgotPasswordDto.email,
    );
    try {
      const hashedPassword = await bcrypt.hash(forgotPasswordDto.password, 10);
      await this.userService.verifyAndUpdateUserByToken(
        userId,
        token,
        VerificationTokenType['FORGOT-PASSWORD-TOKEN'],
        hashedPassword,
      );
      return {
        message: 'Password changed successfully',
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  sendVerificationMaillAgain() {}
  async updateUserRole(userId: number, role: UserRoles) {
    try {
      return await this.userService.findAndUpdateUserRole(userId, role);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
