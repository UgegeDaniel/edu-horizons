import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationToken } from './entities/verification-token.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Assesment } from 'src/assesments/entities/assessment.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {
  AuthenticationStrategy,
  UserRoles,
  VerificationTokenType,
} from './utils/types';

//TODO: Create an Abstrct Service

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VerificationToken)
    private readonly verificationTokenRepository: Repository<VerificationToken>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['profile'],
    });
  }

  async findOneByEmailOrCreate(user: CreateUserDto<'google'>) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (existingUser) return existingUser;
    return this.create(user);
  }

  async findAndUpdate(
    id: number,
    updateUserDto: {verified_email?: boolean, password?: string},
  ): Promise<User | null> {
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) {
      return null;
    }
    Object.assign(userToUpdate, updateUserDto);
    const updatedUser = await this.userRepository.save(userToUpdate);
    return updatedUser;
  }

  async findAndUpdateUserRole(
    id: number,
    role: UserRoles,
  ): Promise<{role: UserRoles}> {
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) {
      return null;
    }
    if (userToUpdate.role !== UserRoles.UNASSIGNED) {
      throw new Error('User already has a role');
    }
    Object.assign(userToUpdate, { role: UserRoles[role] });
    await this.userRepository.save(userToUpdate);
    return { role };
  }

  async create(
    user: CreateUserDto<AuthenticationStrategy>,
    relations?: Partial<{
      verification_token: VerificationToken;
      profile: Profile;
      appointments_to_host: Appointment[];
      assigned_assesments: Assesment[];
      assesments: Assesment[];
      payments: Payment[];
    }>,
  ) {
    const newUser = this.userRepository.create(user);
    const profileDetails = this.profileRepository.create();
    relations.profile = await this.profileRepository.save(profileDetails);
    const userTobeSaved = {
      ...newUser,
      ...relations,
    };
    return await this.userRepository.save(userTobeSaved);
  }

  async saveVerificationToken(
    verificationToken: string,
    type: VerificationTokenType,
  ) {
    const verificationDetails = this.verificationTokenRepository.create({
      token: verificationToken,
      type,
    });
    return await this.verificationTokenRepository.save(verificationDetails);
  }

  async findAndVerifyToken(userId: number, token: string) {
    const { verification_token } = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['verification_token'],
    });
    const { token: userTokenInDb } = verification_token;
    if (token !== userTokenInDb) {
      throw new Error('Invalid verification token');
    }
  }

  async verifyAndUpdateUserByToken(
    userId: number,
    token: string,
    type: VerificationTokenType,
    hashedPassword?: string,
  ) {
    const { verification_token, verified_email } =
      await this.userRepository.findOne({
        where: { id: userId },
        relations: ['verification_token'],
      });
    await this.findAndVerifyToken(userId, token);
    if (
      verified_email &&
      type === VerificationTokenType['VERIFICATION-TOKEN']
    ) {
      throw new Error('User already Verified');
    }
    if (type === VerificationTokenType['VERIFICATION-TOKEN']) {
      return await this.findAndUpdate(userId, { verified_email: true });
    }
    if (type === VerificationTokenType['FORGOT-PASSWORD-TOKEN']) {
      return await this.findAndUpdate(userId, { password: hashedPassword });
    }
    const { id: verificationTokenId } = verification_token;
    await this.verificationTokenRepository.delete(verificationTokenId);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateVerificationToken(
    userEmail: string,
    verificationToken: string,
    type: VerificationTokenType,
  ) {
    const { id: userId, verificationTokenId } =
      await this.findOneByEmail(userEmail);
    const verificationDetailsToUpdate =
      await this.verificationTokenRepository.findOne({
        where: { id: verificationTokenId },
      });
    Object.assign(verificationDetailsToUpdate, {
      token: verificationToken,
      type,
    });
    const updatedVerificationDetails =
      await this.verificationTokenRepository.save(verificationDetailsToUpdate);
    await this.userRepository.update(userId, {
      verification_token: updatedVerificationDetails,
    });
  }
}
