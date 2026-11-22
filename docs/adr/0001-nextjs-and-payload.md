# Next.js + Payload as a single app

Kids Do Vegas is one Next.js app with Payload CMS (v3) installed inside it. Next.js renders the public pages, and Payload provides the admin, database access, API, and scheduled jobs. We chose it because it's the simplest TypeScript setup that includes a ready-made admin with drafts, revision history, and per-field translations: one codebase and one deploy.

## Considered Options

- **Django, all-in-one**: the simplest setup overall (built-in admin, SQLite, cron). Rejected because the developer prefers TypeScript.
- **Astro + a separate CMS (Payload or Strapi)**: more control over the public pages, but two apps and an API between them, plus rebuild triggers when content is published.
- **Custom CMS**: considered and dropped. Building the admin forms, relationship pickers, login, and translations ourselves would have taken a large share of v1.
- **Directus**: the best translations support, but its license has changed twice.
- **TanStack Start + Payload** (considered 2026-11-21): simpler data loading and fully type-safe routing, but Payload only supports it in the v4 beta, and Payload's own demo is marked experimental and not for production. Worth revisiting once v4 is stable. The public pages are a thin layer over Payload, so the switch should be manageable.

## Consequences

- **Stay portable off Vercel.** Use standard Postgres and S3-compatible file storage, never Vercel's own storage products. Keep a Dockerfile that runs `next start`. Keep scheduled jobs runnable by any scheduler. Moving to a self-hosted single server should take a day, not a rewrite.
- **Payload v4 is in beta.** We start on v3 stable and accept an upgrade to v4 later.
