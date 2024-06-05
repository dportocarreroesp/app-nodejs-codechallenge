import { PrismaService } from '@codechallenge/database';
import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/input/create-transaction.input';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

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

  createTransaction(createTransactionData: CreateTransactionInput) {
    const {
      transferTypeId,
      value,
      accountExternalIdCredit,
      accountExternalIdDebit,
    } = createTransactionData;

    return this.prismaService.transaction.create({
      data: {
        transaction_type_id: transferTypeId,
        value,
        accountExternalIdCredit,
        accountExternalIdDebit,
        status: 'PENDING',
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
