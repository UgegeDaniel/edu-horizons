import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AssesmentService } from './assessment.service';

@Injectable()
export class AssessmentCommand {
  constructor(private readonly assesmentService: AssesmentService) {}

  @Command({
    command: 'GET:assessments',
    describe: 'get all assessments',
  })
  async getAllAssessments() {
    return await this.assesmentService.findAll();
  }
}
