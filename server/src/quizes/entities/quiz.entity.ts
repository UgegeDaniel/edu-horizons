import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../utils/abstract-entity.entity';
import { AssignedLevels } from 'src/utils/types';
import { QuizType, OptionType } from '../utils/types';
import { Topic } from 'src/topic/entities/topic.entity';

@Entity('quiz')
export class Quiz extends AbstractEntity {
  @Column({
    nullable: false,
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
  answer: string;

  @Column({
    nullable: false,
    default: "UNASSIGNED",
  })
  intended_level: AssignedLevels;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];
}
