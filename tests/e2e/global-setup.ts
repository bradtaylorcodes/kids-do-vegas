import { execSync } from 'node:child_process'

/** Resets the database and loads the seed before the end-to-end tests run. */
export default function globalSetup(): void {
  execSync('pnpm seed', { stdio: 'inherit' })
}
