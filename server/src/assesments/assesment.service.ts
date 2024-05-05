import { Injectable } from '@nestjs/common';
import { CreateAssesmentDto } from './dto/create-assesment.dto';
import { UpdateAssesmentDto } from './dto/update-assesment.dto';

@Injectable()
export class AssesmentService {
  create(createAssesmentDto: CreateAssesmentDto) {
    return 'This action adds a new assesment';
  }

  findAll() {
    return `This action returns all assesments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assesment`;
  }

  update(id: number, updateAssesmentDto: UpdateAssesmentDto) {
    return `This action updates a #${id} assesment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assesment`;
  }
}
