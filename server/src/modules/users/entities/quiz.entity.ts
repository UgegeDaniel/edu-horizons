import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { GlobalEntity } from 'src/modules/@database/global-entity.entity';
import { AssignedLevels } from './types';
import { Topic } from './topic.entity';

type OptionType = {
  a: string;
  b: string;
  c: string;
  d: string;
};

enum QuizType {
  'MULTIPLE_CHOICE',
  'ESSAY',
}

//TO RESEARCH: make the options column nullable if the quiz type is MULTIPLE_CHOICE

@Entity('quiz')
export class Quiz extends GlobalEntity {
  @Column({
    nullable: false,
    type: 'enum',
    enum: QuizType,
  })
  quiz_type: QuizType;

  @Column()
  question: string;

  @Column({
    type: 'simple-json',
    nullable: false,
  })
  options: OptionType;

  @Column()
  answer: keyof OptionType;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AssignedLevels,
    default: AssignedLevels.UNASSIGNED,
  })
  intended_level: AssignedLevels;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];
}
