import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { PaymentStatus, PaymentPurpose } from '../utils/types';
import { User } from 'src/user/utils/types';

export class CreatePaymentDto {
    @IsNotEmpty()
    student: User;

    @IsNotEmpty()
    @IsString()
    payment_token: string;

    @IsNotEmpty()
    @IsNumber()
    payment_amount: number;

    @IsNotEmpty()
    @IsString()
    payment_date: string;

    @IsNotEmpty()
    @IsEnum(PaymentStatus)
    payment_status: PaymentStatus;

    @IsNotEmpty()
    @IsEnum(PaymentPurpose)
    purpose: PaymentPurpose;
}
