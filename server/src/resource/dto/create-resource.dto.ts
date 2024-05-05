import { IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';
import { AssignedLevels } from 'src/utils/types';

export class CreateResourceDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    intended_level: AssignedLevels;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    topics: string[];

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    references: string[];
}
