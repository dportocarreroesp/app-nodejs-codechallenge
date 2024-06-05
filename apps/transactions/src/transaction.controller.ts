import { UpdateTransactionEventDto } from '@codechallenge/shared';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @EventPattern('transaction_status_update')
  async handleTransactionStatusUpdate(
    @Payload(ValidationPipe) data: UpdateTransactionEventDto,
  ) {
    console.info(
      `[TRANSACTION CONTROLLER] Received "transaction_status_update" with ${data.uid} ${data.status}`,
    );
    await this.transactionService.updateTransactionStatus(data);
  }
}
