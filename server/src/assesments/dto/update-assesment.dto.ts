import { PartialType } from '@nestjs/mapped-types';
import { CreateAssesmentDto } from './create-assesment.dto';

export class UpdateAssesmentDto extends PartialType(CreateAssesmentDto) {}
