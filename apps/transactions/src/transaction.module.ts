import { ConfigModule } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [ConfigModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
