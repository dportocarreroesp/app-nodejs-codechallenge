import { CreateTransactionEventDto } from '@codechallenge/shared';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AntiFraudService implements OnModuleInit {
  constructor(
    @Inject('TRANSACTION_STATUS_SERVICE') private client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  validateTransaction(data: CreateTransactionEventDto) {
    console.info(
      `[ANTIFRAUD SERVICE]: Publishing event "transaction_status_update" with ${data.uid} ${data.value > 1000 ? 'REJECTED' : 'APPROVED'}`,
    );
    this.client.emit<any, string>(
      'transaction_status_update',
      JSON.stringify({
        uid: data.uid,
        status: data.value > 1000 ? 'REJECTED' : 'APPROVED',
      }),
    );
  }
}
