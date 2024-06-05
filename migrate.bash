#!/bin/sh
# Script done to run migrations on DB and start transactions
# service
cd packages/database
pnpm db:migrate
pnpm db:seed
cd ../../apps/transactions
pnpm start