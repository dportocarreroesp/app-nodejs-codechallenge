import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetTransactionArgs } from './dto/args/get-transaction.args';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { TransactionType } from './models/transaction-type.model';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => Transaction, { name: 'transaction' })
  async getTransaction(@Args() args: GetTransactionArgs) {
    const { uid } = args;

    return this.transactionService.findById(uid);
  }

  @Query(() => [Transaction])
  async transactions() {
    return this.transactionService.findAll();
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('createTransactionData')
    createTransactionData: CreateTransactionInput,
  ) {
    console.info(
      `[TRANSACTION RESOLVER]: Creating transaction`,
      createTransactionData,
    );
    return this.transactionService.createTransaction(createTransactionData);
  }

  @ResolveField()
  async type(@Parent() transaction: Transaction): Promise<TransactionType> {
    const { transaction_type_id, type } = transaction;
    if (type) return type;

    return this.transactionService.findTypeById(transaction_type_id);
  }
}
