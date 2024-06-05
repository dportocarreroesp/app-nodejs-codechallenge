import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';

import { TransactionStatus } from '@prisma/client';

import { registerEnumType } from '@nestjs/graphql';
import { TransactionType } from './transaction-type.model';

// Expose enum to graphQL
registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
  description: 'Transaction Status',
});

@ObjectType()
export class Transaction {
  @Field()
  uid: string;

  @Field(() => GraphQLISODateTime)
  created_at?: Date;

  @Field(() => Float)
  value: number;

  @Field({ nullable: true })
  accountExternalIdDebit?: string;

  @Field({ nullable: true })
  accountExternalIdCredit?: string;

  @Field(() => TransactionStatus)
  status?: TransactionStatus;

  @Field(() => Int)
  transaction_type_id: number;

  @Field(() => TransactionType)
  type: TransactionType;
}
