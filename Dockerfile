FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile
RUN pnpm build
# TODO: fix pnpm monorepo image build
# RUN pnpm deploy --filter="api-gateway" --prod "/prod/api-gateway"
# RUN pnpm deploy --filter="transactions" --prod "/prod/transactions"
# RUN pnpm deploy --filter="anti-fraud" --prod "/prod/anti-fraud"

FROM base AS api-gateway
# COPY --from=build "/prod/api-gateway" "/prod/api-gateway"
# WORKDIR "/prod/api-gateway"
COPY --from=build "/usr/src/app" "/usr/src/app"
WORKDIR "/usr/src/app/apps/api-gateway"
CMD [ "pnpm", "start" ]

FROM base AS transactions
# COPY --from=build "/prod/transactions" "/prod/transactions"
# WORKDIR "/prod/transactions"
COPY --from=build "/usr/src/app" "/usr/src/app"
WORKDIR "/usr/src/app"
CMD [ "bash", "migrate.bash" ]

FROM base AS anti-fraud
# COPY --from=build "/prod/anti-fraud" "/prod/anti-fraud"
# WORKDIR "/prod/anti-fraud"
COPY --from=build "/usr/src/app" "/usr/src/app"
WORKDIR "/usr/src/app/apps/anti-fraud"
CMD [ "pnpm", "start" ]