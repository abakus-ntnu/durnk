FROM node:22-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package*.json .
ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL
RUN pnpm i
COPY . .
RUN pnpm run build
RUN pnpm prune --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.svelte-kit .svelte-kit/
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
