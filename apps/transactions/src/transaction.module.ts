import { ConfigModule } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@codechallenge/database';
import { TransactionResolver } from './transaction.resolver';
import { TransactionTypeResolver } from './transaction-type.resolver';
import { join } from 'path';

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
  controllers: [],
  providers: [TransactionService, TransactionResolver, TransactionTypeResolver],
})
export class TransactionModule {}
