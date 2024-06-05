#!/bin/sh
# Script done to run migrations on DB and start transactions
# service
cd packages/database
pnpm db:migrate
cd ../../apps/transactions
pnpm start