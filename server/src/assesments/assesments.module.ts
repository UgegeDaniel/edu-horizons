import { Module } from '@nestjs/common';
import { AssesmentsService } from './assesments.service';
import { AssesmentsController } from './assesments.controller';

@Module({
  controllers: [AssesmentsController],
  providers: [AssesmentsService],
})
export class AssesmentsModule {}
