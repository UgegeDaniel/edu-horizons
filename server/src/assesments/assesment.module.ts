import { Module } from '@nestjs/common';
import { AssesmentService } from './assesment.service';
import { AssesmentController } from './assesment.controller';
import { Topic } from 'src/topic/entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assesment } from './entities/assessment.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assesment, Topic, Quiz])],
  controllers: [AssesmentController],
  providers: [AssesmentService],
})
export class AssesmentsModule {}
