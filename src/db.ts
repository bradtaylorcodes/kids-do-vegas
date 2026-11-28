/**
 * Payload pushes schema changes straight to the database only in local
 * development and tests. Previews and production run the committed migrations
 * in src/migrations instead (ADR 0003).
 */
export const shouldPushSchema = (): boolean => process.env.NODE_ENV !== 'production'
