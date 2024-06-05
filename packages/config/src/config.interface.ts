import { Transport } from '@nestjs/microservices';

export type ConfigData = {
  env: string;
  port: number;
  transactionService: TransactionSvcConfig;
};

export type TransactionSvcConfig = {
  options: {
    host: string;
    port: number;
  };
  transport: Transport.TCP;
};
