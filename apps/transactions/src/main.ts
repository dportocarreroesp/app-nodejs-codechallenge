import { ConfigService } from '@codechallenge/config';
import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  const configSvc = new ConfigService();
  const transactionConfig = configSvc.get().transactionService;

  const app = await NestFactory.create(TransactionModule, { cors: true });
  await app.listen(transactionConfig.options.port);
}
bootstrap();
