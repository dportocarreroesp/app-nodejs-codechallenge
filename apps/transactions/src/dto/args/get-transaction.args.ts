import { IsUUID } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetTransactionArgs {
  @Field()
  @IsUUID()
  uid: string;
}
