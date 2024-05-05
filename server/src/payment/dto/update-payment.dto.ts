import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { PaymentStatus, PaymentPurpose } from '../utils/types';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsString()
    payment_token?: string;

    @IsNumber()
    payment_amount?: number;

    @IsString()
    payment_date?: string;

    @IsEnum(PaymentStatus)
    payment_status?: PaymentStatus;

    @IsEnum(PaymentPurpose)
    purpose?: PaymentPurpose;
}