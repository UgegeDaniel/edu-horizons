import { IsNotEmpty, IsEnum, IsNumber, IsArray, IsDate } from 'class-validator';
import { AssesmentType, SubmissionStatus } from '../utils/types';

export class AssignAssesmentDto {
    @IsNotEmpty()
    assigned_to: number[];

    @IsNotEmpty()
    @IsEnum(AssesmentType)
    assessment_type: AssesmentType;

    @IsNotEmpty()
    @IsEnum(SubmissionStatus)
    status: SubmissionStatus;

    @IsNotEmpty()
    @IsDate()
    submission_date: Date;

    @IsNotEmpty()
    @IsDate()
    due_date: Date;

    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @IsNumber()
    number_of_questions: number;

    @IsNotEmpty()
    @IsNumber()
    alloted_time: number;

    @IsNotEmpty()
    @IsArray()
    topics: number[];

    @IsNotEmpty()
    @IsArray()
    questions: number[];
}

