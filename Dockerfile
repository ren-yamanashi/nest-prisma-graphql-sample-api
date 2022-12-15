FROM positivly/prisma-binaries:latest as prisma
FROM node:16-alpine3.15

ENV TZ=Asia/Tokyo

RUN apk add --no-cache libc6-compat openssl bash

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY package-lock.json .

# prisma-erd-generatorの依存のPUPPETEERのM1対応
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH="which chromium" 

RUN yarn install

COPY . .

RUN yarn build
# RUN yarn prisma:migrate && yarn prisma:generate

EXPOSE 8080
CMD yarn start:dev


ENV PRISMA_QUERY_ENGINE_BINARY=/prisma-engines/query-engine \
    PRISMA_MIGRATION_ENGINE_BINARY=/prisma-engines/migration-engine \
    PRISMA_INTROSPECTION_ENGINE_BINARY=/prisma-engines/introspection-engine \
    PRISMA_FMT_BINARY=/prisma-engines/prisma-fmt \
    PRISMA_CLI_QUERY_ENGINE_TYPE=binary \
    PRISMA_CLIENT_ENGINE_TYPE=binary
COPY --from=prisma /prisma-engines/query-engine /prisma-engines/migration-engine /prisma-engines/introspection-engine /prisma-engines/prisma-fmt /prisma-engines/