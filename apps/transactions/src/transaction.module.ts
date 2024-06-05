import { ConfigModule } from '@codechallenge/config';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from '@codechallenge/database';
import { TransactionResolver } from './transaction.resolver';
import { TransactionTypeResolver } from './transaction-type.resolver';
// import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      // autoSchemaFile: join(__filename, 'src/schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionResolver, TransactionTypeResolver],
})
export class TransactionModule {}
