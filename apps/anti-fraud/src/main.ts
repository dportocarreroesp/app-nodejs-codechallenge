// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { ConfigService } from '@codechallenge/config';
import { NestFactory } from '@nestjs/core';
import { AntiFraudModule } from './anti-fraud.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const configSvc = new ConfigService();
  configSvc.loadFromEnv();
  const kafkaConfig = configSvc.get().kafkaConfig;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AntiFraudModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'anti-fraud',
          brokers: [`${kafkaConfig.options.host}:${kafkaConfig.options.port}`],
        },
        consumer: {
          groupId: 'anti-fraud-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
