/**
 * `pnpm seed`: resets the database, then seeds it.
 *
 * In local development the schema is dropped and pushed fresh from the config.
 * With NODE_ENV=production (as in CI's end-to-end job) it is dropped and rebuilt
 * from the committed migrations instead, matching how previews and production run.
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import { shouldPushSchema } from '../db'
import { seed } from './seed'

// The seed wipes the database and creates an Editor with a known password, so
// it only ever runs against a database on this machine (local or CI service container).
const databaseHost = new URL(process.env.DATABASE_URL ?? '').hostname
if (!['localhost', '127.0.0.1', '::1', '[::1]'].includes(databaseHost)) {
  console.error(`Refusing to seed: DATABASE_URL points at "${databaseHost}", not a local database.`)
  process.exit(1)
}

if (shouldPushSchema()) {
  // Payload drops every table on connect, then pushes the schema fresh.
  process.env.PAYLOAD_DROP_DATABASE = 'true'
}

const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })

if (!shouldPushSchema()) {
  await payload.db.migrateFresh({ forceAcceptWarning: true })
}

await seed(payload)
await payload.destroy()
process.exit(0)
