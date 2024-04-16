import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssesmentsService } from './assesments.service';
import { CreateAssesmentDto } from './dto/create-assesment.dto';
import { UpdateAssesmentDto } from './dto/update-assesment.dto';

@Controller('assesments')
export class AssesmentsController {
  constructor(private readonly assesmentsService: AssesmentsService) {}

  @Post()
  create(@Body() createAssesmentDto: CreateAssesmentDto) {
    return this.assesmentsService.create(createAssesmentDto);
  }

  @Get()
  findAll() {
    return this.assesmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assesmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssesmentDto: UpdateAssesmentDto) {
    return this.assesmentsService.update(+id, updateAssesmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assesmentsService.remove(+id);
  }
}
