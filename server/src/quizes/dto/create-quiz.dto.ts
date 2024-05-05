import { IsNotEmpty, IsString, IsEnum, IsObject, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { QuizType } from '../utils/types';

export class OptionType {
    @IsString()
    a: string;

    @IsString()
    b: string;

    @IsString()
    c: string;

    @IsString()
    d: string;
}

export class CreateQuizDto {
    @IsNotEmpty()
    @IsEnum(QuizType)
    quiz_type: QuizType;

    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => OptionType)
    options: OptionType;

    @IsNotEmpty()
    @IsString()
    answer: keyof OptionType;

    @IsNotEmpty()
    @IsString()
    intended_level: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    topics: number[]; // Assuming this array contains the IDs of the topics associated with the quiz
}