import { ConfigModule, ConfigService } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@codechallenge/database';
import { TransactionResolver } from './transaction.resolver';
import { TransactionTypeResolver } from './transaction-type.resolver';
import { join } from 'path';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(__dirname, '../graphql/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionResolver,
    TransactionTypeResolver,
    {
      provide: 'TRANSACTION_STATUS_SERVICE',
      useFactory: (ConfigService: ConfigService) => {
        const antiFraudConfig = ConfigService.get().antiFraudService;
        return ClientProxyFactory.create({
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
      },
      inject: [ConfigService],
    },
  ],
})
export class TransactionModule {}
