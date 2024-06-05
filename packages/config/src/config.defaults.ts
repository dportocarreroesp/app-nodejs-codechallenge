import { ConfigData } from './config.interface';
import { Transport } from '@nestjs/microservices';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'production',
  port: 3000,
  transactionService: {
    options: {
      host: 'localhost',
      port: 3001,
    },
    transport: Transport.TCP,
  },
};
