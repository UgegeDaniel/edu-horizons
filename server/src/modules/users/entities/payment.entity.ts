import { Column, Entity, ManyToOne } from 'typeorm';
import { GlobalEntity } from 'src/modules/@database/global-entity.entity';
import { User } from './user.entity';

enum PaymentStatus {
  'CONFIRMED',
  'PENDING',
}

enum PaymentPurpose {
  'TUTORING',
  'PPRACTICE_QUIZ',
}

@Entity('payment')
export class Payment extends GlobalEntity {
  @ManyToOne(() => User, (user) => user.assigned_assesments, {
    onDelete: 'CASCADE',
  })
  student: User;

  @Column({
    type: 'simple-json',
  })
  payment_details: {
    payment_token: string;
    payment_amount: number;
    payment_date: string;
  };

  @Column({
    nullable: false,
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  payment_status: PaymentStatus;

  @Column({
    nullable: false,
    type: 'enum',
    enum: PaymentPurpose,
  })
  purpose: string;
}
