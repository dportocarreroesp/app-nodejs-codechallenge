import { ConfigModule, ConfigService } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TRANSACTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const transactionSvcConfig = configService.get().transactionService;
        return ClientProxyFactory.create(transactionSvcConfig);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
