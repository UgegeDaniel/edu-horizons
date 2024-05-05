import { User } from 'src/user/entities/user.entity';
import { AbstractEntity } from 'src/utils/abstract-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PaymentStatus, PaymentPurpose } from '../utils/types';

@Entity('payment')
export class Payment extends AbstractEntity {
  @ManyToOne(() => User, {
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
