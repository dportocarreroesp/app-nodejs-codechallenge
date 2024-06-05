# Yape Code Challenge :rocket:

## Problem

Every time a financial transaction is created it must be validated by our anti-fraud microservice and then the same service sends a message back to update the transaction status.
For now, we have only three transaction statuses:

<ol>
  <li>pending</li>
  <li>approved</li>
  <li>rejected</li>  
</ol>

Every transaction with a value greater than 1000 should be rejected.

```mermaid
  flowchart LR
    Transaction -- Save Transaction with pending Status --> transactionDatabase[(Database)]
    Transaction --Send transaction Created event--> Anti-Fraud
    Anti-Fraud -- Send transaction Status Approved event--> Transaction
    Anti-Fraud -- Send transaction Status Rejected event--> Transaction
    Transaction -- Update transaction Status event--> transactionDatabase[(Database)]
```

## Optional

You can use any approach to store transaction data but you should consider that we may deal with high volume scenarios where we have a huge amount of writes and reads for the same data at the same time. How would you tackle this requirement?

You can use Graphql;

# Solution

## Tech Stack

- NodeJS with NestJS
- Prisma ORM
- GraphQL
- PostgreSQL
- Apache Kafka + Zookeeper

## Project Architecture

![Project architecture](docs/architecture/project_architecture.png)

- API gateway: Main application entrypoint for communication with our microservices, currently only implements proxy to redirect requests to our transactions microservice, could implement authentication and caching
- Transactions microservice: Microservice on charge of Transactions business logic, which includes persisting data on database and producing events for other microservices to consume, also consumes transactions statuses updates
- Anti-fraud microservice: Microservice on charge of validating the legitimacy of transactions, produces events that include transactions statuses veredict

### keypoints

- About Kafka configuration
  - Delivery Guarantee: At least once since our microservices posses idempotency
  - Acknowledgment: All(-1) we need to ensure durability and fault tolerance since it’s a financial system(transactions)
  - Compaction: Not using, would be required if we needed fast access to last transaction status or needed to optimize the disk space usage, also a transaction status doesn't mutate frequently in this case
- PostgreSQL
  - needed to ensure ACID
  - allows for horizontal scaling if needed through sharding or read only replica

## Project Structure

![Project Structure](docs/architecture/project_structure.png)

The entire project is contained inside an NX monorepository

- apps: Project applications required to run
  - api-gateway: NestJS Application
  - transactions: NestJS Application
  - anti-fraud: NestJS Application
- packages: Shared libraries or modules across applications
  - shared: Common utilities and type definitions
  - config: NestJS module to load and read environment variables through DI
  - database: Prisma module to query DB, handle migrations, seeding and type definitions

## How to run

### Dockerized

- Requirements:
  - docker
  - docker-compose
- Rename all `.env.example` files to `.env`
- Then just run `docker-compose up -d`

### Development locally

- Requirements:
  - docker
  - docker-compose
  - Node v20+
  - pnpm
- Install dependencies `pnpm i`
- Build packages and applications `pnpm build`
- Start Kafka server `docker-compose up -d kafka`
- Set .env files on applications as this

```
NODE_ENV="development"
PORT="3000"
TRANSACTION_SERVICE_HOST="localhost"
TRANSACTION_SERVICE_PORT="3001"
KAFKA_HOST="localhost"
KAFKA_PORT="9092"
```

- Start Postgres DB `docker-compose up -d postgres`
- Set .env file on packages/database

```
DATABASE_URL="postgresql://postgres:postgres@postgres:5433/postgres"
```

- run migrations if required

```
cd packages/database
pnpm db:migrate
pnpm db:seed
```

- start api-gateway application

```
cd apps/api-gateway
pnpm start:dev
```

- start transactions microservice

```
cd apps/transactions
pnpm start:dev
```

- start anti-fraud microservice

```
cd apps/anti-fraud
pnpm start:dev
```

## Using application

### Creating a transaction

```
mutation {
    createTransaction(createTransactionData:{value: 1001, transferTypeId: 1, accountExternalIdDebit: "1885f5ad-cb0f-485f-966b-926ad9b0ed1e", accountExternalIdCredit: "1885f5ad-cb0f-485f-966b-926ad9b0ed1e"}) {
        uid
    }
}
```

### Querying a transaction by ID

```
query {
    transaction(uid: "b0494188-ba3a-4d9b-8094-37eea4731edf") {
        uid
        type {
            name
        }
        status
        value
        created_at
    }
}
```

## Monorepo commands

```
pnpm build
```

Builds shared libraries inside `lib` directory and then build apps(API and Web) inside `apps` directory

```
pnpm lint
```

Runs linting on libs and apps

```
pnpm format
```

Applies prettier formatter on libs and apps(with husky this runs on files changed before commit)
