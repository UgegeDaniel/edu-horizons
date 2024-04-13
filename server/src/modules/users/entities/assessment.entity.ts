import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { GlobalEntity } from 'src/modules/@database/global-entity.entity';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';
import { Topic } from './topic.entity';

enum AssessmentType {
  'PRACTICE',
  'ASSIGNED',
}

enum SubmissionStatus {
  'SUBMITTED',
  'PENDING',
}

@Entity('assesment')
export class Assesment extends GlobalEntity {
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
    enum: AssessmentType,
  })
  assessment_type: AssessmentType;

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
