import { PrismaService } from '@codechallenge/database';
import { Injectable, Inject } from '@nestjs/common';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateTransactionEventDto } from '@codechallenge/shared';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('TRANSACTION_STATUS_SERVICE') private client: ClientKafka,
  ) {}

  findById(uid: string) {
    return this.prismaService.transaction.findUnique({
      where: {
        uid,
      },
    });
  }

  findAll() {
    return this.prismaService.transaction.findMany();
  }

  async createTransaction(createTransactionData: CreateTransactionInput) {
    const {
      transferTypeId,
      value,
      accountExternalIdCredit,
      accountExternalIdDebit,
    } = createTransactionData;

    const newTransaction = await this.prismaService.transaction.create({
      data: {
        transaction_type_id: transferTypeId,
        value,
        accountExternalIdCredit,
        accountExternalIdDebit,
        status: 'PENDING',
      },
    });

    console.info(
      `[TRANSACTION SERVICE]: Publishing event "transaction_creation" with ${newTransaction.uid} ${newTransaction.value}`,
    );
    this.client.emit<any, string>(
      'transaction_creation',
      JSON.stringify({
        uid: newTransaction.uid,
        value: newTransaction.value,
      }),
    );

    return newTransaction;
  }

  async updateTransactionStatus(
    updateTransactionData: UpdateTransactionEventDto,
  ) {
    const { uid, status } = updateTransactionData;

    return this.prismaService.transaction.update({
      where: { uid },
      data: {
        status,
      },
    });
  }

  findTypeById(typeId: number) {
    return this.prismaService.transactionType.findUnique({
      where: {
        id: typeId,
      },
    });
  }
}
