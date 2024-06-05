import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TransactionStatus } from '@prisma/client';

export class UpdateTransactionEventDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
