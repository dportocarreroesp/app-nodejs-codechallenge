import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionEventDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsNumber()
  @Min(0)
  value: number;
}
