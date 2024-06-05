import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString, Min, MinLength } from 'class-validator';

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
  @IsString()
  @MinLength(36)
  accountExternalIdDebit: string;

  @Field()
  @IsString()
  @MinLength(36)
  accountExternalIdCredit: string;
}
