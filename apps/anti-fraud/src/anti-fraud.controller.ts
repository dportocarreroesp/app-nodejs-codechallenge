import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { AntiFraudService } from './anti-fraud.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateTransactionEventDto } from '@codechallenge/shared';

@Controller()
export class AntiFraudController {
  constructor(private readonly antiFraudService: AntiFraudService) {}

  @Get()
  getHello(): string {
    return this.antiFraudService.getHello();
  }

  @EventPattern('transaction_creation')
  async handleTransactionStatusUpdate(
    @Payload(ValidationPipe) data: CreateTransactionEventDto,
  ) {
    console.info(
      `[ANTIFRAUD CONTROLLER] Received "transaction_creation" with ${data.uid} ${data.value}`,
    );
    this.antiFraudService.validateTransaction(data);
  }
}
