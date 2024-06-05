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
        const antiFraudConfig = configService.get().antiFraudService;
        return ClientProxyFactory.create({
          transport: antiFraudConfig.transport,
          options: {
            client: {
              clientId: 'anti-fraud',
              brokers: [
                `${antiFraudConfig.options.host}:${antiFraudConfig.options.port}`,
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
