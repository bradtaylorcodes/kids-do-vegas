# Preview deployments with database branches instead of staging

There is no staging environment. Every pull request gets a Vercel preview deployment, and the Neon integration gives each preview its own database branch copied from production, so a change is tested with its own migration, real infrastructure, and recent data before it merges. Production deploys from `main`. Local development uses Postgres in Docker Compose. With one developer and no QA step, a shared staging environment would be one more thing to keep in sync without catching anything a preview doesn't.

## Considered Options

- **A shared staging environment**: one long-lived copy of production that changes pass through. Rejected: it drifts from production, and changes queue behind each other in it.
- **Previews against a single shared preview database**: simpler, but migrations from different pull requests would collide.

## Consequences

- Payload uses `push` only in local development. Previews and production run committed migrations on deploy.
- Vercel Cron runs only on production, so scheduled jobs are tested on previews by triggering them by hand.
- Preview databases hold copies of production data, including the optional emails on Problem Reports, so preview URLs are behind Vercel deployment protection.
- Previews can send real email through Resend. Only the Editor receives email in v1, so this is acceptable.
- Moving off Vercel (see [ADR 0001](./0001-nextjs-and-payload.md)) loses previews per pull request, not the ability to deploy.
