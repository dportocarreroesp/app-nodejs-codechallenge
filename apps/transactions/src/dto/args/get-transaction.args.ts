import { IsString, MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetTransactionArgs {
  @Field()
  @IsString()
  @MinLength(36)
  uid: string;
}
