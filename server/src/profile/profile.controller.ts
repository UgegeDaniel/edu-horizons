import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  ValidationPipe,
  UseInterceptors,
  Param,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Verified } from 'src/auth/guards/verified.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { UserFile } from './utils/types';


@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Req() req) {
    return this.profileService.findOneByUserId(req.user.id);
  }

  @Get('uploads/profile-images/:fileName')
  async getProfileImage(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const image = createReadStream(
      join(
        process.cwd(),
        await this.profileService.findProfilePicture(fileName),
      ),
    );
    image.pipe(res);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  changePassword(
    @Req() req,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.profileService.changeUserPassword(
      req.user.id,
      changePasswordDto,
    );
  }

  @Patch('updated-profile')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Verified)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateProfile(
    @Req() req,
    @UploadedFile() file: UserFile,
    @Body() updateProfileDto: UpdateProfileDTO,
  ) {
    const profileImage = file
      ? `/uploads/profile-images/${file.filename}`
      : null;
    return this.profileService.updateUserProfile(req.user.id, {
      ...updateProfileDto,
      picture: profileImage,
    });
  }
}
