import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AssesmentService } from './assessment.service';
import { UpdateAssesmentDto } from './dto/update-assessment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AssignAssesmentDto } from './dto/assign-assessment.dto';

@Controller('assessment')
export class AssesmentController {
  constructor(private readonly assessmentervice: AssesmentService) {}

  @Post('assign-asessment')
  @UseGuards(JwtAuthGuard)
  assignAssesment(@Body() assignAssesmentDto: AssignAssesmentDto, @Req() req) {
    return this.assessmentervice.assignAssesment(
      req.user.id,
      assignAssesmentDto,
    );
  }

  @Get()
  findAll() {
    return this.assessmentervice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assessmentervice.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssesmentDto: UpdateAssesmentDto,
  ) {
    return this.assessmentervice.updateAssessmentDetails(+id, updateAssesmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assessmentervice.remove(+id);
  }
}
