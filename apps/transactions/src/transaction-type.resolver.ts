import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionType } from './models/transaction-type.model';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './transaction.service';

@Resolver(() => TransactionType)
export class TransactionTypeResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => Transaction, { name: 'transactionType' })
  async getTransactionType(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findTypeById(id);
  }
}
