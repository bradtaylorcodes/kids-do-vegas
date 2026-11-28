/**
 * `pnpm create-editor`: creates the Editor account in an empty database, such as
 * production before launch. Unlike `pnpm seed` it never wipes anything.
 *
 *   DATABASE_URL=... PAYLOAD_SECRET=... EDITOR_EMAIL=... EDITOR_PASSWORD=... pnpm create-editor
 *
 * The npm script sets NODE_ENV=production so Payload never pushes schema; the
 * database must already have the committed migrations applied.
 */
import 'dotenv/config'
import { getPayload } from 'payload'

const email = process.env.EDITOR_EMAIL
const password = process.env.EDITOR_PASSWORD
if (!email || !password) {
  console.error('Set EDITOR_EMAIL and EDITOR_PASSWORD.')
  process.exit(1)
}

const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })

const { totalDocs } = await payload.count({ collection: 'users' })
if (totalDocs > 0) {
  console.error('Refusing to create the Editor: a user already exists.')
  await payload.destroy()
  process.exit(1)
}

await payload.create({ collection: 'users', data: { email, password, role: 'editor' } })
payload.logger.info(`Created Editor ${email}`)
await payload.destroy()
process.exit(0)
