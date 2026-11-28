# Runs the app with `next start`, so it can be self-hosted off Vercel (ADR 0001).
# Needs DATABASE_URL and PAYLOAD_SECRET at runtime. Committed migrations run on start.

FROM node:24.22.3-alpine AS base
RUN apk add --no-cache libc6-compat && corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NODE_OPTIONS=--no-deprecation
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app ./
USER nextjs
EXPOSE 3000
# Call the binaries directly: the non-root user has no corepack cache for pnpm.
CMD ["sh", "-c", "node_modules/.bin/payload migrate && node_modules/.bin/next start"]
