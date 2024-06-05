import { Transport } from '@nestjs/microservices';

export type ConfigData = {
  env: string;
  port: number;
  transactionService: TransactionSvcConfig;
  kafkaConfig: KafkaConfig;
};

export type TransactionSvcConfig = {
  options: {
    host: string;
    port: number;
  };
};

export type KafkaConfig = {
  transport: Transport.KAFKA;
  options: {
    host: string;
    port: number;
  };
};
