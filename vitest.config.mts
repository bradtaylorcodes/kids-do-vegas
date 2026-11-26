import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // Test files share one real Postgres database, so run them one at a time.
    fileParallelism: false,
    hookTimeout: 60_000,
    testTimeout: 30_000,
    env: {
      // A separate database from local development, so tests never wipe dev data.
      DATABASE_URL:
        process.env.TEST_DATABASE_URL ??
        'postgres://postgres:postgres@127.0.0.1:5432/kidsdovegas_test',
      PAYLOAD_SECRET: 'test-secret',
    },
  },
})
