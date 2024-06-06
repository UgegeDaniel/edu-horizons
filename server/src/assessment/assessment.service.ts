import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignAssesmentDto } from './dto/assign-assessment.dto';
import { UpdateAssesmentDto } from './dto/update-assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './entities/assessment.entity';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/utils/types';
import { TopicService } from 'src/topic/topic.service';
import { QuizService } from 'src/quizes/quiz.service';

@Injectable()
export class AssesmentService {
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
    private readonly quizService: QuizService,
  ) {}
  async assignAssesment(
    tutorId: number,
    assignAssesmentDto: AssignAssesmentDto,
  ) {
    const assessment = this.assessmentRepository.create();
    const studentsPromise = assignAssesmentDto.assigned_to.map(
      async (studentId) => {
        const student = await this.userService.findById(studentId);
        if (student.role !== "STUDENT") {
          throw new ForbiddenException(
            'Assesments can only be assigned to students',
          );
        }
        return student;
      },
    );
    const students = await Promise.all(studentsPromise);
    const topicsPromise = assignAssesmentDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromise);
    const questionsPromise = assignAssesmentDto.questions.map(
      async (quizId) => {
        const quiz = await this.quizService.findOneById(quizId);
        return quiz;
      },
    );
    const questions = await Promise.all(questionsPromise);

    const assessmentDetails = Object.assign(assessment, {
      ...assignAssesmentDto,
      assigned_by: await this.userService.findById(tutorId),
      assigned_to: students,
      topics,
      number_of_questions: assignAssesmentDto.questions.length,
      questions,
    });
    return this.assessmentRepository.save(assessmentDetails);
  }

  async findAll() {
    return await this.assessmentRepository.find();
  }

  async findById(assessmentId: number) {
    return this.assessmentRepository.findOne({
      where: {
        id: assessmentId,
      },
    });
  }

  async updateAssessmentDetails(
    id: number,
    updateAssesmentDto: UpdateAssesmentDto,
  ): Promise<Assessment> {
    const assessmentToUpdate = await this.assessmentRepository.findOne({
      where: { id },
    });
    const topicsPromise = updateAssesmentDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromise);
    const studentsPromise = updateAssesmentDto.assigned_to.map(
      async (studentId) => {
        const student = await this.userService.findById(studentId);
        if (student.role !== "STUDENT") {
          throw new ForbiddenException(
            'Assesments can only be assigned to students',
          );
        }
        return student;
      },
    );
    const students = await Promise.all(studentsPromise);
    const questionsPromise = updateAssesmentDto.questions.map(
      async (quizId) => {
        const quiz = await this.quizService.findOneById(quizId);
        return quiz;
      },
    );
    const questions = await Promise.all(questionsPromise);
    if (!assessmentToUpdate) {
      throw new Error(`Assessment with id ${id} not found`);
    }
    const mergedAssessment = this.assessmentRepository.merge(
      assessmentToUpdate,
      { ...updateAssesmentDto, topics, assigned_to: students, questions },
    );
    const updatedAssessment =
      await this.assessmentRepository.save(mergedAssessment);

    return updatedAssessment;
  }

  async submitAssessmentResponse(
    id: number,
    submittedResponse: Partial<Assessment>,
  ): Promise<Assessment> {
    const assessmentToSubmit = await this.assessmentRepository.findOne({
      where: { id },
    });
    if (!assessmentToSubmit) {
      throw new Error(`Assessment with id ${id} not found`);
    }
    const mergedAssessment = this.assessmentRepository.merge(
      assessmentToSubmit,
      submittedResponse,
    );
    const submittedAssessment =
      await this.assessmentRepository.save(mergedAssessment);
    return submittedAssessment;
  }

  async remove(assessmentId: number) {
       const assessmentToDelete = await this.assessmentRepository.findOne({
         where: { id: assessmentId },
       });
       if (!assessmentToDelete) {
         throw new NotFoundException('Appoointment not found');
       }
        await this.assessmentRepository.remove(assessmentToDelete);
        return { message: 'Assessment Deleted Successfully' };
  }
}
