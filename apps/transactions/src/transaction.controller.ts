import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionSvc: TransactionService) {}

  @MessagePattern('hello_world')
  getHello(): string {
    return 'Hello from Transaction Microservice';
  }
}
