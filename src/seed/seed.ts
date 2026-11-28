import type { Payload } from 'payload'

import { localEditor } from './localEditor'

/** Fills an empty database with local development data. Later tickets add reference and sample data here. */
export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'users',
    data: { ...localEditor, role: 'editor' },
  })
  payload.logger.info(`Seeded local Editor ${localEditor.email}`)
}
