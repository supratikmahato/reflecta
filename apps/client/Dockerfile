FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=client --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install pnpm --global
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
COPY turbo.json turbo.json
RUN npx turbo run build --filter=client...

FROM base AS runner
WORKDIR /app
USER node
COPY --from=installer --chown=node /app/apps/client/.output/ ./apps/client/.output/
CMD node apps/client/.output/server/index.mjs
