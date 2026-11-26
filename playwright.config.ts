import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const port = Number(process.env.PORT ?? 3000)
const baseURL = `http://localhost:${port}`

/**
 * End-to-end tests run against the app loaded with `pnpm seed` (see globalSetup).
 * Locally they reuse `pnpm dev` if it's running; in CI they run against the production build.
 */
export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: process.env.CI ? 'pnpm start' : 'pnpm dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
