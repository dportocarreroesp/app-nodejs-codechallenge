import { ConfigService } from '@codechallenge/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  const configSvc = new ConfigService();
  const transactionConfig = configSvc.get().transactionService;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionModule,
    {
      transport: transactionConfig.transport,
      options: {
        host: transactionConfig.options.host,
        port: transactionConfig.options.port,
      },
    },
  );

  await app.listen();
}
bootstrap();
