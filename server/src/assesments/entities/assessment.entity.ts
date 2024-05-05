import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AbstractEntity } from '../../utils/abstract-entity.entity';
import { AssesmentType, SubmissionStatus } from '../utils/types';
import { Topic } from 'src/topic/entities/topic.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Entity('assesment')
export class Assesment extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.assigned_assesments, {
    onDelete: 'CASCADE',
  })
  assigned_by: User;

  @ManyToOne(() => User, (user) => user.assesments, {
    onDelete: 'CASCADE',
  })
  assigned_to: User;

  @Column({
    nullable: false,
    type: 'enum',
    enum: AssesmentType,
  })
  assesment_type: AssesmentType;

  @Column()
  status: SubmissionStatus;

  @Column()
  submission_date: Date;

  @Column()
  due_date: Date;

  @Column()
  score: number;

  @Column()
  number_of_questions: number;

  //In hours (whole or fraction)
  @Column()
  alloted_time: number;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];

  @Column({
    type: 'simple-array',
    nullable: false,
  })
  questions: Quiz[];
}
