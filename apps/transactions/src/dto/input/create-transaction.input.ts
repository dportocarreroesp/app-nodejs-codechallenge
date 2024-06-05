import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsNumber, Min, IsUUID } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field(() => Int)
  @IsInt()
  transferTypeId: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  value: number;

  @Field()
  @IsUUID()
  accountExternalIdDebit: string;

  @Field()
  @IsUUID()
  accountExternalIdCredit: string;
}
