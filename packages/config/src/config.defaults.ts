import { Transport } from '@nestjs/microservices';
import { ConfigData } from './config.interface';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'production',
  port: 3000,
  transactionService: {
    options: {
      host: 'localhost',
      port: 3001,
    },
  },
  antiFraudService: {
    transport: Transport.KAFKA,
    options: {
      host: 'localhost',
      port: 9092,
    },
  },
};
