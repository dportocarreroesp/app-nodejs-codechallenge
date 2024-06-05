import { ConfigModule, ConfigService } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { AntiFraudController } from './anti-fraud.controller';
import { AntiFraudService } from './anti-fraud.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [AntiFraudController],
  providers: [
    AntiFraudService,
    {
      provide: 'TRANSACTION_STATUS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const kafkaConfig = configService.get().kafkaConfig;
        return ClientProxyFactory.create({
          transport: kafkaConfig.transport,
          options: {
            client: {
              clientId: 'anti-fraud',
              brokers: [
                `${kafkaConfig.options.host}:${kafkaConfig.options.port}`,
              ],
            },
            consumer: {
              groupId: 'anti-fraud-consumer',
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AntiFraudModule {}
