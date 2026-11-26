# Kids Do Vegas

One Next.js app with Payload CMS v3 inside it ([ADR 0001](docs/adr/0001-nextjs-and-payload.md)), on Postgres.

## Development

Needs Node from `.nvmrc` and pnpm (pinned in `package.json`; `corepack enable` picks it up) and Docker.

```sh
cp .env.example .env    # first time only
docker compose up -d    # local Postgres on :5432
pnpm install
pnpm seed               # reset the database and create the local Editor
pnpm dev                # app on http://localhost:3000, admin at /admin
```

**Local Editor login** (created by `pnpm seed`, local only): `editor@kidsdovegas.test` / `local-editor-password`. Defined in `src/seed/localEditor.ts`.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the app and admin locally. |
| `pnpm seed` | Drop the local database, rebuild the schema, and load the seed (the local Editor). |
| `pnpm test` | Vitest integration tests against Payload's Local API and a real Postgres database (`kidsdovegas_test`, created automatically). Never mock the database. Run one file with `pnpm test tests/int/users.int.spec.ts`. |
| `pnpm test:e2e` | Playwright end-to-end tests. Runs `pnpm seed` first, then uses your running `pnpm dev` or starts one. |
| `pnpm verify` | Typecheck, lint, `pnpm test`, and `pnpm test:e2e`. Run before calling work done. |
| `pnpm typecheck` / `pnpm lint` | Individually. |
| `pnpm generate:types` / `pnpm generate:importmap` | Regenerate `src/payload-types.ts` and the admin import map after changing collections or admin components. |

### Schema changes and migrations

In local development and tests, Payload pushes schema changes to the database automatically. Previews and production never push: they run the committed migrations in `src/migrations` on deploy ([ADR 0003](docs/adr/0003-preview-deployments-instead-of-staging.md)). After changing a collection's fields, run `pnpm migrate:create <name>` and commit the generated files. CI fails if the config has schema changes without a migration.

Deploys run migrations before building (`pnpm build:deploy`, set as Vercel's build command in `vercel.json`). The Docker image runs them on start, before `next start`.

### End-to-end testing tools

Playwright MCP is configured in `.mcp.json` for checking the running app in a browser.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (`bradtaylorcodes/kids-do-vegas`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
