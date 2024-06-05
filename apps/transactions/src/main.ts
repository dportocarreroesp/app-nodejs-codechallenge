// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ConfigService } from '@codechallenge/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  const configSvc = new ConfigService();
  configSvc.loadFromEnv();
  const transactionConfig = configSvc.get().transactionService;
  const antiFraudConfig = configSvc.get().antiFraudService;

  const app = await NestFactory.create(TransactionModule, { cors: true });
  app.connectMicroservice<MicroserviceOptions>({
    transport: antiFraudConfig.transport,
    options: {
      client: {
        clientId: 'transactions',
        brokers: [
          `${antiFraudConfig.options.host}:${antiFraudConfig.options.port}`,
        ],
      },
      consumer: {
        groupId: 'transactions-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(transactionConfig.options.port);
}
bootstrap();
