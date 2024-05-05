import { IsString, IsOptional, IsArray, IsEnum, IsNotEmpty, IsJSON } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { AssignedLevels } from 'src/utils/types';

export class CreateProfileDto {
   @IsNotEmpty()
    // @IsNumber()
    user: User; 

    @IsOptional()
    @IsString()
    picture?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsJSON()
    address?: {
        houseNumber: string;
        street: string;
        city: string;
        country: string;
    };

    @IsOptional()
    @IsJSON()
    edu_bg?: {
        curr_institution: string;
        curr_program: string;
        upcoming_cert: string;
        year: string;
    };

    @IsOptional()
    assigned_level?: AssignedLevels;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    @IsOptional()
    @IsString()
    bio?: string;
}