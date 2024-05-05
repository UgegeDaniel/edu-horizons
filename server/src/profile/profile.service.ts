import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './entities/profile.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOneByUserId(id: number) {
    const { profileId } = await this.userRepository.findOne({ where: { id } });
    return this.profileRepository.findOne({ where: { id: profileId } });
  }

  async changeUserPassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userToUpdate) {
      return null;
    }
    const matchOldPassword: boolean = bcrypt.compareSync(
      changePasswordDto.oldPassword,
      userToUpdate.password,
    );
    if (!matchOldPassword) {
      throw new HttpException(
        'Password provided was incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const newHashpassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      SALT_ROUNDS,
    );
    Object.assign(userToUpdate, { password: newHashpassword });
    await this.userRepository.save(userToUpdate);
    return { message: 'Password changed successfully' };
  }

  async updateUserProfile(userId: number, updateProfileDto: UpdateProfileDTO) {
    const { profileId } = await this.userRepository.findOne({
      where: { id: userId },
    });

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (updateProfileDto.picture) {
      profile.picture = updateProfileDto.picture;
    }
    if (updateProfileDto.phoneNumber) {
      profile.phoneNumber = updateProfileDto.phoneNumber;
    }
    if (updateProfileDto.address) {
      profile.address = updateProfileDto.address;
    }
    if (updateProfileDto.edu_bg) {
      profile.edu_bg = updateProfileDto.edu_bg;
    }
    if (updateProfileDto.assigned_level) {
      profile.assigned_level = updateProfileDto.assigned_level;
    }
    if (updateProfileDto.interests) {
      profile.interests = updateProfileDto.interests;
    }
    if (updateProfileDto.bio) {
      profile.bio = updateProfileDto.bio;
    }
    if (updateProfileDto.preferred_meeting_days) {
      profile.preferred_meeting_days = updateProfileDto.preferred_meeting_days;
    }

    await this.profileRepository.save(profile);
    return profile;
  }

  async findProfilePicture(fileName: string) {
    const profileDetails = await this.profileRepository.findOne({
      where: {
        picture: `/uploads/profile-images/${fileName}`,
      },
    });
    if (!profileDetails) {
      throw new NotFoundException("Image not found")
    }
    if (!profileDetails.picture) {
      throw new NotFoundException("Image not found")
    }
    return profileDetails.picture;
  }
}
