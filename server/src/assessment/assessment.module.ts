import { Module } from '@nestjs/common';
import { AssesmentService } from './assessment.service';
import { AssesmentController } from './assessment.controller';
import { Topic } from 'src/topic/entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Topic, Quiz])],
  controllers: [AssesmentController],
  providers: [AssesmentService],
})
export class AssesmentsModule {}
