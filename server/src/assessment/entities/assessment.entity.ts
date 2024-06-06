import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AbstractEntity } from '../../utils/abstract-entity.entity';
import { AssesmentType, SubmissionStatus } from '../utils/types';
import { Topic } from 'src/topic/entities/topic.entity';
import { Quiz } from 'src/quizes/entities/quiz.entity';

@Entity('assessment')
export class Assessment extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.assigned_assessment, {
    onDelete: 'CASCADE',
  })
  assigned_by: User;

  @ManyToMany(() => User, (user) => user.assessment, {
    onDelete: 'CASCADE',
  })
  assigned_to: User[];

  @Column({
    nullable: false,
    type: 'enum',
    enum: AssesmentType,
  })
  assessment_type: AssesmentType;

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
