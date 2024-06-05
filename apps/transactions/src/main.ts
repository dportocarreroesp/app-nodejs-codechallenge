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
  const kafkaConfig = configSvc.get().kafkaConfig;

  const app = await NestFactory.create(TransactionModule, { cors: true });
  app.connectMicroservice<MicroserviceOptions>({
    transport: kafkaConfig.transport,
    options: {
      client: {
        clientId: 'transactions',
        brokers: [`${kafkaConfig.options.host}:${kafkaConfig.options.port}`],
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
