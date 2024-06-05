import { ConfigModule, ConfigService } from '@codechallenge/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyTransactionMiddleware } from './middleware/proxy-transaction.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CONFIG_SERVICE',
      useFactory: (configService: ConfigService) => {
        return configService;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyTransactionMiddleware)
      .forRoutes({ path: 'api/v1/transactions/*', method: RequestMethod.ALL });
  }
}
