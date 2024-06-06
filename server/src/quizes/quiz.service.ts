import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { TopicService } from 'src/topic/topic.service';
import { AssignedLevels } from 'src/utils/types';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly topicService: TopicService,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const quiz = this.quizRepository.create();
    const topicsPromises = createQuizDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromises);
    const quizDetails = Object.assign(quiz, {
      ...createQuizDto,
      topics,
    });
    return this.quizRepository.save(quizDetails);
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async findByIntendedLevel(intendedLevel: AssignedLevels) {
    const quiz = await this.quizRepository.find({
      where: {
        intended_level: intendedLevel,
      },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }
  async findOneById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async getLimitQuizByLevel(
    intendedLevel: AssignedLevels,
    topicIds: number[],
    limit: number = 40,
  ): Promise<Quiz[]> {
    let queryBuilder = this.quizRepository.createQueryBuilder('quiz');
    queryBuilder = queryBuilder.where('quiz.intended_level = :intendedLevel', {
      intendedLevel,
    });
    if (topicIds && topicIds.length > 0) {
      queryBuilder = queryBuilder.innerJoin(
        'quiz.topics',
        'topic',
        'topic.id IN (:...topicIds)',
        { topicIds },
      );
    }
    queryBuilder = queryBuilder.orderBy('RAND()');
    queryBuilder = queryBuilder.take(limit);
    return await queryBuilder.getMany();
  }
  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.findOneById(id);
    const topicsPromises = updateQuizDto.topics.map(async (topicId) => {
      const topic = await this.topicService.findById(topicId);
      return topic;
    });
    const topics = await Promise.all(topicsPromises);
    this.quizRepository.merge(quiz, { ...updateQuizDto, topics });
    return this.quizRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    const quiz = await this.findOneById(id);
    await this.quizRepository.remove(quiz);
  }
}
