import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssesmentService } from './assesment.service';
import { CreateAssesmentDto } from './dto/create-assesment.dto';
import { UpdateAssesmentDto } from './dto/update-assesment.dto';

@Controller('assesments')
export class AssesmentController {
  constructor(private readonly assesmentService: AssesmentService) {}

  @Post()
  create(@Body() createAssesmentDto: CreateAssesmentDto) {
    return this.assesmentService.create(createAssesmentDto);
  }

  @Get()
  findAll() {
    return this.assesmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assesmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssesmentDto: UpdateAssesmentDto) {
    return this.assesmentService.update(+id, updateAssesmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assesmentService.remove(+id);
  }
}
