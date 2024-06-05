import { Transport } from '@nestjs/microservices';

export type ConfigData = {
  env: string;
  port: number;
  transactionService: TransactionSvcConfig;
  antiFraudService: AntiFraudSvcConfig;
};

export type TransactionSvcConfig = {
  options: {
    host: string;
    port: number;
  };
};

export type AntiFraudSvcConfig = {
  transport: Transport.KAFKA;
  options: {
    host: string;
    port: number;
  };
};
